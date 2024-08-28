import { getGameSession } from './gameSessions.js'
import { SeededRNG } from './seedRng.js'


let clickedPiece;
let pieces;
let handleClick;
let isPawnPlacementActive = false;
let isSpecialMoveActive = false;
let internalBoard = Array(8).fill().map(() => Array(8).fill(null));
let isSpellActive = false;

async function initializeChessPieces(pieces, game, chessBoard) {
    // Assuming `pieces` is an array of piece configurations
  console.log("chessBoard in initializeChessPieces", chessBoard);
    pieces.forEach(config => {
        const chessPiece = new ChessPiece(config.type, config.color, config.row, config.col, config.imagePath, config.elementId, game, chessBoard);
        const squareElement = document.getElementById(chessPiece.elementId);

        

        // Attach event listener for piece interaction
        //chessPiece.element.addEventListener('click', () => chessPiece.handleClick(chessPiece, game));
    });
}



async function initialize() 
{

  const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js');
//   const { getGameSession } = await import('../gameSessions.js');

// ChessPiece.gameSession = getGameSession;


 const seededRNG = import('./seedRng.js');
 
 
 let rng;
 
  const chessArray = new ChessArray();
  const chessBoard = new ChessBoard();
 
  chessBoard.initializeBoard();

  chessBoard.populateBoardWithPieces();
  const game = new ChessGame(chessArray, chessBoard, this);
 ;
  // try {
  //   await
  // } catch (error) {
  //   console.error("Failed to initialize boaaard:", error);
  //   throw error;
  // }
  // this.boundHandleClick = this.handleClick.bind(this);

 const pieces = [

{ type: 'rook', color: 'black', row: 7, col: 0, imagePath: 'images/BlackROOK.png', elementId: 'square-7-0', game: game },
{ type: 'knight', color: 'black', row: 7, col: 1, imagePath: 'images/BlackKNIGHT.png', elementId: 'square-7-1', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 2, imagePath: 'images/BlackBISHOP.png', elementId: 'square-7-2', game: game },
{ type: 'queen', color: 'black', row: 7, col: 3, imagePath: 'images/BlackQUEEN.png', elementId: 'square-7-3', game: game },
{ type: 'king', color: 'black', row: 7, col: 4, imagePath: 'images/BlackKING.png', elementId: 'square-7-4', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 5, imagePath: 'images/BlackBISHOP.png', elementId: 'square-7-5', game: game },
{ type: 'knight', color: 'black', row: 7, col: 6, imagePath: 'images/BlackKNIGHT.png', elementId: 'square-7-6', game: game },
{ type: 'rook', color: 'black', row: 7, col: 7, imagePath: 'images/BlackROOK.png', elementId: 'square-7-7', game: game },
 
{ type: 'pawn', color: 'black', row: 6, col: 0, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-0', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 1, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-1', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 2, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-2', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 3, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-3', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 4, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-4', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 5, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-5', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 6, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-6', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 7, imagePath: 'images/BlackPAWN.png', elementId: 'square-6-7', game: game },

{ type: 'rook', color: 'white', row: 0, col: 0, imagePath: 'images/WhiteROOK.png', elementId: 'square-0-0', game: game },
{ type: 'knight', color: 'white', row: 0, col: 1, imagePath: 'images/WhiteKNIGHT.png', elementId: 'square-0-1', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 2, imagePath: 'images/WhiteBISHOP.png', elementId: 'square-0-2', game: game },
{ type: 'queen', color: 'white', row: 0, col: 3, imagePath: 'images/WhiteQUEEN.png', elementId: 'square-0-3', game: game },
{ type: 'king', color: 'white', row: 0, col: 4, imagePath: 'images/WhiteKING.png', elementId: 'square-0-4', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 5, imagePath: 'images/WhiteBISHOP.png', elementId: 'square-0-5', game: game },
{ type: 'knight', color: 'white', row: 0, col: 6, imagePath: 'images/WhiteKNIGHT.png', elementId: 'square-0-6', game: game },
{ type: 'rook', color: 'white', row: 0, col: 7, imagePath: 'images/WhiteROOK.png', elementId: 'square-0-7', game: game },

{ type: 'pawn', color: 'white', row: 1, col: 0, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-0', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 1, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-1', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 2, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-2', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 3, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-3', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 4, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-4', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 5, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-5', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 6, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-6', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 7, imagePath: 'images/WhitePAWN.png', elementId: 'square-1-7', game: game },
 
]

     initializeChessPieces(pieces, game, chessBoard);
    // hideModalOnInit();
 
for (const piece of pieces) 
{
    const chessPiece = new ChessPiece(piece.type, piece.color, piece.row, piece.col, piece.imagePath, piece.elementId, piece.game, chessBoard);
    const squareElement = document.getElementById(chessPiece.elementId);
    squareElement.innerHTML = `<div class="chess-piece ${chessPiece.color}-${chessPiece.type}"></div>`;
    squareElement.classList.add('has-piece');
    squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${chessPiece.imagePath})`;
    squareElement.style.gridRow = chessPiece.row + 1;
    squareElement.style.gridColumn = chessPiece.col + 1;
      game.board[piece.row][piece.col] = chessPiece;
    if (!squareElement.classList.contains('event-listener-attached')) {
        chessPiece.element.addEventListener('click', chessPiece.boundHandleClick);
        squareElement.classList.add('event-listener-attached');
        // piece.dataset.listenerAttached = 'true';
        console.log(`Event listener attached to: ${chessPiece.elementId}`);
    }


  }


// console.log(typeof ChessPiece);
  // console.log(ChessPiece);
  
console.log("Classes imported successfully");
    socket.on('turnChanged', (data) => {
    console.log('Received turnChanged event via socket. Data:', data);
    const event = new CustomEvent('turnChanged', { detail: data });
    window.dispatchEvent(event); // Dispatch the event to ensure the listener catches it
});
    window.addEventListener('turnChanged', (event) => {
    console.log('TurnChanged event received. Updating currentPlayer.', event.detail);
    if (window.chessGame && window.chessGame.instance) {
        window.chessGame.instance.currentPlayer = event.detail.currentPlayer;
    }
});
  
}
initialize().then(() => {
  // Get all chess squares
 
    console.log("Pieces have been initialized and instances have been created.");
});

// const game = {
//   board: []
// };
export default class ChessPiece {
  constructor(type, color, row, col, imagePath, elementId, game, chessBoard) {
    // debugger
    
   
   this.type = type;
    switch (type) {
  case "pawn":
    console.log("Pawn created");
    break;
  case "rook":
    console.log("Rook created");
    break;
  case "knight":
    console.log("Knight created");
    break;
  case "bishop":
    console.log("Bishop created");
    break;
  case "queen":
    console.log("Queen created");
    break;
  case "king":
    console.log("King created");
    break;
      //SPECIAL PAWN ACTIVATION//
  case "FirePawn":
    console.log("FirePawn created");
    break;
  case "WaterPawn":
    console.log("WaterPawn created");
    break;
  case "AirPawn":
    console.log("AirPawn created");
    break;
  case "LightPawn":
    console.log("LightPawn created");
    break;
  
  default:
    throw new Error("Invalid piece type");
}
this.initObserver();

this.validPiecesToResolveCheck = [];
this.wouldPutKingInCheck = this.wouldPutKingInCheck.bind(this);
       this.setupSocketListeners();
this.threateningPath = [];
    this.board = chessBoard;
    console.log("this.board in chessPiece constructor", this.board);
    //this.chessBoard = new ChessBoard();
    this.color = color;
    this.gameSession = ChessPiece.gameSession;
    console.log('Constructor color:', this.color);
    this.row = row;  
    this.col = col;
    this.imagePath = imagePath;
    const id = `square-${this.row}-${this.col}`;
    this.elementId = elementId || id;
    this.isChaosTheoryActive = false;
    this.hasMovedDueToRift = false;
    this.isPawnPlacementActive = false;
    this.isSpecialMoveActive = false;
    this.isSpellActive = false;
    this.pieceSwapped = true;
    this.riftSpellDuration = 0;
   
    // this.checkAndUpdateSpellEffects = this.checkAndUpdateSpellEffects.bind(this);
     this.setupMoveListener();
     // this.forceMove = this.forceMove.bind(this);
   
    this.activeSpells = [];
    this.game = game;
    // this.game.endTurn = this.game.endTurn.bind(this.game);
    this.selectedSquare = null;
    this.prevTarget = null;
    this.validMoves = [];
    this.selectedPiece = null;
    this.currentPlayer = this.game.currentPlayer;
    this.currentPlayerColor = this.currentPlayerColor;
    this.highlightedSquares = [];                               //FROST HIGHLIGHT
    this.boundHandleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);             //FROST SPELL HOVER
    this.boundHandleSelection = this.handleSelection.bind(this); //FROST SPELL CLIK
    this.castAdeptWandSpell = this.castAdeptWandSpell.bind(this);
    this.activeClickListeners = {};
    this.element = document.getElementById(this.elementId);
    this.capturedPieces = [];
    this.element.setAttribute('data-type', type);
    this.element.setAttribute('data-color', color);this.element.style.backgroundImage = `url('${imagePath}')`; // Set image
    this.executeMove = this.executeMove.bind(this);
    this.updateGameStateInMovePiece = this.updateGameStateInMovePiece.bind(this);
    this.castDigitzKingSpell = this.castDigitzKingSpell.bind(this);
    this.miniBoards = {
            topLeft: this.createEmptyMiniBoard(),
            topRight: this.createEmptyMiniBoard(),
            bottomLeft: this.createEmptyMiniBoard(),
            bottomRight: this.createEmptyMiniBoard()
        };

    //FINALSTAND SPELL BEGINNING
    this.isFinalStandActive = false;
    this.miniBoardArea = { x1: 4, y1: 4, x2: 7, y2: 7 }; // Example coordinates for a 4x4 area
       
    this.finalStandTurnCount = 0;
    this.finalStandScore = { white: 0, black: 0 };
    this.pointThreshold = 5;
    // FINALSTANDSPELL END
        
    //RANDOMSPELL
    this.isRealityShattered = false;
    this.spellDeck = ['staff-of-fire', 'staff-of-water', 'staff-of-air', 'staff-of-light', 'staff-of-earth', 'ice', 'novice-staff', 'iced-out', 'apprentice-wand', 'apprentice-staff', 'lightsaber', 'hourglass', 'staff-of-chaos', 'staff-of-the-necromancer', 'orbs-of-illusion', 'adept-wand', 'novice-staff', 'arcane-hands', 'spoon', 'excalibur', 'magician-wand', 'trident', 'reaper-scythe', 'rebel-sword', 'wooden-staff', 'broomstick', 'celestial-staff', 'cybermancer-staff', 'stick-of-the-forest', 'grand-master-staff', 'samba'];
    //RANDOMSPELL
    //RANDOM PAWN MOVE AKA WINDSPELL
    this.isWindOfChangeActive = false;
    this.movesLeftWithSpell = 0;
    this.directions = ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight'];
    this.currentDirection = 'forward'; // Default direction
    //END OF RANDOMPAWNMOVE AKA WINDSPEL
    this.isMiniGameActive = false;
    this.miniGameScore = 0;
    this.pointThreshold = 5;
    this.miniGameMoveCount = 0;

    this.towers = [];
    this.towerOfPowerActivated = false;

    this.chaosTheoryStartEvent = new Event('chaosTheoryStart');
    this.chaosTheoryEndEvent = new Event('chaosTheoryEnd');
    document.addEventListener('chaosTheoryStart', () => {
      this.isChaosTheoryActive = true;
    });

    document.addEventListener('chaosTheoryEnd', () => {
        this.isChaosTheoryActive = false;
    });


     if (!this.element.classList.contains('event-listener-attached')) {
        this.element.addEventListener('click', this.boundHandleClick, { once: true });
        this.element.dataset.listenerAttached = 'true';
        
        console.log('Adding event listener to:', this.element);
    } else {
        console.error(`Event listener already attached to: ${this.element}`);
    }

      
   
window.addEventListener('updateValidPiecesToResolveCheck', (event) => {
    console.log('Received valid pieces to resolve check:', event.detail);
    this.validPiecesToResolveCheck = event.detail.validPiecesToResolveCheck; // Assign only the array
    this.threateningPath = event.detail.threateningPath; // Assign the threatening path separately
});

window.addEventListener('resetValidPiecesToResolveCheck', () => {
    console.log('Resetting validPiecesToResolveCheck array.');
    this.validPiecesToResolveCheck = [];
    this.threateningPath = [];
});

}
// funtion to listen to moves made to reproduce them.
      static isWindOfChangeActive = false;
setupMoveListener() {
  console.log('setupMoveListener function entered');
        document.addEventListener('moveReceived', (e) => {
          console.log('move received trying to call applymove function');
            const { piece, from, to } = e.detail; // Destructure the move details
            this.applyMove(from, to);
        });
    }
    applyMove(from, to) {
      console.log('applyMove function entered in classPiece from being :', from, "to being:", to)
        // Assuming you have a way to map 'from' and 'to' to pieces and their new positions
        // and that ClassPiece instances are managed or accessible here
        const piece = this.getPosition(from);
        if (piece) {
            this.forceMove(to);
            // this.forceMove(piece, fromRow, fromCol, toRow, toCol, isRiftMove = false) {
            // Additional logic to update the UI based on the move
        }
    }
// showNotification(spellName, spellDuration, description, callback) {
//   console.log('spellDuration in showNotification function', spellDuration);
//     const gameUI = document.getElementById('game-ui');
//     if (!gameUI) {
//         console.error('Game UI container not found');
//         return;
//     }

//     const spellNameId = spellName.toLowerCase().replace(/\s+/g, '-'); // Ensure ID is valid HTML ID
//     const notificationBox = document.createElement('div');
//     notificationBox.className = 'notification-box';
//     notificationBox.id = `${spellNameId}-notification`;
//     notificationBox.innerHTML = `<p><strong>${spellName}</strong>: ${description} (<span id="${spellNameId}-turns-left">${spellDuration}</span> turns left)</p>`;
//     gameUI.appendChild(notificationBox);
//     console.log(`Notification added for ${spellName} with ID ${notificationBox.id}`);
// if (callback) {
//         callback(); // Call updateNotification only after the notification has been added
//     }
// }
// updateNotification(spellName, turnsLeft, description) {
//     const spellNameId = spellName.toLowerCase().replace(/\s+/g, '-'); // Match the ID formatting used in showNotification
//     const notificationElement = document.getElementById(`${spellNameId}-notification`);
//     if (!notificationElement) {
//         console.error('Notification for this spell not found:', spellNameId);
//         return;
//     }

//     const turnsLeftElement = document.getElementById(`${spellNameId}-turns-left`);
//     if (turnsLeftElement) {
//         turnsLeftElement.textContent = `${turnsLeft} turns left`;
//         console.log(`Updated ${spellName} to ${turnsLeft} turns left.`);
//         if (turnsLeft <= 0) {
//             notificationElement.remove();
//             console.log(`${spellName} notification removed as the spell has ended.`);
//         }
//     } else {
//         console.error('Turns left element not found for', spellNameId);
//     }
// }

  showNotification(spellName, spellResult, rng, data) {
    // Fetch spell details using the globally defined function
    const spellDetails = window.spellDetail(spellName, spellResult, rng, data);

    if (!spellDetails) {
        console.error("Failed to retrieve spell details for:", spellName);
        return;  // Exit if no spell details are found
    }

    const gameUI = document.getElementById('game-ui');
    if (!gameUI) {
        console.error("Game UI not found");
        return;
    }

    const spellNameId = spellName.toLowerCase().replace(/\s+/g, '-');
    const notificationBox = document.createElement('div');
    notificationBox.className = 'notification-box';
    notificationBox.id = `${spellNameId}-notification`;
    notificationBox.innerHTML = `<p><strong>${spellName}</strong>: ${spellDetails.description} (${spellDetails.duration} turns left)</p>`;
    gameUI.appendChild(notificationBox);
}
 updateNotification(spellName, turnsLeft) {
    const spellNameId = spellName.toLowerCase().replace(/\s+/g, '-');
    const notificationElement = document.getElementById(`${spellNameId}-notification`);
    const turnsLeftElement = document.getElementById(`${spellNameId}-turns-left`);
    if (turnsLeftElement && notificationElement) {
        turnsLeftElement.textContent = `${turnsLeft} turns left`;
        if (turnsLeft <= 0) {
            notificationElement.remove();
        }
    }
}

 removeNotification(spellName) {
    const spellNameId = spellName.toLowerCase().replace(/\s+/g, '-');
    const notificationElement = document.getElementById(`${spellNameId}-notification`);
    if (notificationElement) {
        notificationElement.remove();
    }
}
    createChessPieces() {
    const elements = {
        pawnElement: document.createElement('div'),
        rookElement: document.createElement('div'),
        knightElement: document.createElement('div'),
        bishopElement: document.createElement('div'),
        queenElement: document.createElement('div'),
        kingElement: document.createElement('div'),
    };

    const chessPieces = {
        whitePawns: [],
        blackPawns: [],
        whiteRooks: [],
        blackRooks: [],
        whiteKnights: [],
        blackKnights: [],
        whiteBishops: [],
        blackBishops: [],
        whiteQueen: [],
        blackQueen: [],
        whiteKing: [],
        blackKing: [],
    };

      // create white pawns
    for (let col = 0; col < 8; col++) {
        const pawn1 = new ChessPiece('pawn', 'white', 1, col, './images/whitePAWN.png', `pawn_1_${col}`, this);
        chessPieces.whitePawns.push(pawn1);
        this.addChessPiece('pawn', 'white', 1, col, './images/whitePAWN.png', `pawn_1_${col}`, this);
   
        console.log("White pawn added to board");
      }

      // create black pawns
    for (let col = 0; col < 8; col++) {
        const pawn6 = new ChessPiece('pawn', 'black', 6, col, './images/blackPAWN.png', `pawn_6_${col}`, this);
        chessPieces.blackPawns.push(pawn6);
        this.addChessPiece(pawn6);
    }

      // create white rooks
    const rook1 = new ChessPiece('rook', 'white', 0, 0, './images/whiteROOK.png', 'rook_0_0', this.game);
    const rook2 = new ChessPiece('rook', 'white', 0, 7, './images/whiteROOK.png', 'rook_0_7', this);
    chessPieces.whiteRooks.push(rook1, rook2);
    this.addChessPiece(rook1, rook2);
   

      // create black rooks
    const rook3 = new ChessPiece('rook', 'black', 7, 0, './images/blackROOK.png', 'rook_7_0', this);
    const rook4 = new ChessPiece('rook', 'black', 7, 7, './images/blackROOK.png', 'rook_7_7', this);
    chessPieces.blackRooks.push(rook3, rook4);
    this.addChessPiece(rook3, rook4);
   
      // create white knights
    const knight1 = new ChessPiece('knight', 'white', 0, 1, './images/whiteKNIGHT.png', 'knight_0_1', this);
    const knight2 = new ChessPiece('knight', 'white', 0, 6, './images/whiteKNIGHT.png', 'knight_0_6', this);
    chessPieces.whiteKnights.push(knight1, knight2);
    this.addChessPiece(knight1, knight2);
    

      // create black knights
    const knight3 = new ChessPiece('knight', 'black', 7, 1, './images/blackKNIGHT.png', 'knight_7_1', this);
    const knight4 = new ChessPiece('knight', 'black', 7, 6, './images/blackKNIGHT.png', 'knight_7_6', this);
    chessPieces.blackKnights.push(knight3, knight4);
    this.addChessPiece(knight3, knight4);
    

      // create black bishops
    const bishop2 = new ChessPiece('bishop', 'black', 7, 2, './images/blackBishop.png', 'bishop_7_2', this);
    const bishop3 = new ChessPiece('bishop', 'black', 7, 5, './images/blackBishop.png', 'bishop_7_5', this);
    chessPieces.blackBishops.push(bishop2, bishop3);
    this.addChessPiece(bishop2, bishop3);
    

      // create white bishops
    const bishop1 = new ChessPiece('bishop', 'white', 0, 2, './images/whiteBISHOP.png', 'bishop_0_2', this);
    const bishop4 = new ChessPiece('bishop', 'white', 0, 5, './images/whiteBISHOP.png', 'bishop_0_5', this);
    chessPieces.whiteBishops.push(bishop1, bishop4);
    this.addChessPiece(bishop1, bishop4);
    

      // create black queen
    const queen2 = new ChessPiece('queen', 'black', 7, 3, './testNewImages/BlackQUeenRevisited.png', 'queen_7_3', this);
    chessPieces.blackQueen.push(queen2);
    this.addChessPiece(queen2);

      // create black king
    const king2 = new ChessPiece('king', 'black', 7, 4, './images/blackKING.png', 'king_7_4', this);
    chessPieces.blackKing.push(king2);
    this.addChessPiece(king2);

      // create white queen
    const queen1 = new ChessPiece('queen', 'white', 0, 3, './images/whiteQUEEN.png', 'queen_0_3', this);
    chessPieces.whiteQueen.push(queen1);
    this.addChessPiece(queen1);

      // create white king
    const king1 = new ChessPiece('king', 'white', 0, 4, './images/whiteKING.png', 'king_0_4', this);
    chessPieces.whiteKing.push(king1);
    this.addChessPiece(king1);

}

initSquares(board, game) {
  // Debug Log
  console.log("Initial board argument:", JSON.stringify(board, null, 2));
  console.log("Initial game argument:", JSON.stringify(game, null, 2));

//   // Initialize an empty squares array
//   this.squares = [];

  // Loop through the board argument
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = board[row][col];
      // Debug Log
      console.log(`Processing square at row: ${row}, col: ${col}, value: ${square}`);

      if (square) {
        this.squares.push(square);
        game.board[row][col] = square.querySelector('.chess-piece');
      } else {
        game.board[row][col] = null;
      }
    }
  }

//   // Debug Log
  console.log("Final state of this.squares:", JSON.stringify(this.squares, null, 2));
  console.log("Final state of game.board:", JSON.stringify(game.board, null, 2));
 }
 isSpellActive() {
  // Add your logic here to determine if a spell is active
  return this.isSpellActive;
}

handleBoardClick(event) {
    const clickedElement = event.target;
    const isPiece = clickedElement.classList.contains('chess-piece');
    const square = isPiece ? clickedElement.closest('.chess-square') : clickedElement;

    if (isPiece) {
        // Logic for selecting a piece
        selectPiece(clickedElement);
    } else if (square.classList.contains('chess-square')) {
        // Logic for moving a selected piece or capturing
        moveToSquare(square);
    }
}

 selectPiece(piece) {
    // Deselect any currently selected piece
    const currentlySelected = document.querySelector('.selected');
    if (currentlySelected) {
        currentlySelected.classList.remove('selected');
    }

    // Select the new piece
    piece.classList.add('selected');

    // Possibly show valid moves here
}

 moveToSquare(square) {
    const selectedPiece = document.querySelector('.selected');

    // Check if a piece is selected and the move is valid
    if (selectedPiece && isValidMove(selectedPiece, square)) {
        // Move the piece (assuming you have a function to move pieces)
        movePiece(selectedPiece, square);
        // Deselect the piece after moving
        selectedPiece.classList.remove('selected');
    }
}
 showAlert(message) {
  console.log('showAlrt function entered, message being :', message)
    const alertBox = document.getElementById('game-message');
    alertBox.textContent = message;
    alertBox.classList.add('show');

    // Hide the alert after 2 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000);
}

static resetCheckArray() {
    console.log('resetCheckArray function entered.');
    const resetEvent = new CustomEvent('resetValidPiecesToResolveCheck');
    window.dispatchEvent(resetEvent);
}
    calculateValidMovesForPieceOnBoard(piece, board, currentRow, currentCol) {
        console.log('board in calculatemoveforpeiceonboard', board);
    console.log(`calculateValidMovesForPieceOnBoard entered for ${piece.type} at (${currentRow}, ${currentCol}) on the given board`);
    const validMoves = [];

    switch (piece.type) {
        case 'pawn':
            // Pawns move forward but capture diagonally
            const direction = piece.color === 'white' ? -1 : 1; // White pawns move up, black pawns move down
            if (this.isInBounds(currentRow + direction, currentCol) && !board[currentRow + direction][currentCol]) {
                validMoves.push({ row: currentRow + direction, col: currentCol }); // Move forward
            }
            // Capture diagonally
            if (this.isInBounds(currentRow + direction, currentCol - 1) && board[currentRow + direction][currentCol - 1]?.color !== piece.color) {
                validMoves.push({ row: currentRow + direction, col: currentCol - 1 });
            }
            if (this.isInBounds(currentRow + direction, currentCol + 1) && board[currentRow + direction][currentCol + 1]?.color !== piece.color) {
                validMoves.push({ row: currentRow + direction, col: currentCol + 1 });
            }
            break;

        case 'rook':
            // Rooks move horizontally or vertically
            this.addLinearMoves(validMoves, board, currentRow, currentCol, piece.color, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
            break;

        case 'bishop':
            // Bishops move diagonally
            this.addLinearMoves(validMoves, board, currentRow, currentCol, piece.color, [[1, 1], [-1, -1], [1, -1], [-1, 1]]);
            break;

        case 'queen':
            // Queens combine the movement of rooks and bishops
            this.addLinearMoves(validMoves, board, currentRow, currentCol, piece.color, 
                [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]);
            break;

        case 'knight':
            // Knights move in an L-shape
            const knightMoves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            for (const [dRow, dCol] of knightMoves) {
                const newRow = currentRow + dRow;
                const newCol = currentCol + dCol;
                if (this.isInBounds(newRow, newCol) && (!board[newRow][newCol] || board[newRow][newCol].color !== piece.color)) {
                    validMoves.push({ row: newRow, col: newCol });
                }
            }
            break;

        case 'king':
            // Kings move one square in any direction
            const kingMoves = [
                [1, 0], [-1, 0], [0, 1], [0, -1],
                [1, 1], [-1, -1], [1, -1], [-1, 1]
            ];
            for (const [dRow, dCol] of kingMoves) {
                const newRow = currentRow + dRow;
                const newCol = currentCol + dCol;
                if (this.isInBounds(newRow, newCol) && (!board[newRow][newCol] || board[newRow][newCol].color !== piece.color)) {
                    validMoves.push({ row: newRow, col: newCol });
                }
            }
            break;

        default:
            console.error('Unknown piece type:', piece.type);
            break;
    }

    return validMoves;
}

addLinearMoves(validMoves, board, startRow, startCol, color, directions) {
    for (const [dRow, dCol] of directions) {
        let newRow = startRow + dRow;
        let newCol = startCol + dCol;
        while (this.isInBounds(newRow, newCol)) {
            if (board[newRow][newCol]) {
                if (board[newRow][newCol].color !== color) {
                    validMoves.push({ row: newRow, col: newCol }); // Capture
                }
                break; // Stop at the first piece encountered
            }
            validMoves.push({ row: newRow, col: newCol });
            newRow += dRow;
            newCol += dCol;
        }
    }
}

isInBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}
   wouldPutKingInCheck(move) {
    console.log('wouldPutKingInCheck function entered, move being:', move);

    // Clone the current board state to simulate the move
    const simulatedBoard = this.cloneBoard(this.game.board);

    // Perform the move on the simulated board
    this.movePieceFR(simulatedBoard, move.from.row, move.from.col, move.to.row, move.to.col);

    // Find the position of the player's king after the move
    const currentTurnColor = move.piece.color;
    const kingPosition = this.findKingPosition(simulatedBoard, currentTurnColor);

    // Check if the opponent can attack the king's position immediately
    if (this.isKingInImmediateCheck(simulatedBoard, kingPosition, currentTurnColor)) {
        console.log('Move would put the king in check, reverting the move.');
        return true; // Move would put the king in check
    }

    return false; // Move does not put the king in check
}


   clonePiece(piece) {
    return {
        type: piece.type,
        color: piece.color,
        // Add other properties as needed, but avoid any circular references
        // For example, if your piece has additional properties like 'hasMoved' or 'id', copy those as well
        hasMoved: piece.hasMoved || false,  // Example additional property
        id: piece.id  // Example unique identifier for the piece
        // Ensure you do not include properties that cause circular references
    };
}

// Function to clone the entire board
cloneBoard(board) {
    return board.map(row => 
        row.map(piece => piece ? this.clonePiece(piece) : null)
    );
}
isKingInImmediateCheck(board, kingPosition, playerColor) {
    console.log('isKingInImmediateCheck function entered, board being:', board, 'kingPosition being:', kingPosition, 'playerColor being:', playerColor);

    // Check if any opponent piece can immediately attack the king's position
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const piece = board[row][col];
            if (piece && piece.color !== playerColor) {
                const validMoves = this.calculateValidMovesForPieceOnBoard(piece, board, row, col);
                for (const validMove of validMoves) {
                    if (validMove.row === kingPosition.row && validMove.col === kingPosition.col) {
                        return true; // King is in check
                    }
                }
            }
        }
    }
    return false; // King is not in check
}

    // Assumes `movePiece` is a method that updates the board with the new move
    movePieceFR(board, fromRow, fromCol, toRow, toCol) {
    console.log('movePieceFR entered, board being', board, 'fromRow', fromRow, 'fromCol', fromCol, 'toRow', toRow, 'toCol', toCol);

    // Check if the fromRow and fromCol are within the board's boundaries
    if (fromRow < 0 || fromRow >= board.length || fromCol < 0 || fromCol >= board.length) {
        console.error('Invalid fromRow or fromCol values. They are out of bounds.');
        return;
    }

    const piece = board[fromRow][fromCol];

    // Check if the piece exists
    if (!piece) {
        console.error(`No piece found at position (${fromRow}, ${fromCol}).`);
        return;
    }

    // Update the piece's row and column
    piece.row = toRow;
    piece.col = toCol;

    // Move the piece to the new position on the board
    board[toRow][toCol] = piece;

    // Clear the old position
    board[fromRow][fromCol] = null;

    console.log('Move successful. Updated board:', board);
}

    calculateValidMovesForPiece(piece, board, currentRow, currentCol) {
    console.log('calculateValidMovesForPiece function entered for the alliedKINGINCHECK, piece being', piece, 'this.game', this.game);
    return this.calculateValidMoves(currentRow, currentCol, board, piece.type, piece.color, this.game);
}
    findKingPosition(board, playerColor) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'king' && piece.color === playerColor) {
                return { row, col };
            }
        }
    }
    console.error("King not found on the board!");
    return null;
}
handleClick = (event, chessBoard, game) => {

   const currentPlayer = window.chessGame.instance.currentPlayer;
  const previouslySelectedPieces = document.querySelectorAll('.chess-piece.selected-piece');
  previouslySelectedPieces.forEach(piece => {
    piece.removeEventListener('click', this.handleClick); // Prevent potential duplicates
    piece.addEventListener('click', this.handleClick);
});
  // const chainId = 'stargaze-1';
  // await window.keplr.enable(chainId);
  // const offlineSigner = window.getOfflineSigner(chainId);
  // const accounts = await offlineSigner.getAccounts();
  // const currentUserAddress = accounts[0].address;
  // if (!game.isPlayersTurn(currentUserAddress))
  // {
  //   console.log("It's not your turn!!!");
  //   return;
  // }
  const clickedSquareElement = event.target.closest('.chess-square');
    if (!clickedSquareElement) return;
    const clickedPieceElement = clickedSquareElement.querySelector('.chess-piece');
    if (!clickedPieceElement) return;
    console.log('window', window);
    console.log('window.chessGame', window.chessGame);
    console.log('window.chessGame.instance', window.chessGame.instance);
  console.log('myTurn', myTurn, 'currentPlayerColor',  currentPlayer, 'clickedPieceElement COLOR', clickedSquareElement.getAttribute('data-color'));
  if (!myTurn || clickedSquareElement.getAttribute('data-color') !==  currentPlayer) {
    this.showAlert("Wrong Turn. Wait a bit for the opponent to finish.");
    setTimeout(() => {
            clickedSquareElement.classList.add('shake-red');
            
        }, 500);
    
        console.log("Not your turn!");
    clickedPieceElement.addEventListener('click', (event) => {
    console.log('Click listener triggered for piece:', clickedPieceElement);
    this.handleClick(event, chessBoard, game);
}, { once: true });
        return;
    }
    
    // console.log('this.game.board in handleclick before syncBoardState', this.game.game.board);  
    console.log('this.game.board in handleclick before syncBoardState', this.game.board); 
     this.game.syncBoardState();
    // console.log('this.game.game.board in handleclick after syncBoardState', this.game.game.board);
    // console.log('this.game.board in handleclick after syncBoardState', this.game.board);  
      console.log("Active Spells in handleclick:", this.activeSpells);
  
    // code for check situation
    const pieceRow = parseInt(clickedSquareElement.getAttribute('data-row'), 10);
    const pieceCol = parseInt(clickedSquareElement.getAttribute('data-col'), 10);

    // Log the current state
    console.log("this.validPiecesToResolveCheck", this.validPiecesToResolveCheck);
    console.log('pieceRow', pieceRow, 'pieceCol', pieceCol);

    if (this.validPiecesToResolveCheck.length > 0) {
        // Check each valid piece
        const isValidPiece = this.validPiecesToResolveCheck.some(validPiece => {
            const rowMatch = validPiece.row === pieceRow;
            const colMatch = validPiece.col === pieceCol;
            console.log(`Checking valid piece at row ${validPiece.row}, col ${validPiece.col}: Row match = ${rowMatch}, Col match = ${colMatch}`);
            return rowMatch && colMatch;
        });
        console.log('isValidPiece for the check', isValidPiece);
        if (!isValidPiece) {
          this.showAlert("King is in check and this piece cannot resolve it.");
          clickedSquareElement.classList.add('shake-red');
          
            console.log("This piece cannot resolve the check, so it's not selectable.");
            return;
        }
    }

    const playerColor = myTurn ? 'white' : 'black';
    console.log('currentPlayerColor', playerColor);
    if (this.isSpecialMoveActive || this.isSpellActive) return;


    const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
    
    console.log('trying to select piece : ', clickedPiece);
      console.log('this.type', this.type);
      const thistype = this.type;
      const thiscolor = this.color;
      console.log('check before selecting piece thistype being ', thistype, 'this.color being', thiscolor, 'playerColor', playerColor);
      const isAlliedPiece = clickedPieceElement.classList.contains(`${thiscolor}-${thistype}`); // Extend this check as needed
      const isSelected = clickedPieceElement.classList.contains('selected-piece');
      const pieceType = clickedSquareElement.getAttribute('data-type');
      console.log('isAlliedPiece', isAlliedPiece, 'isSelected', isSelected);
      if (isAlliedPiece && !isSelected) 
      {
        console.log('piece is allied, not selected and of the correct color, trying to selectit.')
        // Clear any existing selections among allied pieces, irrespective of type
        console.log('currentPlayerColor', thiscolor, 'thistype', thistype);
    
        // This selector aims to match any selected piece of the current player, regardless of its type
        const alliedSelectedPieces = document.querySelectorAll(`.${thiscolor}-pawn.selected-piece, .${thiscolor}-knight.selected-piece, .${thiscolor}-bishop.selected-piece, .${thiscolor}-rook.selected-piece, .${thiscolor}-queen.selected-piece, .${thiscolor}-king.selected-piece`);
        console.log("alliedSelectedPieces", alliedSelectedPieces);
    
        alliedSelectedPieces.forEach(piece => piece.classList.remove('selected-piece'));
        console.log('clickedPieceElement value before trying to addd selectedPiece to it.', clickedPieceElement);
    // Then, select the clicked allied piece
        clickedPieceElement.classList.add('selected-piece');
      }

    


// Then proceed to select the new piece
this.selectedPiece = clickedPiece;
    


    //forbid frozen piece to move
    if (clickedPieceElement.classList.contains('frozen-piece') || clickedSquareElement.classList.contains('frozen-square')) {
        console.log('This piece is frozen and cannot move.');
        return; // Exit the function, preventing selection/movement
    }

    // Allow capturing enemy pieces if a piece is already selected
    // console.log('check for values before trying to capture, this.selectedPiece', this.currentlySelectedPiece, 'clickedPiece', clickedPiece, 'clickedPiece.color', clickedPiece.color);
   
    console.log('this.selectedPiece', this.selectedPiece, 'this.clickedPieceElement', this.clickedPieceElement);
    if (this.selectedPiece && clickedPieceElement && clickedPieceElement.color === (thiscolor ? 'black' : 'white')){
        if (clickedSquareElement.classList.contains('valid-move')) {
            // It's a valid capture, proceed with the move
          console.log('CHECK FOR MOVEMADE ')
            this.executeMove(game.board, clickedSquareElement, chessBoard);
            return;
        } else {
            // Invalid move, not a capture
            alert("Invalid move!");
            this.deselectAndClear();
           
              // this.refreshPieceEventListeners(true);
            return;
        }
    }

   

    // // Handle Deselection
    // if (this.selectedPiece) {
    //   console.log('trying to call shouldDeselect in handleClick function');
    //     if (this.shouldDeselect(clickedPiece, clickedSquareElement, clickedPieceElement)) {
    //         this.deselectAndClear();
    //         return;
    //     }
    // }

    // If a valid move is selected, execute the move
    console.log('this.selectedPiece before the check for cancelling autocheck by allied movemet ', this.selectedPiece, 'clickedSquareElement', clickedSquareElement, 'clickedPiecceElement', clickedPieceElement);
    if (this.selectedPiece && clickedSquareElement.classList.contains('valid-move')) {
      console.log("trying to executeMove fnution in handlelick:");
      console.log("clickedSquareElement passed :", clickedSquareElement);
        

        this.executeMove(game.board, clickedSquareElement, chessBoard);
        
        console.log('selectedElement.row', selectedElement.row);
          const chessPiece = this.getPiece(selectedElement.row, selectedElement.col);
          console.log('chessPiece right after executeMovecalled in movepiece.');
          // Check and handle the rift after executing the move
            if (chessPiece) {
              console.log("trying to call postMoveActions");
               // Call postMoveActions on the ChessPiece instance
            chessPiece.postMoveActions(targetCoords);
        } else {
            console.error("ChessPiece instance not found for the selected element.");
        }
            
            console.log('this context in removePiece before calling updateGameStateInMovePiece', this);
            this.updateGameStateInMovePiece(targetSquare, destinationElement, game);
            return;
    }

    // Handle New Selection
    if (clickedPiece) {
      console.log('handling new selection');
        this.selectNewPiece(clickedPiece, clickedPieceElement, chessBoard, game);
       
         // this.refreshPieceEventListeners(true);
    } else {
        this.deselectAndClear();
        // this.refreshPieceEventListeners(true);
    }
};
// attachEventListenersToAllPieces() {
//   document.querySelectorAll('.chess-piece').forEach(piece => {
//     // Check if the event listener class is already attached
//     const square = piece.parentNode;
//     if (!square.classList.contains('event-listener-attached')) {
//         piece.addEventListener('click', this.boundHandleClick);
//         // Add the class to mark the listener as attached
//         square.classList.add('event-listener-attached');
//     }
// });
// }

 // Helper function to check if the piece should be deselected
 shouldDeselect(clickedPiece, clickedSquareElement, clickedPieceElement) 
 {
  console.log('shouldDeselect function entenred');
  const isSamePiece = this.selectedPiece.element === clickedPieceElement;
  const isSameColor = clickedPiece && clickedPiece.color === this.selectedPiece.color;
  const isInvalidMove = !clickedSquareElement.classList.contains('valid-move');
  return isSamePiece || isSameColor || isInvalidMove;
}
syncBoardState = () => {
    console.log("Synchronizing board state...");

    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => {
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);
        const pieceElement = square.querySelector('.chess-piece');

        if (pieceElement) {
            const parent = pieceElement.parentNode;
            const type = parent.getAttribute('data-type');
             // col = parent.getAttribute('data-col');
             // row = parent.getAttribute('data-row');
            const color = parent.getAttribute('data-color');
            // Assuming you have a constructor or factory method for ChessPiece
            this.game.game.board[row][col] = new ChessPiece(type, color, row, col, this.imagePath, this.elementId, this.game, this.game.board);
            // or if you have existing instances, find and reference them
        } else {
            this.game.game.board[row][col] = null;
        }
    });

    console.log("this.game.board state synchronized:", this.game.board);
};

// Helper function to extract piece info based on your piece element structure
extractPieceInfo(pieceElement) {
    // Modify this logic based on how your piece's color and type are represented
    // For example, if you use class names like 'white-king', 'black-pawn', etc.
    const classNames = pieceElement.className.split(' ');
    const pieceClass = classNames.find(cls => cls.includes('-'));
    if (pieceClass) {
        return pieceClass.split('-');
    }
    return [null, null];
}


// deselectAndClear() {
//   console.log('deselectAndClear function entered selectedPiece elemnt being :', this.selectedPiece);
//   if (this.selectedPiece) {
//     console.log('trying to deselectAndClear :', this.selectedPiece);
//     this.selectedPiece.classList.remove('selected-piece');
//   }
//   this.clearValidMoves();
//   this.selectedPiece = null;
// }

deselectAndClear() {
   debugger;
    console.log('deselectAndClear function entered, selectedPiece being:', this.selectedPiece);
    if (this.selectedPiece) {
        // Check if this.selectedPiece is an object with an .element property
        if (this.selectedPiece.element && this.selectedPiece.element.classList) {
            console.log('Deselecting piece with element property:', this.selectedPiece);
            this.selectedPiece.element.classList.remove('selected-piece');
        } else if (this.selectedPiece.classList) {
            // Assume this.selectedPiece is directly the DOM element
            console.log('Deselecting piece directly:', this.selectedPiece);
            this.selectedPiece.classList.remove('selected-piece');
        } else {
            console.log('selectedPiece does not have a classList to modify:', this.selectedPiece);
        }
        this.clearValidMoves();
        //this.selectedPiece = null;
    }
}

initChessBoard() {
  console.log('initChessBoard function called');
    const board = document.querySelector('.chess-board'); // Adjust this selector to match your board's container
    board.addEventListener('click', this.handleBoardClick.bind(this));
}

executeMove(board, clickedSquareElement, chessBoard, activeSpells) {
    debugger;
    
  const oldPiece = document.querySelector(".selected-piece");
  const oldSquare = oldPiece.parentNode;
  const oldType = oldSquare.getAttribute('data-type');
  const oldColor = oldSquare.getAttribute('data-color');
 
  console.log(`oldPiece`, oldPiece);

  console.log(`Chaos Theory activated for ${this.chaosTheoryTurnsLeft} turns.`);
  if (this.hasMovedDueToRift) 
  {
    console.log('Piece already moved by rift effect, skipping normal move logic.');
    // Reset the flag
    this.hasMovedDueToRift = false;

    // Exit early as the piece has already been moved
    return;
  }


  if (oldPiece.classList.contains('petrified')) {
    
        this.clearPetrification(oldPiece);

        // 70% chance to transfer petrification
       
          console.log("attempt to propagate petrification for oldColor :", oldColor);
            this.attemptToTransferPetrification(oldColor);
        
    }

    // Update petrification status for all pieces
    this.updatePetrifiedPieces();

  

  // clickedSquareElement = document.querySelector(`.valid-move`);
  const clickedRow = parseInt(clickedSquareElement.getAttribute('data-row'), 10);
  const clickedCol = parseInt(clickedSquareElement.getAttribute('data-col'), 10);

  const oldRow = parseInt(oldSquare.getAttribute('data-row'), 10);
  const oldCol = parseInt(oldSquare.getAttribute('data-col'), 10);
  console.log('OLD ROW IN EECUTEMOVE', oldRow, 'OLD COL N EECUTEMOVE', oldCol);

  const newRow = parseInt(clickedSquareElement.getAttribute('data-row'), 10);
  const newCol = parseInt(clickedSquareElement.getAttribute('data-col'), 10);
  const destinationElement = document.getElementById(`square-${newRow}-${newCol}`);
  const destinationSquare = this.game.game.board[newRow][newCol];
  console.log('destinationElement', destinationElement);

  //TRYING TO SEND MOVE TO THE SERVER//
// Convert numeric row and column into chess board coordinates (e.g., 2, 4 -> "e2")
function toChessNotation(row, col) {

    // Assuming col is 0-based and corresponds to a-h, and row is 1-based
    const letter = String.fromCharCode('a'.charCodeAt(0) + col); // Convert column to letter
    return letter + row.toString(); // Combine with row
}

function isCapture(board, newRow, newCol, playerColor) {

   
  // console.log('isCapture function entered this.game.game.board being ::', this.game.game.board, 'newRow', newRow, 'newCol', newCol, '^playerColor', playerColor);
    const targetPiece = board[newRow][newCol];
    return targetPiece && targetPiece.color !== playerColor;
}
const fromPosition = toChessNotation(oldRow, oldCol);
const toPosition = toChessNotation(newRow, newCol);

console.log('game.board', this.game.game.board);
const thisGameGameBoard = this.game.game.board;
const captureOccurred = isCapture(thisGameGameBoard, newRow, newCol, oldColor);
console.log('piece', oldPiece, 'fromPosition sending the to the serv', fromPosition, 'toPosition sending to the serv', toPosition);
const move = {
        from: { row: oldRow, col: oldCol },
        to: { row: newRow, col: newCol },
        piece: { type: oldType, color: oldColor }
    };
    console.log('move before calling wouldPutKingInCheck', move, 'game', this.game);
 
    if (this.wouldPutKingInCheck(move)) {
        alert('Invalid move! Your move would put your king in check.');
        return; // Exit early to prevent the move
    }
const moveEvent = new CustomEvent('pieceMoved', {
    detail: {
        color: oldColor,
        type: oldType,
        capture: captureOccurred,
        from:
        {
          row: oldRow,
          col: oldCol
        },
        to:
        {
          row: newRow,
          col: newCol
        }
      }
    });
// This should use the dynamically calculated positions
console.log('trying to emit the move to the socket')
let gameSession = getGameSession;
console.log(gameSession);
 socket.emit('move', {color: oldColor, type: oldType, capture: captureOccurred, from:
        {
          row: oldRow,
          col: oldCol
        },to:
        {
          row: newRow,
          col: newCol
        } });
//socket.emit('move', { from: fromPosition, to: toPosition });
myTurn = !myTurn;
console.log('trying to send move to the server :', moveEvent);

//END OF SERVER MOVE SEND TESTING//

if (destinationElement.classList.contains('hole-square')) {
    // Logic for when destination is a hole
    this.forceRandomMove(oldPiece, chessBoard, event, this.excludeMiniBoardArea = false);
    this.game.endTurnMove();
    this.game.startTurn();
    this.game.currentPlayer = this.game.currentPlayer === "white" ? "black" : "white";
    return;
} else if (destinationElement.classList.contains('magma-square')) {
    // Logic for when destination is a magma square
  this.forceRemove(oldRow, oldCol);
  this.game.endTurnMove();
  this.game.currentPlayer = this.game.currentPlayer === "white" ? "black" : "white";
  this.game.startTurn();
  return;
    // Implement specific logic for magma square
} else if (destinationElement.classList.contains('rock-square')) {
  return;
    // Logic for when destination is a rock square
    // Implement specific logic for rock square
}

  
  
  // const oldType = this.selectedPiece.piece.type;
  // const oldColor = this.selectedPiece.piece.color;
  
   // Move logic
  const movingPiece = this.game.game.board[this.selectedPiece.row][this.selectedPiece.col]; // Get the full piece object
  this.game.board[newRow][newCol] = movingPiece; // Place the full piece object in the new position
  this.game.board[this.selectedPiece.row][this.selectedPiece.col] = null;
   console.log("Executing move:", {
      piece: this.selectedPiece,
      from: { row: this.selectedPiece.row, col: this.selectedPiece.col },
      to: { row: newRow, col: newCol },
  });
   
console.log("Flag before requestAnimationFrame in executeMove:", this.hasMovedDueToRift);
  // Use requestAnimationFrame to ensure DOM updates occur in the correct order
  requestAnimationFrame(() => 
  {
    if (destinationElement.classList.contains('enchanted-ground')) {
      // selectedPiece = this.selectedPiece;
      const effect = this.handleMagicalCardEffect(oldPiece);
      this.showSpellInteraction(effect.name, effect.description);
              this.pieceSwapped = true;
    }
    console.log("Flag in requestAnimationFrame in executeMove:", this.hasMovedDueToRift);
    //  if (this.pieceSwapped) {
    //     console.log('Piece already moved by rift effect, skipping normal move logic.');

    //     // Reset the flag
    //     this.pieceSwapped = false;

    //     // Exit early as the piece has already been moved
    //     return;
    // }
    console.log('this.towerOfPowerActivated', this.towerOfPowerActivated);
    if(this.towerOfPowerActivated){
      this.checkAndPlaceTowerEachTurn(turnCount);
    this.checkTowerCountAndActivateBeam();
    }

    if (this.hasMovedDueToRift) {
        console.log('Piece already moved by rift effect, skipping normal move logic.');

        // Reset the flag
        this.hasMovedDueToRift = false;

        // Exit early as the piece has already been moved
        return;
    }
      console.log("Flag in requestAnimationFrame in executeMove:", this.hasMovedDueToRift);

      // Move the piece in the DOM
      oldSquare.removeChild(oldPiece);
      destinationElement.appendChild(oldPiece);
      // Update attributes and styles for the old and new squares
      oldSquare.removeAttribute('data-type');
      oldSquare.removeAttribute('data-color');
      oldSquare.style.backgroundImage = '';
      oldSquare.classList.remove('has-piece');
  
      const newImagePath = `images/${this.currentPlayer}_${oldType}.png`;
      destinationElement.setAttribute('data-type', oldType);
      destinationElement.setAttribute('data-color', oldColor);
      destinationElement.style.backgroundImage = `url(${newImagePath})`;
      destinationElement.classList.add('has-piece');
      destinationElement.style.gridArea = `${newRow + 1} / ${newCol + 1}`;

      // Update piece's position in UI
      console.log("this.currentPlayer", this.currentPlayer);
      console.log("Piece element after append:", oldPiece.outerHTML);
      console.log("Destination element children:", destinationElement.innerHTML);
  });
  // this.syncBoardState();
  this.game.currentPlayer = this.game.currentPlayer === "white" ? "black" : "white";
  console.log('this.game', this.game);

  console.log('this.game before trying to endTurn', this.game);
   // this.game.endTurn = this.game.endTurn.bind(this);
        //  this.game.endTurnMove();
          this.game.startTurn();
  console.log('this.game after trying to endTurn', this.game);
  // this.updateRiftDurationOnPlayerChange();
  oldPiece.addEventListener('click', this.boundHandleClick, { once: true });

    // console.log('selectedElement', selectedElement);
          // const chessPiece = this.getPiece(newRow, newCol);
          // console.log('chessPiece right after executeMovecalled in movepiece.');
          // // Check and handle the rift after executing the move
          //   if (chessPiece) {
          //     console.log("trying to call postMoveActions");
          //     console.log("Flag in requestAnimationFrame in executeMove:", this.hasMovedDueToRift);
          //     // Call postMoveActions on the ChessPiece instance only if the flag is false
          //     if (!this.hasMovedDueToRift) {
          //       console.log('fucking still not working');
          //       // this.postMoveActions(newRow, newCol); //FOR RIFT SPELL UNCOMMENT THIS 
          //       this.updateGameStateInMovePiece();
          //     } else {
          //       console.log("Skipping postMoveActions due to rift effect");
          //       // Reset the flag
          //       this.hasMovedDueToRift = false;
          //     }
          //   } else {
          //     console.error("ChessPiece instance not found for the selected element.");
          //   }
            console.log('this context', this);
            console.log("Board state after move and before syncBoardState:", this.game.board);
            this.game.syncBoardState();
            console.log("Board state after move&&syncBoardState:", this.game.board);


          }
          

getPiece(row, col) {
  console.log('getPiece function called');
    if (row < 0 || row > 7 || col < 0 || col > 7) {
        return null;
    }
    return this.game.board[row][col];
}

retrieveOrCreatePiece(type, color, row, col, imagePath, elementId, game, chessBoard, parent) {
  console.log("retrieveOrCreatePiece function called with:$type, $color", type, color);
  // Check if a piece already exists at the given location on the board
  let existingPiece = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"] .chess-piece`);
  console.log("existingPiece :", existingPiece);
   existingPiece.parent = parent;


  if (existingPiece) {
    console.log("Retrieved existing piece from the board:", existingPiece);
    return existingPiece;
  } else {
    console.error("No piece found at the specified location:", row, col);
    return null;
  }
console.log("end of retrieveOrCreatePiece function");
}


// Helper function to select a new piece
selectNewPiece(clickedPiece, clickedPieceElement, chessBoard, game) {
  console.log("chessBoard in selectNewPiece:", chessBoard);
   chessBoard = document.querySelector(`#chessboard`);
  console.log("chessBoard in selectNewPiece after querySelector:", chessBoard);

  // if (this.selectedPiece) {
  //  console.log('calling deselect&clear for ', this.selectedPiece);
  //   // this.previousPiece = this.selectedPiece;
  //    this.deselectAndClear();
  // }
  
  // Calculate the valid moves once.
  
  console.log("clickedPiece in selectNewPiece:", clickedPiece);  // Debug line
  const clickedSquare = clickedPieceElement.parentElement;
  console.log("clickedSquare in selectNewPiece:", clickedSquare);  // Debug line
  const fullPiece = this.retrieveOrCreatePiece(clickedPiece.type, clickedPiece.color, clickedPiece.row, clickedPiece.col);
  
 
   console.log("clickedSquare.row:", clickedPiece.row);  // Debug line
      console.log("clickedSquare.col:", clickedPiece.col);  // Debug line

  const validMoves = this.calculateValidMoves(clickedPiece.row, clickedPiece.col, chessBoard, clickedPiece.type, clickedPiece.color);
  
  clickedPieceElement.classList.add('selected-piece');
  this.selectedPiece = {
    row: clickedPiece.row,
    col: clickedPiece.col,
    element: clickedPieceElement,
    piece: clickedPiece,
    validMoves: validMoves,
  };
    console.log('newSelected piece in selectNewPiece:', this.selectedPiece);
    console.log('this.game.board in selectedPiece', this.game.board);
  this.showValidMoves(this.selectedPiece, chessBoard, validMoves);  // Pass the valid moves
}
 addCapturedPiece(piece, color) {
  console.log("addcapturedPieces function called");
  const capturedContainer = document.getElementById(color + '-captured');
  const pieceElement = document.createElement('div');
  pieceElement.classList.add('dead-piece');
  pieceElement.style.fontSize = '35px'; // Adjust size as needed
  pieceElement.style.width = '35px'; // Ensure the width is the same as font size for square aspect ratio
  pieceElement.style.height = '35px'; // Ensure the height is the same as font size for square aspect ratio
  pieceElement.style.display = 'inline-block'; // Ensure that the div behaves like an inline element for layout
  pieceElement.style.textAlign = 'center';
  pieceElement.innerHTML = piece; // Replace with the appropriate emoji or image
  capturedContainer.appendChild(pieceElement);
}
mapPieceToEmoji(type, color) {
    const whitePieceEmojiMap = {
        'pawn': '♙',
        'rook': '♖',
        'knight': '♘',
        'bishop': '♗',
        'queen': '♕',
        'king': '♔'
    };

    const blackPieceEmojiMap = {
        'pawn': '♟',
        'rook': '♜',
        'knight': '♞',
        'bishop': '♝',
        'queen': '♛',
        'king': '♚'
    };

    return color === 'white' ? whitePieceEmojiMap[type] : blackPieceEmojiMap[type];
}
deselectPiece(selectedPiece) 
{
  selectedPiece.classList.remove("selected-piece");
  console.log("selectedPiece deselected", selectedPiece)
  this.clearValidMoves(); // Assuming this clears valid moves for this.selectedPiece

  const selectedSquare = document.querySelectorAll('.selected-piece');
  selectedSquare.forEach(square => {
        square.classList.remove('selected-piece');
        square.innerHTML = '';
    });
  this.selectedPiece = null; // Important: Reset your state variable
}

showValidMoves(selectedPiece, board, validMoves) {
  const threateningPath = this.threateningPath;
  console.log('threateningPath in showValidMoves', threateningPath);
    console.log('this.towerOfPowerActivated ', this.towerOfPowerActivated);

  console.log('this.isChaosTheoryActive', this.isChaosTheoryActive);

  // Check if the piece has already been moved due to the rift
  if (selectedPiece && this.hasMovedDueToRift) {
      console.log('Piece already moved by rift effect, skipping normal move logic.');

      // Reset the flag
      selectedPiece.hasMovedDueToRift = false;

      // Exit early as the piece has already been moved
      return;
  }
  
console.log("game.game.board in showValidMoves:", this.game.game.board);
  // Clear previous valid moves and remove listeners
  const allSquares = document.querySelectorAll('.chess-square');
  allSquares.forEach(square => {
    square.classList.remove('valid-move');
    const pattern = square.querySelector('.pattern');
    if (pattern) {
      square.removeChild(pattern);
    }
    
    // Remove existing click event listeners
    const squareId = `${square.dataset.row}-${square.dataset.col}`;
    if (this.activeClickListeners[squareId]) {
      square.removeEventListener('click', this.activeClickListeners[squareId]);
      square.classList.remove('event-listener-attached');
      delete square.dataset.listenerAttached;
      delete this.activeClickListeners[squareId];  // Remove the stored function reference
    }
  });
console.log()

let filteredValidMoves = validMoves;

    // Only filter validMoves if there's a threatening path (i.e., during a check)
    if (threateningPath && threateningPath.length > 0 && this.validPiecesToResolveCheck.length > 0) {
        filteredValidMoves = validMoves.filter(move => {
            return threateningPath.some(pathSquare => {
                return (move.row === pathSquare.row && move.col === pathSquare.col);
            });
        });
    }
    

  // Highlight new valid moves
  for (const move of filteredValidMoves) {
    const square = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);
    square.classList.add('valid-move');

    // Check if the current piece is a pawn on the mini-board
    const currentSquare = document.querySelector(`.chess-square[data-row="${selectedPiece.row}"][data-col="${selectedPiece.col}"]`);
    const isPawnOnMiniBoard = selectedPiece.type === 'Pawn' && currentSquare && currentSquare.classList.contains('mini-board');

        // If the piece is a pawn and it's on the mini-board, add a special highlight
        if (isPawnOnMiniBoard) {
          console.log('pawn on miniboard');
            square.classList.add('special-pawn-move'); // This class should be styled differently in your CSS
        }

    // Create a pattern on the valid move square
    const pattern = document.createElement('div');
    pattern.classList.add('pattern');
    square.appendChild(pattern);

    // Define the click event listener for this square
    const clickListener = (event) => {
      const clickedSquareElement = square;
      // Assuming executeMove is a method on the same class/object
      // First argument is the clicked square, and second argument is the chessBoard instance
       console.log("trying to executeMove fnution in showValidMoves:");
      console.log("clickedSquareElement passed :", clickedSquareElement);
       console.log("Dice Flag before executeMove:", this.isChaosTheoryActive);
      if (this.isChaosTheoryActive) {
            const diceRoll = this.rollDice();
            if (diceRoll >= 5) {
              console.log('dice roll number', diceRoll);
                console.log("Normal turn allowed by Chaos Theory.");
                // Proceed with executing the selected move
                this.executeMove(this.chessBoard, clickedSquareElement, square);

            } else {
                console.log("Random move enforced by Chaos Theory.");
                this.performRandomMove();
                // Deselect any previously selected piece
                this.deselectAndClear();
                if (this.selectedPiece && this.selectedPiece.element) {
                  this.selectedPiece.element.addEventListener('click', this.boundHandleClick, { once: true });
                }
                // Switch turn to the next player
                this.game.endTurnMove();
                this.game.startTurn();
                this.switchTurn()
                return; // Skip normal move logic after executing a random move
            }
        } else {
      this.executeMove(this.chessBoard, clickedSquareElement, square);
      this.checkMiniBoardAndEndFinalStand();
    }
    // After executing the move, you may also wish to clear selections and valid moves
    this.deselectAndClear();
  };

    // Save this click event listener so we can remove it later
    const squareId = `${move.row}-${move.col}`;
    this.activeClickListeners[squareId] = clickListener;

    // Attach the event listener
    square.addEventListener('click', clickListener, { once: true });
    if (square.hasChildNodes())
    {
    const piece = square.firstChild; // Assuming there's only one piece per square for simplicity
    piece.dataset.listenerAttached = 'true'; // Set the data attribute on the piece
  }
}
}


