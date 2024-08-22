import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { calculateValidMoves } from './public/jsFiles/calculateValidMoves.js';
import { createHash } from 'crypto';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { SeededRNG } from './public/jsFiles/seedRng.js';
import { gameSessions, createGameSession, getGameSession } from './public/jsFiles/gameSessions.js'



const app = express();
const PORT =  process.env.PORT || 3000;
const httpServer = createServer(app);

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`matchmaking server running on port ${PORT}`);
});
const socketToGameMap = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// This will store registered players
let players = [];

// This will store ongoing matches with a unique match ID
let matches = [];

app.use(cors({
    origin: "https://chessmos-83a3f6f208b9.herokuapp.com", // Change this to your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.get('/test04.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test04.html'));
});

app.post('/register', (req, res) => {
    const walletAddress = req.body.walletAddress;

    // Check if the wallet address is already registered
    if (players.find(player => player.walletAddress === walletAddress)) {
        return res.status(400).send('This wallet is already registered for matchmaking.');
    }

    // Add the new player with a placeholder for socket ID (will be updated upon WebSocket connection)
    players.push({ walletAddress, socketId: null });

    // Inform the client of successful registration and prompt for WebSocket connection
    res.send('Registered successfully. Please connect via WebSocket to join the matchmaking queue.');
});

app.get('/matches', (req, res) => {
    res.json(matches);
});



const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "https://chessmos-83a3f6f208b9.herokuapp.com", 
        methods: ["GET", "POST"],
        allowedHeaders: ['Content-Type-Authorization'],
        credentials: true
    }
});

