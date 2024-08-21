import { SeededRNG } from './seedRng.js';
import { generateSeed } from './utility.js';

export const gameSessions = new Map();


 console.log('seededRNG', SeededRNG);
 let rng;
 // const rng = new SeededRNG(gameSeed);
 
export function generateUniqueId() {
    // Implementation to generate a unique ID for each game session
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getGameSession(gameId) {
    console.log('Attempting to retrieve game session with ID:', gameId);
    const session = gameSessions.get(gameId);
    console.log('session being in the gameSession file :', session);
    if (session) {
        console.log('Game session retrieved:', session);
    } else {
        console.log('No game session found for ID:', gameId);
    }
    return session;
}


export function createGameSession(playerIds, gameId) {
    // console.log('createGameSession function entered, with playerId being :', playerIds, '!  rng being:', rng, '!  gameId being :', gameId,'!');
    const gameSeed = generateSeed(playerIds);
    const rng = new SeededRNG(gameSeed);
     

    console.log("Initialized RNG with seed:", rng);
    const session = {
        gameId,
        players: playerIds,
        rng,
        board: initsServBoard()
        // additional session-related data
    };
    console.log('session value un createGameSession function', session);
    gameSessions.set(gameId, session);
    console.log('gameSessions value in createGameSession function', gameSessions);
    return session;
}

function initializeBoardData(boardElement) {
    const boardData = [];
    const pieces = boardElement.querySelectorAll('.chess-piece');
    pieces.forEach(pieceElement => {
        const [color, type] = pieceElement.className.split(' ').filter(cls => cls.includes('-')).map(cls => cls.split('-')[0]);
        const row = parseInt(pieceElement.style.gridRowStart, 10) - 1;
        const col = parseInt(pieceElement.style.gridColumnStart, 10) - 1;
        boardData.push({ type, color, row, col });
    });
    return boardData;
}
//FUNCTIONS NEEDED FOR UPDATING THE BOARDSTATE
            //   !!                 //
              //   !!          //
// gameSession.js
// export function initializeBoardData(boardElement) {
//     const boardData = [];
//     const pieces = boardElement.querySelectorAll('.chess-piece');
//     pieces.forEach(pieceElement => {
//         const [color, type] = pieceElement.className.split(' ').filter(cls => cls.includes('-')).map(cls => cls.split('-')[0]);
//         const row = parseInt(pieceElement.style.gridRowStart, 10) - 1;
//         const col = parseInt(pieceElement.style.gridColumnStart, 10) - 1;
//         boardData.push({ type, color, row, col });
//     });
//     return boardData;
// }

// export function getPieceByRowCol(board, row, col) {
//     return board.find(piece => piece.row === row && piece.col === col) || null;
// }

// export function movePiece(board, fromRow, fromCol, toRow, toCol) {
//     const piece = getPieceByRowCol(board, fromRow, fromCol);
//     if (piece) {
//         // Remove piece from old position
//         board = board.filter(p => p.row !== fromRow || p.col !== fromCol);

//         // Update piece's position
//         const updatedPiece = { ...piece, row: toRow, col: toCol };

//         // Add piece to new position
//         board.push(updatedPiece);

//         console.log('Moved piece:', updatedPiece, 'to new position:', toRow, toCol);
//     } else {
//         console.error('Piece not found at position:', fromRow, fromCol);
//     }
//     return board;
// }

// export function updateBoardDOM(board, boardElement) {
//     boardElement.innerHTML = ''; // Clear the board

//     board.forEach(piece => {
//         const pieceElement = document.createElement('div');
//         pieceElement.className = `chess-piece ${piece.color}-${piece.type}`;
//         pieceElement.style.backgroundImage = `url('img/${piece.color}-${piece.type}.png')`;
//         pieceElement.style.gridRowStart = piece.row + 1;
//         pieceElement.style.gridColumnStart = piece.col + 1;
//         boardElement.appendChild(pieceElement);
//     });
// }



//END OF SAID FUNCTIONS.// gameSession.js



export function movePiece(board, fromRow, fromCol, toRow, toCol) {
    const piece = getPieceByRowCol(board, fromRow, fromCol);
    if (piece) {
        // Remove piece from old position
        board = board.filter(p => p.row !== fromRow || p.col !== fromCol);

        // Update piece's position
        const updatedPiece = { ...piece, row: toRow, col: toCol };

        // Add piece to new position
        board.push(updatedPiece);

        console.log('Moved piece:', updatedPiece, 'to new position:', toRow, toCol);
    } else {
        console.error('Piece not found at position:', fromRow, fromCol);
    }
    return board;
}

export function updateBoardDOM(board, boardElement) {
    boardElement.innerHTML = ''; // Clear the board

    board.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.className = `chess-piece ${piece.color}-${piece.type}`;
        pieceElement.style.backgroundImage = `url('img/${piece.color}-${piece.type}.png')`;
        pieceElement.style.gridRowStart = piece.row + 1;
        pieceElement.style.gridColumnStart = piece.col + 1;
        boardElement.appendChild(pieceElement);
    });
}

function initsServBoard() {
    return [
        { type: 'rook', color: 'black', row: 7, col: 0 },
        { type: 'knight', color: 'black', row: 7, col: 1 },
        { type: 'bishop', color: 'black', row: 7, col: 2 },
        { type: 'queen', color: 'black', row: 7, col: 3 },
        { type: 'king', color: 'black', row: 7, col: 4 },
        { type: 'bishop', color: 'black', row: 7, col: 5 },
        { type: 'knight', color: 'black', row: 7, col: 6 },
        { type: 'rook', color: 'black', row: 7, col: 7 },
        { type: 'pawn', color: 'black', row: 6, col: 0 },
        { type: 'pawn', color: 'black', row: 6, col: 1 },
        { type: 'pawn', color: 'black', row: 6, col: 2 },
        { type: 'pawn', color: 'black', row: 6, col: 3 },
        { type: 'pawn', color: 'black', row: 6, col: 4 },
        { type: 'pawn', color: 'black', row: 6, col: 5 },
        { type: 'pawn', color: 'black', row: 6, col: 6 },
        { type: 'pawn', color: 'black', row: 6, col: 7 },
        { type: 'rook', color: 'white', row: 0, col: 0 },
        { type: 'knight', color: 'white', row: 0, col: 1 },
        { type: 'bishop', color: 'white', row: 0, col: 2 },
        { type: 'queen', color: 'white', row: 0, col: 3 },
        { type: 'king', color: 'white', row: 0, col: 4 },
        { type: 'bishop', color: 'white', row: 0, col: 5 },
        { type: 'knight', color: 'white', row: 0, col: 6 },
        { type: 'rook', color: 'white', row: 0, col: 7 },
        { type: 'pawn', color: 'white', row: 1, col: 0 },
        { type: 'pawn', color: 'white', row: 1, col: 1 },
        { type: 'pawn', color: 'white', row: 1, col: 2 },
        { type: 'pawn', color: 'white', row: 1, col: 3 },
        { type: 'pawn', color: 'white', row: 1, col: 4 },
        { type: 'pawn', color: 'white', row: 1, col: 5 },
        { type: 'pawn', color: 'white', row: 1, col: 6 },
        { type: 'pawn', color: 'white', row: 1, col: 7 },
    ];
}