static switchTurn() {
  console.log('witchTurn entered with player :', this.currentPlayer);
  console.log('this.game', this.game, 'chessGame', chessGame);
    // Assuming 'white' and 'black' are your player identifiers
    this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
    console.log(this.currentPlayer);

    // Any other logic required to switch turns
}
    



clearValidMoves() {
    console.log('clearValidMoves function entered');
    const validMoveSquares = document.querySelectorAll('.valid-move');
    
    // Define the subfunction
    function clearSpecificPattern(square) {
    // Find the specific child element you want to remove (adjusted selector)
    const patternElement = square.querySelector('.pattern');
    
    // If the pattern element is found, remove it
    if (patternElement) {
        console.log('Removing pattern element:', patternElement.outerHTML);
        patternElement.remove();
    }
}
    
    // Iterate over all valid move squares
    validMoveSquares.forEach(square => {
        console.log('Processing square:', square.outerHTML);
        
        // Remove the specific pattern element without affecting other children
        clearSpecificPattern(square);
        
        // Remove the 'valid-move' class
        square.classList.remove('valid-move');
        
        // Other code to handle move indicators if needed
    });
} 
    

    

getPieceFromElement(pieceElement) {
  
  if (!pieceElement) {
    console.log("Piece element is null");
    return null;
  }

  // Get the parent chess-square element
  const squareElement = pieceElement.closest('.chess-square');
  if (!squareElement) {
    console.log("Chess square element not found");
    return null;
  }
  console.log("squareElement", squareElement);

  // Extracting the row and col from the square element's data attributes
  const pieceRow = squareElement.getAttribute('data-row');
  const pieceCol = squareElement.getAttribute('data-col');

  // Extracting piece type and color from the piece element itself
  const pieceClasses = pieceElement.className.split(/\s+/);

  // Find the class that indicates the piece type and color
  const pieceClass = pieceClasses.find(cls => 
    cls.includes('pawn') || cls.includes('king') || 
    cls.includes('queen') || cls.includes('bishop') || 
    cls.includes('knight') || cls.includes('rook')
  );

  // Split the class to extract type and color
  const [pieceColor, pieceType] = pieceClass.split('-');

  console.log("pieceType", pieceType);
  console.log("pieceColor", pieceColor);

  if (!pieceType || !pieceColor) {
    console.log("Piece type or color data attribute is missing");
    return null;
  }

  // Create a representation of the piece based on the DOM element
  const piece = {
    type: pieceType,
    color: pieceColor,
    row: pieceRow,
    col: pieceCol,
    // Add other relevant properties here
  };

  console.log("Retrieved piece from DOM:", piece);

  return piece;
}