function serializeSessionData(session) {
    console.log('serializeSessionData function entered session being :', session);
    return {
        gameId: session.gameId,
        players: session.players.map(player => player.walletAddress), // Example serialization
        seed: session.rng.seed, // Include seed if it's relevant for the client to know
        board: serializeBoard(session.board)
    };
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Prompt client to register wallet address
    socket.emit('requestRegister');

    socket.on('register', ({ walletAddress }) => {
        try {
            let player = players.find(p => p.walletAddress === walletAddress);

            if (player) {
                console.log(`Updating socket ID for wallet ${walletAddress}`);
                player.socketId = socket.id;
            } else {
                console.log(`Registering new player with wallet ${walletAddress}`);
                players.push({ walletAddress, socketId: socket.id });
            }

            if (players.length >= 2) {
                const matchPlayers = [players.shift(), players.shift()];
                const addresses = matchPlayers.map(p => p.walletAddress);
                const gameSeed = generateSeed(addresses, matchPlayers);
                const rng = new SeededRNG(gameSeed);
                const matchId = generateMatchId();
                const gameId = generateUniqueId();
                const session = createGameSession(matchPlayers, matchId, gameId);
                gameSessions.set(gameId, session);

                matchPlayers.forEach(player => {
                    const playerSocket = io.sockets.sockets.get(player.socketId);

                    if (playerSocket) {
                        playerSocket.join(`gameRoom-${gameId}`);
                        const isWhite = player === matchPlayers[0];
                        const color = isWhite ? 'white' : 'black';
                        const opponentIndex = isWhite ? 1 : 0;

                        playerSocket.emit('matchFound', {
                            gameId: gameId,
                            matchId: matchId,
                            opponent: matchPlayers[opponentIndex].walletAddress,
                            color: color,
                            yourTurn: isWhite,
                        });
                        socketToGameMap.set(playerSocket.id, gameId);
                    } else {
                        console.log(`Socket ID for player ${player.walletAddress} is not found.`);
                    }
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });

    socket.on('joinGame', ({ gameId }) => {
        console.log('gameId in the joingamesocke', gameId);
        const roomName = 'gameRoom-' + gameId;
        socket.join(roomName);
         socketToGameMap.set(socket.id, gameId);
        console.log(`Player ${socket.id} joined game room: ${roomName}`);

        io.in(roomName).allSockets().then(sockets => {
            console.log(`Players in ${roomName}:`, Array.from(sockets));
        });
    });

    socket.on('move', (move) => 
{
    console.log('Move received:', move);
    const gameId = socketToGameMap.get(socket.id);
    if (!gameId) {
        console.error('No gameId found for socket:', socket.id);
        return;
    }

    const gameSession = gameSessions.get(gameId);
    if (!gameSession) {
        console.error('No gameSession found for gameId:', gameId);
        return;
    }

    const currentTurnColor = gameSession.turn;

    console.log('about to cast move with gameSession being :', gameSession, 'gameID being ', gameId);

    const piece = gameSession.board.find(p => p.row === move.from.row && p.col === move.from.col);
    if (!piece) {
        console.error('No piece found at the source position:', move.from);
        socket.emit('invalidMove', move);
        return;
    }

    if (!gameSession.players[0].color || !gameSession.players[1].color) {
        gameSession.players[0].color = 'black';
        gameSession.players[1].color = 'white';
        console.log('Assigned colors to players:', gameSession.players);
    }

    // Move the piece on the board
    movePiece(gameSession, move.from.row, move.from.col, move.to.row, move.to.col);
    piece.row = move.to.row;
    piece.col = move.to.col;

    // Check if the move results in the king being in check
    if (isKingInCheck(gameSession.board, currentTurnColor)) {
        console.log('King is in check, proceeding with gathering valid pieces to resolve check.');

        const path = calculatePathToKing(gameSession.board, currentTurnColor);
        gameSession.threateningPath = path;
        console.log('Path to the king:', path);

        const piecesThatCanResolveCheck = canPieceBlockPath(gameSession.board, path, currentTurnColor);
        console.log('piecesThatCanResolveCheck before emitting to socket', piecesThatCanResolveCheck);
        if (piecesThatCanResolveCheck.length > 0) {
            console.log('Pieces that can block the check:', piecesThatCanResolveCheck);
            console.log('Emitting checkResolutionOptions at:', new Date());
            io.emit('checkResolutionOptions', {
    gameId: gameId,  // Include the game ID to identify which game the event belongs to
    piecesThatCanResolveCheck: piecesThatCanResolveCheck,
    path: path
});

        } else {
            console.log('No pieces can block the check.');
            // If no pieces can block the check, consider if this is checkmate
        }

        // Do not validate the move that causes the check; let it proceed
    } else {
        // Only use this validation if the player is already in check and trying to make a move
        if (gameSession.isInCheck) {
            const validMoves = filterValidMovesWhenInCheck(gameSession.board, currentTurnColor);
            console.log('Valid moves that resolve check:', validMoves);

            const isMoveValid = validMoves.some(m => 
                m.from.row === move.from.row && 
                m.from.col === move.from.col && 
                m.to.row === move.to.row && 
                m.to.col === move.to.col
            );

            if (!isMoveValid) {
                console.log('Move is invalid as it does not resolve check:', move);
                socket.emit('invalidMove', move);
                return;
            }
        }
    }

    // Update the game state to mark whether a king is in check after this move
   
    const threateningPath = gameSession.threateningPath || [];        
    const isMoveOnPath = threateningPath.some(p => p.row === move.to.row && p.col === move.to.col);
console.log('threateningPath before checking resolution of the check', threateningPath, 'isMoveOnPath', isMoveOnPath);
if (isMoveOnPath) {
            console.log('Move resolves the check by blocking or capturing the threatening piece. game ID being:', gameId);
            socket.emit('checkResolved');
            socket.broadcast.emit('checkResolved');
           
        }
    
        gameSession.isInCheck = isKingInCheck(gameSession.board, gameSession.turn === 'white' ? 'black' : 'white');

    // Broadcast the move to other clients
    socket.broadcast.emit('move', move);
    

    console.log('Checking for checkmate...');
    if (isCheckmate(gameSession.board, currentTurnColor)) {
        console.log('Checkmate detected for gameSession:', gameSession);
        const winnerColor = gameSession.turn;
        const winner = gameSession.players.find(player => player.color === winnerColor).walletAddress;
        console.log('And the winner is... ', winner);
        io.to(gameId).emit('gameOver', { winner });
        return; // Game is over, no need to switch turns
    }

    // Switch turns
    gameSession.turn = currentTurnColor === 'white' ? 'black' : 'white';

    // Notify the players about the turn change
    notifyTurnChange();
    switchTurns(gameSession);
});

    function simulateMove(board, piece, move) {
    // Create a deep copy of the board
    const tempBoard = JSON.parse(JSON.stringify(board));

    // Find and update the piece's position in the temporary board
    const tempPiece = tempBoard.find(p => p.row === piece.row && p.col === piece.col);
    tempPiece.row = move.to.row;
    tempPiece.col = move.to.col;

    // Remove any captured piece
    const capturedPieceIndex = tempBoard.findIndex(p => p.row === move.to.row && p.col === move.to.col);
    if (capturedPieceIndex !== -1) {
        tempBoard.splice(capturedPieceIndex, 1);  // Remove the captured piece
    }

    return tempBoard;
}
function calculatePathToKing(board, kingColor) {
    console.log('calculatePathToKing function entered')
    const kingPosition = getKingPosition(board, kingColor);
    const opponentColor = kingColor === 'white' ? 'black' : 'white';

    for (const piece of board) {
        if (piece.color === opponentColor) {
            const result = isThreateningKing(board, piece, kingPosition);
            if (result.threatening) {
                return result.path; // Return the path from the threatening piece to the king
            }
        }
    }

    return []; // No threatening path found
}

    
function getPiecesThatCanResolveCheck(board, kingColor) {
    const validPieces = [];
    board.forEach(piece => {
        if (piece.color === kingColor && piece.type !== 'king') {  // Exclude the king itself
            const validMoves = getValidMovesForPiece(board, piece);
            const resolvingMoves = filterMovesThatResolveCheck(board, piece, validMoves);
            if (resolvingMoves.length > 0) {
                validPieces.push({ row: piece.row, col: piece.col });
            }
        }
    });
    return validPieces;
}
function filterMovesThatResolveCheck(board, piece, moves) {
    return moves.filter(move => {
        const tempBoard = simulateMove(board, piece, move);  // Simulate the move on a temporary board
        return !isKingInCheck(tempBoard, piece.color);  // Check if the move resolves the check
    });
}


socket.on('castSpell', data => {
    console.log(`Spell cast received from ${socket.id}:`, data);
    const { gameId, type: spellType } = data;

    // Retrieve the game session using `gameId`
    const gameSession = gameSessions.get(gameId);
    if (gameSession) {
        // Process the spell based on game logic
        const spellResult = processSpell(gameSession, spellType);
        console.log('about to cas spell for caster :', socket.id, 'spellType being:', spellType, 'spell result:', spellResult);
        // Emit the result of the spell to all clients in the game room, including the sender
        io.in('gameRoom-' + gameId).allSockets().then(sockets => {
    console.log(`Current sockets in gameRoom-${gameId}:`, Array.from(sockets));
    io.in('gameRoom-' + gameId).emit('spellCasted', {
        caster: socket.id,
        spellType: spellType,
        spellResult: spellResult,
        gameId: gameId,
        rng: gameSession.rng
    });
});
        console.log(`Broadcasted spell result for gameId: ${gameId}`);
    } else {
        console.error(`Game session not found for ID: ${gameId}`);
        socket.emit('error', { message: 'Game session not found', gameId });
    }
});


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Handle disconnection, such as pausing the match or notifying the opponent
    });
});

function serializeBoard(board) {
    const serializedBoard = {};
    for (const position in board) {
        if (board.hasOwnProperty(position)) {
            serializedBoard[position] = {
                color: board[position].color,
                type: board[position].type
            };
        }
    }
    return serializedBoard;
}
// function movePiece(gameSession, fromPosition, toPosition) {
//     if (gameSession.board[fromPosition]) {
//         gameSession.board[toPosition] = gameSession.board[fromPosition];
//         delete gameSession.board[fromPosition];
//     } else {
//         console.error(`No piece found at position ${fromPosition}`);
//     }
// }
function movePiece(board, fromRow, fromCol, toRow, toCol) {
    console.log('movePiece function entered in server with board :', board, 'fromRow', fromRow , 'fromCol', fromCol, 'toRow', toRow, 'toCol', toCol);
    //  const boardElement = document.querySelector('#chessboard');
    // const boardArray = domToBoardArray(boardElement);
    const piece = getPieceByRowCol(board, fromRow, fromCol);
    if (piece) {
        // Remove piece from old position
        board = board.board.filter(p => p.row !== fromRow || p.col !== fromCol);
        console.log('board', board);

        // Update piece's position
        const updatedPiece = { ...piece, row: toRow, col: toCol };
        console.log('updatedPiece', updatedPiece);

        // Add piece to new position
        board.push(updatedPiece);

        console.log('Moved piece:', updatedPiece, 'to new position:', toRow, toCol);
    } else {
        console.error('Piece not found at position:', fromRow, fromCol);
    }
    return board;
}
function getPieceByRowCol(board, row, col) {
    //console.log("Board in getPieceByRowCol function", board.board);
    return board.board.find(piece => piece.row === row && piece.col === col) || null;
}
function capturePiece(gameSession, position) {
    if (gameSession.board[position]) {
        delete gameSession.board[position];
    } else {
        console.error(`No piece found at position ${position}`);
    }
}
function filterValidMovesWhenInCheck(board, kingColor) {
    const kingPosition = getKingPosition(board, kingColor);
    const allMoves = calculateValidMoves(board, kingColor);
    return allMoves.filter(move => {
        const tempBoard = JSON.parse(JSON.stringify(board)); // Deep copy of the board
        const piece = tempBoard.find(p => p.row === move.from.row && p.col === move.from.col);
        piece.row = move.to.row;
        piece.col = move.to.col;
        return !isKingInCheck(tempBoard, kingColor);
    });
}

function getKingPosition(board, kingColor) {
    for (const piece of board) {
        if (piece.type === 'king' && piece.color === kingColor) {
            return { row: piece.row, col: piece.col };
        }
    }
    return null;
}

function isKingInCheck(board, kingColor) {
    const kingPosition = getKingPosition(board, kingColor);
    if (!kingPosition) return false;

    const opponentColor = kingColor === 'white' ? 'black' : 'white';

    for (const piece of board) {
        if (piece.color === opponentColor) {
            const { threatening } = isThreateningKing(board, piece, kingPosition);
            if (threatening) {
                console.log(`Piece at (${piece.row}, ${piece.col}) is threatening the king.`);
                return true;
            }
        }
    }
    return false;
}


function isThreateningKing(board, piece, kingPosition) {
    console.log('isThreateningKing function entered piece being :', piece, 'kingPosition being :', kingPosition);

    switch (piece.type) {
        case 'pawn':
            const isPawnThreatening = isPawnThreateningKing(piece, kingPosition);
            console.log(`Pawn is threatening: ${isPawnThreatening}`);
            return { threatening: isPawnThreatening, path: [] };
        case 'knight':
            const isKnightThreatening = isKnightThreateningKing(piece, kingPosition);
            console.log(`Knight is threatening: ${isKnightThreatening}`);
            return { threatening: isKnightThreatening, path: [] };
        case 'bishop':
            const isBishopThreatening = isSlidingPieceThreateningKing(board, piece, kingPosition, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
            console.log(`Bishop is threatening: ${isBishopThreatening.threatening}`);
            return isBishopThreatening;
        case 'rook':
            const isRookThreatening = isSlidingPieceThreateningKing(board, piece, kingPosition, [[1, 0], [0, 1], [-1, 0], [0, -1]]);
            console.log(`Rook is threatening: ${isRookThreatening.threatening}`);
            return isRookThreatening;
        case 'queen':
            const isQueenThreatening = isSlidingPieceThreateningKing(board, piece, kingPosition, [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]);
            console.log(`Queen is threatening: ${isQueenThreatening.threatening}`);
            console.log('Threatening path:', isQueenThreatening.path);
            return isQueenThreatening;
        case 'king':
            const isKingThreatening = isKingThreateningKing(piece, kingPosition);
            console.log(`King is threatening: ${isKingThreatening}`);
            return { threatening: isKingThreatening, path: [] };
        default:
            console.log(`Unknown piece type: ${piece.type}`);
            return { threatening: false, path: [] };
    }
}

function isPawnThreateningKing(pawn, kingPosition) {
    const direction = pawn.color === 'white' ? 1 : -1;
    return (
        kingPosition.row === pawn.row + direction &&
        (kingPosition.col === pawn.col + 1 || kingPosition.col === pawn.col - 1)
    );
}

function isKnightThreateningKing(knight, kingPosition) {
    const knightMoves = [
        { row: 2, col: 1 },
        { row: 2, col: -1 },
        { row: -2, col: 1 },
        { row: -2, col: -1 },
        { row: 1, col: 2 },
        { row: 1, col: -2 },
        { row: -1, col: 2 },
        { row: -1, col: -2 }
    ];

    return knightMoves.some(
        move => knight.row + move.row === kingPosition.row && knight.col + move.col === kingPosition.col
    );
}
// function canPieceBlockPath(board, path, currentTurnColor) {
//     for (const piece of board) {
//         // Exclude the king from the pieces that can block the check
//         if (piece.color === currentTurnColor && piece.type !== 'king') {
//             for (const square of path) {
//                 // Check if the piece can move to this square
//                 if (canMoveToSquare(board, piece, square)) {
//                     console.log(`${piece.type} at (${piece.row}, ${piece.col}) can move to (${square.row}, ${square.col}) and block the check.`);
                    
//                         return true;  // Found a piece that can block the check
//                 }
//             }
//         }
//     }
//     return false;  // No piece can block the check
// }
function canPieceBlockPath(board, path, currentTurnColor) {
    const validPieces = [];

    for (const piece of board) {
        // Exclude the king from the pieces that can block the check
        if (piece.color === currentTurnColor && piece.type !== 'king') {
            for (const square of path) {
                // Check if the piece can move to this square
                if (canMoveToSquare(board, piece, square)) {
                    console.log(`${piece.type} at (${piece.row}, ${piece.col}) can move to (${square.row}, ${square.col}) and block the check.`);
                    validPieces.push({ row: piece.row, col: piece.col });
                }
            }
        }
    }

    if (validPieces.length > 0) {
        console.log('Pieces that caan block the check:', validPieces);
        return validPieces;
    }

    return false;  // No piece can block the check
}
function gatherValidPiecesForBlocking(board, path, kingColor) {
    console.log('gatherValidPiecesForBlocking function entered, path being :', path);

    const validPieces = [];

    for (const piece of board) {
        if (piece.color === kingColor && piece.type !== 'king') {
            for (const square of path) {
                if (canMoveToSquare(board, piece, square)) {
                    validPieces.push({ row: piece.row, col: piece.col });
                }
            }
        }
    }

    return validPieces;
}


function canMoveToSquare(board, piece, targetSquare) {
    console.log("canMoveToSquare function entered with piece :", piece, "targetSquare being :", targetSquare);
    const rowDiff = Math.abs(piece.row - targetSquare.row);
    const colDiff = Math.abs(piece.col - targetSquare.col);

    switch (piece.type) {
        case 'pawn':
            // Pawns can only move forward or capture diagonally
            const direction = piece.color === 'white' ? 1 : -1;
            if (colDiff === 1 && rowDiff === 1 && piece.row + direction === targetSquare.row) {
                // Diagonal capture
                const targetPiece = board.find(p => p.row === targetSquare.row && p.col === targetSquare.col);
                return targetPiece && targetPiece.color !== piece.color;
            } else if (colDiff === 0 && piece.row + direction === targetSquare.row) {
                // Move forward
                const targetPiece = board.find(p => p.row === targetSquare.row && p.col === targetSquare.col);
                return !targetPiece;
            }
            break;
        case 'rook':
            // Rook can move horizontally or vertically
            return rowDiff === 0 || colDiff === 0;
        case 'bishop':
            // Bishop can move diagonally
            return rowDiff === colDiff;
        case 'queen':
            // Queen can move horizontally, vertically, or diagonally
            return rowDiff === colDiff || rowDiff === 0 || colDiff === 0;
        case 'knight':
            // Knight moves in an "L" shape
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        case 'king':
            // King can move one square in any direction
            return rowDiff <= 1 && colDiff <= 1;
        default:
            return false;
    }

    return false;
}
// function isSlidingPieceThreateningKing(board, piece, kingPosition, directions) {
//     console.log('isSlidingPieceThreateningKing function entered. Piece:', piece, 'King position:', kingPosition, 'Directions:', directions);
    
//     const path = [];

//     for (const [dRow, dCol] of directions) {
//         let row = piece.row + dRow;
//         let col = piece.col + dCol;

//         while (row >= 0 && row < 8 && col >= 0 && col < 8) {
//             // Stop if the current square is the king's position
//             if (row === kingPosition.row && col === kingPosition.col) {
//                 path.push({ row, col });
//                 console.log('Correct path to king detected:', path);

//                 const availablePath = filterPathWithAvailableSquares(board, path);
//                 console.log('Available path after filtering:', availablePath);
//                 return { threatening: true, path: availablePath };
//             }

//             const occupyingPiece = board.find(p => p.row === row && p.col === col);
//             if (occupyingPiece) {
//                 console.log(`Path blocked by piece at (${row}, ${col}). Stopping path.`);
//                 break; // Stop if we encounter any piece
//             }

//             path.push({ row, col });
//             row += dRow;
//             col += dCol;
//         }
//     }

//     console.log(`Piece at (${piece.row}, ${piece.col}) does not threaten the king.`);
//     return { threatening: false, path: [] };
// }
function isSlidingPieceThreateningKing(board, piece, kingPosition, directions) {
    console.log('isSlidingPieceThreateningKing function entered. Piece:', piece, 'King position:', kingPosition, 'Directions:', directions);
    
    const path = [];

    // Calculate the row and column differences
    const rowDiff = kingPosition.row - piece.row;
    const colDiff = kingPosition.col - piece.col;

    // Determine the direction to move (normalize the difference to -1, 0, or 1)
    const dRow = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const dCol = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    // If the direction is not one of the allowed directions for the piece, return early
    const isValidDirection = directions.some(([dirRow, dirCol]) => dirRow === dRow && dirCol === dCol);
    console.log('isValidDirection', isValidDirection);
    if (!isValidDirection) {
        console.log('Invalid direction for this piece to threaten the king.');
        return { threatening: false, path: [] };
    }

    let row = piece.row + dRow;
    let col = piece.col + dCol;

    while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        path.push({ row, col });

        // Stop if the current square is the king's position
        if (row === kingPosition.row && col === kingPosition.col) {
            console.log('Correct path to king detected:', path);

            // Now filter out any squares in the path that are occupied by any piece
            const availablePath = filterPathWithAvailableSquares(board, path);
            console.log('Available path after filtering:', availablePath);
            return { threatening: true, path: availablePath };
        }

        const occupyingPiece = board.find(p => p.row === row && p.col === col);
        if (occupyingPiece) {
            console.log(`Path blocked by piece at (${row}, ${col}). Stopping path.`);
            break; // Stop if we encounter any piece
        }

        row += dRow;
        col += dCol;
    }

    console.log(`Piece at (${piece.row}, ${piece.col}) does not threaten the king.`);
    return { threatening: false, path: [] };
}

function isKingThreateningKing(king, kingPosition) {
    const kingMoves = [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
        { row: -1, col: -1 }
    ];

    return kingMoves.some(
        move => king.row + move.row === kingPosition.row && king.col + move.col === kingPosition.col
    );
}

// function isCheckmate(board, kingColor) {

//     console.log('isCheckmate function entered board being :', board, 'kingColor being :', kingColor);
//      const opponentColor = kingColor === 'white' ? 'black' : 'white';
//     console.log('Checking for checkmate on opponent kingColor:', opponentColor);

//     if (!isKingInCheck(board, opponentColor)) {
//         return false;
//     }

//     const kingPosition = getKingPosition(board, opponentColor);
//        const king = { type: 'king', color: kingColor, row: kingPosition.row, col: kingPosition.col };

//     // const validMoves = getAllValidMoves(board, { type: 'king', color: kingColor, row: kingPosition.row, col: kingPosition.col });
//     const validMoves = calculateValidMoves(board, king);
//     for (const move of validMoves) {
//         // Temporarily move the king to the new position
//         const originalPosition = { row: kingPosition.row, col: kingPosition.col };
//         const pieceAtDestination = board.find(p => p.row === move.row && p.col === move.col);
//         if (pieceAtDestination) {
//             board = board.filter(p => p !== pieceAtDestination);
//         }
//         board.push({ type: 'king', color: kingColor, row: move.row, col: move.col });

//         // Check if the king is still in check after the move
//         if (!isKingInCheck(board, kingColor)) {
//             // Undo the move
//             board = board.filter(p => p.row !== move.row || p.col !== move.col);
//             board.push({ type: 'king', color: kingColor, row: originalPosition.row, col: originalPosition.col });
//             if (pieceAtDestination) {
//                 board.push(pieceAtDestination);
//             }
//             return false;
//         }

//         // Undo the move
//         board = board.filter(p => p.row !== move.row || p.col !== move.col);
//         board.push({ type: 'king', color: kingColor, row: originalPosition.row, col: originalPosition.col });
//         if (pieceAtDestination) {
//             board.push(pieceAtDestination);
//         }
//     }

//     return true;
// }
function isCheckmate(board, currentTurnColor) {
    console.log('isCheckmate function entered board being :', board, 'currentTurnColor being :', currentTurnColor);

    const opponentColor = currentTurnColor === 'white' ? 'black' : 'white';
    console.log('Checking for checkmate on opponent kingColor:', opponentColor);

    // Check if the king is in check
    if (!isKingInCheck(board, currentTurnColor)) {
        return false;
    }

    // Get the position of the king
    const kingPosition = getKingPosition(board, currentTurnColor);
    console.log('King position:', kingPosition);
    // const king = { type: 'king', color: kingColor, row: kingPosition.row, col: kingPosition.col };
    const kingMoves = calculateValidMoves(board, { type: 'king', color: currentTurnColor, row: kingPosition.row, col: kingPosition.col });


    // 1. Check if the king can move out of check
    for (const move of kingMoves) {
        if (tryMoveAndCheck(board, { type: 'king', color: currentTurnColor, row: kingPosition.row, col: kingPosition.col }, move)) {
            console.log('King can escape check with move:', move);
            return false;  // King can move out of check
        }
    }

    // 2. Check if any piece can block the check or capture the attacking piece
    const attackingPieces = findAttackingPieces(board, currentTurnColor);
    console.log('Attacking pieces:', attackingPieces);
    
    for (const attackingPiece of attackingPieces) {
        const { path, threatening } = isThreateningKing(board, attackingPiece, kingPosition);
        if (!threatening) continue;
        
        console.log(' path :', path);
;
        if (canPieceBlockPath(board, path, currentTurnColor)) {
            console.log('A piece can block the threatening path');

            return false;  // Found a piece that can block or capture
        }
    

        // for (const piece of board) {
        //     if (piece.color === kingColor) {
        //         const pieceMoves = calculateValidMoves(board, piece);
        //         console.log(`Checking moves for piece at (${piece.row}, ${piece.col}):`, pieceMoves);

        //         for (const move of pieceMoves) {
        //             console.log(`Trying move from (${move.from.row}, ${move.from.col}) to (${move.to.row}, ${move.to.col})`);

        //             if (tryMoveAndCheck(board, piece, move)) {
        //                 console.log(`Checking if move can block the check...`);

        //                 // Check if the move blocks the path of the threatening piece
        //                 if (path.some(p => p.row === move.to.row && p.col === move.to.col)) {
        //                     console.log('Move can block the check:', move);
        //                     return false;  // A piece can block or capture
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    console.log('No valid moves left, checkmate!');
    return true;
}
function filterPathWithAvailableSquares(board, path) {
    return path.filter(square => {
        const occupyingPiece = board.find(p => p.row === square.row && p.col === square.col);
        return !occupyingPiece;  // Include only squares that are not occupied
    });
}

// Helper function to find pieces attacking the king
function findAttackingPieces(board, kingColor) {
    const opponentColor = kingColor === 'white' ? 'black' : 'white';
    const kingPosition = getKingPosition(board, kingColor);
    const attackingPieces = [];

    for (const piece of board) {
        if (piece.color === opponentColor) {
            const isThreatening = isThreateningKing(board, piece, kingPosition);
            if (isThreatening) {
                attackingPieces.push(piece);
                console.log(`Piece at (${piece.row}, ${piece.col}) of type ${piece.type} is attacking the king.`);
            }
        }
    }

    return attackingPieces;
}

// Helper function to simulate a move and check if the king is still in check
function tryMoveAndCheck(board, piece, move, attackingPieces = null) {
    const originalPosition = { row: piece.row, col: piece.col };
    const pieceAtDestination = board.find(p => p.row === move.row && p.col === move.col);
    
    // Temporarily move the piece
    board = board.filter(p => p !== piece);
    if (pieceAtDestination) {
        board = board.filter(p => p !== pieceAtDestination);
    }
    board.push({ type: piece.type, color: piece.color, row: move.row, col: move.col });

    let result;
    if (attackingPieces) {
        result = attackingPieces.every(attacker => !canAttackPosition(board, attacker, { row: originalPosition.row, col: originalPosition.col }));
    } else {
        result = !isKingInCheck(board, piece.color);
    }

    console.log(`Move result: ${result}. Undoing move...`);

    // Undo the move
    board = board.filter(p => p.row !== move.row || p.col !== move.col);
    board.push({ type: piece.type, color: piece.color, row: originalPosition.row, col: originalPosition.col });
    if (pieceAtDestination) {
        board.push(pieceAtDestination);
    }

    return result;
}

// Function to check if a piece can attack a given position
function canAttackPosition(board, piece, position) {
    const validMoves = calculateValidMoves(board, piece);
    return validMoves.some(move => move.row === position.row && move.col === position.col);
}

function domToBoardArray(boardElement) {
    const pieces = Array.from(boardElement.querySelectorAll('.chess-piece')).map(piece => {
        const square = piece.parentNode;
        const [color, type] = piece.className.split(' ')[1].split('-');
        const row = parseInt(square.getAttribute('data-row'), 10);
        const col = parseInt(square.getAttribute('data-col'), 10);
        return { color, type, row, col, pieceElement: piece };
    });
    return pieces;
}

function updatePieceAttributes(piece) {
    for (const attribute in piece) {
        if (attribute.startsWith('is')) {
            const attributeName = attribute.substring(2);
            const lowerCaseAttribute = attributeName.charAt(0).toLowerCase() + attributeName.slice(1);

            if (piece[attribute]) {
                switch (lowerCaseAttribute) {
                    case 'petrified':
                        piece.turnsPetrified -= 1;
                        piece.turnsUntilDestruction -= 1;
                        if (piece.turnsUntilDestruction <= 0) {
                            piece.isPetrified = false;
                        }
                        break;
                    // Add cases for other attributes as needed
                    default:
                        console.log(`No update logic for attribute: ${lowerCaseAttribute}`);
                }
            }
        }
    }
}

function generateSeed(addresses, matchPlayers) {
    const hash = createHash('sha256');
    addresses.forEach(addr => hash.update(addr));
    return hash.digest('hex');  // Returns a hexadecimal string, used as the RNG seed
}
function countPieces(gameSession, color) {
    return gameSession.board.filter(piece => piece.color === color).length;
}

// Assuming SeededRNG is already imported and available
// function createGameSession(matchPlayers, matchId) {
//     const addresses = matchPlayers.map(p => p.walletAddress);
//     const gameSeed = generateSeed(addresses);  // Ensure this function returns a consistent seed
//     const rng = new SeededRNG(gameSeed);
//     const session = {
//         matchId,
//         players: matchPlayers,
//         rng,  // RNG initialized with the game seed
//     };
//     gameSessions.set(matchId, session);  // Assuming gameSessions is a Map
//     return session;
// }

function processSpell(gameSession, spellType) {
    console.log('processSpell function entered, gameSession being :', gameSession);
    const rng = gameSession.rng;
    console.log('rng in processSpell function', rng);
    let result = {};

    if (spellType === 'chaos-warp') {
            // const seed = rng.next(); // Now this should work if rng is correctly an instance of SeededRNG
           return processChaosWarp(gameSession);
           io.in('gameRoom-' + data.gameId).emit('updatePositions', result);
           // break;
        
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);
    
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);
        
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);
    
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);
    
    } else if (spellType === 'adept-wand') {
        const riftDuration = Math.floor(rng.next() * 6) + 1;
        result.type = 'Rift';
        result.duration = riftDuration;
        console.log(`Processed spell 'adept-wand' with duration: ${riftDuration}`);

    } else if (spellType === 'orbs-of-illusion') {
        // Assume the server knows the total number of enemy and ally pieces
         const totalEnemyPieces = countPieces(gameSession, 'black'); // Assuming 'black' is the enemy color
        const totalAllyPieces = countPieces(gameSession, 'white');  // Assuming 'white' is the ally color


        const selectedEnemyIndices = selectRandomPawns(gameSession.board, 'black', Math.floor(rng.next() * 3) + 2);
        const selectedAllyIndices = selectRandomPawns(gameSession.board, 'white', Math.floor(rng.next() * 3) + 1);

        console.log('selectedAllyIndices', selectedAllyIndices, 'selectedenmyIndices', selectedEnemyIndices)
        const turnsPetrified = [...selectedEnemyIndices, ...selectedAllyIndices].map(() => Math.floor(rng.next() * 2) + 1);
        console.log('turnsPetrified', turnsPetrified)
        const turnsUntilDestruction = [...selectedEnemyIndices, ...selectedAllyIndices].map(() => Math.floor(rng.next() * 3) + 1);
        console.log('turnsUntilDestruction', turnsUntilDestruction);
        const allSelectedPieces = [...selectedEnemyIndices, ...selectedAllyIndices];
         console.log('allSelectedPieces', allSelectedPieces);

        const totalTurnsPetrified = result.turnsPetrified;
        const totalTurnsUntilDestruction = result.turnsUntilDestruction;
        console.log('totalTurnsPetrified', totalTurnsPetrified);
        console.log('totalTurnsUntilDestruction', totalTurnsUntilDestruction);
    
        applyPetrification(gameSession, allSelectedPieces, turnsPetrified, turnsUntilDestruction);
        result.type = 'Petrify';
        result.selectedEnemyIndices = selectedEnemyIndices;
        result.selectedAllyIndices = selectedAllyIndices;
        result.turnsPetrified = turnsPetrified;
        result.turnsUntilDestruction = turnsUntilDestruction;

        console.log(`Processed spell 'orbs-of-illusion' with selectedEnemyIndices:`, result.selectedEnemyIndices, 'selectedAllyIndices:', result.selectedAllyIndices, 'turnsPetrified:', result.turnsPetrified, 'turnsUntilDestruction:', result.turnsUntilDestruction);
    }
    console.log('result', result)
    return result;
}