addChessPiece(type, color, row, col, imagePath, elementId, game, squares) {
  // Check if the calculated index is valid
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    console.error(`Invalid row ${row} or col ${col} for adding piece.`);
    return;
  }
  squares = document.querySelectorAll('.chess-square');
    console.log(" ssquares: ", squares);

  // Get square element from NodeList using the calculated index
  const squareIndex = row * 8 + col;
  const squareElement = squares.item(squareIndex);
  
  // Check if the square element exists
  if (!squareElement) {
    console.error(`Cannot add piece at row ${row}, col ${col}. Square does not exist.`);
    return;
  }

  // Create the chess piece
  const chessPiece = new ChessPiece(type, color, row, col, imagePath, elementId, game);
  console.log("Adding piece: ", chessPiece);
  console.log(`Added piece color: ${chessPiece.color}, row: ${row}, col: ${col}`);

  // Get the piece element from the created chess piece
  const pieceElement = chessPiece.element;

  // Check if the piece element was successfully created
  if (!pieceElement) {
    console.error(`Failed to create piece element for ${color} ${type} at row ${row}, col ${col}.`);
    return;
  }

  // Check if there's already a piece on the square
  const existingPieceElement = squareElement.querySelector('.chess-piece');
  if (existingPieceElement) {
    squareElement.replaceChild(pieceElement, existingPieceElement);
  } else {
    squareElement.appendChild(pieceElement);
  }

  // Update the game board with the added chess piece
 this.game.board[row][col] = chessPiece;
}

toggleSpellMode(spellType, isActive) {
    console.log(`toggleSpellMode called: ${spellType} - ${isActive}`);
    this.isSpellActive = isActive;

    const chessPieces = document.querySelectorAll('.chess-piece');
    if (isActive) {
        // Disable regular piece movement listeners
        chessPieces.forEach(piece => {
            console.log('piece in toggleSpellMode', piece);
            piece.removeEventListener('click', this.boundHandleClick);
        });
    } else {
        // Re-enable regular piece movement listeners
        chessPieces.forEach(piece => {
            piece.addEventListener('click', this.boundHandleClick, { once: true });
        });
    }
}

addSpecialPawn(type, color, row, col, imagePath, elementId, game, squares) {
console.log("Adding special pawn of type: ", type);
  // Check if the calculated index is valid
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    console.error(`Invalid row ${row} or col ${col} for adding special pawn.`);
    return;
  }
   imagePath = `./img/${type}.png`;
  console.log("imagePath", imagePath);

  // Get square element from NodeList using the calculated index
  const squareIndex = row * 8 + col;
  const squareElement = squares.item(squareIndex);

  // Check if the square element exists
  if (!squareElement) {
    console.error(`Cannot add special pawn at row ${row}, col ${col}. Square does not exist.`);
    return;
  }

  // Create the chess piece (special pawn)
  const specialPawn = new ChessPiece(type, color, row, col, imagePath, elementId, game);
  const pieceElement = document.createElement('div');
    pieceElement.classList.add('chess-piece');
    pieceElement.style.backgroundImage = `url('${imagePath}')`;
    pieceElement.setAttribute('data-type', type);
    pieceElement.setAttribute('data-color', color);
  // Example: Set additional properties or behaviors based on pawnType
    // if (type === 'FirePawn') {
    //     specialPawn.fireProperty = /* specific property or behavior for FirePawn */;
    // } else if (type === 'WaterPawn') {
    //     specialPawn.waterProperty = /* specific property or behavior for WaterPawn */;
    //     // ... and so on for other pawn types
    // }
  console.log("Adding special pawn: ", specialPawn);

  // Get the piece element from the created chess piece
  

  // Check if the piece element was successfully created
  if (!pieceElement) {
    console.error(`Failed to create piece element for ${color} ${type} at row ${row}, col ${col}.`);
    return;
  }

  // Check if there's already a piece on the square
  const existingPieceElement = squareElement.querySelector('.chess-piece');
  console.log("squareElement:", squareElement, "pieceElement:", pieceElement);
  if (existingPieceElement) {
    squareElement.replaceChild(pieceElement, existingPieceElement);
  } else {
    squareElement.appendChild(pieceElement);
  }

  // Update the game board with the added special pawn
  game.board[row][col] = specialPawn;
  console.log("gameboard after pawn placement", game.board[row][col]);
  this.refreshPieceEventListeners();
  this.toggleGameState(false); // Revert to normal gameplay
  this.restoreNormalGameState();
}

convertSquareIdToRowCol(squareElement) {
  console.log("convertSquareIdToRowCol called , value of squareElement", squareElement);
 // console.log("convertSquareIdToRowCol called, value of selectedSquareElement", selectedSquareElement);
  const row = parseInt(squareElement.getAttribute('data-row'));
  const col = parseInt(squareElement.getAttribute('data-col'));
  console.log("row", row);
  console.log("col", col);
  
  if (isNaN(row) || isNaN(col)) {
    console.error("Row or col is not a number");
    return null;
  }

  if (row < 0 || row >= this.game.board.length) {
    console.error("Row is out of bounds");
    return null;
  }

  if (col < 0 || col >= this.game.board[row].length) {
    console.error("Col is out of bounds");
    return null;
  }

  return [row, col];
}

removeSquareSelectionListeners(squares) {
             console.log("isPawnPlacementActive?", isPawnPlacementActive);

  if (isPawnPlacementActive) {
    squares.forEach(square => {
    square.removeEventListener('click', this.pawnPlacementListener); // Adjust this to match the actual event listener function
    
  });
this.isSpecialMoveActive = false;
  }
}

//SPECIALPAWNCREATION//
preparePawnCreation(pawnType, imagePath, elementId) {
    console.log("preparePawnCreation successfully entered in classPiece");
    console.log(`preparePawnCreation called for ${pawnType}`);
    this.showSelectSquarePrompt();
     console.log('Before toggling game state:', this.isPawnPlacementActive);
    console.log('After toggling game state:', this.isPawnPlacementActive);

    const squares = document.querySelectorAll('.chess-square');
    const chessPieceInstance = this; // Store the instance for use in the callback

    // Define the event listener function for pawn placement
    const pawnPlacementListener = (event) => {
        const selectedSquareElement = event.currentTarget; // Get the clicked DOM square element
        console.log("selectedSquareElement", selectedSquareElement);

        const [row, col] = chessPieceInstance.convertSquareIdToRowCol(selectedSquareElement);

        chessPieceInstance.addSpecialPawn(pawnType, 'white', row, col, imagePath, elementId, chessPieceInstance.game, squares);
                console.log("Special pawn placed, restoring normal game state");

        this.isPawnPlacementActive = false;
        this.toggleGameState(false);
        this.refreshPieceEventListeners();
        chessPieceInstance.restoreNormalGameState(this.pawnPlacementListener);
        // chessPieceInstance.removeSquareSelectionListeners(); // Call this if it does additional cleanup
    };

    // Attach the event listener to each square
     squares.forEach(square => {
        if (this.isSquareEmpty(square)) {
            square.addEventListener('click', pawnPlacementListener, { once: true });
        }
    });

    this.toggleGameState(true); // Enter special pawn mode
}
restoreNormalGameState(spellListener) {
    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => {
        // Remove any specific spell or special action listeners
        if (spellListener) {
            square.removeEventListener('click', spellListener);
        }
    });

    // Re-enable regular game event listeners and other common reset actions
    this.refreshPieceEventListeners(true);
    console.log("Normal game state restored");
}
showSelectSquarePrompt() {
     console.log("Showing modal");
  const modal = document.getElementById('select-square-modal');
  modal.style.display = 'block';

  this.setupSquareListeners();

  // Set a timeout to hide the modal after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    this.hideSelectSquarePrompt();
  }, 500);
}
hideSelectSquarePrompt() {
  const modal = document.getElementById('select-square-modal');
  modal.style.display = 'none';  
}
setupSquareListeners() {
    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => {
        if (this.isSquareEmpty(square)) {
            // Remove existing listener before adding a new one to avoid duplication
            square.removeEventListener('click', this.boundHandleSquareClick);
            square.addEventListener('click', this.boundHandleSquareClick, { once: true });
        }
    });
}
addPieceEventListener(pieceElement) {
       pieceElement.addEventListener('click', this.boundHandleClick);
    pieceElement.classList.add('event-listener-attached');
}

// Method to remove an event listener
removePieceEventListener(pieceElement) {
    pieceElement.removeEventListener('click', this.boundHandleClick);
    pieceElement.classList.remove('event-listener-attached');
}

// Assume each piece is contained within a square and they are separate entities
// refreshPieceEventListeners(enableListeners) {
//     console.log('refreshPieceEventListeners function called');
//     const pieces = document.querySelectorAll('.chess-piece');

//     pieces.forEach(piece => {
//         const square = piece.parentNode; // Assuming the piece is directly inside the square

//         // Check both the piece and its square for the event-listener-attached class
//         const needsListener = !piece.classList.contains('event-listener-attached') ||
//                               !square.classList.contains('event-listener-attached');

//         if (enableListeners && needsListener) {
//             console.log('Attaching event listener to piece:', piece);
//             square.addEventListener('click', this.boundHandleClick);
//             piece.classList.add('event-listener-attached');
//             square.classList.add('event-listener-attached'); // Also mark the square
//         } else if (!enableListeners && !needsListener) {
//             console.log('Detaching event listener from piece:', piece);
//             square.removeEventListener('click', this.boundHandleClick);
//             piece.classList.remove('event-listener-attached');
//             square.classList.remove('event-listener-attached'); // Also unmark the square
//         }
//     });
// }
initObserver() {
  console.log('initObserver function entered');
        // Observer configuration: watch for data attribute changes
        const config = { attributes: true, childList: false, subtree: true, attributeFilter: ['data-listenerAttached'] };
        console.log('config', config);

        // Callback function to execute when mutations are observed
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-listenerAttached') {
                  console.log(`Mutation type: ${mutation.type}`);
                    console.log(`The data-listenerAttached attribute was modified on:`, mutation.target);
                    const enableListeners = mutation.target.dataset.listenerAttached !== 'true';
                    this.refreshPieceEventListeners(enableListeners);
                }
            }
        };

        // Create an instance of the observer with the callback function
        const observer = new MutationObserver(callback);

        // Start observing the document for configured mutations
        observer.observe(document.body, config);
    }


refreshPieceEventListeners(enableListeners) {
    console.log('refreshPieceEventListeners function called, enableListeners being :', enableListeners);
    const pieces = document.querySelectorAll('.chess-piece');

    pieces.forEach(piece => {
        const square = piece.parentNode; // Assuming the piece is directly inside the square
        // Use data attributes to check if the listener is attached
        const needsListener = !square.dataset.listenerAttached;
        console.log('square, needsListener', square, needsListener);


        if (enableListeners && needsListener) {
            console.log('Attaching event listener to piece:', piece);
            square.addEventListener('click', this.boundHandleClick);
            
            square.dataset.listenerAttached = 'true';
        } else if (!enableListeners && !needsListener) {
            console.log('Detaching event listener from piece:', piece);
            square.removeEventListener('click', this.boundHandleClick);
            
            delete square.dataset.listenerAttached;
        }
    });
}


 setupCloseButtonListener() {
    const closeButton = document.getElementsByClassName("close-button")[0];
    console.log("closeButton", closeButton);
    if (closeButton) {
      console.log("Close button setup");
      const instance = this;
      closeButton.addEventListener('click', function() {
        instance.hideSelectSquarePrompt();
      });
    }
  }


  // setupSquareListeners() {
  //   const squares = document.querySelectorAll('.chess-square'); // Use the correct class or selector for your chess squares
  //   squares.forEach(square => {
  //     if (this.isSquareEmpty(square)) { // Assuming you have a method to check if a square is empty
  //         square.addEventListener('click', (event) => {
  //        // Assuming 'this' refers to an instance of your game or related class
  //         const selectedSquare = event.target; // or `square` directly

  //         if (this.isSquareEmpty(selectedSquare)) 
  //         {
  //         // Logic to place a special pawn on the selected square
  //         // Example: this.placeSpecialPawn(selectedSquare);
  //           this.placeSpecialPawn(selectedSquare);

  //           // Hide the select square prompt
  //           this.hideSelectSquarePrompt();

  //           // Any additional game logic after placing the pawn
  //           this.changeTurn();
  //         } else {
  //         // Optionally, handle the case where the square is not empty
  //           console.log("Selected square is not empty.");
  //         }
  //       });
  //      });
      
  // }

  isSquareEmpty(square) {
    // Implement logic to check if the square is empty
    return !square.hasChildNodes(); // Example: a square is empty if it has no child nodes
  }



// calculateValidMoves(row, col, board) {
//   console.log("Board in calculateValidMoves:", this.game.board);
//   const validMoves = [];

//     // The pawn can move forward only (white moves up, black moves down)
//   const direction = this.color === "white" ? 1 : -1;

//   console.log("Row:", row);
//   console.log("Col:", col);
//   console.log("Direction:", direction);
//   console.log("Board:", board);

//     // Check for the forward move (one square)
//   const newRow = row + direction;
//   console.log("New row:", newRow);
//   if (newRow >= 0 && newRow < 8) {
//     const forwardSquare = this.game.board[newRow][col];
//     console.log("Checking board position for forward move: board[", newRow, "][", col, "] = ", forwardSquare);
//     if (!forwardSquare) {
//       validMoves.push({ row: newRow, col: col });
//       console.log("Added forward move:", { row: newRow, col: col });

//         // Check for the double-move on the pawn's first move
//       if ((this.color === "white" && row === 1) || (this.color === "black" && row === 6)) 
//       {
//         const doubleMoveRow = newRow + direction;
//         const doubleMoveSquare = this.game.board[doubleMoveRow][col];
//         console.log("Checking board position for double move: board[", doubleMoveRow, "][", col, "] = ", doubleMoveSquare);
//         console.log("Double move square:", doubleMoveSquare);
//         if (!doubleMoveSquare) 
//         {
//           validMoves.push({ row: doubleMoveRow, col: col });
//         }
//       }
//     } 
//     else 
//     {
//       console.log("Forward square blocked:", forwardSquare);
//     }
//   } 
//   else 
//   {
//     console.log("New row out of bounds:", newRow);
//   }

//   const newRowForCapture = newRow;

//     // Check for captures (diagonal moves)
//   //const newRowForCapture = newRow;
//   const captureCols = [col - 1, col + 1];
//   if (newRowForCapture >= 0 && newRowForCapture < 8) {
//     for (const captureCol of captureCols) {
//       console.log("New row for capture:", newRowForCapture);
//       console.log("Capture col:", captureCol);
//       if (captureCol >= 0 && captureCol < 8) {
//         const captureSquare = this.game.board[newRowForCapture][captureCol];
//         console.log("Checking board position for capture: board[", newRowForCapture, "][", captureCol, "] = ", captureSquare);
//         console.log("Capture square:", captureSquare);
//         if (captureSquare && captureSquare.color !== this.color) {
//           validMoves.push({ row: newRowForCapture, col: captureCol });
//           console.log("Added capture move:", { row: newRowForCapture, col: captureCol });
//         } else {
//           console.log("Invalid capture square:", captureSquare);
//         }
//       } else {
//         console.log("Capture col out of bounds:", captureCol);
//       }
//     }
//   } else {
//     console.log("New row for capture out of bounds:", newRowForCapture);
//   }

//   console.log("Valid moves in calculateValidMoves:", validMoves);
//   ///console.log('Comparing valid moves:', validMoves, 'with target:', {row: newRowForCapture, col: captureCol});

//   return validMoves;
// }

 
  calculateValidMoves(row, col, board, type, color, game) {
  console.log("calculateValidMoves called for", row, col);
  console.log("Board state in calculateValidMoves:", board);
  console.log("this.game.board state at the beginnign of calculateValidMoves", this.game.game.board);
  console.log("Piece type in calculateValidMoves:", type, "Color:", color);

  const validMoves = [];
  const enemyColor = color === "white" ? "black" : "white";
  const currentRow = parseInt(row, 10);
  const currentCol = parseInt(col, 10);
  game = this.game
  switch (type) {
    case 'pawn':
      const pawnSquare = document.querySelector(`.chess-square[data-row="${currentRow}"][data-col="${currentCol}"]`);
      const pawnElement = pawnSquare.firstElementChild;
      console.log('pawnSquare', pawnSquare);
      console.log('pawnSquare class list:', pawnSquare.classList);
      const isPawnOnMiniBoard = pawnSquare.classList.contains('mini-board-highlight');
      const isWindOfChangeActive = pawnElement.classList.contains('pawn-random-move');
      console.log('isPawnOnMiniBoard', isPawnOnMiniBoard);
     
      if (isPawnOnMiniBoard)
      {
        console.log("Processing pawn In MINIBOARD SPELL");
        // King-like moves for pawn on mini-board
        const pawnKingMoves = [
      { row: currentRow - 1, col: currentCol - 1 }, { row: currentRow - 1, col: currentCol }, { row: currentRow - 1, col: currentCol + 1 },
      { row: currentRow, col: currentCol - 1 },                             { row: currentRow, col: currentCol + 1 },
      { row: currentRow + 1, col: currentCol - 1 }, { row: currentRow + 1, col: currentCol }, { row: currentRow + 1, col: currentCol + 1 }
    ];

    pawnKingMoves.forEach(move => {
        console.log(`Checking move: row=${move.row}, col=${move.col}`);
      if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
            console.log(`Board state at [${move.row}][${move.col}]:`, this.game.game.board[move.row][move.col]);
        const targetSquare = this.game.game.board[move.row][move.col];
        if (!targetSquare || targetSquare.color === enemyColor) {
          validMoves.push(move);
        }
      }
    });

    } else if (type === 'pawn' && isWindOfChangeActive) {
      const moveForward = color === "white" ? 1 : -1;
  console.log('Pawn under Wind of Change spell', this);
  console.log('moveForward', moveForward);
  console.log('currentCol', currentCol);
  
  // Directly use the board state to check move validity instead of relying on an external method
  // This approach considers both the boundaries and occupancy directly

  // Movement logic when the 'left' or 'right' class is active
  if (pawnElement.classList.contains('left')) {
    console.log('moveForward in left moves', moveForward);
  console.log('currentCol in left moves', currentCol, "currentRow in left move", currentRow);
  // Standard left move
  if (currentCol > 0 && !this.game.game.board[currentRow][currentCol - 1]) {
    validMoves.push({ row: currentRow, col: currentCol - 1 });

    // Double move left (ensure no blockage and within board limits)
    if (currentCol - 2 >= 0 && !this.game.game.board[currentRow][currentCol - 2]) {
      validMoves.push({ row: currentRow, col: currentCol - 2 });
    }
  }
} else if (pawnElement.classList.contains('right')) {
  // Standard right move
  if (currentCol < 7 && !this.game.game.board[currentRow][currentCol + 1]) {
    validMoves.push({ row: currentRow, col: currentCol + 1 });

    // Double move right (ensure no blockage and within board limits)
    if (currentCol + 2 <= 7 && !this.game.game.board[currentRow][currentCol + 2]) {
      validMoves.push({ row: currentRow, col: currentCol + 2 });
    }
  }
}

  else if (pawnElement.classList.contains('forward')) 
  {
    // Single forward move
    let targetRow = currentRow + moveForward;
    if (targetRow >= 0 && targetRow < 8 && !this.game.game.board[targetRow][currentCol]) 
    {
        validMoves.push({ row: targetRow, col: currentCol });
    }

    // Double move on first move
     if ((this.color === "white" && currentRow === 1) || (this.color === "black" && currentRow === 6)) 
    {
      let doubleMoveRow = targetRow + moveForward;
      if (!this.game.game.board[doubleMoveRow][currentCol]) 
      {
        validMoves.push({ row: doubleMoveRow, col: currentCol });
      }
    }
  }
    // Movement logic when a 'diagonal' class is active
    else if (pawnElement.classList.contains('diagonalLeft')) {
    let targetRow = currentRow + moveForward; // Move one row forward based on color
    let targetCol = currentCol - 1; // Move one column to the left

    // First diagonal move
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      if (!this.game.game.board[targetRow][targetCol] || this.game.game.board[targetRow][targetCol].color !== this.color) {
        validMoves.push({ row: targetRow, col: targetCol });

        // Double move diagonal left
        let doubleMoveRow = targetRow + moveForward;
        let doubleMoveCol = targetCol - 1;
        if (doubleMoveRow >= 0 && doubleMoveRow < 8 && doubleMoveCol >= 0 && doubleMoveCol < 8) {
          if (!this.game.game.board[doubleMoveRow][doubleMoveCol] || this.game.game.board[doubleMoveRow][doubleMoveCol].color !== this.color) {
            validMoves.push({ row: doubleMoveRow, col: doubleMoveCol });
          }
        }
      }
      // Capturing Moves
  const captureOffsets = [1, -1];
  for (let offset of captureOffsets) 
  {
    let captureCol = currentCol + offset;
    if (captureCol >= 0 && captureCol < 8) 
    {
      let captureSquare = this.game.game.board[targetRow][captureCol];
      if (captureSquare && captureSquare.color !== this.color) 
      {
        validMoves.push({ row: newRow, col: captureCol });
      }
    }
  }
    }

}

  // Diagonal Right Movement
 else if (pawnElement.classList.contains('diagonalRight')) {
    let targetRow = currentRow + moveForward; // Move one row forward based on color
    let targetCol = currentCol + 1; // Move one column to the right

    // First diagonal move
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      if (!this.game.game.board[targetRow][targetCol] || this.game.game.board[targetRow][targetCol].color !== this.color) {
        validMoves.push({ row: targetRow, col: targetCol });

        // Double move diagonal right
        let doubleMoveRow = targetRow + moveForward;
        let doubleMoveCol = targetCol + 1;
        if (doubleMoveRow >= 0 && doubleMoveRow < 8 && doubleMoveCol >= 0 && doubleMoveCol < 8) {
          if (!this.game.game.board[doubleMoveRow][doubleMoveCol] || this.game.game.board[doubleMoveRow][doubleMoveCol].color !== this.color) {
            validMoves.push({ row: doubleMoveRow, col: doubleMoveCol });
          }
        }
      }
    }
    // Capturing Moves
  const captureOffsets = [1, -1];
  for (let offset of captureOffsets) 
  {
    let captureCol = currentCol + offset;
    if (captureCol >= 0 && captureCol < 8) 
    {
      let captureSquare = this.game.game.board[targetRow][captureCol];
      if (captureSquare && captureSquare.color !== this.color) 
      {
        validMoves.push({ row: newRow, col: captureCol });
      }
    }
  }
}
 }else {
       console.log("Processing pawn");
  let direction = color === "white" ? 1 : -1; // Adjusted for the board setup
  console.log('direction', direction); 
  let newRow = currentRow + direction;
  console.log('newRow for pawn in calculateValidMoves:', newRow);

  // Forward Move
  if (newRow >= 0 && newRow < 8 && !this.game.game.board[newRow][currentCol]) {
    validMoves.push({ row: newRow, col: currentCol });
      console.log('this.color before the pawn double square first move aka PDSFM', this.color)
      console.log("Pawn starting row check:", (this.color === "white" && row === 1) || (this.color === "black" && row === 6));
      console.log("Square directly in front is empty:", !this.game.game.board[currentRow + direction][currentCol]);
      console.log("Square two steps ahead is empty:", !this.game.game.board[currentRow + 2 * direction][currentCol]);

    // Double Move on First Move
    if ((this.color === "white" && currentRow === 1) || (this.color === "black" && currentRow === 6)) 
    {
      let doubleMoveRow = newRow + direction;
      if (!this.game.game.board[doubleMoveRow][currentCol]) 
      {
        validMoves.push({ row: doubleMoveRow, col: currentCol });
      }
    }
  }

  // Capturing Moves
  const captureOffsets = [1, -1];
  for (let offset of captureOffsets) 
  {
    let captureCol = currentCol + offset;
    if (captureCol >= 0 && captureCol < 8) 
    {
      let captureSquare = this.game.game.board[newRow][captureCol];
      if (captureSquare && captureSquare.color !== this.color) 
      {
        validMoves.push({ row: newRow, col: captureCol });
      }
    }
  }
  }
  break;

    case 'knight':
  const knightMoves = [
    { row: currentRow - 2, col: currentCol - 1 }, { row: currentRow - 2, col: currentCol + 1 },
    { row: currentRow - 1, col: currentCol - 2 }, { row: currentRow - 1, col: currentCol + 2 },
    { row: currentRow + 1, col: currentCol - 2 }, { row: currentRow + 1, col: currentCol + 2 },
    { row: currentRow + 2, col: currentCol - 1 }, { row: currentRow + 2, col: currentCol + 1 }
  ];
  knightMoves.forEach(move => {
    if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
      const targetSquare = this.game.game.board[move.row][move.col];
      if (!targetSquare || targetSquare.color === enemyColor) {
        validMoves.push(move);
      }
    }
  });
  break;

    case 'bishop':
      console.log("Processing bishop");
  const bishopDirections = [
    { dr: -1, dc: -1 }, // Up-Left
    { dr: -1, dc: 1 },  // Up-Right
    { dr: 1, dc: -1 },  // Down-Left
    { dr: 1, dc: 1 }    // Down-Right
  ];

  bishopDirections.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const newRow = currentRow + dir.dr * i;
      const newCol = currentCol + dir.dc * i;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const square = this.game.game.board[newRow][newCol];
        if (!square) {
          validMoves.push({ row: newRow, col: newCol });
        } else {
          if (square.color === enemyColor) {
            validMoves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    }
  });
  break;

    case 'rook':
      console.log("Processing rook");
  // Directions: Up, Down, Left, Right
  const directions = [
    { dr: -1, dc: 0 }, // Up
    { dr: 1, dc: 0 },  // Down
    { dr: 0, dc: -1 }, // Left
    { dr: 0, dc: 1 }   // Right
  ];

  directions.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const newRow = currentRow + dir.dr * i;
      const newCol = currentCol + dir.dc * i;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const square = this.game.game.board[newRow][newCol];
        if (!square) {
          validMoves.push({ row: newRow, col: newCol });
        } else {
          // If it's an enemy piece, include it as a valid move
          if (square.color === enemyColor) {
            validMoves.push({ row: newRow, col: newCol });
          }
          // Break after encountering any piece
          break;
        }
      }
    }
  });
  break;

   case 'queen':
  // Combine rook and bishop logic for queen
  const queenDirections = [
    // Diagonal directions
    { dr: -1, dc: -1 }, { dr: -1, dc: 1 },
    { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
    // Straight directions
    { dr: -1, dc: 0 }, { dr: 1, dc: 0 },
    { dr: 0, dc: -1 }, { dr: 0, dc: 1 }
  ];

  queenDirections.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const newRow = currentRow + dir.dr * i;
      const newCol = currentCol + dir.dc * i;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const square = this.game.game.board[newRow][newCol];
        if (!square) {
          validMoves.push({ row: newRow, col: newCol });
        } else {
          if (square.color === enemyColor) {
            validMoves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    }
  });
  break;

    case 'king':
      console.log("Processing king");
      
      // Add king moves (one square in any direction)
      const kingMoves = [
        { row: currentRow - 1, col: currentCol - 1 }, { row: currentRow - 1, col: currentCol }, { row: currentRow - 1, col: currentCol + 1 },
        { row: currentRow, col: currentCol - 1 },                               { row: currentRow, col: currentCol + 1 },
        { row: currentRow + 1, col: currentCol - 1 }, { row: currentRow + 1, col: currentCol }, { row: currentRow + 1, col: currentCol + 1 }
      ];
       console.log("King Moves:", kingMoves); // Log 1

  kingMoves.forEach(move => {
    console.log("Evaluating move:", move); // Log 2

    if (move.row >= 0 && move.row < 7 && move.col >= 0 && move.col < 7) {
      // console.log("Board at [" + move.currentRow + "][" + move.currentCol + "]:", this.game.board[move.currentRow][move.currentCol]); // Log 3

      if (!this.game.game.board[move.row][move.col] || this.game.game.board[move.row][move.col].color === enemyColor) {
        validMoves.push(move);
        console.log("Valid move added:", move); // Log 4
      }
    }
  });
  break;

default:
  console.error('Unknown piece type:', this.type);
}
console.log("this.game;board at the end of calculateValidMovesl :", this.game.board);
console.log("Valid moves generated:", validMoves);
return validMoves;
}



    isValidMove(currentRow, currentCol, newRow, newCol, board) {
    // create a new ChessPiece object with the current piece's information
    const currentPiece = new ChessPiece(this.type, this.color, this.row, this.col, this.imagePath, this.element, this.board);

    // check if the move is within the board boundaries
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
      console.log('move outside of board boundaries');
        return false;
    }
     const currentSquare = document.querySelector(`.chess-square[data-row="${currentRow}"][data-col="${currentCol}"]`);
    const onMiniBoard = currentSquare && currentSquare.classList.contains('mini-board');
    console.log('currentSquare0', currentSquare, 'onMiniBoard', onMiniBoard);
    // check if the piece can move to the new square based on its type and the rules of chess
    switch (currentPiece.type) {
        case 'pawn':
           if (onMiniBoard) {
            console.log('pawn is on miniboard upgrading');
                return Math.abs(newRow - currentRow) <= 1 && Math.abs(newCol - currentCol) <= 1;
            }
            
            // pawns can move forward one square, or forward two squares on their first move
            if (currentPiece.color == 'white') {
                if (newRow == currentRow - 1 && newCol == currentCol && !board[newRow][newCol]) {
                    return true;
                } else if (newRow == currentRow - 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow - 1][currentCol] && currentRow == 6) {
                    return true;
                }
            } else if (currentPiece.color == 'black') {
                if (newRow == currentRow + 1 && newCol == currentCol && !board[newRow][newCol]) {
                    return true;
                } else if (newRow == currentRow + 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow + 1][currentCol] && currentRow == 1) {
                    return true;
                }
            }
            break;
        case 'rook':
            // rooks can move horizontally or vertically, as long as there are no pieces blocking their path
            if (newRow == currentRow || newCol == currentCol) {
                // check for pieces blocking the rook's path
                if (!isBlocked(currentPiece, newRow, newCol)) {
                    return true;
                }
            }
            break;
        case 'knight':
            // knights can move to squares that are two rows and one column, or two columns and one row away
            if (Math.abs(newRow - currentRow) == 2 && Math.abs(newCol - currentCol) == 1 || Math.abs(newRow - currentRow) == 1 && Math.abs(newCol - currentCol) == 2) {
                return true;
            }
            break;
        case 'bishop':
            // bishops can move diagonally, as long as there are no pieces blocking their path
            if (Math.abs(newRow - currentRow) == Math.abs(newCol - currentCol)) {
                // check for pieces blocking the bishop's path
                if (!isBlocked(currentPiece, newRow, newCol)) {
                    return true;
                }
            }
            break;
        case 'queen':
            // queens can move horizontally, vertically, or diagonally, as long as there are no pieces blocking their path
            if (newRow == currentRow || newCol == currentCol || Math.abs(newRow - currentRow) == Math.abs(newCol - currentCol)) {
                // check for pieces blocking the queen's path
                if (!isBlocked(currentRow, currentCol, newRow, newCol)) {
                    return true;
                }
            }
            break;
            case 'king':
            // kings can move to any adjacent square (horizontally, vertically, or diagonally)
            if (Math.abs(newRow - currentRow) <= 1 && Math.abs(newCol - currentCol) <= 1) {
                return true;
            }
            break;
        default:
            // if the piece is not recognized, return false
          console.log("piece not recognized");
            return false;
    }

    // if the move is not valid, return false
            console.log("unvalidmove");

    return false;
}

updateBoardVisuals() {
    console.log("updateBoardVisuals called");

    // Loop through all square elements
    document.querySelectorAll('.square').forEach(squareElement => {
        // Retrieve row and column from data attributes
        const row = parseInt(squareElement.getAttribute('data-row'));
        const col = parseInt(squareElement.getAttribute('data-col'));
        console.log("squareElement in udpateBoardVisuals", squareElement);

        // Remove the previous click event listener, if any
        squareElement.removeEventListener('click', this.boundHandleClick);

        // Attach the new event listener
        squareElement.addEventListener('click', (event) => this.boundHandleClick(event, this.chessBoard), { once: true });

        // Get the cell from the game board
        const cell = this.board[row][col];
        console.log("this.game.board in updateBoardVisuals", cell);

        // Update the square element based on the piece in the cell
        if (cell) {
            squareElement.innerHTML = `<div class="chess-piece" style="background-image: url('${cell.imagePath}')"></div>`;
        } else {
            squareElement.innerHTML = '';
        }
    });
        console.log("Finished updateBoardVisuals");
}



// Function to initialize the internal board state based on the initial layout
 initializeBoard() {
  // Initialize an empty 8x8 board
    document.querySelectorAll('.chess-square').forEach(square => {
        const row = parseInt(square.getAttribute('data-row'));
        const col = parseInt(square.getAttribute('data-col'));
        const piece = square.querySelector('.chess-piece div');
        console.log("piece in initializeBoard", piece);
        if (piece) {
            this.game.board[row][col] = {
                type: piece.className, // e.g., 'white-rook'
                row : row,
                cols: col,
                imagePath: piece.getAttribute('src')
            };
        }
    });
}
 nextRandom(multiplier, seed, increment, modulus) {
    const nextSeed = (multiplier * seed + increment) % modulus;
    const nextValue = nextSeed / modulus;
    return { newSeed: nextSeed, nextValue };
  }

chaosWarp(board, data) {
    console.log("chaosWarp called with rng:", data);

        const squares = Array.from(document.querySelectorAll('.chess-square'));
    console.log("squares found:", squares);

    let currentSeed = data.seed;
    let pieces = [];

    // Extract pieces from the game board
    squares.forEach(square => {
        const pieceElement = square.querySelector('.chess-piece');
        if (pieceElement) {
            pieces.push({
                element: pieceElement,
                originalSquare: square,
                type: pieceElement.classList[1].split('-')[1], // Assuming second class is piece type
                color: pieceElement.classList[1].split('-')[0],  // Assuming second class is piece color
                row: parseInt(square.getAttribute('data-row'), 10),
                col: parseInt(square.getAttribute('data-col'), 10)
            });
            // Remove the piece element from the square
            square.classList.remove('has-piece');
            square.removeAttribute('data-type');
            square.removeAttribute('data-color');
            square.style.backgroundImage = '';
            square.removeChild(pieceElement);
        }
    });

    // Shuffle the pieces array
    for (let i = pieces.length - 1; i > 0; i--) {
        let rngResult = this.nextRandom(data.multiplier, currentSeed, data.increment, data.modulus);
        let j = Math.floor(rngResult.nextValue * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        currentSeed = rngResult.newSeed; // Update currentSeed for next iteration
    }
    // Shuffle the squares array
    for (let i = squares.length - 1; i > 0; i--) {
        let rngResult = this.nextRandom(data.multiplier, currentSeed, data.increment, data.modulus);
        let j = Math.floor(rngResult.nextValue * (i + 1));
        [squares[i], squares[j]] = [squares[j], squares[i]];
        currentSeed = rngResult.newSeed; // Update currentSeed for next iteration
    }

    const shuffledPositions = [];

    // Place the shuffled pieces back on the board
    pieces.forEach((piece, index) => {
        const square = squares[index];
        const newRow = parseInt(square.getAttribute('data-row'), 10);
        const newCol = parseInt(square.getAttribute('data-col'), 10);

        square.appendChild(piece.element);
        square.classList.add('has-piece');
        square.setAttribute('data-type', piece.type);
        square.setAttribute('data-color', piece.color);

        // Update the internal board
        this.game.board[newRow][newCol] = {
            type: piece.type,
            color: piece.color
        };
        console.log('piece value before pushing shuffledposition in the array', piece);
        shuffledPositions.push({
            id: piece.element, // Make sure your pieces have a data-piece-id attribute
            newRow: newRow,
            newCol: newCol
        });
    });

    console.log("Shuffling complete, internal board updated.");
    console.log('shuffledPositions', shuffledPositions);

    this.updateInternalBoardStateFromDOM();
    this.updateBoardVisuals();

    return shuffledPositions;
}

updateInternalBoardStateFromDOM() {
  console.log("updateInternalBoardStateFromDOM called");

  // Query all the chess square elements from the DOM
  const squares = document.querySelectorAll('.chess-square');
  squares.forEach(square => {
    const row = parseInt(square.getAttribute('data-row'), 10);
    const col = parseInt(square.getAttribute('data-col'), 10);
    const type = square.getAttribute('data-type');
    const color = square.getAttribute('data-color');
    const pieceElement = square.querySelector('.chess-piece');

    if (type && color) {
      // Using retrieveOrCreatePiece to ensure consistency
      const piece = this.retrieveOrCreatePiece(type, color, row, col, this.game, this.chessBoard);
      this.game.board[row][col] = piece;

      // Update pieceElement's backgroundImage if it exists
      if (pieceElement && piece && piece.imagePath) {
        pieceElement.style.backgroundImage = `url('${piece.imagePath}')`;
      }
    } else {
      this.game.board[row][col] = null; // No piece at this square
    }
  });

  console.log("Updated internal board state:", this.game.board);
}


// Helper function to check if the placement of a piece is valid
 isValidPlacement(row, col, piece, gameBoard) {
    // Implement rules for valid placement (e.g., kings not in check)
    // This is a placeholder; you need to implement the specific rules.
    return true; // Return true if valid, false otherwise
}

  castFrostGridSpell() {
    console.log('castFrostGridSpell called');
    this.toggleSpellMode('FrostGrid', true);
                const chessBoardElement = document.getElementById('chessboard');
    chessBoardElement.addEventListener('mousemove', this.handleHover);
     chessBoardElement.addEventListener('click', this.boundHandleSelection, { once: true });
          // chessBoardElement.removeEventListener('click', this.boundHandleClick, { once: true });

}
    handleHover(event) {
    if (!this.isSpellActive) {
        console.log("handleHover returned due to isSpellActive being :", this.isSpellActive);
        return;
    }
    let { x, y } = this.determineTopLeftCorner(event);
    this.highlightArea(x, y);
}
   handleSelection(event) {
    event.preventDefault(); 
    event.stopPropagation();
    if (!this.isSpellActive) {
        console.log("handleSelection returned due to isSpellActive being :", this.isSpellActive);
        return;
    }
    let { x, y } = this.determineTopLeftCorner(event);
    this.applySpellEffects(x, y);
    this.deactivateSpell();
}

     highlightArea(x, y){
        this.clearHighlights();
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let highlightX = x + i;
                let highlightY = y + j;
                let squareElement = document.getElementById(`square-${highlightX}-${highlightY}`);
                if (squareElement) {
                    squareElement.classList.add('highlight');
                    this.highlightedSquares.push(squareElement);
                }
            }
        }
    };

    clearHighlights(){
        this.highlightedSquares.forEach(square => square.classList.remove('highlight'));
        this.highlightedSquares = [];
    };

     applySpellEffects(x, y){
        console.log('applySpellEffects called');
        for (let i = x; i < x + 2; i++) {
            for (let j = y; j < y + 2; j++) {
                 const chessBoard = document.querySelector(`#chessboard`);
                console.log("chessBoard", chessBoard);

      let pieces = chessBoard.querySelectorAll('.has-piece.highlight');
     
                      console.log("pieces", pieces);
                    
                if (pieces) {
                    this.applyEffectToPiece(pieces, i, j);
                }
            }
        }
    };

    applyEffectToPiece(square, x, y) {
  console.log("applyEffectToPiece called");
 const chessBoard = document.querySelector(`#chessboard`);
                console.log("chessBoard", chessBoard);

      let pieces = chessBoard.querySelectorAll('.has-piece.highlight');
  // Assuming 'pieces' is a NodeList or array of DOM elements
 
    pieces.forEach(piece => {
      // Apply the 'frozen-piece' class to each piece
      if (piece.classList) {
        piece.classList.add('frozen-piece');
      }
    });

    // Apply the 'frozen-square' class to the square
    if (square.classList) {
      square.classList.add('frozen-square');
    }
  
}

deactivateSpell() {
    console.log('Deactivating Frost Grid Spell called');
    this.toggleSpellMode('FrostGrid', false);
    const chessBoardElement = document.getElementById('chessboard');
    chessBoardElement.removeEventListener('mousemove', this.handleHover);
    chessBoardElement.removeEventListener('click', this.boundHandleSelection);
}
//BEGINNING OF CASTADEPTWANDSPELL
        // Utility function to determine the top-left corner of the 2x2 area
 determineTopLeftCorner(event) {

    const chessBoardElement = document.getElementById('chessboard');
    const boardRect = chessBoardElement.getBoundingClientRect();
    const squareSize = boardRect.width / 8; // Assuming an 8x8 chessboard

    // Calculate the mouse position relative to the chessboard
    const mouseX = event.clientX - boardRect.left;
    const mouseY = event.clientY - boardRect.top;

    // Determine the top-left square of the 2x2 area
    // Swap the calculations for x and y to align with mouse movement
    let y = Math.floor(mouseX / squareSize); // Use mouseX to calculate y
    let x = Math.floor(mouseY / squareSize); // Use mouseY to calculate x

    // Ensure the 2x2 area stays within the chessboard
    x = Math.max(0, Math.min(x, 6));
    y = Math.max(0, Math.min(y, 6));

    return { x, y };

        this.activateSpell();
    }

   getPieceFromCoords(game, row, col) {
    console.log('getPieceFromCoords called with row:', row, 'col:', col);
    const selector = `.chess-square[data-row="${row}"][data-col="${col}"]`;
    const squareElement = document.querySelector(selector);
    
    if (squareElement) {
        console.log('Found square element:', squareElement);
        const pieceElement = squareElement.querySelector('.chess-piece');
        if (pieceElement) {
            console.log('Found piece element:', pieceElement);
            return pieceElement;
        } else {
            console.error(`No piece element found in square at row ${row}, col ${col}`);
            return null;
        }
    } else {
        console.error(`No square element found at row ${row}, col ${col}`);
        return null;
    }
}



syncWithClients(gameId, data) {
    const gameSession = getGameSession(gameId);
    gameSession.players.forEach(player => {
        player.socket.emit('gameUpdate', data);
    });
}

castAdeptWandSpell(spellResult, board, game, gameId) {
  
console.log(' random rift duration being', spellResult)
 
    const riftDuration = spellResult;
        // Initialize the rift duration
        this.riftDuration = spellResult; // Duration between 1 and 6 turns
        console.log(`Rift started with duration: ${this.riftDuration} turns`);
        // this.updateRiftTurns = this.showNotification("Rift", this.riftDuration, "Piece teleported to a random square.");
        // Define and visually represent the rift area
       // this.syncWithClients(gameId, { type: 'castSpell', duration: riftDuration });

        this.defineAndShowRiftArea();

        // // Check if this piece is in the rift area
        // if (this.isInRift(this.row, this.col)) {
        //     this.randomlyPlacePiece();
        // }
    //     socket.emit('castSpell', {
    //     gameId: gameId,
    //     spellType: spellType
    // });

        const spell = {
          name: 'Rift',
          duration: this.riftDuration,
          updateEffect: () => {
            // Assuming you have a method in your game UI to update notifications
            this.updateNotification(spell.name, spell.duration, "Piece teleported to a random square.");
            
          },
            endEffect: () => {
                // Logic to end the spell effect
                this.removeRiftArea();
                this.removeNotification(spell.name);
            }
        };
        this.riftSpellDuration = this.riftDuration;
        console.log('this.riftSpellDuration in castAdeptWandSpell', this.riftSpellDuration);
        this.activeSpells.push(spell);
        this.updateGameStateInMovePiece = this.updateGameStateInMovePiece.bind(this, this.activeSpells);
        this.executeMove = this.executeMove.bind(this, this.activeSpells);


           console.log("Active Spells after adding Rift:", this.activeSpells);
        spell.updateEffect();
        // Show notification about the rift effect
       // this.showNotification(spell.name, spell.duration, "Piece teleported to a random square.");
     }
     postMoveActions(newRow, newCol, turnsLeft) {
      console.log('Executing post-move actions for piece:', this);
     
      // Check if the piece has moved into the rift
      if (this.isInRift(newRow, newCol)) 
      {
        console.log('Piece moved into rift, shuffling position');
        this.randomlyPlacePiece();
        console.log("Active Spells in postMoveActions:", this.activeSpells);
        const riftSpell = this.activeSpells.find(spell => spell.name === 'Rift');
        console.log('riftSpell in postMoveActionsos', riftSpell);
        if (riftSpell) 
        {
          console.log('trying to updateNotification on rifl increment, spell duration', riftSpell.duration);
          this.updateNotification("Rift", riftSpell.duration, "Piece teleported to a random square.");
        }
        console.log('tried to updateNotification');
      } else {
        console.log('Piece did not move into rift, no additional action taken');
      }
    }

removeRiftArea(){
   const riftCenterRow = Math.floor(this.game.board.length / 2);
        const riftCenterCol = Math.floor(this.game.board[0].length / 2);

        const riftArea = [
            [riftCenterRow - 1, riftCenterCol - 1],
            [riftCenterRow - 1, riftCenterCol],
            [riftCenterRow, riftCenterCol - 1],
            [riftCenterRow, riftCenterCol]
        ];

        riftArea.forEach(([row, col]) => {
            const square = document.querySelector(`#square-${row}-${col}`);
            if (square) {
                square.classList.remove('rift');
            }
        });
    }

    // Define and visually represent the rift area
    defineAndShowRiftArea() {
        const riftCenterRow = Math.floor(this.game.board.length / 2);
        const riftCenterCol = Math.floor(this.game.board[0].length / 2);

        const riftArea = [
            [riftCenterRow - 1, riftCenterCol - 1],
            [riftCenterRow - 1, riftCenterCol],
            [riftCenterRow, riftCenterCol - 1],
            [riftCenterRow, riftCenterCol]
        ];

        riftArea.forEach(([row, col]) => {
            const square = document.querySelector(`#square-${row}-${col}`);
            if (square) {
                square.classList.add('rift');
            }
        });
    }

    isInRift(row, col) {
        // Assuming the rift area is defined in the game state
        return this.getRiftArea().some(([riftRow, riftCol]) => riftRow === row && riftCol === col);
    }
    getRiftArea() {
        // Assuming the board is a property of this.game
        const board = this.game.board;
        const riftCenterRow = Math.floor(board.length / 2);
        const riftCenterCol = Math.floor(board[0].length / 2);

        return [
            [riftCenterRow - 1, riftCenterCol - 1],
            [riftCenterRow - 1, riftCenterCol],
            [riftCenterRow, riftCenterCol - 1],
            [riftCenterRow, riftCenterCol]
        ];
    }
     updateGameStateInMovePiece(game, activeSpells) {
    console.log(".game in updateGameStateInMovePiece :", game);
    console.log("Flag before executeMove:", this.hasMovedDueToRift);
console.log(".activeSpells in updateGameStateInMovePiece :", activeSpells);
    
activeSpells = this.activeSpells;
console.log('activeSpells in updateGameStateInMovePiece', activeSpells);
    // Update the current player
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    console.log("Active Spells in updateGameStateInMovePiece:", this.activeSpells);
    // Update active spells
    this.activeSpells.forEach(spell => {
      console.log('spell.duration before -- :', spell.duration);
        this.riftSpellDuration --;
        console.log('spell.duration after -- :', spell.duration);
        if (this.riftSpellDuration > 0) {
          this.updateNotification(spell.name, this.riftSpellDuration, "Piece teleported to a random square.");
       
        } else {
            spell.endEffect();
        }
    });

    // Remove spells that have ended
    this.activeSpells = this.activeSpells.filter(spell => spell.duration > 0);



    // ... any additional game state updates ...
}
    // Method to randomly place a piece on the board
    randomlyPlacePiece(game) {
      
      console.log('this.game.board in randomlyPlacePiece', this.game.board);
    if (this.isRandomlyPlacing) {
        console.log('Already placing a piece, exiting to prevent overlap.');
        return;
    }

    this.isRandomlyPlacing = true;

    // Function to get empty squares
    const getEmptySquares = squareElements => squareElements.filter(square => !square.classList.contains('has-piece'));

    // Use the function to get empty squares from the board's square elements
    let emptySquares = getEmptySquares(this.board.squareElements);
    console.log('emptySquares :', emptySquares);
    if (emptySquares.length === 0) {
        console.error('No empty squares available');
        this.isRandomlyPlacing = false;
        return;
    }

    // Randomly select an empty square
    let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    // Extract row and col from the square's ID (assuming IDs are in the format 'square-row-col')
    const [_, randomRow, randomCol] = randomSquare.id.split('-').map(Number);

    // Use forceMove to move the piece
    this.forceMove(this, randomRow, randomCol, true);

    this.isRandomlyPlacing = false;
    this.hasMovedDueToRift = true;
        console.log("Rift move completed, flag set:", this.hasMovedDueToRift);
    console.log(`Piece moved to new position: (${randomRow}, ${randomCol})`);
}


updateRiftDurationOnPlayerChange() {
    console.log("updateRiftDurationOnPlayerChange called");
        console.log("Current active spells:", this.activeSpells);

    const riftSpell = this.activeSpells.find(spell => spell.name);
    console.log("Rift Spell found:", riftSpell);

    if (riftSpell) {
        riftSpell.duration--;
        console.log(`Rift duration decremented to ${riftSpell.duration}`);

        if (riftSpell.duration > 0) {
            this.updateNotification(riftSpell.name, riftSpell.duration, "Piece teleported to a random square.");
        } else {
            riftSpell.endEffect();
            this.activeSpells = this.activeSpells.filter(spell => spell !== riftSpell);
            console.log("Rift spell ended and removed from active spells");
        }
    }
}


  // END OF RIFT SPELL AKA ADEPTWANDSPELL
        //STILL NOT FUNCITONNNAL\\