function getPieceByIndex(gameSession, index, color) {
    const pieces = Object.entries(gameSession.board)
        .filter(([position, piece]) => piece.color === color)
        .map(([position, piece]) => ({ position, piece }));
    return pieces[index]?.piece || null;
}

function applyPetrification(gameSession, selectedIndices, turnsPetrified, turnsUntilDestruction) {
    selectedIndices.forEach((index, i) => {
        const piece = gameSession.board[index];
        if (piece) {
            console.log('Petrifying piece:', piece, 'with turnsPetrified:', turnsPetrified[i], 'and turnsUntilDestruction:', turnsUntilDestruction[i]);
            petrifyElement(piece, turnsPetrified[i], turnsUntilDestruction[i]);
        } else {
            console.error('Piece not found for index:', index);
        }
    });
}
function petrifyElement(piece, turnsPetrified, turnsUntilDestruction) {
    console.log('Petrifying piece:', piece, 'turnsPetrified:', turnsPetrified, 'turnsUntilDestruction:', turnsUntilDestruction);
    piece.isPetrified = true;
    piece.turnsPetrified = turnsPetrified;
    piece.turnsUntilDestruction = turnsUntilDestruction;
}

function createPetrifiTimer(element, turns) {
    console.log('createPetrifiTimer funcion entered', element, turns)
    const indicator = document.createElement('span');
    indicator.className = 'petrification-timer';
    indicator.textContent = turns; // Assign single value
    element.appendChild(indicator);
}
function selectRandomIndices(gameSession, arrayLength, numIndices) {
    console.log('selectRandomIndices function entered', gameSession, arrayLength, numIndices)

    const indices = Array.from({ length: arrayLength }, (_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
        const rng = gameSession.rng;
        const j = Math.floor(rng.next() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices.slice(0, numIndices);
}
function filterPawns(board, color) {
    console.log('filterPawns function entered with biard beingg:', board, 'color', color)

    const pawns = board.filter(piece => piece.color === color && piece.type === 'pawn');
    console.log('Filtered pawns:', pawns);
    return pawns;
}

function selectRandomPawns(board, color, numPawns) {
    console.log('selectRandomPawns function entered with board:', board, 'color:', color, 'numPawns:', numPawns);
    
    const pawns = filterPawns(board, color);

    if (numPawns > pawns.length) {
        numPawns = pawns.length; // Ensure we don't ask for more pawns than available
    }

    const shuffledPawns = pawns.sort(() => 0.5 - Math.random());
    console.log('Shuffled pawns:', shuffledPawns);

    const selectedPawns = shuffledPawns.slice(0, numPawns);
    console.log('Selected pawns:', selectedPawns);

    return selectedPawns.map(pawn => ({ type: 'pawn', color: color, row: pawn.row, col: pawn.col }));
}
function notifyPlayersOfMatch(matchPlayers, matchId, gameId) {
    console.log(`Notifying players of match: ${matchId}`);
    
    // Randomly decide who is white and black for demonstration purposes
    const whiteIndex = Math.floor(Math.random() * matchPlayers.length);
    const blackIndex = whiteIndex === 0 ? 1 : 0; // The other index

    matchPlayers.forEach((player, index) => {
        const color = index === whiteIndex ? 'white' : 'black';
        const isWhite = color === 'white';
        console.log(`Notifying player ${player.walletAddress} of color ${color}`);
        
        // Assuming player.socketId is where you store the socket ID
        const playerSocket = io.sockets.sockets.get(player.socketId);
        
        if (playerSocket) {
            playerSocket.emit('matchFound', {
                gameId: gameId,
                matchId: matchId,
                opponent: matchPlayers[blackIndex].walletAddress, // Send the opponent's wallet address
                color: color, // 'white' or 'black'
                yourTurn: isWhite, // White starts, so true for white, false for black
            });
        } else {
            console.log(`Socket ID for player ${player.walletAddress} is not found.`);
        }
    });
}

function switchTurns(gameSession) {
    // Switch turns between players
    gameSession.currentTurn = gameSession.currentTurn === 'black' ? 'white' : 'black';
    console.log(`Turn switched. It's now ${gameSession.currentTurn}'s turn.`);
}


function notifyTurnChange() {
    // Example implementation could involve finding the current game and its players
    // Then emitting a 'turn' event to each player with the updated turn information
    players.forEach(player => {
        io.to(player.socketId).emit('turn', { yourTurn: player.turn });
    });
}



function generateMatchId() {
    // Simple match ID generation - consider a more robust method for production
    return 'match-' + Date.now();
}
function generateUniqueId() {
    // Simple match ID generation - consider a more robust method for production
    return 'ID-' + Date.now();
}


function processChaosWarp(gameSession) {
    console.log(`processChaosWarp function entered with:`, gameSession);
    const { rng } = gameSession;
    const shuffleResult = [];
    const positions = Array.from({ length: 64 }, (_, index) => index);

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(rng.next() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    positions.forEach((newPosition, index) => {
        shuffleResult.push({ id: index, newPosition });
    });

    console.log('shuffleResult in processChaosWarp:', shuffleResult);
    return shuffleResult;
}