//BEGINNING OF FINAL STAND SPELL
  startFinalStand() 
  {
    this.isFinalStandActive = true;
    // this.createMiniBoardContainer();
    this.setupMiniBoard();
    this.clearMiniBoard();
    // this.positionMiniBoard();
    // this.selectPiecesForMiniGame();
    // Notify players about the start of the mini-game
  }

      setupMiniBoard() {
    console.log('Current player color:', this.playerColor || this.game?.currentPlayer);        if (this.playerColor === 'white') {
        // Bottom right for white
        this.miniBoardArea = { x1: 6, y1: 6, x2: 7, y2: 7 };
    } else if (this.playerColor === 'black') {
        // Top left for black
        this.miniBoardArea = { x1: 0, y1: 0, x2: 1, y2: 1 };
    }
        this.highlightMiniBoardArea();
        // Visually distinguish the mini-board area (CSS changes)
        // Disable interactions for pieces outside the mini-board
        const allSquares = document.querySelectorAll('.chess-square');
        console.log('allSquares', allSquares);
        allSquares.forEach(square => {
            const row = parseInt(square.getAttribute('data-row'));
            const col = parseInt(square.getAttribute('data-col'));
            if (!this.isWithinMiniBoard(row, col)) {
                square.classList.add('inactive-square');
            }
        });

        // Gray out or blur other pieces and board squares
        // Example: Adding a CSS class to gray out pieces
        const allPieces = document.querySelectorAll('.chess-piece');
        allPieces.forEach(piece => {
            const row = parseInt(piece.parentNode.getAttribute('data-row'));
            const col = parseInt(piece.parentNode.getAttribute('data-col'));
            if (!this.isWithinMiniBoard(row, col)) {
                piece.classList.add('grayed-out');
            }
        });
    }

    clearMiniBoard() {
      console.log('clearMiniBoard function entered');
      console.log('this.miniBoardArea.x1', this.miniBoardArea.x1, 'this.miniBoardArea.y1', this.miniBoardArea.y1, 'this.miniBoardArea.y2', this.miniBoardArea.y2, 'this.miniBoardArea.x2', this.miniBoardArea.x2);
      const unoccupiedSquares = Array.from(document.querySelectorAll('.chess-square:not(.has-piece)'))
      .filter(square => !this.isWithinMiniBoard(
        parseInt(square.getAttribute('data-row')),
        parseInt(square.getAttribute('data-col'))
        ));

      for (let row = this.miniBoardArea.y1; row <= this.miniBoardArea.y2; row++) {
        for (let col = this.miniBoardArea.x1; col <= this.miniBoardArea.x2; col++) {
            const square = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
            if (!square) {
                console.error(`Square not found at row ${row}, col ${col}`);
                continue;
            }
            console.log('Clearing square:', square);
            const piece = square.querySelector('.chess-piece');
            if (piece) {
                // Randomly select an unoccupied square and move the piece there
                if (unoccupiedSquares.length > 0) {
                    const randomIndex = Math.floor(Math.random() * unoccupiedSquares.length);
                    const targetSquare = unoccupiedSquares[randomIndex];
                    unoccupiedSquares.splice(randomIndex, 1); // Remove the square from the array

                    this.forceMovePieceToSquare(piece, targetSquare);
                    // square.classList.remove('has-piece');
                } else {
                    console.error('No unoccupied squares available to move the piece');
                }
            }
        }
    }

    // Rest of your code for placing pawns and prompting for piece selection
    this.handlePieceSelection();
}

    highlightMiniBoardArea() {
    console.log('highlightMiniBoardArea function called');
    
    // Create the mini-board container
    const chessboard = document.getElementById('chessboard'); // Main chessboard container ID
    const miniBoardContainer = document.createElement('div');
    miniBoardContainer.className = 'mini-board-container';
    chessboard.appendChild(miniBoardContainer);

    let topLeftSquare, bottomRightSquare;

    // Find the top-left and bottom-right squares of the mini-board
    for (let row = this.miniBoardArea.y1; row <= this.miniBoardArea.y2; row++) {
        for (let col = this.miniBoardArea.x1; col <= this.miniBoardArea.x2; col++) {
            const square = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
            square.classList.add('mini-board-highlight');
            if (!topLeftSquare) topLeftSquare = square;
            bottomRightSquare = square;
        }
    }

    // Calculate the position and size for the mini-board container
    const topLeftRect = topLeftSquare.getBoundingClientRect();
    const bottomRightRect = bottomRightSquare.getBoundingClientRect();

    // Set the position and size of the mini-board container
    miniBoardContainer.style.position = 'absolute';
    miniBoardContainer.style.left = `${topLeftRect.left}px`;
    miniBoardContainer.style.top = `${topLeftRect.top}px`;
    miniBoardContainer.style.width = `${bottomRightRect.right - topLeftRect.left}px`;
    miniBoardContainer.style.height = `${bottomRightRect.bottom - topLeftRect.top}px`;


    // Highlight the mini-board area and set up piece event listeners
    for (let row = this.miniBoardArea.y1; row <= this.miniBoardArea.y2; row++) {
        for (let col = this.miniBoardArea.x1; col <= this.miniBoardArea.x2; col++) {
            const square = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
            square.classList.add('mini-board-highlight');
            square.addEventListener('click', this.handleSquareClick);
        }
    }

    // Gray out or blur other pieces and board squares
    const allSquares = document.querySelectorAll('.chess-square');
    allSquares.forEach(square => {
        const row = parseInt(square.getAttribute('data-row'));
        const col = parseInt(square.getAttribute('data-col'));
        if (!this.isWithinMiniBoard(row, col)) {
            square.classList.add('inactive-square');
            const piece = square.querySelector('.chess-piece');
            if (piece) {
                piece.classList.add('grayed-out');
            }
        }
    });
}
     setupPieceEventListeners() {
        const allSquares = document.querySelectorAll('.chess-square');
        allSquares.forEach(square => {
            const row = parseInt(square.getAttribute('data-row'), 10);
            const col = parseInt(square.getAttribute('data-col'), 10);

            if (this.isWithinMiniBoard(row, col)) {
                // Attach event listeners as usual
                square.addEventListener('click', this.handleSquareClick);
            } else {
                // Optionally, visually indicate that the square is inactive
                square.classList.add('inactive-square');
            }
        });
    }

    isWithinMiniBoard(row, col) {
      console.log('isWithinMiniBoard function called');
        return row >= this.miniBoardArea.y1 && row <= this.miniBoardArea.y2 &&
               col >= this.miniBoardArea.x1 && col <= this.miniBoardArea.x2;
    }
    isMoveValid(piece, targetRow, targetCol) 
    {
        if (this.isFinalStandActive) 
        {
            return this.isWithinMiniBoard(targetRow, targetCol);
                   /* Add other standard move validation checks here */
        } else {
            // Existing move validation logic
        }
    }

    checkMiniBoardAndEndFinalStand() {
  console.log('checkMiniBoardAndEndFinalStand function called');

  // Check if the mini-board spell is active
  const miniBoardSquares = document.querySelectorAll('.mini-board-highlight');
  console.log('miniBoardSquares', miniBoardSquares.length);

  // If no mini-board squares are highlighted, return early
  if (miniBoardSquares.length === 0) {
    console.log('No mini-board squares highlighted. Spell is not active.');
    return;
  }

  // If the spell is active, continue to check the pieces
  const miniBoardWhitePieces = document.querySelectorAll('.mini-board-highlight .chess-piece.white');
  const miniBoardBlackPieces = document.querySelectorAll('.mini-board-highlight .chess-piece.black');
  console.log('miniBoardWhitePieces', miniBoardWhitePieces.length, 'miniBoardBlackPieces', miniBoardBlackPieces.length);

  if (miniBoardWhitePieces.length <= 1 || miniBoardBlackPieces.length <= 1) {
    this.endFinalStand();
  }
}

    // Method to end the Final Stand spell
//     endFinalStand() {
//   const whitePiecesCount = document.querySelectorAll('.mini-board-highlight .chess-square:has(.chess-piece.white)').length;
//   const blackPiecesCount = document.querySelectorAll('.mini-board-highlight .chess-square:has(.chess-piece.black)').length;

//   // Check if either player has 0 or 1 pieces left
//   if (whitePiecesCount <= 1 || blackPiecesCount <= 1) {
//     console.log('whitePieceCount or blackPieceCount inferior to one, cancelling the finalstandspell');
//     // Re-enable interactions for all pieces
//     document.querySelectorAll('.chess-square').forEach(square => square.classList.remove('inactive'));
//     document.querySelectorAll('.chess-piece').forEach(piece => piece.classList.remove('grayed-out'));

//     // Remove visual distinctions of the mini-board
//     // ... (Resetting CSS changes as needed)
//     const outsidePieces = document.querySelectorAll('.chess-square:not(.mini-board-highlight) .chess-piece');
//     outsidePieces.forEach(piece => {
//     this.attachEventListenersToPiece(piece); // Attach event listeners
//   });
//     this.isFinalStandActive = false;
//     this.applyFinalStandOutcome();
//     // Additional logic for the outcome of the mini-game
//   }
// }
endFinalStand() {
  const whitePiecesCount = document.querySelectorAll('.mini-board-highlight .chess-square:has(.chess-piece.white)').length;
  const blackPiecesCount = document.querySelectorAll('.mini-board-highlight .chess-square:has(.chess-piece.black)').length;

  console.log('White pieces count:', whitePiecesCount, 'Black pieces count:', blackPiecesCount);

  if (whitePiecesCount <= 1 || blackPiecesCount <= 1) {
    console.log('Ending Final Stand Spell');

    document.querySelectorAll('.chess-square').forEach(square => {
      console.log('Removing inactive from:', square);
      square.classList.remove('inactive-square');
      square.classList.remove('mini-board-highlight');
    });

    document.querySelectorAll('.chess-piece').forEach(piece => {
      console.log('Removing grayed-out from:', piece);
      piece.classList.remove('grayed-out');
    });

    const outsidePieces = document.querySelectorAll('.chess-square:not(.mini-board-highlight) .chess-piece');
    outsidePieces.forEach(piece => {
      console.log('Reattaching event listeners to:', piece);
      this.attachEventListenersToPiece(piece);
    });

    this.isFinalStandActive = false;
    this.applyFinalStandOutcome();
  } else {
    console.log('Final Stand Spell continues');
  }
}
attachEventListenersToPiece(piece) {
  // Logic to attach the necessary event listeners to the piece
  // For example:
  piece.addEventListener('click', this.boundHandleClick);
  // ... other event listeners as needed
}
    // Method to handle the outcome of Final Stand
    applyFinalStandOutcome() {
        // Apply effects based on the finalStandScore
        // E.g., revive a piece, grant an extra move, etc.
    }
    

    handlePieceSelection(pieceType) 
    {
    // Get the current player's color
    const playerColor = this.currentPlayer; // Adjust this based on your game state

    // Directly create a new piece of the chosen type and color
    this.finalStandPlayerPieces = this.queryAlliedMiniBoardPieces(playerColor);

    // Hide the selection UI
    const selectionContainer = document.getElementById('piece-selection-container');
    if (selectionContainer) {
        selectionContainer.style.display = 'none';
    }

    // Continue with the setup
    this.selectOpponentPiece();
     this.setupMiniBoard();
}
    selectOpponentPiece() {
      const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
      // Select two or three pawns and one upgraded piece for the opponent
      this.finalStandOpponentPieces = this.queryOponentMiniBoardPieces(opponentColor);

      // Place pieces on the mini-board
      this.placePiecesOnMiniBoard(this.finalStandPlayerPieces, this.finalStandOpponentPieces);

    }

queryOponentMiniBoardPieces(color) {
  const opponentColor = this.currentPlayer === 'white' ? 'black' : 'white';
  const opponentPawn = Array.from(document.querySelectorAll(`.chess-piece.${opponentColor}-pawn`))
  const opponentUpgradedPiece = Array.from(document.querySelectorAll(`.chess-piece.${opponentColor}-rook, 
                                                                       .chess-piece.${opponentColor}-bishop, 
                                                                       .chess-piece.${opponentColor}-knight`));
  const selectedPawns = this.randomlySelectPieces(opponentPawn, 2);
  // Randomly select one upgraded piece
  const selectedUpgradedPiece = this.randomlySelectPieces(opponentUpgradedPiece, 1);

  return selectedPawns.concat(selectedUpgradedPiece);

    // Your logic to randomly select two or three pawns and one upgraded piece (rook, bishop, or knight)
    // Return an array of these pieces
}
queryAlliedMiniBoardPieces(color) {
  const alliedColor = this.currentPlayer;

  const alliedPawn = Array.from(document.querySelectorAll(`.chess-piece.${alliedColor}-pawn`));
  const selectedPawns = this.randomlySelectPieces(alliedPawn, 2);

  // Fetch upgraded pieces excluding the ones already selected as pawns
  const upgradedPieceSelector = `.chess-piece.${alliedColor}-rook, .chess-piece.${alliedColor}-bishop, .chess-piece.${alliedColor}-knight`;
  const alliedUpgradedPiece = Array.from(document.querySelectorAll(upgradedPieceSelector))
                                   .filter(piece => !selectedPawns.includes(piece));

  const selectedUpgradedPiece = this.randomlySelectPieces(alliedUpgradedPiece, 1);

  console.log('Selected pawns:', selectedPawns, 'Selected upgraded piece:', selectedUpgradedPiece);

  return selectedPawns.concat(selectedUpgradedPiece);
}

randomlySelectPieces(pieces, count) {
  console.log('pieces', pieces);

  // Convert NodeList to an array
  const piecesArray = Array.from(pieces);

  // Now sort the array
  const shuffledPieces = piecesArray.sort(() => 0.5 - Math.random());
  const selectedPieces = [];

  for (let i = 0; i < count && i < shuffledPieces.length; i++) {
    selectedPieces.push(shuffledPieces[i]);
  }

  return selectedPieces;
}
placePiecesOnMiniBoard(playerPieces, opponentPieces) {
  // Shuffle and combine the pieces array
  const allPieces = playerPieces.concat(opponentPieces).sort(() => 0.5 - Math.random());

  allPieces.forEach(piece => {
    // Get and shuffle the current list of empty squares
    const emptySquares = Array.from(document.querySelectorAll('.mini-board .chess-square:not(.has-piece)'))
                              .sort(() => 0.5 - Math.random());

    if (emptySquares.length > 0) {
      const targetSquare = emptySquares[0]; // Select the first square from the shuffled array
      this.forceMovePieceInsideMiniBoard(piece, targetSquare);
    } else {
      console.error('No unoccupied squares available to place the piece');
    }
  });
}
forceMovePieceToSquare(piece, targetSquare) {
  console.log('forceMovePieceToSquare function entered with piece', piece);

  if (!targetSquare) {
    console.error('No target square provided');
    return;
  }

  const fromRow = parseInt(piece.parentNode.getAttribute('data-row'));
  const fromCol = parseInt(piece.parentNode.getAttribute('data-col'));
  const toRow = parseInt(targetSquare.getAttribute('data-row'));
  const toCol = parseInt(targetSquare.getAttribute('data-col'));

  console.log('fromRow', fromRow, 'fromCol', fromCol, 'toRow', toRow, 'toCol', toCol);

  // Call the forceMove function with the target position
  this.forceMove(piece, fromRow, fromCol, toRow, toCol);
}

forceMovePieceInsideMiniBoard(piece, miniBoardArea) {
  console.log('forceMovePieceInsideMiniBoard function entered with piece', piece);
  console.log('this.miniBoardArea.y2', this.miniBoardArea.y2);
  console.log('this.miniBoardArea.y1', this.miniBoardArea.y1);
  console.log('this.miniBoardArea.x2', this.miniBoardArea.x2);
  console.log('this.miniBoardArea.x1', this.miniBoardArea.x1);
  const fromRow = parseInt(piece.parentNode.getAttribute('data-row'));
  const fromCol = parseInt(piece.parentNode.getAttribute('data-col'));

  let toRow, toCol, attempts = 0;

   do {
    if (attempts++ > 15) { // Prevent infinite loop
      console.error('Unable to find an empty square after 50 attempts.');
      return;
    }

    toRow = Math.floor(Math.random() * (this.miniBoardArea.y2 - this.miniBoardArea.y1 + 1)) + this.miniBoardArea.y1;
    toCol = Math.floor(Math.random() * (this.miniBoardArea.x2 - this.miniBoardArea.x1 + 1)) + this.miniBoardArea.x1;

    console.log('Attempt', attempts, ': trying row', toRow, 'col', toCol);
  } while (this.isSquareEmpty(toRow, toCol) === false);

  console.log('Moving piece from', fromRow, fromCol, 'to', toRow, toCol);
  this.forceMove(piece, fromRow, fromCol, toRow, toCol);
}
isSquareEmpty(row, col) {
  console.log('row', row, 'col', col);
  // Select the square using data attributes for row and column
  const squareSelector = `.chess-square[data-row='${row}'][data-col='${col}']`;
  const square = document.querySelector(squareSelector);
  console.log('squareSelector', squareSelector);
  // If the square is not found, return false (as we can't determine if it's empty)
  if (!square) {
    console.error(`Square at row ${row} and column ${col} not found.`);
    return false;
  }

  // A square is empty if it has no child nodes
  return !square.hasChildNodes();
}


   

    // Check if Final Stand should end
    checkFinalStandEndCondition() {
        // Check if any player reached the point threshold
    }

    
//END OF FINAL STAND SPELL


                // BEGINNING OF PETRIFYING SPELL

        // castPetrifySpell(spellResult) {
        //   console.log('castPetrifySpell function entered spell result being :', spellResult)
        // // Randomly select enemy and ally pieces
        //   const enemyColor = this.currentPlayer === 'white' ? 'black' : 'white';
        //   console.log(enemyColor);
        //   const board = document.querySelector('#chessboard');

        //   const enemyPieces = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);
        //   console.log("enemyPieces", enemyPieces);

        //   const allyColor = this.currentPlayer;
        //   console.log(allyColor);
        //   // board = document.querySelector('#chessboard');

        //   const allyPieces = document.querySelectorAll(`.chess-piece.${allyColor}-pawn`);
        //   console.log("allyPieces", allyPieces);
        //   console.log("spellResult.enemies", spellResult.selectedEnemiesCount, 'spellResult.selectedEnemiesCount', spellResult.selectedAlliesCount);
        //   const selectedEnemies = this.selectRandomPieces(enemyPieces, spellResult.selectedEnemiesCount); // 2 to 4
        //   const selectedAllies = this.selectRandomPieces(allyPieces, spellResult.selectedAlliesCount); // 1 to 3
        //   console.log('selectedEnemies :', selectedEnemies);
        //   console.log('selectedAllies :', selectedAllies);
        //   // Apply petrification
        //   this.applyPetrification(selectedEnemies.concat(selectedAllies), spellResult);
         // }
         castPetrifySpell(spellResult, ally, enemy, game) {
    console.log('castPetrifySpell function entered, spell result being:', spellResult);

    // Get all enemy and ally pieces
    const enemyColor = this.currentPlayer === 'white' ? 'black' : 'white';
    console.log('enemyColor', enemyColor)
    const enemyPieces = Array.from(document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`));
console.log('enemyPieces', enemyPieces)
    const allyColor = this.currentPlayer;
    const allyPieces = Array.from(document.querySelectorAll(`.chess-piece.${allyColor}-pawn`));
console.log('allyColor', allyColor)
console.log('allyPieces', allyPieces)
    // Select pieces based on provided indices
    const selectedEnemies = spellResult.selectedEnemyIndices;
    const selectedAllies = spellResult.selectedAllyIndices;
    
      this.processSelectedPieces(selectedEnemies, spellResult, game);
    

      this.processSelectedPieces(selectedAllies, spellResult, game);
    
    
    console.log('Selected enemies:', selectedEnemies);
    console.log('Selected allies:', selectedAllies);

    
    const totalPieces = selectedEnemies.concat(selectedAllies);
    const totalTurnsPetrified = spellResult.turnsPetrified.slice(0, totalPieces.length);
    const totalTurnsUntilDestruction = spellResult.turnsUntilDestruction.slice(0, totalPieces.length);
    console.log('check before the call to applyPetrification totalTurnsPetrified being:', totalTurnsPetrified, 'totalTurnsUntilDestruction', totalTurnsUntilDestruction);

    this.applyPetrification(totalPieces, totalTurnsPetrified, totalTurnsUntilDestruction);

} processSelectedPieces(selectedPieces, spellResult, game) {
        selectedPieces.forEach((piece, index) => {
            const { row, col } = piece;
             const element = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);            

            const child = element.querySelector('.chess-piece');
            const turnsUntilDestruction = spellResult.turnsUntilDestruction[index];
            const turnPetrified = this.getCurrentTurnCount();

            if (element) {
                console.log('about to call petrifyElement with', child);
                this.petrifyElement(child, turnPetrified, turnsUntilDestruction, game);
            } else {
                console.error(`No element found at row ${row}, col ${col}`);
            }
        });
    }

 petrifyElement(element, turnPetrified, turnsUntilDestruction) {
        console.log('Petrifying element:', element);

        element.classList.add('petrified'); // Add a class to indicate petrification
        element.dataset.petrifiedOnTurn = turnPetrified;
        element.dataset.turnsUntilDestruction = turnsUntilDestruction;
        this.createPetrifiTimer(element, turnsUntilDestruction);
    }
        
        applyPetrification(pieces, spellResult) 
        {
          pieces.forEach(pieceElement => 
          {
          const turnsPetrified = spellResult.turnsPetrified; // 1 or 2 turns
          this.petrifyElement(pieceElement, turnsPetrified, spellResult);
        });
        }

      //   petrifyElement(element, turns, spellResult, game) {
      //     console.log('about to call petrifyElement with', element);
      //   const turnsUntilDestruction = spellResult.turnsUntilDestruction; // Random number between 1 and 3
      //   element.classList.add('petrified'); // Add a class to indicate petrification
      //   element.dataset.petrifiedOnTurn = this.getCurrentTurnCount();
      //   element.dataset.turnsUntilDestruction = turnsUntilDestruction;

      //   this.createPetrifiTimer(element, turnsUntilDestruction, game);
      // }

      createPetrifiTimer(element, turnPetrified, turnsUntilDestruction, game)
      {
        const indicator = document.createElement('span');
        indicator.className = 'petrification-timer';
        indicator.textContent = turnPetrified;
        element.appendChild(indicator);
      }

      getCurrentTurnCount() 
      {
        const turnCountDisplay = document.querySelector('#turn-count-display');
        if (turnCountDisplay) 
        {
        // Assuming the turn count is displayed as "Turn: X"
          const turnText = turnCountDisplay.textContent;
          const turnNumberMatch = turnText.match(/\d+/); // Regular expression to extract number
          if (turnNumberMatch) 
          {
            return parseInt(turnNumberMatch[0], 10);
          }
        }
        return -1; // Return an error value if turn count cannot be determined
      }

      updatePetrifiedPieces() {
    const petrifiedPieces = document.querySelectorAll('.petrified');
    petrifiedPieces.forEach(piece => {
        let turnsUntilDestruction = parseInt(piece.dataset.turnsUntilDestruction, 10);
        turnsUntilDestruction -= 1;

        if (turnsUntilDestruction <= 0) {
            this.clearPetrification(piece);
        } else {
            piece.dataset.turnsUntilDestruction = turnsUntilDestruction;
            this.updatePetrificationIndicator(piece);
        }
    });
}

      updatePetrifyExpiration(piece) 
      {
      // Ensure the values are integers
        const petrifiedOnTurn = parseInt(piece.dataset.petrifiedOnTurn, 10);
        let turnsUntilDestruction = parseInt(piece.dataset.turnsUntilDestruction, 10);

        // Calculate the number of full turns passed since petrification
        const turnsPassed = Math.floor((this.getCurrentTurnCount() - petrifiedOnTurn) / 2);

        // If more than a full turn has passed, update the turn countdown
        if (turnsPassed > 0) 
        {
          turnsUntilDestruction -= turnsPassed;
          // Update the data attribute and the indicator
          piece.dataset.turnsUntilDestruction = turnsUntilDestruction;
          this.updatePetrificationIndicator(piece);
          // If the countdown has reached zero or less, remove petrification
          if (turnsUntilDestruction <= 0) 
          {
            const parent = piece.parentNode;
            const col = parent.getAttribute('data-col');
            const row = parent.getAttribute('data-row');

            console.log('parent', parent, 'row', row, 'col', col);
            this.forceRemove(row, col);
            piece.classList.remove('petrified');
            piece.removeAttribute('data-turnsUntilDestruction');
            const petrificationIndicator = piece.querySelector('.petrification-indicator');
            if (petrificationIndicator) 
            {
              petrificationIndicator.remove();
            }
          }
        }
      }

      updatePetrificationIndicator(piece) 
      {
        console.log("updatePetrificationIndicator function called with:", piece);
        const turnsRemaining = parseInt(piece.dataset.turnsUntilDestruction, 10);
        const indicator = piece.querySelector('.petrification-timer');

        if (indicator) 
        {
          indicator.textContent = turnsRemaining;
        }
      }

      // Method to attempt transferring petrification to an ally piece
      attemptToTransferPetrification(currentPlayerColor) 
      {
        console.log("attemptToTransferPetrification function called for:", currentPlayerColor);

        if (Math.random() <= 0.7) 
        { // 70% chance to transfer petrification
          console.log('petrification probability is correct');
          const allyPieces = document.querySelectorAll(`.chess-piece.${currentPlayerColor}-pawn:not(.petrified)`);
          console.log("Ally pieces for potential petrification:", allyPieces);

          if (allyPieces.length > 0) 
          {
            const randomIndex = Math.floor(Math.random() * allyPieces.length);
            const randomAlly = allyPieces[randomIndex];
            console.log('randomAlly', randomAlly);
            
            // You need to ensure randomAlly is processed correctly for petrification
            // For instance, add petrified class, set data attributes, etc.
            randomAlly.classList.add('petrified');
            randomAlly.dataset.petrifiedOnTurn = this.getCurrentTurnCount();
            randomAlly.dataset.turnsUntilDestruction = 1; // Set petrification for 1 turn
            this.createPetrifiTimer(randomAlly, 1);
          }
        }
      }

      selectRandomPieces(pieces, numPieces) 
      {
        console.log('selectRandomPiece function entered, numbPcs being :', numPieces);
      // Convert NodeList to an array to use array methods
        const piecesArray = Array.from(pieces);

        // Shuffle the array using the Fisher-Yates (Durstenfeld) shuffle algorithm
        for (let i = piecesArray.length - 1; i > 0; i--) 
        {
          const j = Math.floor(Math.random() * (i + 1));
          [piecesArray[i], piecesArray[j]] = [piecesArray[j], piecesArray[i]];
        }

        // Slice the array to get the required number of pieces
        return piecesArray.slice(0, numPieces);
      }

      clearPetrification(piece) 
      {
        piece.classList.remove('petrified');
        piece.removeAttribute('data-petrifiedOnTurn');
        piece.removeAttribute('data-turnsUntilDestruction');

        const petrificationIndicator = piece.querySelector('.petrification-timer');
        if (petrificationIndicator) 
        {
          petrificationIndicator.remove();
        }
      }

    // END OF PETRIFYING SPELL
      // BEGIN OF CHESSQUAKE SPELL
applyChessquakeEffect(board) {
  console.log('applyChessquakeEffect function entered');
        // Applying effects to each piece
  const chessBoard = document.querySelector('#chessboard');
  const pieces = document.querySelectorAll('.chess-square.event-listener-attached.has-piece');
  console.log('pieces', pieces);
        pieces.forEach(piece => {
            let effectRoll = Math.random();
            if (effectRoll < 0.01) {
                // 2;5% chance to remove the piece
                this.removepPiece(board, piece);
            } else if (effectRoll < 0.009) {
                // 25% chance to move the piece to a random empty square
                this.movePieceToRandomSquare(board, piece);
            } else if (effectRoll < 0.1) {
                // 25% chance to swap with another piece
                this.swapPiece(piece);
                
            }
            // 25% chance to do nothing
        });
        // console.log('Calling syncBoardState');
        // this.syncBoardState();             
        // console.log('syncBoardState called');
      const emptySquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    console.log('emptySquares', emptySquares);
    // Applying effects to unoccupied squares
    emptySquares.forEach(square => {
        let squareEffectRoll = Math.random();
        if (squareEffectRoll < 0.05) {
            // 5% chance for Magma Square
            this.createMagmaSquare(board, square);
        } else if (squareEffectRoll < 0.08) {
            // 3% chance for Hole
            this.createHole(board, square);
        } else if (squareEffectRoll < 0.12) {
            // 4% chance for Rock
            this.createRock(board, square);
        }
        // Other squares remain unaffected
    });
}
    removepPiece(board, piece) {
    console.log('removepiece function called for :', piece);
    
    const row = piece.getAttribute('data-row');
    const col = piece.getAttribute('data-col');
    this.forceRemove(row, col);
     }
    movePieceToRandomSquare(board, piece) {
    console.log('Moving piece to a random square:', piece);
    const child =  piece.querySelector('.chess-piece');
    const row = piece.getAttribute('data-row');
    const col = piece.getAttribute('data-col');

    const emptySquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    if (emptySquares.length === 0) {
        console.log('No empty squares available for movement.');
        return; // No empty square available
    }

    // Select a random empty square
    const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newRow = randomSquare.getAttribute('data-row');
    const newCol = randomSquare.getAttribute('data-col');
    
    // Remove piece from current position
    
     this.forceMove(child, row, col, newRow, newCol);

   
}
    swapWithRandomPiece(board, piece) { 
      console.log('removepiece function called')
    }
    createMagmaSquare(board, square) {
  console.log('createMagmaSquare function called for:', square);

  // Add a class to visually indicate the square is now a Magma Square
  square.classList.add('magma-square');

  // Update the board data structure to reflect the Magma effect
  const row = parseInt(square.getAttribute('data-row'), 10);
const col = parseInt(square.getAttribute('data-col'), 10);
  this.game.board[row][col] = 'magma';
}

createHole(board, square) {
  console.log('createHole function called for:', square);

  // Add a class to visually indicate the square is now a Hole
  square.classList.add('hole-square');

  // Update the board data structure to reflect the Hole effect
  const row = parseInt(square.getAttribute('data-row'), 10);
const col = parseInt(square.getAttribute('data-col'), 10);
  this.game.board[row][col] = 'hole';

  // Add an event listener to move pieces that land on this hole to a random empty square
  square.addEventListener('pieceLanded', () => {
    const emptySquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    if (emptySquares.length > 0) {
      const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      this.movePieceToRandomSquare(board, square); // Reuse the existing function
    }
  });
}

createRock(board, square) {
  console.log('createRock function called for:', square);

  // Add a class to visually indicate the square is now occupied by a Rock
  square.classList.add('rock-square');

  // Update the board data structure to reflect the Rock effect
  const row = parseInt(square.getAttribute('data-row'), 10);
const col = parseInt(square.getAttribute('data-col'), 10);
  this.game.board[row][col] = 'rock';
  this.game.board[row][col] = 'rock'; // This indicates that the square is occupied and cannot be landed on
}

// This helper function can be used to simulate a piece landing on a square
 triggerPieceLanding(square) {
  const pieceLandedEvent = new Event('pieceLanded');
  square.dispatchEvent(pieceLandedEvent);
}
      //END OF CHESSQUAKESPELL


    

    //BEGINNING OF PLIT AND MERGE SPELL
static activateSplitSpell(pieces) {
        // Randomly select and split pieces
        pieces.forEach(piece => piece.split());
    }

    // Split this piece
    split() {
        if (!this.isSplit && this.type !== 'King' && this.type !== 'Pawn') { // Assuming King and Pawn are not splittable
            this.isSplit = true;
            // You can define the behavior of each split part here or delegate to another method
            // e.g., setting different movement capabilities for each part
        }
    }

    // Check if this piece can merge with another
    canMergeWith(otherPiece) {
        return this.isSplit && otherPiece.isSplit && 
               this.type === otherPiece.type && 
               this.color === otherPiece.color &&
               this.areAdjacent(otherPiece); // Implement areAdjacent to check adjacency
    }

    // Merge this piece with another
    mergeWith(otherPiece) {
        if (this.canMergeWith(otherPiece)) {
            this.isSplit = false;
            otherPiece.isSplit = false;
            this.splitPart = null;
            otherPiece.splitPart = null;
            // Further merge logic, like combining back into a single piece on the board
        }
    }

    //END OF SPLIT AND MERGE SPELL


    //BEGIN OF STICK OF THE FOREST SPELL
    castStickOfTheForestSpell()
    {
        console.log('castStickOfTheForestSpell function called');

    }
     assignRandomElement(seedElements) {
        const randomIndex = Math.floor(Math.random() * seedElements.length);
        this.seedElement = seedElements[randomIndex];
    }
    growSeed() {
        if (this.seedStage > 0 && this.seedStage < MAX_GROWTH_STAGE) {
            this.seedStage++;
        }
    }
    activateTreeAbility(board) {
        if (this.seedStage === MAX_GROWTH_STAGE) {
            // Example: Activate ability based on element
            switch(this.seedElement) {
                case 'Fire':
                  this.castFirePlantSpell();
                    // Fire ability logic
                    break;
                case 'Frost':
                  this.castFirePlantSpell();
                  // Frost ability logic
                    break;
                case 'Stone':
                  this.castStonePlantSpell();
                    // Fire ability logic
                    break;
                case 'Light':
                  this.castLightPlantSpell();
                    // Fire ability logic
                    break;
                case 'Mystic':
                    // Fire ability logic
                  this.castMysticPlantSpell();
                    break;
                case 'Aqua':
                  this.castWaterPlantSpell();
                    // Fire ability logic
                    break;
                case 'Earth':
                  this.castEarthPlantSpell();
                    // Fire ability logic
                    break;
                case 'Whirlwind':
                  this.castWindPlantSpell();
                    // Fire ability logic
                    break;
                case 'Quake':
                  this.castQuakePlantSpell();
                    // Fire ability logic
                    break;
                // ... other cases for different elements
            }
            this.seedStage = 0; // Reset the seed stage after activation
        }
    }
    
    checkAndTriggerCombo() {
    const boardElements = this.getBoardElements();
    const randomElement = this.getRandomElement(boardElements);

    const comboTriggers = {
      'FireWater': this.triggerInfernoWave(),
      'EarthAir': this.triggerSandstormDance(),
      'LightShadow': this.triggerEclipseMirage(),
      'FrostFire': this.triggerThermalShock(),
      'MysticNature': this.triggerVerdantResurgence(),
      'WaterAir': this.triggerHurricaneSurge(),
      'ShadowFire': this.triggerDarkFlame(),
      'NatureFrost': this.triggerIcyBloom(),
      'MysticLight': this.triggerArcaneIllumination(),
      'AirShadow': this.triggerWhisperingShadows(),
      'WaterMystic': this.triggerReflectionPool(),
      'EarthFrost': this.triggerFrozenGround(),
      'FireNature': this.triggerWildfireGrowth(),
      'LightAir': this.triggerRadiantWind(),
      'ShadowEarth': this.triggerTerrifyingQuake(),
      'MysticAir': this.triggerEtherealBreeze(),

        // ... other combos
    };

    const comboKey = this.element + randomElement;
    const triggerFunction = comboTriggers[comboKey];

    if (triggerFunction) {
        triggerFunction.call(this);
    }
}

    
    //END OF STICK OF THE FOREST SPELL

//BEGINNING OF randomDiceMove spell\\
// rollDiceForSpell() {
//     return Math.floor(Math.random() * 4) + 1 + Math.floor(Math.random() * 4) + 1;
//   }

//   // Method to select a random piece for a specific player
//   selectRandomPiece(playerColor) {
//     // Select all pieces of the specified player's color
//     const alliedPieces = Array.from(document.querySelectorAll(
//         `.chess-piece.${playerColor}-pawn, 
//          .chess-piece.${playerColor}-rook, 
//          .chess-piece.${playerColor}-bishop, 
//          .chess-piece.${playerColor}-knight, 
//          .chess-piece.${playerColor}-queen, 
//          .chess-piece.${playerColor}-king` // Include all piece types
//     ));

//     if (alliedPieces.length === 0) {
//         console.error("No pieces found for player:", playerColor);
//         return null;
//     }

//     // Randomly select one piece from the array
//     const randomIndex = Math.floor(Math.random() * alliedPieces.length);
//     return alliedPieces[randomIndex];
// }

//   // Method to execute a random move for a specific piece
//   executeRandomMoveForPiece(pieceElement) {
//     console.log('entering executeRandomMoveForPiece with :', pieceElement);
//     pieceElement.classList.add('selected-piece');
//     // Assuming you have a way to get legal moves for a piece DOM element
//     const legalMoves = this.getLegalMovesForPieceElement(pieceElement);
//     if (!legalMoves || legalMoves.length === 0) {
//         console.error("No legal moves for piece:", pieceElement);
//         return;
//     }

//     const randomMoveIndex = Math.floor(Math.random() * legalMoves.length);
//     const randomMove = legalMoves[randomMoveIndex];
//     // Assuming executeMove can handle a move defined in 'randomMove'

//     console.log('randomMove,', randomMove);
//     this.executeMove(randomMove);
// }
//  getLegalMovesForPieceElement(pieceElement) {
//   console.log("entering getLegalMovesForPieceElement with :", pieceElement);
//     // Assuming each piece element has a type (e.g., pawn, rook) as part of its class
//     const pieceType = this.getPieceType(pieceElement); // Implement this method
//     const currentPosition = this.getPosition(pieceElement); // Implement this method
//     const clickedPiece = pieceElement.parentNode;
//     const chessBoard = document.querySelector('#chessboard');
//     const row = clickedPiece.getAttribute('data-row');
//     const col = clickedPiece.getAttribute('data-col');
//     const type = clickedPiece.getAttribute('data-type');
//     const color = clickedPiece.getAttribute('data-color');

    
    
//     console.log('pieceType', pieceType);
//     console.log('currentPosition', currentPosition);
//     console.log('row', row, 'col', col);
//     console.log('clickedPiece', clickedPiece);
    
    
//     // Calculate legal moves based on piece type and current position
//     // This is highly game-specific and depends on your chess logic implementation
//       return this.calculateValidMoves(row, col, chessBoard, type, color);

//     return this.calculateLegalMoves(pieceType, currentPosition);
//   }  

//   // Method to cast the Dice of Destiny spell
//   castDiceOfDestinySpell() {
//     const movesPerPlayer = this.rollDiceForSpell();

//     for (let player of ['white', 'black']) {
//       for (let i = 0; i < movesPerPlayer; i++) {
//         const piece = this.selectRandomPiece(player);
//         if (piece) {
//           this.executeRandomMoveForPiece(piece);
//         }
//       }
//     }

//     // ... Update game state or other necessary changes after spell execution ...
//   }
rollDiceForSpell() {
    // Returns a number between 2 and 8 (simulating two four-sided dice)
    return Math.floor(Math.random() * 4) + 1 + Math.floor(Math.random() * 4) + 1;
  }

  selectRandomPiece(playerColor) {
    // Select all pieces of the specified player's color
     const alliedPieces = Array.from(document.querySelectorAll(
        `.chess-piece.${playerColor}-pawn, 
         .chess-piece.${playerColor}-rook, 
         .chess-piece.${playerColor}-bishop, 
         .chess-piece.${playerColor}-knight, 
         .chess-piece.${playerColor}-queen, 
         .chess-piece.${playerColor}-king`
    ));

    if (alliedPieces.length === 0) {
        console.error("No pieces found for player:", playerColor);
        return null;
    }

    // Randomly select one piece from the array
    return alliedPieces[Math.floor(Math.random() * alliedPieces.length)];
  }



castDiceOfDestinySpell() {
    const movesPerPlayer = this.rollDiceForSpell();
    let currentMove = 0;
    const totalMoves = movesPerPlayer * 2; // 2 players

    const moveInterval = setInterval(() => {
        const player = currentMove % 2 === 0 ? 'white' : 'black';
        const piece = this.selectRandomPiece(player);
        if (piece) {
            this.forceRandomMove(piece); // Use your existing function
        }

        currentMove++;
        if (currentMove >= totalMoves) {
            clearInterval(moveInterval);
        }
    }, 1000); // Delay of 1 second between moves
}
//END OF randomDiceMove SPELL


//BEGINNING OF castDigitzKingSpell FUNCTION\\



castDigitzKingSpell() {
  this.assignRowClassesToPawns();
    console.log('Casting Number King Spell');
    const enemyColor = this.color === 'white' ? 'black' : 'white';
    const friendlyPawns = document.querySelectorAll(`.chess-piece.${this.color}-pawn`);
    const enemyPawns = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);
    const allPawns = [...friendlyPawns, ...enemyPawns];
    const chessboard = document.querySelector('#chessboard');
    const kingsNumber = Math.floor(Math.random() * 151) + 1;
        console.log('allPawns', allPawns);

    let delay = 0; // Starting delay for the first pawn
    const delayIncrement = 500; // Delay increment for each subsequent pawn
    const pawnFinalNumbers = new Map(); 
    allPawns.forEach((pawn, index) => {
        setTimeout(() => {
            const square = pawn.closest('.chess-square');
            const row = square.dataset.row;

            const numberBox = this.createNumberBox(index);
            square.appendChild(numberBox); // Append the number box to the square instead of the pawn

            // Add classes for top or bottom row
            if (row === "0") {
                numberBox.classList.add('bottom-box');
            } else if (row === "7") { // Assuming an 8x8 board
                numberBox.classList.add('top-box');
            }

            let rollCount = 0;
            const maxRolls = Math.floor(Math.random() * 11) + 5; // Between 5 and 15 rolls
            const interval = setInterval(() => {
                const randomNumber = Math.floor(Math.random() * 151);
                numberBox.textContent = randomNumber;

                rollCount++;
                if (rollCount >= maxRolls) {
                    clearInterval(interval);
                    pawnFinalNumbers.set(pawn, randomNumber); // Store final number for this pawn

                    if (pawnFinalNumbers.size === allPawns.length) {
                        // All pawns have their final number, proceed with spell effects
                        this.applySpellEffects(pawnFinalNumbers);
                    }
                }
            }, 100); // Adjust the rolling speed as needed
        }, delay);

        delay += delayIncrement;
               
    });
    this.displayKingsNumber(kingsNumber);
            
    // Continue with other spell effects such as finding and removing enemy pawns...
}
assignRowClassesToPawns() {
  console.log('assignRowClassesToPawns called');
    const allPawns = document.querySelectorAll('.chess-piece.pawn');

    allPawns.forEach(pawn => {
        const square = pawn.closest('.chess-square');
        const row = square.dataset.row;

        if (row === "0") {
            pawn.classList.add('top-row');
        } else if (row === "7") { // Assuming 8x8 board with rows indexed from 0 to 7
            pawn.classList.add('bottom-row');
        } else {
            pawn.classList.add('middle-row');
        }
    });
}
displayKingsNumber(number) {
    const displayElement = document.createElement('div');
    displayElement.textContent = `King's Number: ${number}`;
    displayElement.classList.add('kings-number-display');
    document.body.appendChild(displayElement);

    // Animation or special effect (simple fade-out example)
    setTimeout(() => displayElement.style.opacity = 0, 2000); // Fade out after 2 seconds
    setTimeout(() => displayElement.remove(), 3000); // Remove from DOM after 3 seconds
}

createNumberBox(index) {
  console.log('createNumberBox FUCNCTION CALLED ');
    const numberBox = document.createElement('div');
    numberBox.classList.add('number-box');
    numberBox.style.backgroundColor = this.getRandomColor(index);
    return numberBox;
}

updateNumberBoxColor(numberBox, number, index) {
    const baseColor = this.getBaseColor(index);
    const shade = number % 256; // More pronounced shading
    const bgColor = `rgb(${baseColor.r + shade}, ${baseColor.g + shade}, ${baseColor.b + shade})`;
    numberBox.style.backgroundColor = bgColor;

    // Set text color for contrast
    const textColor = this.isLightColor(bgColor) ? 'black' : 'white';
    numberBox.style.color = textColor;
}

// Helper function to determine if a color is light or dark
isLightColor(color) {
    const rgb = color.match(/\d+/g);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luminance > 0.5;
}


getRandomColor(index) {
 
  console.log('getRandomColor FUCNCTION CALLED ');

    // Generate a base color based on the index, using RGB
    return `rgb(${index * 50 % 256}, ${index * 100 % 256}, ${index * 150 % 256})`;
}

getBaseColor(index) {
    // Return the base RGB components for the color
    return {
        r: index * 50 % 256,
        g: index * 100 % 256,
        b: index * 150 % 256
    };
}

   getPawnRow(pawn) {
    // Assuming each row in your chessboard has a class or identifiable attribute
    // Adjust this method to match your chessboard's structure
    const rowElement = pawn.closest('.chess-row'); // Example: if each row has a class 'chess-row'
    return rowElement ? parseInt(rowElement.getAttribute('data-row'), 10) : -1; // Example: if rows have a 'data-row' attribute
}

// Helper function to position the number box based on the row
positionNumberBox(numberBox, row) {
    if (row <= 1) {
        // Pawn is at the top of the board, position box below the pawn
        numberBox.style.bottom = 'auto';
        numberBox.style.top = '100%';
    } else {
        // Pawn is elsewhere, position box above the pawn
        numberBox.style.bottom = '100%';
        numberBox.style.top = 'auto';
    }
}
 applySpellEffects(pawnFinalNumbers) {
    // Generate the King's number
    const kingsNumber = Math.floor(Math.random() * 151) + 1;
    console.log('King\'s Number:', kingsNumber);

    // Find the closest enemy pawn
    let closestEnemyPawn = null;
    let closestAlliedPawn = null;
    let smallestEnemyDifference = Number.MAX_SAFE_INTEGER;
    let smallestAlliedDifference = Number.MAX_SAFE_INTEGER;
    
    pawnFinalNumbers.forEach((number, pawn) => {
        const difference = Math.abs(number - kingsNumber);
        const isEnemyPawn = (this.color === 'white' && pawn.classList.contains('black-pawn')) ||
                            (this.color === 'black' && pawn.classList.contains('white-pawn'));

        if (isEnemyPawn && difference < smallestEnemyDifference) {
            closestEnemyPawn = pawn;
            smallestEnemyDifference = difference;
        }
    });

    pawnFinalNumbers.forEach((number, pawn) => {
      const difference = Math.abs(number - kingsNumber);
      const isAlliedPawn = (this.color === 'white' && pawn.classList.contains('white-pawn')) ||
                           (this.color === 'black' && pawn.classList.contains('black-pawn'));

        if (isAlliedPawn && difference < smallestAlliedDifference) {
          closestAlliedPawn = pawn;
          smallestAlliedDifference = difference;
        }
      });

    if (closestEnemyPawn) {
        // Extract row and col from the pawn's parent square
        const square = closestEnemyPawn.closest('.chess-square');
        const row = square.dataset.row;
        const col = square.dataset.col;
        document.querySelectorAll('.number-box').forEach(box => box.remove());
        // Use forceRemove to remove the closest enemy pawn
        this.forceRemove(row, col);
    }
    if (closestAlliedPawn) {
        // Determine the new type (rook, bishop, or knight)
        const newTypes = ['rook', 'bishop', 'knight'];
        const randomType = newTypes[Math.floor(Math.random() * newTypes.length)];

        // Update the piece
        const square = closestAlliedPawn.closest('.chess-square');
        if (square) {
            // Remove the existing pawn
            if (closestAlliedPawn.parentNode === square) {
                square.removeChild(closestAlliedPawn);
            }

            // Create the new piece element
            const newPiece = document.createElement('img');
            newPiece.classList.add('chess-piece', `${this.color}-${randomType}`);
            newPiece.style.backgroundImage = `url('img/${this.color}${randomType}.png')`; // Set the correct image path

            newPiece.setAttribute('data-color', this.color);
            newPiece.setAttribute('data-type', randomType);
            square.appendChild(newPiece);

            // Update any other necessary internal game state
            // ...
        }
    }

}

//END OF castDigitzKingSpell FUNCTION\\

  // BEGIN OF CASTENCHANTEDGROUNDSPELL\\
castEnchantedGroundSpell() {
  console.log('castEnchantedGroundSpell function called');
  const allSquares = Array.from(document.querySelectorAll('.chess-square')); // Select all squares
  const emptySquares = allSquares.filter(square => !square.classList.contains('has-piece')); // Filter out squares with pieces

  const numberOfEnchantedSquares = 5; // Adjust as needed
  const enchantedGrounds = new Set();

  while (enchantedGrounds.size < numberOfEnchantedSquares && emptySquares.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const selectedSquare = emptySquares[randomIndex];

    enchantedGrounds.add(selectedSquare.id);
    emptySquares.splice(randomIndex, 1); // Remove the selected square from the array
  }

  enchantedGrounds.forEach(squareId => {
    const square = document.getElementById(squareId);
    if (square) {
      square.classList.add('enchanted-ground');
      square.style.backgroundColor = this.color; // Adjust the color as needed
      square.style.border = "2px solid black";
      // Optionally add visual indication for enchanted grounds
    }
  });
  return enchantedGrounds;
}
handleMagicalCardEffect(selectedPiece) {
  console.log('handleMagicalCardEffect function called with', selectedPiece);
  const effects = 
  {
        // //'upgrade': { name: 'Upgrade', description: '.' },
        'upgrade': { effect: () => this.upgradePiece(selectedPiece), description: 'The piece is promoted rabdomly created.' },
        'downgrade': { effect: () => this.downgradePiece(selectedPiece), description: 'The piece is demoted.' },
        'swap': { effect: () => this.swapPiece(selectedPiece), description: 'swap two allies randomPiece.' },
        'teleport': { effect: () => this.teleportPiece(selectedPiece), description: 'teleport the piece random empty square.' },
        // 'shield': { effect: () => this.shieldPiece(piece), description: 'shield the piece .' },
         // 'chaos': { effect: () => this.chaosShift(selectedPiece), description: 'Rearrange all pieces of the same type on the players side.' },
        /*ALMOSTCORRECT just missing a few implementations*/ 'freeze': { effect: () => this.freezePiece(selectedPiece), description: 'Cannot move for two turns...' },
        // 'blinkStep': { effect: () => this.blinkStep(piece), description: 'Teleport to a nearby square.' },
        // 'shieldAura': { effect: () => this.shieldAura(piece), description: 'Gain temporary immunity.' },
        // 'precisionStrike': { effect: () => this.precisionStrike(piece), description: 'Capture from two squares away.' },
        // 'mightyLeap': { effect: () => this.mightyLeap(piece), description: 'Gain knight\'s move.' },
        // 'wisdomOfKings': { effect: () => this.wisdomOfKings(piece), description: 'Move like a king.' },
        // 'fogOfConfusion': { effect: () => this.fogOfConfusion(piece), description: 'Reversed movement.' },
        // 'vulnerabilityCurse': { effect: () => this.vulnerabilityCurse(piece), description: 'Increased vulnerability.' },
        // 'erraticMovement': { effect: () => this.erraticMovement(piece), description: 'Move randomly.' },
        // 'dwindlingPower': { effect: () => this.dwindlingPower(piece), description: 'Lose special abilities.' },
        
       //CORRECT// 'magneticPull': { effect: () => this.magneticPull(selectedPiece), description: 'Drawn towards board edge.' }
  };
  
  const randomEffectKey = Object.keys(effects)[Math.floor(Math.random() * Object.keys(effects).length)];
  const selectedEffect = effects[randomEffectKey];
  console.log('Selected Effect:', selectedEffect.description);
        selectedEffect.effect(); // Execute the effect

        return selectedEffect.description;
      }
//     }
// console.log('selectedEffect', selectedEffect, 'randomEffectKey', randomEffectKey);
//   switch (randomEffectKey) {
//         case 'upgrade':
//             this.upgradePiece(piece);
//             break;
//         case 'downgrade':
//             this.downgradePiece(piece);
//             break;
//         case 'swap':
//             this.swapPiece(piece);
//             break;
//         case 'teleport':
//             this.teleportPiece(piece);
//             break;
//         case 'shield':
//             this.shieldPiece(piece);
//             break;
//         case 'banish':
//             this.banishPiece(piece);
//             break;
//         case 'chaos':
//             this.chaosShift(piece);
//             break;
//         case 'freeze':
//             this.freezePiece(piece);
//             break;
//         // Implement other cases similarly
//     }
//     return randomEffect;
// }

showSpellInteraction(spellName, spellDescription) {
  console.log('showSpellInteraction function entered description being:', spellDescription)
  this.startShufflingAnimation();
    const spellPopup = document.getElementById('spell-interaction');
    const spellNameElement = document.getElementById('spell-name');
    const spellDescriptionElement = document.getElementById('spell-description');

    spellNameElement.textContent = spellName;
    spellDescriptionElement.textContent = spellDescription;

    // Show the popup
    spellPopup.classList.remove('hidden');
    spellPopup.classList.add('visible');

    // Hide the popup after some time
    setTimeout(() => {
        spellPopup.classList.remove('visible');
        spellPopup.classList.add('hidden');
    }, 9000); // Adjust time as needed
}
startShufflingAnimation() {
  console.log('startShufflingAnimation function called');
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous cards

    // Create and add cards for animation
    for (let i = 0; i < 5; i++) { // 5 as an example
        const card = document.createElement('div');
        card.classList.add('card');
        cardContainer.appendChild(card);
    }
}
upgradePiece(alliance) {
    console.log("Upgraded piece called for alliance:", alliance);
    const pieces = Array.from(document.querySelectorAll('.chess-piece'));
    console.log("Pieces", pieces);
    const allianceParent = alliance.parentNode;
    const allianceColor = allianceParent.dataset.color;



    // Filter for allied pawns using parent node data attributes
    let alliedPawns = pieces.filter(piece => {
        let parentSquare = piece.parentNode;
        console.log('parentSquare', parentSquare);
        console.log('parentSquare.dataset.type', parentSquare.dataset.type);
        console.log('parentSquare.dataset.color', parentSquare.dataset.color);
        
        return parentSquare.dataset.type === 'pawn' && parentSquare.dataset.color === allianceColor;
    });
    console.log('Allied Pawns', alliedPawns);

    // Randomly select a pawn
    let selectedPawn = this.getRandomElement(alliedPawns);

    if (!selectedPawn) {
        console.error('No eligible pawns found for upgrade.');
        return;
    }

    // Upgrade logic here (randomly to knight, rook, or bishop)
    let upgradeOptions = ['knight', 'rook', 'bishop'];
    let newType = this.getRandomElement(upgradeOptions);

    // Update the pawn's parent data-type and class
    let parentSquare = selectedPawn.parentNode;
    parentSquare.dataset.type = newType;
    selectedPawn.className = `chess-piece ${alliance}-${newType}`;

    // Update the piece's appearance and functionality
    this.updatePieceAppearanceAndFunctionality(selectedPawn, parentSquare, allianceColor, newType);
}

downgradePiece(alliancePiece) {
    console.log('downgradePiece called with alliance piece', alliancePiece);
    const allianceParent = alliancePiece.parentNode;
    // Extract the color from the alliance piece
    const allianceColor = allianceParent.dataset.color;
    console.log('Alliance color:', allianceColor);

    // Select all pieces and then filter for the same color
        const pieces = Array.from(document.querySelectorAll(`.chess-piece.${allianceColor}-rook, .chess-piece.${allianceColor}-bishop, .chess-piece.${allianceColor}-knight`));
    
    console.log('Filtered pieces:', pieces);

    // Randomly select a piece
    let selectedPiece = this.getRandomElement(pieces);

    if (!selectedPiece) {
        console.error('No eligible pieces found for downgrade.');
        return;
    }

    // Downgrade to pawn
    // this.selectedPiece.dataset.type = 'pawn';

    // Update the piece's appearance and functionality
    this.updatePieceAppearanceAndFunctionality(selectedPiece, allianceParent, allianceColor, 'pawn',);
}
 getRandomElement(arr) {
      console.log("getRandomElement  called");

    return arr[Math.floor(Math.random() * arr.length)];
}

 updatePieceAppearanceAndFunctionality(piece, parentSquare, allianceColor, newType) {
  console.log('updatePieceAppea function called newType', newType);
  let parent = piece.parentNode;
  let formattedNewType = newType.charAt(0).toUpperCase() + newType.slice(1);
  
  parent.removeAttribute('data-type');
  parent.setAttribute('data-type', newType);
  parent.style.backgroundImage = `url('img/${allianceColor}${formattedNewType}.png')`;
  console.log('parent', parent);

  // Update the piece's class and background image
  piece.className = `chess-piece ${allianceColor}-${newType}`;
  piece.style.backgroundImage = `url('img/${allianceColor}${formattedNewType}.png')`;


}

// swapPiece(square) { //ALMOST FUNCTIONNAL BUT MISSING SOME THINGS ABOUT SWAPPIECE DIRECTION CONCERNING VALIDMOVES -forpawn-
//     console.log('swapPiece function called with square:', square);

//     const allSquares = Array.from(document.querySelectorAll('.chess-square.has-piece'));
//     const eligibleSquares = allSquares.filter(s => s !== square);

//     if (eligibleSquares.length < 1) {
//         console.error('Not enough squares available to swap.');
//         return;
//     }

//     let randomSquare = eligibleSquares[Math.floor(Math.random() * eligibleSquares.length)];
//     console.log('randomsquare in swapPiece function:', randomSquare);
//     if (square && randomSquare) {
//       console.log('initial square check for swapping :', square, 'randomSquare', randomSquare);
        
//         let piece1 = square.querySelector('.chess-piece');
//         let piece2 = randomSquare.querySelector('.chess-piece');
//         console.log('initial piece for swapping :', piece1, 'randomPiece', piece2);
//         if (square && randomSquare) {
//           // Swap the attributes of the squares (which are the containers of the pieces)
//         ['data-type', 'data-color', 'data-col', 'data-row'].forEach(attribute => {
//                 this.swapAttributes(square, randomSquare, attribute);
//         });
       

//             let bgImage1 = piece1.style.backgroundImage;
//             let bgImage2 = piece2.style.backgroundImage;
//             console.log('backgroundImage1', bgImage1, "background-image2", bgImage2);
//             piece1.style.backgroundImage = bgImage2;
//             square.style.backgroundImage = '';
//             piece2.style.backgroundImage = bgImage1;
//             randomSquare.style.backgroundImage = '';
//             console.log('piece1.style.backgroundImage', piece1.style.backgroundImage, "piece2.style.backgroundImage", piece2.style.backgroundImage);

//             // Swap CSS for background images if needed
//             // This part seems commented out but you can uncomment and adjust as needed
//             let classPiece1 = piece1.className;
//             let classPiece2 = piece2.className;
//             piece1.className = classPiece2;
//             piece2.className = classPiece1;

//                         // Detach and re-append pieces to swap them
//             // const detachedPiece1 = square.removeChild(piece1);
//             // const detachedPiece2 = randomSquare.removeChild(piece2);
//             // square.appendChild(detachedPiece2);
//             // randomSquare.appendChild(detachedPiece1);

//             // Calculate positions based on square attributes
//             const piece1Position = [parseInt(square.getAttribute('data-row')), parseInt(square.getAttribute('data-col'))];
//             const piece2Position = [parseInt(randomSquare.getAttribute('data-row')), parseInt(randomSquare.getAttribute('data-col'))];

//             console.log('position of the pieces before changing the board internal state, piece 1 swapped', piece1Position[0], 'randomPiece aka piece2', piece2Position);
//             console.log('this.game.board before trying to update the internal state', this.game.game.board);

//             // Swap pieces in the game board array
//             let tempPiece = this.game.game.board[piece1Position[0]][piece1Position[1]];
//             this.game.game.board[piece1Position[0]][piece1Position[1]] = this.game.game.board[piece2Position[0]][piece2Position[1]];
//             this.game.game.board[piece2Position[0]][piece2Position[1]] = tempPiece;
//             console.log('this.game.board after the internalstate update but before calling this.syncBoardState', this.game.board);


//             // Ensure syncBoardState properly reflects changes in the board state
//             this.game.syncBoardState();
//              console.log('this.game.board AFTER THE CALL TO syncBoardState ', this.game.game.board);

//             this.pieceSwapped = true;
//         } else {
//             console.error('One of the squares does not contain a piece. Swap aborted.');
//         }
//     } else {
//         console.error('Invalid square element encountered.');
//     }
// }


// // Enhanced attribute swap function to handle both square and piece attributes
// swapAttributes(square1, square2, attributeName) {
//   console.log('swapAttributes function called for square', square1, 'randomsquare', square2, 'with attribute : ', attributeName);
//     // Swap square attributes
//     let tempSquareAttribute = square1.getAttribute(attributeName);
//     square1.setAttribute(attributeName, square2.getAttribute(attributeName));
//     square2.setAttribute(attributeName, tempSquareAttribute);
    
//     // Swap piece attributes if they exist
//     // if (piece1 && piece2) {
//     //     let tempPieceAttribute = piece1.getAttribute(attributeName);
//     //     piece1.setAttribute(attributeName, piece2.getAttribute(attributeName));
//     //     piece2.setAttribute(attributeName, tempPieceAttribute);
//     // }
// }
swapPiece() {
    console.log("swapTwoPieces called");

    const squares = Array.from(document.querySelectorAll('.chess-square.has-piece'));
    if (squares.length < 2) {
        console.error("Not enough pieces on the board to swap.");
        return;
    }

    // Select two distinct squares randomly
    let randomIndexes = this.selectTwoDistinctRandomIndexes(squares.length);
    let square1 = squares[randomIndexes[0]];
    let square2 = squares[randomIndexes[1]];
    square1.style.backgroundImage = '';
    square2.style.backgroundImage = '';
    

    // Swap 'data-' attributes and pieces
    ['data-type', 'data-color'].forEach(attribute => {
        this.swapAttributes(square1, square2, attribute);
    });
    this.swapChessPieces(square1, square2);

    // Optionally, update internal game state
    this.updateInternalGameStateForSwap(square1, square2);

    console.log("Two pieces swapped successfully.");
}

selectTwoDistinctRandomIndexes(length) {
    let index1 = Math.floor(Math.random() * length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * length);
    } while (index1 === index2);
    return [index1, index2];
}

swapAttributes(element1, element2, attributeName) {
    let temp = element1.getAttribute(attributeName);
    element1.setAttribute(attributeName, element2.getAttribute(attributeName));
    element2.setAttribute(attributeName, temp);
}

swapChessPieces(square1, square2) {
    const piece1 = square1.querySelector('.chess-piece');
    const piece2 = square2.querySelector('.chess-piece');

    const tempContainer = document.createElement('div');
    tempContainer.appendChild(piece1.cloneNode(true));
    square1.replaceChild(piece2.cloneNode(true), piece1);
    square2.replaceChild(tempContainer.firstChild, piece2);
}

updateInternalGameStateForSwap(square1, square2) {
    // Your logic to update the internal game state after a swap
    // This should reflect the new positions of the swapped pieces in your game's data structure
}
    // swapPiece(piece) {
//     console.log('swapPiece function called with', piece);
//     // const pieceColor = piece.dataset.color;

//     // Fetch all pieces of the same color
//     //     const pieces = Array.from(document.querySelectorAll(`.chess-piece.${pieceColor}-rook, .chess-piece.${pieceColor}-bishop, .chess-piece.${pieceColor}-knight, .chess-piece.${pieceColor}-pawn, .chess-piece.${pieceColor}-queen, .chess-piece.${pieceColor}-king`))
//     const pieceTypes = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
// const pieceColor = this.color; // or "black", depending on the color you need

// // Create a selector for each piece type and concatenate them
// const selectors = pieceTypes.map(type => `.chess-piece.${pieceColor}-${type}`).join(', ');

// // Query all pieces of the specified color and types
// const allPieces = Array.from(document.querySelectorAll(selectors));
//     // const allPieces = Array.from(document.querySelectorAll(`.chess-piece.${pieceColor}`));
//     console.log('All pieces before filtering:', allPieces);

//     // Filter out the piece that triggered the swap
//     const eligiblePieces = allPieces.filter(p => p !== piece);
//     console.log('Eligible pieces for swap:', eligiblePieces);

//     if (eligiblePieces.length < 2) {
//         console.error('Not enough pieces available to swap.');
//         return;
//     }

//     // Randomly select two different pieces to swap
//     let randomIndex1 = Math.floor(Math.random() * eligiblePieces.length);
//     let randomPiece1 = eligiblePieces[randomIndex1];
//     let randomIndex2;
//     do {
//         randomIndex2 = Math.floor(Math.random() * eligiblePieces.length);
//     } while (randomIndex2 === randomIndex1);
//     let randomPiece2 = eligiblePieces[randomIndex2];

//     // Swap the pieces
// const randomPiece1Square = randomPiece1.parentNode;
// const randomPiece2Square = randomPiece2.parentNode;

// // Temporarily store one piece in a fragment to maintain a reference to it
// const tempFragment = document.createDocumentFragment();
// tempFragment.appendChild(randomPiece1);

// // Swap positions
// randomPiece1Square.appendChild(randomPiece2);
// randomPiece2Square.appendChild(tempFragment.firstChild);
//     this.pieceSwapped = true;

//     console.log('Swapped pieces:', randomPiece1, randomPiece2);
// }


banishPiece(piece) {
    console.log('banish function called');

    piece.remove();
    // Update any internal game state as necessary
}
shieldPiece(piece) {
    console.log('shield function called');

    piece.dataset.shielded = 'true';
    // You'll need to check this property in your capture logic
    setTimeout(() => piece.dataset.shielded = 'false', 3 * turnDuration); // Assuming turnDuration is the duration of a turn
}

teleportPiece(piece) {
    console.log('teleport function called');

    const emptySquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    console.log('emptySquares', emptySquares);
    const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    console.log('randomSquare', randomSquare);
    const parentPiece = piece.parentNode;
    // Assuming 'allianceColor' holds the color of the allied pieces (e.g., 'white' or 'black')
    const allianceColor = parentPiece.dataset.color; // Extract the color from the piece
    const alliedPieces = Array.from(document.querySelectorAll(`.chess-piece.${allianceColor}-pawn, 
                                                              .chess-piece.${allianceColor}-rook, 
                                                              .chess-piece.${allianceColor}-bishop, 
                                                              .chess-piece.${allianceColor}-knight, 
                                                              .chess-piece.${allianceColor}-queen`));
    console.log('Allied pieces except for the king:', alliedPieces);
    const randomPiece = alliedPieces[Math.floor(Math.random() * alliedPieces.length)];
    console.log('Random Piece selected for teleport:', randomPiece);
     // Perform the teleportation
    if (randomPiece && randomSquare) {
        // Move the piece to the new square
        
        
        const currentSquare = randomPiece.parentNode;
        const type = currentSquare.getAttribute('data-type');
        const color = currentSquare.getAttribute('data-color');

        currentSquare.removeChild(randomPiece);
        currentSquare.classList.remove('has-piece', 'event-listener-attached');
        currentSquare.removeAttribute('data-type');
        currentSquare.removeAttribute('data-color');
        currentSquare.removeEventListener('click', this.boundHandleClick);

        randomSquare.appendChild(randomPiece);
        randomSquare.setAttribute('data-type', type);
        randomSquare.setAttribute('data-color', color);
        randomSquare.classList.add('has-piece', 'event-listener-attached');
        randomSquare.addEventListener('click', this.boundHandleClick);


        

        // Update any necessary game state here
        console.log(`Teleported ${randomPiece.className} to square ${randomSquare.id}`);
    } else {
        console.error('Teleportation failed: No piece or square selected.');
    }
}

freezePiece() {
    console.log('freeze function called');

    // Determine the enemy color
    const currentPlayerColor = this.game.currentPlayer;
    console.log('currentPlayerColor', currentPlayerColor);
    const enemyColor = currentPlayerColor === 'white' ? 'black' : 'white';

    console.log("Enemy color:", enemyColor);

    // Query for enemy pieces excluding the king
    const enemyPieces = Array.from(document.querySelectorAll(`.chess-piece.${currentPlayerColor}-pawn, 
                                                              .chess-piece.${currentPlayerColor}-rook, 
                                                              .chess-piece.${currentPlayerColor}-bishop, 
                                                              .chess-piece.${currentPlayerColor}-knight, 
                                                              .chess-piece.${currentPlayerColor}-queen`));
    console.log("Enemy pieces:", enemyPieces);

    // Current turn count at the time of spell casting
    const currentTurnCount = this.turnCount;

    // Randomly select a number of pieces to freeze
    const numberOfPiecesToFreeze = Math.floor(Math.random() * 4) + 1; // 1 to 4 pieces
    for (let i = 0; i < numberOfPiecesToFreeze && i < enemyPieces.length; i++) {
        const randomIndex = Math.floor(Math.random() * enemyPieces.length);
        const pieceToFreeze = enemyPieces[randomIndex];

        // Apply freeze effect
        const squareToFreeze = pieceToFreeze.parentNode;
                squareToFreeze.classList.add('frozen-square');

        pieceToFreeze.classList.add('frozen-piece');
        

        // Random number of turns for the freeze duration (between 2 and 4)
        const freezeDurationInTurns = Math.floor(Math.random() * 3) + 2;

        // Calculate the turn when the freeze effect should end
        const unfreezeTurn = currentTurnCount + freezeDurationInTurns;

        // Restore piece's movement ability after the freeze duration
        const unfreezeCheckInterval = setInterval(() => {
            if (this.turnCount >= unfreezeTurn) {
                pieceToFreeze.dataset.frozen = 'false';
             
                clearInterval(unfreezeCheckInterval);
            }
        }, 1000); // Check every second
    }
}

chaosShift(selectedPiece) {
    console.log('chaosShift function called');
    const parent = selectedPiece.parentNode;
    const parentColor = parent.getAttribute('data-color');
    console.log('parent', parent);
    const currentPlayerColor = this.currentPlayer;
    console.log('selectedPiece.color', parent.getAttribute('data-color'));
    console.log('currentPlayerColor', currentPlayerColor);
    const enemyColor = currentPlayerColor === 'white' ? 'black' : 'white';
    const alliedPieces = Array.from(document.querySelectorAll(`.chess-piece.${parentColor}-pawn, 
                                                              .chess-piece.${parentColor}-rook, 
                                                              .chess-piece.${parentColor}-bishop, 
                                                              .chess-piece.${parentColor}-knight, 
                                                              .chess-piece.${parentColor}-queen`));
    console.log("alliedPieces pieces:", alliedPieces);
    // Query for all pieces of the same type and color
    
    const positions = Array.from(alliedPieces).map(piece => {
        const parentSquare = piece.parentNode;
        return { row: parentSquare.getAttribute('data-row'), col: parentSquare.getAttribute('data-col') };
    });

    this.shuffleArray(positions); // Randomly shuffle the positions array

    alliedPieces.forEach((piece, i) => {
        const newPos = positions[i];
        const newSquareId = `square-${newPos.row}-${newPos.col}`;
        const newSquare = document.getElementById(newSquareId);

        // Move piece to the new square
        if(newSquare && !newSquare.contains(piece)) {
            const oldSquare = piece.parentNode;
            oldSquare.removeChild(piece);
            newSquare.appendChild(piece);

            // Update the dataset attributes if necessary
            newSquare.dataset.type = selectedPiece.dataset.type;
            newSquare.dataset.color = selectedPiece.dataset.color;

            // Perform any additional updates required for the game state
        }
    });
}

// Shuffle array helper function
 shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
blinkStep(piece) {
    console.log('Blink Step activated for', piece.id);
    // Allow the piece to move to any empty square within a two-square radius.
    // You'll need to handle this in the movement logic of your game.
    this.forceRandomMove(piece);
    // Example: Set a flag and handle in the piece's movement method
    piece.dataset.blinkStep = 'active';
}
//BEGINNING OF CHAOSTHEORYSPELL

castChaosTheorySpell() {
  console.log('chaostheoryspell entered');
    // Emit Chaos Theory start event
    document.dispatchEvent(this.chaosTheoryStartEvent);
    setTimeout(() => {
        // Emit Chaos Theory end event after duration
        document.dispatchEvent(this.chaosTheoryEndEvent);
    }, 60000); // Example: 60 seconds duration
}

performRandomMove() {
    const playerColor = this.game.currentPlayer;
    console.log('playerColor', playerColor);

    // Get all allied pieces
    const alliedPieces = Array.from(document.querySelectorAll(`.chess-piece.${playerColor}-pawn, 
                                                              .chess-piece.${playerColor}-rook, 
                                                              .chess-piece.${playerColor}-bishop, 
                                                              .chess-piece.${playerColor}-knight`));
    console.log("alliedPieces pieces:", alliedPieces);

    // Select a random piece
    const randomPiece = alliedPieces[Math.floor(Math.random() * alliedPieces.length)];

    // Get all empty squares
    const emptySquares = Array.from(document.querySelectorAll('.chess-square:not(.has-piece)'));

    if (emptySquares.length > 0) {
        // Select a random empty square
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];

        // Extract the row and column from the square's ID or data attributes
        const toRow = parseInt(randomSquare.getAttribute('data-row'), 10);
        const toCol = parseInt(randomSquare.getAttribute('data-col'), 10);

        // Assuming randomPiece's parent element has data-row and data-col attributes
        const fromRow = parseInt(randomPiece.parentNode.getAttribute('data-row'), 10);
        const fromCol = parseInt(randomPiece.parentNode.getAttribute('data-col'), 10);

        console.log(`Performing random move on piece :(${randomPiece}) from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol})`);

        // Move the piece
        this.forceMove(randomPiece, fromRow, fromCol, toRow, toCol); // Implement forceMove or use existing logic
    } else {
        console.log("No empty squares available to move the randomly selected piece.");
    }
}


showDiceRoll(result) {
    const diceContainer = document.getElementById('dice-container');
    const diceImage = document.getElementById('dice-image');

    // Update the dice image based on the result
    diceImage.src = `img/dice${result}.png`; // Assuming you have images for each dice face

    // Show the dice container
    diceContainer.style.display = 'block';

    // Hide the dice after a short delay
    setTimeout(() => {
        diceContainer.style.display = 'none';
    }, 2000); // Adjust the time as needed
}

rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    this.showDiceRoll(result);
    return result;
}

//END OF CHAOSTHEORYSPELL
magneticPull(selectedPiece) {
    console.log('Magnetic Pull activated for selectedPiece', selectedPiece);

    const parentSquare = selectedPiece.parentNode;
    const currentRow = parseInt(parentSquare.getAttribute('data-row'), 10);
    const currentCol = parseInt(parentSquare.getAttribute('data-col'), 10);

    // Determine the direction towards the opponent's side
    const isWhitePiece = selectedPiece.dataset.color === 'white';
    const rowChange = isWhitePiece ? -1 : 1;

    // Apply Gravitational Field effect around the piece
    this.applyGravitationalField(selectedPiece, currentRow, currentCol, rowChange);
}


applyGravitationalField(selectedPiece, currentRow, currentCol) {
    console.log('Applying Gravitational Field for', selectedPiece);

    const radius = 1;
    const totalRows = 8; // Assuming an 8x8 board

    for (let row = currentRow - radius; row <= currentRow + radius; row++) {
        for (let col = currentCol - radius; col <= currentCol + radius; col++) {
            if ((row === currentRow && col === currentCol) || row < 0 || row >= totalRows || col < 0 || col >= totalRows) {
                continue; // Skip the square where the selected piece is and invalid rows/cols
            }

            const squareId = `square-${row}-${col}`;
            const square = document.getElementById(squareId);
            if (!square || !square.classList.contains('has-piece')) {
                continue;
            }

            const piece = square.querySelector('.chess-piece');
            if (!piece || piece === selectedPiece) {
                continue;
            }
            const parentPiece = piece.parentNode
            // Determine the direction based on the piece's color
            let newRow;
            console.log('piece color', parentPiece.dataset.color);  
            if (parentPiece.dataset.color === 'white') {
                // White pieces move downwards (increasing row number)
                newRow = Math.min(row + 1, totalRows - 1);
                console.log('newRow', newRow);
              } else {
                // Black pieces move upwards (decreasing row number)
                newRow = Math.max(row - 1, 0);
            }

            // Move the piece if the new position is different from the current
            if (newRow !== row) {
                this.forceMove(piece, row, col, newRow, col);
            }
        }
    }
}
// applyGravitationalField(selectedPiece, currentRow, currentCol, direction) {
//     console.log('Applying Gravitational Field for', selectedPiece);

//     const radius = 1;
//     const totalRows = 8; // Assuming an 8x8 board

//     for (let row = currentRow - radius; row <= currentRow + radius; row++) {
//         for (let col = currentCol - radius; col <= currentCol + radius; col++) {
//             // Skip the square where the selected piece is and invalid rows/cols
//             if ((row === currentRow && col === currentCol) || row < 0 || row >= totalRows || col < 0 || col >= totalRows) continue;

//             // Handle adjacent piece movement
//             const squareId = `square-${row}-${col}`;
//             const square = document.getElementById(squareId);
//             if (square && square.classList.contains('has-piece')) {
//                 const piece = square.querySelector('.chess-piece');
//                 if (piece && piece !== selectedPiece) {
//                     let newRow = row + direction;
//                     newRow = Math.max(0, Math.min(newRow, totalRows - 1));
//                     this.forceMove(piece, row, col, newRow, col);
//                 }
//             }
//               const selectedPieceParent = selectedPiece.parentNode;
            
            
//         }
//     }
// }
// applyGravitationalField(selectedPiece, currentRow, currentCol) {
//     console.log('Applying Gravitational Field for', selectedPiece);

//     const radius = 1;
//     const totalRows = 8; // Assuming an 8x8 board

//     for (let row = currentRow - radius; row <= currentRow + radius; row++) {
//         for (let col = currentCol - radius; col <= currentCol + radius; col++) {
//             if ((row === currentRow && col === currentCol) || row < 0 || row >= totalRows || col < 0 || col >= totalRows) {
//                 continue; // Skip the square where the selected piece is and invalid rows/cols
//             }

//             const squareId = `square-${row}-${col}`;
//             const square = document.getElementById(squareId);
//             if (!square || !square.classList.contains('has-piece')) {
//                 continue;
//             }

//             const piece = square.querySelector('.chess-piece');
//             if (!piece || piece === selectedPiece) {
//                 continue;
//             }

//             // Determine the direction based on the piece's color
//             const isWhitePiece = piece.dataset.color === 'white';
//             let newRow = row + (isWhitePiece ? 1 : -1); // White moves down, Black moves up
//             newRow = Math.max(0, Math.min(newRow, totalRows - 1)); // Ensure within board boundaries
 
//             console.log('newRow', newRow);
//             // Additional check to prevent moving out of the board
//             if (newRow >= 0 && newRow < totalRows) {
//                 this.forceMove(piece, row, col, newRow, col);
//             }
//         }
//     }
// }
forceRandomMove(piece, chessBoard, event, excludeMiniBoardArea = false) {
    console.log('forceRandomMove called for:', piece);
    const parentSquare = piece.parentNode;
    const fromRow = parseInt(parentSquare.getAttribute('data-row'));
    const fromCol = parseInt(parentSquare.getAttribute('data-col'));

    const totalRows = 8; // Assuming an 8x8 grid
    const totalCols = 8;

    let toRow, toCol, targetSquare, isValidMove;

    do {
        toRow = Math.floor(Math.random() * totalRows);
        toCol = Math.floor(Math.random() * totalCols);

        targetSquare = document.querySelector(`[data-row='${toRow}'][data-col='${toCol}']`);

        // Check if the square is empty and not the same as the starting square
        isValidMove = targetSquare && !targetSquare.classList.contains('has-piece')
                      && (toRow !== fromRow || toCol !== fromCol);

        if (excludeMiniBoardArea) {
            isValidMove = isValidMove && !this.isWithinMiniBoard(toRow, toCol);
        }
    } while (!isValidMove);

    this.forceMove(piece, fromRow, fromCol, toRow, toCol);
    this.syncBoardState();
    console.log('this context', this);
    // this.game.syncBoardState();
}
isOutsideMiniBoard(row, col) {
    return row < this.miniBoardArea.y1 || row > this.miniBoardArea.y2 ||
           col < this.miniBoardArea.x1 || col > this.miniBoardArea.x2;
}

// END OF CASTENCHANTEDGROUNDSPELL\\
//BEGINNING OF RANDOMPAWNMOVE
// Method to activate the Wind of Change spell for all pawns
activateWindOfChangeSpell(windOfChangeResult) {
    this.isWindOfChangeActive = true;
    console.log('windofchange function entered, windOfChangeResult being:', windOfChangeResult);

    if (!Array.isArray(windOfChangeResult)) {
        console.error('windOfChangeResult is not an array or is undefined:', windOfChangeResult);
        return;
    }

    const currentTurn = this.game.turnCount; // Assuming this is available globally

    windOfChangeResult.forEach((spell, index) => {
        console.log(`Processing spell #${index + 1}:`, spell);

        const { row, col, spellDuration, direction } = spell;

        if (row === undefined || col === undefined || spellDuration === undefined || direction === undefined) {
            console.error('Missing properties in spell:', spell);
            return;
        }

        const pawnElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const child = pawnElement.firstChild;
        if (child) {
            // Set spell expiration turn
            child.dataset.spellExpirationTurn = currentTurn + spellDuration;

            const directions = ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight'];
            child.classList.remove(...directions); // Remove existing direction classes
            child.classList.add(direction, 'pawn-random-move'); // Add new direction and spell effect

            console.log(`Pawn at row ${row}, col ${col} will move ${direction} for ${spellDuration} turns.`);
        } else {
            console.warn(`No pawn found at row ${row}, col ${col}.`);
        }
    });

    
}
static checkAndUpdateSpellEffects(instance) {
    console.log('checkandupdatespelleffects function entered');
    if (!instance.isWindOfChangeActive) return;
    console.log('checkAndUpdateSpellEffects function entered in classPiece');
    const allPawnElements = document.querySelectorAll('.chess-piece.pawn-random-move');
    console.log('pawns', allPawnElements);
    allPawnElements.forEach(pawnElement => {
        
        const spellExpirationTurn = parseInt(pawnElement.dataset.spellExpirationTurn, 10);
        if (spellExpirationTurn > 0) {
            pawnElement.dataset.spellExpirationTurn = spellExpirationTurn - 1; // Decrement the value
        } else {
            // If the expiration turn has passed, remove the spell effect
            ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight', 'pawn-random-move'].forEach(dir => pawnElement.classList.remove(dir));
            // Clean up data attribute
            delete pawnElement.dataset.spellExpirationTurn; // Corrected to delete the dataset attribute
        }
    });
    if (document.querySelectorAll('.chess-piece.pawn-random-move').length === 0) {
            instance.isWindOfChangeActive = false; // Deactivate the flag if no active effects remain
        }
}


setupSocketListeners() {
        // Set up the listener once, and it will remain active
        socket.on('applyWindOfChange', (data) => {
            console.log('socket messhae received, data beng:', data)
            if (data.spellType === 'staff-of-light') {
                console.log('Applying wind of change spell', data);
                this.activateWindOfChangeSpell(data);
            }
        });
    }



// Method to check and update spell effects for all pawns
// checkAndUpdateSpellEffects() {
//     console.log('checkAndUpdateSpellEffects function entered in classPiece');
//     const allPawnElements = document.querySelectorAll('.chess-piece.pawn-random-move');
//     allPawnElements.forEach(pawnElement => {
//         const spellExpirationTurn = parseInt(pawnElement.dataset.spellExpirationTurn, 10);
//         if (spellExpirationTurn > 0) {
//             pawnElement.dataset.spellExpirationTurn = spellExpirationTurn - 1; // Decrement the value
//         } else {
//             // If the expiration turn has passed, remove the spell effect
//             ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight', 'pawn-random-move'].forEach(dir => pawnElement.classList.remove(dir));
//             // Clean up data attribute
//             delete pawnElement.dataset.spellExpirationTurn; // Corrected to delete the dataset attribute
//         }
//     });
// }


// checkAndUpdateSpellEffects() {
//   console.log('checkAndUpdateSpellEffects function entered in classPiece');
//     const allPawnElements = document.querySelectorAll('.chess-piece.pawn-random-move');
//     allPawnElements.forEach(pawnElement => {
//         const spellStartTurn = parseInt(pawnElement.dataset.spellStartTurn, 10);
//         const spellDuration = parseInt(pawnElement.dataset.spellDuration, 10);
//         if (game.turnCount >= spellStartTurn + spellDuration) {
//             // Spell duration has elapsed, remove the spell effect
//             ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight', 'pawn-random-move'].forEach(dir => pawnElement.classList.remove(dir));
//             // Clean up data attributes
//             delete pawnElement.dataset.spellStartTurn;
//             delete pawnElement.dataset.spellDuration;
//         }
//     });
// }

// activateWindOfChangeSpell() {
//         if (this.type !== 'pawn') return; // Only pawns are affected
//             this.isWindOfChangeActive = true;

//         const allPawnElements = document.querySelectorAll('.chess-piece.white-pawn, .chess-piece.black-pawn');
    
//     // Add the 'pawn-random-move' class to each pawn element
//     allPawnElements.forEach(pawnElement => {
//         pawnElement.classList.add('pawn-random-move');
//     });
//         this.movesLeftWithSpell = Math.floor(Math.random() * (9)) + 2; // 2 to 10 moves
//         this.assignNewDirection(); // Assign initial random direction
//     }

//     // Assigns a new, random direction to the pawn
//     assignNewDirection() {
//       console.log('this context in assignNewDirection', this);
//       const randomIndex = Math.floor(Math.random() * this.directions.length);
//       this.currentDirection = this.directions[randomIndex];
//       console.log(`New direction for ${this.color} pawn: ${this.currentDirection}`);
//             console.log(`New direction for ${this.color} pawn: ${chessPiece.currentDirection}`);

//     }

    // // Called after each move to update the spell's effect
    // updateAfterMove() {
    //     if (this.type !== 'pawn' || !this.isWindOfChangeActive) return;

    //     this.movesLeftWithSpell--;
    //     if (this.movesLeftWithSpell > 0) {
    //         this.assignNewDirection(); // Assign a new direction if spell is still active
    //     } else {
    //         this.isWindOfChangeActive = false; // Spell expires
    //         this.currentDirection = 'forward'; // Reset to default direction
    //     }
    // }
  // Additional methods as needed for standard chess piece behavior...
  
//END OD RANDOMPAWNMOVE
//BEGINNING OF ARCANE ANARCHY spell

    determineMovement() {
        // Movement logic based on piece type
        switch(this.type) {
            case 'Pawn': return 'forward';
            case 'Rook': return 'straight';
            case 'Knight': return 'L-shape';
            case 'Bishop': return 'diagonal';
            default: return 'default';
        }
    }

    // Static method to cast the Arcane Anarchy spell
    static castArcaneAnarchy() {
        const eligiblePieces = ChessPiece.allPieces.filter(piece => piece.type !== 'King' && piece.type !== 'Queen');
        const shuffledMovements = eligiblePieces.map(piece => piece.originalMovement).sort(() => Math.random() - 0.5);

        eligiblePieces.forEach((piece, index) => {
            piece.applySpell(shuffledMovements[index] || piece.originalMovement);
        });

        // Reset the spell after 3 turns
        // This logic would need to be integrated with the game's turn management system
    }

    applySpell(newMovement) {
        this.currentMovement = newMovement;
        this.isUnderSpell = true;
    }

    revertSpell() {
        this.currentMovement = this.originalMovement;
        this.isUnderSpell = false;
    }
    
//END OF ARCANE ANARCHY SPELL

//BEGIN OF TOWERACTIVATIONSPELL
placeTower() {
    const unOccupiedSquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    if (unOccupiedSquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * unOccupiedSquares.length);
        const chosenSquare = unOccupiedSquares[randomIndex];
        // Code to place the tower on chosenSquare
        chosenSquare.classList.add('TOWER');
        chosenSquare.innerHTML = '<img src="path/to/tower-icon.png" alt="Tower">';
        const squareId = chosenSquare.getAttribute('id');
        const coords = squareId.split('-').slice(1).map(Number); // Assuming IDs like 'square-3-4'
        this.towers.push({ x: coords[0], y: coords[1] });
        // Additional code to update game state, if necessary
    } else {
        console.log("No unoccupied squares available.");
    }
}
castTowerSpell(currentTurn) {
    this.towerOfPowerActivated = true;
    this.activationTurn = currentTurn;
    this.placeTower();
    // this.createBeamAndApplyEffects();
}
checkTowerCountAndActivateBeam() {
    if (this.towers.length === 4) {
        this.activateBeamOfLight();
    }
}

checkAndPlaceTowerEachTurn(currentTurn) {
  // const currentTurn = document.querySelector('.turn-count-display');
    if (this.towerOfPowerActivated && ((currentTurn - this.activationTurn) % 2 === 0)) {
        this.placeTower();
    }
}

createBeamAndApplyEffects() {
    this.towers.forEach((tower, index) => {
        // Assuming a method to draw a beam between towers
        if (index < this.towers.length - 1) {
            const nextTower = this.towers[index + 1];
            this.drawBeam(tower, nextTower);
        }

        // Check and apply effects to pieces along the beam1111111111111111111111
        this.checkAndApplyBeamEffects(tower);
    });
}

drawBeam(tower1, tower2) {
    // Implement logic to visually draw a beam between tower1 and tower2
}

checkAndApplyBeamEffects(tower) {
    // Logic to apply a 50% chance effect on enemy pieces along the beam
    // This will depend on the layout of your board and how pieces are managed
}
 updateTurnCount(newTurnCount) {
  console.log('updateTurnCount function called');
    console.log('Updating turn count to', newTurnCount); // Added for debugging
    document.getElementById('turn-count-display').textContent = `Turn: ${newTurnCount}`;
    
    // Ensure the event is being created and dispatched correctly
    try {
        const turnChangeEvent = new CustomEvent('turnChanged', { detail: { turnCount: newTurnCount } });
        document.dispatchEvent(turnChangeEvent);
    } catch (e) {
        console.error('Error dispatching turnChanged event:', e);
    }
}


//END OF TOWERACTIVATIONSPELL
//BEGIN OF REALITYSHATTERSPELL 
castRealityShatterSpell(chessBoard, game) {
        this.isRealityShattered = true;
        this.storePiecePositions();
        this.createMiniBoardContainers();
        this.hideMainBoard();
        this.divideBoardIntoMiniBoards(chessBoard, game);
        // Further logic for handling mini-board gameplay
    }
    storePiecePositions() {
    const pieces = document.querySelectorAll('.chess-piece');
    pieces.forEach(piece => {
        const square = piece.parentNode;
        piece.setAttribute('data-original-row', square.getAttribute('data-row'));
        piece.setAttribute('data-original-col', square.getAttribute('data-col'));
    });
}

  divideBoardIntoMiniBoards() {
    console.log('divideBoardIntoMiniBoards function called');
    const squaresWithPieces = document.querySelectorAll('.chess-square.has-piece');
    squaresWithPieces.forEach(square => {
        const row = parseInt(square.getAttribute('data-row'), 10);
        const col = parseInt(square.getAttribute('data-col'), 10);
        const piece = square.querySelector('.chess-piece');
        if (piece) {
            const miniBoardId = this.getMiniBoard(row, col);
            const miniBoardDiv = document.getElementById(`${miniBoardId}-mini-board`);
            if (miniBoardDiv) {
                miniBoardDiv.appendChild(piece);
            } else {
                console.error(`Mini-board container not found for ID: ${miniBoardId}-mini-board`);
            }
        }
    });
    this.isRealityShattered = true;
}
hideMainBoard() {
    const mainBoard = document.getElementById('chessboard');
    mainBoard.style.display = 'none'; // Use 'display: none' to hide the main board

    // Optionally, make the mini-board container visible
    const miniBoardContainer = document.getElementById('mini-board-container');
    miniBoardContainer.style.display = 'block'; // Adjust as per your layout
}
createMiniBoardContainers() {
    const miniBoardContainer = document.createElement('div');
    miniBoardContainer.className = 'mini-board-container';

    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(board => {
        const miniBoardDiv = document.createElement('div');
        miniBoardDiv.className = 'mini-board';
        miniBoardContainer.appendChild(miniBoardDiv); // Append to the container
    });

    document.body.appendChild(miniBoardContainer); // Append the container to the body or a specific element on your page
}
// createMiniBoardContainers() {
//     // Create or select a container for mini-boards
//     let miniBoardContainer = document.getElementById('mini-board-container');
//     if (!miniBoardContainer) {
//         miniBoardContainer = document.createElement('div');
//         miniBoardContainer.id = 'mini-board-container';
//         document.body.appendChild(miniBoardContainer); // Append to a suitable parent element
//     }

//     // Create and append mini-boards
//     ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(board => {
//         const miniBoardDiv = document.createElement('div');
//         miniBoardDiv.id = `${board}-mini-board`;
//         miniBoardDiv.className = 'mini-board';
//         miniBoardContainer.appendChild(miniBoardDiv);
//     });
// }

getMiniBoard(row, col) {
    if (row < 4 && col < 4) return 'topLeft';
    if (row < 4 && col >= 4) return 'topRight';
    if (row >= 4 && col < 4) return 'bottomLeft';
    if (row >= 4 && col >= 4) return 'bottomRight';
}
createEmptyMiniBoard() {
        return Array(4).fill(null).map(() => Array(4).fill(null));
    }

    mergeMiniBoardsBack() {
    const pieces = document.querySelectorAll('.chess-piece');
    pieces.forEach(piece => {
        const miniBoardDiv = piece.parentNode;
        const mainBoardSquare = document.querySelector(`.chess-square[data-row="${piece.dataset.row}"][data-col="${piece.dataset.col}"]`);
        mainBoardSquare.appendChild(piece); // Moves the piece back to the main board
    });

    this.isRealityShattered = false;
    // Additional logic to resume normal game play
}
//END OF REALITYSHATTERSPELL

//BEGIN OF AUTOSPELLS
castAutoSpellSpell(spellType, board, game) {
        switch (spellType) {
            case 'staff-of-fire':
                this.preparePawnCreation('FirePawn');
                break;

            case 'staff-of-water':
                this.preparePawnCreation('WaterPawn');
                console.log("preparePawnCreation successfully called on WaterPawn");
                break;
          
            case 'adept-wand':
                // Assuming castAdeptWandSpell affects the game state
                this.castAdeptWandSpell(board, game);
                break;
            case 'staff-of-light':  
               chessPiece.castRealityShatterSpell();
            case 'staff-of-earth' : 
              chessPiece.preparePawnCreation('Earthpawn');
              break;

            case 'ice':  

              break;

            case 'novice-staff':
            // chessPiece.applyGravitationalSpell();
              break;

            case 'iced-out':  
              chessPiece.castFrostGridSpell();
              break;

            case 'apprentice-wand': 
              chessPiece.activateDaggerSpell();
              break;

    case 'lightsaber' :
         chessPiece.castLightsaberSpell();

    break;

    case 'hourglass' :

    break;
    // Add cases for other spell types (air, water, etc.)
    case 'staff-of-chaos' :
         chessPiece.chaosWarp(board);

    break;

    case 'staff-of-the-necromancer' :
        chessPiece.castNecronomancerSpell();

    break;

    case 'apprentice-staff' :
        chessPiece.castDigitzKingSpell();
    break;
    case 'apprentice-wand' :

    break;
    case 'staff' :

    break;
    case 'orbs-of-illusion' :
              chessPiece.castChaosTheorySpell();


    break;
    
    case 'adept-wand' :

 chessPiece.castAdeptWandSpell(chessBoard, chessGame); //PROBLEME AVEC le changement de tours, concernant le nombre de tours qu'il reste pour le rift spell, et sa désimplemntation.

    break;

    case 'adept-staff' :

    break;

    case 'novice-staff' :

    break;

    case 'arcane-hands' :

    break;

    case 'staff-of-air' :

    break;

    case 'spoon' :

    break;
    
    case 'excalibur' :

    break;

    case 'magician-wand' :

    break;

    case 'trident' :

    break;

    case 'reaper-scythe' :

    break;

    case 'rebel-sword' :

    break;

    case 'wooden-staff' :

    break;

    case 'broomstick' :

    break;

    case 'celestial-staff' :

    break;

    case 'cybermancer-staff' :

    break;

    case 'grand-master-staff' :

    break;

    case 'stick-of-the-forest' :

    break;

    case 'samba' :

    break;
          
        }
    }

    drawSpell() {
        const randomIndex = Math.floor(Math.random() * this.spellDeck.length);
        return this.spellDeck[randomIndex];
    }

//END OF AUTOSPELLS



//BEGIN OF MERGING SPELLS

activateShadowMerge() {
        // Player selects two pieces to merge
        this.selectPiecesForMerge(); // Implement this selection method
    }

    mergePieces(piece1, piece2) {
        // Merge piece1 and piece2
        const mergedPiece = this.createMergedPiece(piece1, piece2);
        this.placeMergedPieceOnBoard(mergedPiece);
        this.mergedPieces.push(mergedPiece);

        // Duration of the merge
        setTimeout(() => this.splitMergedPiece(mergedPiece), 2 * turnDuration);
    }

    createMergedPiece(piece1, piece2) {
        // Create a new piece with combined movement abilities of piece1 and piece2
        // ...

        return mergedPiece; // Return the new merged piece
    }

    placeMergedPieceOnBoard(mergedPiece) {
        // Place the merged piece on the board
        // ...
    }

    splitMergedPiece(mergedPiece) {
        // Split the merged piece back into its original pieces
        // ...
    }

    capturePiece(capturingPiece, capturedPiece) {
        // If the captured piece is merged, count it as two captures
        // ...
    }


//END OF MERGING SPELLS

  




castDaggerSpell(data) {
    console.log('Casting Dagger Spell');
    const enemyColor = this.currentPlayer === 'white' ? 'black' : 'white';
    console.log(enemyColor);

    const enemyPieces = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);
    console.log("enemyPieces", enemyPieces);

    let currentSeed = data.seed;

    enemyPieces.forEach(piece => {
        const daggerImg = document.createElement('img');
        daggerImg.src = 'img/dagger.png'; // Path to your dagger image
        daggerImg.classList.add('dagger');
        piece.appendChild(daggerImg);

        // Use shared RNG to determine if the piece should be removed
        let rngResult = this.nextRandom(data.multiplier, currentSeed, data.increment, data.modulus);
        currentSeed = rngResult.newSeed;

        if (rngResult.nextValue < 0.33) {
            const parent = piece.parentNode; // Get the parent node of the piece
            if (parent) {
                parent.removeChild(piece); // Safely remove the piece from the DOM
            }
        }
    });
}

activateDaggerSpell(data) {
    this.castDaggerSpell(data);
}


   

        //GRAVITATIONNAL SPELL

    getRandomDirection() {
    const directions = ['left', 'right', 'top', 'bottom'];
    return directions[Math.floor(Math.random() * directions.length)];
}
  applyGravitationalSpell() {
    console.log('Casting Gravitational Spell');
    const direction = this.getRandomDirection();
    console.log(`Gravitational pull towards: ${direction}`);

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = this.getPieceFromCoords(row, col);
            if (piece) {
                const [newRow, newCol, hasMoved] = this.calculateNewPosition(row, col, direction);
                if (hasMoved) {
                    this.movePiece(row, col, newRow, newCol);
                } else if (Math.random() < 0.25) {
                    this.removePiece(row, col); // Implement this method to remove the piece
                }
            }
        }
    }
} 
calculateNewPosition(row, col, direction) {
    let newRow = row, newCol = col, hasMoved = false;

    while (true) {
        switch (direction) {
            case 'left':
                if (newCol > 0 && !this.getPieceFromCoords(newRow, newCol - 1)) {
                    newCol--; hasMoved = true;
                } else return [newRow, newCol, hasMoved];
                break;
            case 'right':
                if (newCol < 7 && !this.getPieceFromCoords(newRow, newCol + 1)) {
                    newCol++; hasMoved = true;
                } else return [newRow, newCol, hasMoved];
                break;
            case 'top':
                if (newRow > 0 && !this.getPieceFromCoords(newRow - 1, newCol)) {
                    newRow--; hasMoved = true;
                } else return [newRow, newCol, hasMoved];
                break;
            case 'bottom':
                if (newRow < 7 && !this.getPieceFromCoords(newRow + 1, newCol)) {
                    newRow++; hasMoved = true;
                } else return [newRow, newCol, hasMoved];
                break;
        }
    }
}

movePiece(oldRow, oldCol, newRow, newCol) {
    // Move the piece in the game state and update the DOM
    // This will depend on your game's implementation
}


//END OF GRAVITATIONNAL SPELL
//BEGIN OF NECROMANCER SPELL
castNecronomancerSpell() {
    console.log('Casting Chronomancer Spell');
    const playerColor = this.currentPlayer; // Assuming this is 'white' or 'black'
    const enemyColor = playerColor === 'white' ? 'black' : 'white';

    // Reviving captured pieces
    this.reviveCapturedPieces(playerColor);
    console.log("check after reviveCapturedPieces")
    // Removing enemy pieces with a 7% chance and 'stealing' them
    this.removeAndStealEnemyPieces(enemyColor, playerColor);
}
reviveCapturedPieces(playerColor) {
    const capturedPieces = this.getCapturedPieces(playerColor); // Implement this method

    capturedPieces.forEach(piece => {
        if (Math.random() < 0.10) {
            // Revive the piece on the board - you need to define where it should be placed
            this.placePieceOnBoard(piece); // Implement this method
        }
    });
}

removeAndStealEnemyPieces(enemyColor, playerColor, game) {
    console.log('removeAndStealEnemyPieces function called');
    const enemyPieces = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);

    enemyPieces.forEach(pieceElement => {
        if (Math.random() < 0.07) {
            const parent = pieceElement.parentNode;
            const pieceType = this.getPieceType(pieceElement); // Get the type of the piece

            // Remove the enemy piece
            parent.removeChild(pieceElement);

            // Add the removed piece type to the current player's set
            this.addPieceToPlayerSet(pieceElement, playerColor);
        }
    });
}
getPieceType(piece) {
  console.log('getPieceType entered with :', piece);
    if (piece.classList.contains('white-pawn')) return 'pawn';
    if (piece.classList.contains('black-pawn')) return 'pawn';
    if (piece.classList.contains('white-rook')) return 'rook';
    if (piece.classList.contains('black-rook')) return 'rook';
    if (piece.classList.contains('white-king')) return 'king';
    if (piece.classList.contains('white-queen')) return 'queen';
     if (piece.classList.contains('white-bishop')) return 'bishop';
    if (piece.classList.contains('white-knight')) return 'knight';
    if (piece.classList.contains('black-king')) return 'king';
    if (piece.classList.contains('black-queen')) return 'queen';
     if (piece.classList.contains('black-bishop')) return 'bishop';
    if (piece.classList.contains('black-knight')) return 'knight';
   
    return 'unknown'; // Default case
}
getCapturedPieces(playerColor) {
    if (!this.capturedPieces) {
        console.error("Captured pieces data is not available.");
        return []; // Return an empty array to safely handle this case
    }
    return this.capturedPieces.filter(piece => piece.color === playerColor);
}

placePieceOnBoard(piece, parent) {
    // Check if the parent square is empty
    if (!parent.querySelector('.chess-piece')) {
        parent.appendChild(piece); // Add the piece to the square
        // Update the internal game state
        const row = parseInt(parent.getAttribute('data-row'), 10);
        const col = parseInt(parent.getAttribute('data-col'), 10);
        this.game.board[row][col] = piece;
    } else {
        console.log("Cannot place the piece, the square is not empty.");
        // Handle the case where the square is not empty
    }
}
addPieceToPlayerSet(pieceElement, playerColor, game) {
  this.syncBoardState();
    const pieceTypes = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];


    // Find the piece type from the class list
        let pieceType = pieceElement.classList.value.split(' ')[1].split('-')[1];

    if (!pieceType) {
        console.error("Could not determine the piece type from the element", pieceElement);
        return;
    }
    // Create a new piece element with the correct color and type
    const newPiece = document.createElement('div');
    newPiece.classList.add('chess-piece', `${playerColor}-${pieceType}`);
    newPiece.style.backgroundImage = `url('images/${playerColor}-${pieceType}.png')`; // Update this path

    // Get all empty squares
    const emptySquares = document.querySelectorAll('.chess-square:not(.has-piece)');
    if (emptySquares.length === 0) {
        console.log("No empty squares available to place the piece.");
        return;
    }

    // Select a random empty square
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const targetSquare = emptySquares[randomIndex];
            console.log("targetSquare", targetSquare);

    const newImagePath = `images/${targetSquare.color}_${targetSquare.type}.png`;
    // Place the piece on the selected square
    targetSquare.appendChild(newPiece);
    targetSquare.classList.add('has-piece');
     
    // Update internal game state if necessary
    const row = parseInt(targetSquare.getAttribute('data-row'), 10);
    const col = parseInt(targetSquare.getAttribute('data-col'), 10);

    targetSquare.style.gridRow = row + 1;
    targetSquare.style.gridColumn = col + 1;
    targetSquare.setAttribute('data-type', pieceType);
    targetSquare.setAttribute('data-color', playerColor);
     newPiece.addEventListener('click', this.boundHandleClick, { once: true });
     newPiece.dataset.listenerAttached = 'true';
    console.log('this.game', this.game);  
    console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.game.board);  
    console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.board);  
    console.log("newPiece value :", newPiece);
    this.game.game.board[row][col] = { type: pieceType, color: playerColor }; // Update this to match how your game tracks pieces
    console.log('this.game.game.board in addPieceToPlayerSet after syncBoardState', this.game.game.board);
    console.log('this.game.board in addPieceToPlayerSet after syncBoardState', this.game.board);  

}

static forceMove(piece, fromRow, fromCol, toRow, toCol, isRiftMove = false) {
    console.log('forceMove called with piece:', piece, 'fromRow:', fromRow, 'fromCol:', fromCol, 'toRow:', toRow, 'toCol:', toCol);

    // Validate positions
    if (fromRow === null || fromCol === null || toRow === null || toCol === null) {
        console.error('Invalid move: Position out of bounds');
        return;
    }

    // Handle the square the piece is moving from
    const fromSquare = document.getElementById(`square-${fromRow}-${fromCol}`);
    const pieceElement = fromSquare.querySelector('.piece');
    console.log('pieceElement', pieceElement);
    let pieceType = fromSquare.getAttribute('data-type');
    
    let pieceColor = fromSquare.getAttribute('data-color');    
    
    console.log('pieceType', pieceType, 'pieceColor', pieceColor, 'fromSquare', fromSquare);
    console.log('piece', piece);
    if (fromSquare && fromSquare.contains(piece.pieceElement)) {
        fromSquare.classList.remove('has-piece', 'enchanted-ground', 'event-listener-attached');
        fromSquare.removeAttribute('data-color');
        fromSquare.removeAttribute('data-type');
        fromSquare.removeAttribute('style');
        fromSquare.removeChild(piece.pieceElement);
    } else {
        console.error(`Failed to find or remove piece from square (${fromRow}, ${fromCol})`);
    }

    // Handle the square the piece is moving to
    const toSquare = document.getElementById(`square-${toRow}-${toCol}`);


    if (toSquare) {
        // If there is an existing piece at the target square, only remove it if it's an enemy piece
        const existingPiece = toSquare.querySelector('.chess-piece');

       
        if (existingPiece && existingPiece.dataset.color !== piece.dataset.color) {
            toSquare.removeChild(existingPiece);
            // Additional logic for capturing the piece, updating scores, etc.
        }
   
        console.log('fromSquare', fromSquare);
        toSquare.appendChild(piece.pieceElement);
        toSquare.classList.add('has-piece');
        toSquare.setAttribute('data-type', pieceType);
        toSquare.setAttribute('data-color', pieceColor);
        toSquare.style.backgroundImage = `url('img/${pieceColor}-${pieceType}.png')`;
        console.log('isRiftMove', isRiftMove);
        if (!isRiftMove) {
          console.log('trying to addEventListener in forceMove');
            piece.pieceElement.addEventListener('click', this.boundHandleClick, { once: true });
        }
    } else {
        console.error(`Failed to find target square at position (${toRow}, ${toCol})`);
    }

    if (isRiftMove) {
        console.log('Rift-induced move completed.');
    }
}

//END OF NECROMANCER SPELL
// BEGINNING OF GAMBITMOVE UPGRADEDPIECE

activateGambitOfAges() {// Assuming you have a way to access the board and pieces
  console.log('Casting gambitOfAges');
        const enemyColor = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(enemyColor);
        const board = document.querySelector('#chessboard');

        const enemyPawn = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);
        const alliedPawn = document.querySelectorAll(`.chess-piece.${this.currentPlayer}-pawn`);
        console.log("enemyPawn", enemyPawn);
        console.log("alliedPawn", alliedPawn);

        
        const opponentUpgradedPiece = Array.from(document.querySelectorAll(`.chess-piece.${enemyColor}-rook, 
                                                                       .chess-piece.${enemyColor}-bishop, 
                                                                       .chess-piece.${enemyColor}-knight`));

        const alliedUpgradedPiece = Array.from(document.querySelectorAll(`.chess-piece.${this.currentPlayer}-rook, 
                                                                       .chess-piece.${this.currentPlayer}-bishop, 
                                                                       .chess-piece.${this.currentPlayer}-knight`));
        
        const enemyPawnSelected = this.randomlySelectPieces(enemyPawn, 2);
        const opponentUpgradedPieceSelected = this.randomlySelectPieces(opponentUpgradedPiece, 2);

        // Select two pawns and one 'upgraded' piece for each player
        const alliedUpgradedPieceSelected = this.randomlySelectPieces(alliedUpgradedPiece, 2);
        const alliedPawnSelected = this.randomlySelectPieces(alliedPawn, 2);
        
        console.log('alliedPawnSelected', enemyPawnSelected);        
        console.log('alliedUpgradedPieceSelected', opponentUpgradedPieceSelected);
        console.log('alliedPawnSelected', alliedPawnSelected);        
        console.log('alliedUpgradedPieceSelected', alliedUpgradedPieceSelected);
     
        // Apply enhancements
        alliedUpgradedPieceSelected.forEach(piece => this.enhancePiece(piece));
        opponentUpgradedPieceSelected.forEach(piece => this.enhancePiece(piece));
        enemyPawnSelected.forEach(piece => this.enhancePiece(piece));
        alliedPawnSelected.forEach(piece => this.enhancePiece(piece));
        // ... Additional logic for visual indicators and other effects
    }

    // Method to randomly select pieces
    // selectRandomPieces(pieces, count, types) {
    //     const filteredPieces = pieces.filter(piece => types.includes(piece.type));
    //     // Shuffle and select the specified number of pieces
    //     return filteredPieces.sort(() => 0.5 - Math.random()).slice(0, count);
    // }

    // Method to apply enhancements to a piece
    enhancePiece(piece) {
    // Assuming 'piece' is the DOM element representing the chess piece
    console.log('Enhancing piece:', piece);

    // Mark the piece as enhanced using a data attribute
    piece.dataset.isEnhanced = 'true';

    // Apply a universal visual indicator for all enhanced pieces
    piece.style.boxShadow = '0 0 10px 5px rgba(255, 215, 0, 0.7)'; // Example: A glowing effect
}

// END OF GAMBITMOVE UPGRADEPIECE
//BEGIN OF LIGHSABER SPELL
castLightsaberSpell(data) {
    console.log("Casting Lightsaber Spell with rng:", data);
    
    // Shared RNG setup
    let currentSeed = data.seed;

    // Play lightsaber animation and sound across the columns
    this.playLightsaberAnimation(data, currentSeed, (removalColumnIndex) => {
        this.removePiecesInColumn(removalColumnIndex);
    });
}


 removePiecesInColumn(columnIndex) {
    console.log("Column Index for removal:", columnIndex);

    for (let row = 0; row < 8; row++) {
        const squareId = `square-${row}-${columnIndex}`;
        const square = document.getElementById(squareId);
        console.log("square", square);

        if (square && square.classList.contains('has-piece') && this.isEnemyPiece(square)) {
            console.log(`Enemy piece detected at ${row}, ${columnIndex}:`, square);
            this.forceRemove(row, columnIndex); // Remove the piece from the board
        }
    }
}
isEnemyPiece(square) {
    if (!this.currentPlayer) {
      
      console.log("this.currentPlayer", this.currentPlayer); 
        console.error('Current player color is not defined.');
        return false; // Or handle this case as per your game logic
    }

    console.log(`Current player color: ${this.currentPlayer}`);
    const pieceColor = square.getAttribute('data-color');
    console.log("Piece color on square:", pieceColor);
    return pieceColor !== this.currentPlayer;
}

playLightsaberAnimation(data, initialSeed) {
    const lightsaberSound = new Audio('sound/lightsaber.mp3');
    let currentColumn = 0;
    const totalColumns = 8; // For a standard chessboard with 8 columns

    let currentSeed = initialSeed;
    // Determine a random number of individual columns to move through (3 to 15)
    const minColumns = 3;
    const maxColumns = 15;
    
    let rngResult = this.nextRandom(data.multiplier, currentSeed, data.increment, data.modulus);
    const targetColumns = Math.floor(rngResult.nextValue * (maxColumns - minColumns + 1)) + minColumns;
    currentSeed = rngResult.newSeed;

    let columnsMoved = 0;

    const lightsaberInterval = setInterval(() => {
        this.updateLightsaberColumn(currentColumn);
        lightsaberSound.play();

        // Increment the counter and move to the next column
        columnsMoved++;
        currentColumn = (currentColumn + 1) % totalColumns;

        // Check if the animation should stop
        if (columnsMoved >= targetColumns) {
            clearInterval(lightsaberInterval);

            // Add a delay before removing pieces to allow the last update to be shown
            setTimeout(() => {
                const removalColumnIndex = currentColumn === 0 ? totalColumns - 1 : currentColumn - 1;
                this.removePiecesInColumn(removalColumnIndex);
            }, 500); // Delay of 500 milliseconds
        }
    }, 500); // Interval timing

}

updateLightsaberColumn(columnIndex) {
    const lightsaber = document.getElementById('lightsaber');
    const chessBoard = document.querySelector('#chessboard'); // Replace with your chessboard's ID
    console.log("chessBoard", chessBoard);

    // Calculate the width of a single column (assuming 8 columns for a standard chessboard)
    const columnWidth = chessBoard.offsetWidth / 8;

    // Position the lightsaber over the correct column
    lightsaber.style.left = `${columnIndex * columnWidth}px`;
    lightsaber.style.width = `${columnWidth}px`;
    lightsaber.style.display = 'block';

    // Hide the lightsaber after 1 second
    setTimeout(() => {
        lightsaber.style.display = 'none';
    }, 400); // 1000 milliseconds = 1 second
}
 forceRemove(row, col) {
    console.log("forceRemove function called for row:", row, "col:", col);

    // Identify the square from which the piece is to be removed
    const squareId = `square-${row}-${col}`;
    const square = document.getElementById(squareId);
    const color = square.getAttribute('data-color');
    const type = square.getAttribute('data-type');
    console.log('square in forceRemove:', square);

    if (square) {
        // Remove the piece element from the square
        const piece = square.querySelector('.chess-piece');
        console.log('piece to be removed:', piece);
        if (piece) {
            square.removeChild(piece);
            square.classList.remove('has-piece');
            square.removeAttribute('data-color');
            square.removeAttribute('data-type');
           // EMOJI MAPPING
             // const pieceEmoji = this.mapPieceToEmoji(type, color);
            // this.addCapturedPiece(pieceEmoji, color);
        }

        // Clear the background-image style from the square
        square.style.backgroundImage = ''; // This line removes the image
    }

    // Update the internal game state
    // this.game.board[row][col] = null;
}
static forceRemove(row, col) {
    console.log("forceRemove function called for row:", row, "col:", col);

    // Identify the square from which the piece is to be removed
    const squareId = `square-${row}-${col}`;
    const square = document.getElementById(squareId);
    const color = square.getAttribute('data-color');
    const type = square.getAttribute('data-type');
    console.log('square in forceRemove:', square);

    if (square) {
        // Remove the piece element from the square
        const piece = square.querySelector('.chess-piece');
        console.log('piece to be removed:', piece);
        if (piece) {
            square.removeChild(piece);
            square.classList.remove('has-piece');
            square.removeAttribute('data-color');
            square.removeAttribute('data-type');
           // EMOJI MAPPING
             // const pieceEmoji = this.mapPieceToEmoji(type, color);
            // this.addCapturedPiece(pieceEmoji, color);
        }

        // Clear the background-image style from the square
        square.style.backgroundImage = ''; // This line removes the image
    }

    // Update the internal game state
    // this.game.board[row][col] = null;
}
    getType() {
        // returns the type of the piece (e.g. "pawn", "rook", etc.)
      return this.type;
    }

    getColor() {
        // returns the color of the piece (e.g. "white", "black")
      return this.color;
    }

    getPosition(piece) 
    {
        // returns the current position of the piece on the board as an array [row, col]
      return [this.row, this.col];
    }

    setPosition(row, col) 
    {
        // sets the position of the piece on the board
      this.row = row;
      this.col = col;
    }

    playMoveSound() 
    {
      const audioElement = document.createElement('audio');
      audioElement.src = '/sounds/move.mp3';
      document.body.appendChild(audioElement);
      audioElement.play();
    }

    playCaptureSound() {
      const audioElement = document.createElement('audio');
      audioElement.src = '/sounds/capture.mp3';
      document.body.appendChild(audioElement);
      audioElement.play();
    }

    playWrongSound() 
    {
        // create an audio element for the wrong sound
      const audioElement = document.createElement('audio');
      audioElement.src = '/sounds/wrong.mp3';
      document.body.appendChild(audioElement);
        // play the sound
      audioElement.play();
    }
 


 }
 // module.exports = ChessPiece;
//    document.addEventListener('DOMContentLoaded', function() {
//     // Add event listeners to all chess squares
//     document.querySelectorAll('.chess-square').forEach(square => {
//         square.addEventListener('click', function() {
//             // Retrieve the row and column from the clicked square
//             const row = this.getAttribute('data-row');
//             const col = this.getAttribute('data-col');

//             // Call the function to remove pieces from this column
//             removePiecesFromColumn(col);
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const closeButton = document.getElementsByClassName("close-button")[0];
//   if (closeButton) {
//     console.log("Close button setup");
//     closeButton.addEventListener('click', () => {
//       // this.hideSelectSquarePrompt();
//     });
//   }
// });
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.getElementsByClassName("close-button")[0];
    if (closeButton) {
      console.log("Close button setup");
      closeButton.addEventListener('click', () => {
        // this.hideSelectSquarePrompt();
      });
    }
  });
    

  document.addEventListener('turnChanged', (e) => {
    console.log('turn changed');
    // Assuming you have a chessPiece instance accessible here
    chessPiece.placeTower();
    chessPiece.checkTowerCountAndActivateBeam();
  });

  document.getElementById('turn-count-display').addEventListener('turnChanged', (e) => {
    const { turnCount } = e.detail; // Get the current turn count from the event detail
    console.log('Turn changed:', turnCount);
    // Assuming you have a chessPiece instance accessible here
    chessPiece.checkAndUpdateSpellEffects();
    // Additional logic here if needed
  });

  document.addEventListener('turnChanged', function(event) {
    console.log('trying to call checkAndUpdateSpellEffects');
    // Assuming you have a chessPiece instance accessible here
    chessPiece.checkAndUpdateSpellEffects();
  }.bind(this));
}

// export { ChessPiece, ChessPiece as calculateValidMoves };
