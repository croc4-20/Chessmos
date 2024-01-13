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
 
 
  const chessArray = new ChessArray();
  const chessBoard = new ChessBoard();
  console.log("chessBoard", chessBoard);
  chessBoard.initializeBoard();

  chessBoard.populateBoardWithPieces();
  const game = new ChessGame(chessArray, chessBoard, this);
  console.log("game");
  // try {
  //   await
  // } catch (error) {
  //   console.error("Failed to initialize boaaard:", error);
  //   throw error;
  // }
  // this.boundHandleClick = this.handleClick.bind(this);

 const pieces = [

{ type: 'rook', color: 'black', row: 7, col: 0, imagePath: 'img/blackROOK.png', elementId: 'square-7-0', game: game },
{ type: 'knight', color: 'black', row: 7, col: 1, imagePath: 'img/blackKNIGHT.png', elementId: 'square-7-1', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 2, imagePath: 'img/BlackBISHOP.png', elementId: 'square-7-2', game: game },
{ type: 'queen', color: 'black', row: 7, col: 3, imagePath: 'testNewImages/BlackQueen.png', elementId: 'square-7-3', game: game },
{ type: 'king', color: 'black', row: 7, col: 4, imagePath: 'images/blackKING.png', elementId: 'square-7-4', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 5, imagePath: 'img/BlackBISHOP.png', elementId: 'square-7-5', game: game },
{ type: 'knight', color: 'black', row: 7, col: 6, imagePath: 'img/blackKNIGHT.png', elementId: 'square-7-6', game: game },
{ type: 'rook', color: 'black', row: 7, col: 7, imagePath: 'img/blackROOK.png', elementId: 'square-7-7', game: game },
 
{ type: 'pawn', color: 'black', row: 6, col: 0, imagePath: 'images/blackPAWN.png', elementId: 'square-6-0', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 1, imagePath: 'images/blackPAWN.png', elementId: 'square-6-1', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 2, imagePath: 'images/blackPAWN.png', elementId: 'square-6-2', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 3, imagePath: 'images/blackPAWN.png', elementId: 'square-6-3', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 4, imagePath: 'images/blackPAWN.png', elementId: 'square-6-4', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 5, imagePath: 'images/blackPAWN.png', elementId: 'square-6-5', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 6, imagePath: 'images/blackPAWN.png', elementId: 'square-6-6', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 7, imagePath: 'images/blackPAWN.png', elementId: 'square-6-7', game: game },

{ type: 'rook', color: 'white', row: 0, col: 0, imagePath: 'img/whiteROOK.png', elementId: 'square-0-0', game: game },
{ type: 'knight', color: 'white', row: 0, col: 1, imagePath: 'img/whiteKNIGHT.png', elementId: 'square-0-1', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 2, imagePath: 'img/whiteBISHOP.png', elementId: 'square-0-2', game: game },
{ type: 'queen', color: 'white', row: 0, col: 3, imagePath: 'images/whiteQUEEN.png', elementId: 'square-0-3', game: game },
{ type: 'king', color: 'white', row: 0, col: 4, imagePath: 'images/whiteKING.png', elementId: 'square-0-4', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 5, imagePath: 'img/whiteBISHOP.png', elementId: 'square-0-5', game: game },
{ type: 'knight', color: 'white', row: 0, col: 6, imagePath: 'img/whiteKNIGHT.png', elementId: 'square-0-6', game: game },
{ type: 'rook', color: 'white', row: 0, col: 7, imagePath: 'img/whiteROOK.png', elementId: 'square-0-7', game: game },

{ type: 'pawn', color: 'white', row: 1, col: 0, imagePath: 'images/whitePAWN.png', elementId: 'square-1-0', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 1, imagePath: 'images/whitePAWN.png', elementId: 'square-1-1', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 2, imagePath: 'images/whitePAWN.png', elementId: 'square-1-2', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 3, imagePath: 'images/whitePAWN.png', elementId: 'square-1-3', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 4, imagePath: 'images/whitePAWN.png', elementId: 'square-1-4', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 5, imagePath: 'images/whitePAWN.png', elementId: 'square-1-5', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 6, imagePath: 'images/whitePAWN.png', elementId: 'square-1-6', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 7, imagePath: 'images/whitePAWN.png', elementId: 'square-1-7', game: game },
 
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
        console.log(`Event listener attached to: ${chessPiece.elementId}`);
    }


  }


// console.log(typeof ChessPiece);
  // console.log(ChessPiece);
  console.log(typeof ChessBoard);
  console.log("ChessBoard in classPiiece", ChessBoard);
  console.log(typeof ChessGame);
  console.log(ChessGame);
  console.log(typeof ChessArray);
  console.log(ChessArray);
console.log("Classes imported successfully");
    
  
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
    this.board = chessBoard;
    console.log("this.board in chessPiece constructor", this.board);
    //this.chessBoard = new ChessBoard();
    this.color = color;
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
   
    this.activeSpells = [];
    this.game = game;
    // this.game.endTurn = this.game.endTurn.bind(this.game);
    this.selectedSquare = null;
    this.prevTarget = null;
    this.validMoves = [];
    this.selectedPiece = null;
    this.currentPlayer = game.currentPlayer;
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
        this.element.classList.add('event-listener-attached');
        console.log('Adding event listener to:', this.element);
    } else {
        console.error(`Event listener already attached to: ${this.element}`);
    }

      
   if (elementId) {
  console.log("Type:", type, "color:", color, "! row,col: ", row, col, "imagePath: ", imagePath, "elementId :", elementId, "game", game);
}

}
showNotification(spellName, spellDuration, description) {
    const notificationBox = document.createElement('div');
    notificationBox.className = 'notification-box';
    notificationBox.id = `${spellName.toLowerCase()}-notification`; 
    // notificationBox.innerHTML = `<p><strong>${spellName}</strong>: ${description} (<span id="${spellDuration}</span> turns left)</p>`;
    notificationBox.innerHTML = `<p><strong>${spellName}</strong>: ${description} (<span id="${spellName.toLowerCase()}-turns-left">${this.riftSpellDuration}</span> turns left)</p>`;
    const gameUI = document.getElementById('game-ui');
    gameUI.appendChild(notificationBox);
}
// showNotification(spellName, initialTurnsLeft, description) {
//     const notificationBox = document.createElement('div');
//     notificationBox.className = 'notification-box';
//     notificationBox.id = `${spellName.toLowerCase()}-notification`; // Ensure a unique ID
//     notificationBox.innerHTML = `<p><strong>${spellName}</strong>: ${description} (<span id="rift-turns-left">${initialTurnsLeft}</span> turns left)</p>`;

//     const gameUI = document.getElementById('game-ui');
//     gameUI.appendChild(notificationBox);

//     // Function to update the turn count in the notification
//     return (turnsLeft) => {
//         const turnsLeftElement = document.getElementById('rift-turns-left');
//         if (turnsLeftElement) {
//             turnsLeftElement.textContent = `${turnsLeft}`;
//         }
//         if (turnsLeft <= 0) {
//             notificationBox.remove();
//         }
//     };
// }
// showNotification(spellName, initialTurnsLeft, description) {
//     // Create the notification box
//     const notificationBox = document.createElement('div');
//     notificationBox.className = 'notification-box';
//     notificationBox.innerHTML = `
        
//         <p id="rift-turns-left">${initialTurnsLeft} turns left</p>
//     `;
//     notificationBox.title = description;

//     // Append the notification box to the game UI
//     const gameUI = document.getElementById('game-ui');
//     gameUI.appendChild(notificationBox);

//     // Function to update the turn count in the notification
//     function updateTurnCount(turnsLeft) {
//         const turnsLeftElement = document.getElementById('rift-turns-left');
//         if (turnsLeftElement) {
//             turnsLeftElement.textContent = `${turnsLeft} turns left`;
//         }
//         if (turnsLeft <= 0) {
//             notificationBox.remove();
//         }
//     }

//     // Return the update function so it can be called each turn
//     return updateTurnCount;
// }
// updateNotification(spellName, turnsLeft, description) {
//   console.log('entenred updateNotification with: spellName :', spellName, "turnsLeft", turnsLeft, "description", description);
//         // Find the notification element on the page
//         const notificationElement = document.getElementById('notification');
//         if (notificationElement) {
//             notificationElement.innerHTML = `
//                 <strong>${spellName}</strong>: ${description} (${turnsLeft} turns left)
//             `;
//         }
//     }
updateNotification(spellName, turnsLeft, description) {
    console.log('Entered updateNotification with: spellName :', spellName, "turnsLeft", turnsLeft, "description", description);
    const notificationElement = document.getElementById(`${spellName.toLowerCase()}-notification`);
    if (notificationElement) {
        const turnsLeftElement = document.getElementById(`${spellName.toLowerCase()}-turns-left`);
        if (turnsLeftElement) {
            turnsLeftElement.textContent = `${turnsLeft}`;
        }
        if (turnsLeft <= 0) {
            notificationElement.remove();
        }
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

handleClick = (event, chessBoard, game) => {
  console.log('player color : ', this.game.currentPlayer);
  console.log('this context at the beginning of handleclick', this);

    console.log('this.game.board in handleclick before syncBoardState', this.game.game.board);  
    console.log('this.game.board in handleclick before syncBoardState', this.game.board); 
     this.syncBoardState();
    console.log('this.game.game.board in handleclick after syncBoardState', this.game.game.board);
    console.log('this.game.board in handleclick after syncBoardState', this.game.board);  
      console.log("Active Spells in handleclick:", this.activeSpells);
    const clickedSquareElement = event.target.closest('.chess-square');
    const clickedPieceElement = clickedSquareElement.querySelector('.chess-piece');

    if (this.isSpecialMoveActive || this.isSpellActive) return;

    const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
    console.log('this.selectedPiece', this.selectedPiece);

    //forbid frozen piece to move
    if (clickedPieceElement.classList.contains('frozen-piece') || clickedSquareElement.classList.contains('frozen-square')) {
        console.log('This piece is frozen and cannot move.');
        return; // Exit the function, preventing selection/movement
    }
    // Turn validation
    if (clickedPiece && clickedPiece.color !== this.game.currentPlayer) {
        alert("It's not your turn!");
        return;
    }

    // Handle Deselection
    if (this.selectedPiece) {
        if (this.shouldDeselect(clickedPiece, clickedSquareElement, clickedPieceElement)) {
            this.deselectAndClear();
            return;
        }
    }

    // If a valid move is selected, execute the move
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
        this.selectNewPiece(clickedPiece, clickedPieceElement, chessBoard, game);
    } else {
        this.deselectAndClear();
    }
};

 // Helper function to check if the piece should be deselected
 shouldDeselect(clickedPiece, clickedSquareElement, clickedPieceElement) 
 {
  const isSamePiece = this.selectedPiece.element === clickedPieceElement;
  const isSameColor = clickedPiece && clickedPiece.color === this.selectedPiece.color;
  const isInvalidMove = !clickedSquareElement.classList.contains('valid-move');
  return isSamePiece || isSameColor || isInvalidMove;
}
syncBoardState = () => {
    console.log("Synchronizing board state...");
    console.log('this.game.game.board in syncBoardState', this.game.game.board);
    console.log('this.game.board in syncBoardState', this.game.board);

    // this.game.game.board = Array.from({ length: 8 }, () => Array(8).fill(null));

    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => {
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);
        const pieceElement = square.querySelector('.chess-piece > div');

        if (pieceElement) {
            const [color, type] = pieceElement.className.split('-');
            this.game.game.board[row][col] = { type, color };
        }
    });

    console.log("this.game.board state synchronized:", this.game.board);
        console.log('this.game.game.board state synchronized', this.game.game.board);

};

deselectAndClear() {
  if (this.selectedPiece && this.selectedPiece.element) {
    this.selectedPiece.element.classList.remove('selected-piece');
  }
  this.clearValidMoves();
  this.selectedPiece = null;
}


executeMove(board, clickedSquareElement, chessBoard, activeSpells) {
        console.log(`Chaos Theory activated for ${this.chaosTheoryTurnsLeft} turns.`);
  if (this.hasMovedDueToRift) {
        console.log('Piece already moved by rift effect, skipping normal move logic.');

        // Reset the flag
        this.hasMovedDueToRift = false;

        // Exit early as the piece has already been moved
        return;
    }
  console.log("Executingggg move for piece:", this.selectedPiece);
  console.log("clickedSquareElement in executeMove:", clickedSquareElement);
  console.log("Board state before move:", this.game.game.board);
  console.log('this.hasMovedDueToRift', this.hasMovedDueToRift);

  

  // clickedSquareElement = document.querySelector(`.valid-move`);
  const clickedRow = parseInt(clickedSquareElement.getAttribute('data-row'), 10);
  const clickedCol = parseInt(clickedSquareElement.getAttribute('data-col'), 10);

  const newRow = parseInt(clickedSquareElement.getAttribute('data-row'), 10);
  const newCol = parseInt(clickedSquareElement.getAttribute('data-col'), 10);
  const destinationElement = document.getElementById(`square-${newRow}-${newCol}`);

  const oldPiece = document.querySelector(".selected-piece");
  const oldSquare = oldPiece.parentNode;
  const oldType = this.selectedPiece.piece.type;
  const oldColor = this.selectedPiece.piece.color;
  
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
          this.game.endTurnMove();
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
            console.log("Board state after move:", this.game.board);

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

  if (this.selectedPiece) {
   
    this.previousPiece = this.selectedPiece;
     this.deselectAndClear();
  }
  
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
      delete this.activeClickListeners[squareId];  // Remove the stored function reference
    }
  });

  // Highlight new valid moves
  for (const move of validMoves) {
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
  }
}


switchTurn() {
  console.log('witchTurn entered with player :', this.currentPlayer);
    // Assuming 'white' and 'black' are your player identifiers
    this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
    console.log(this.currentPlayer);

    // Any other logic required to switch turns
}
    clearValidMoves() {
    const validMoveSquares = document.querySelectorAll('.valid-move');
    validMoveSquares.forEach(square => {
        square.classList.remove('valid-move');
        square.innerHTML = '';
    });
}
    
    

    

getPieceFromElement(pieceElement) {
  console.log("GetPieceFromElement, entered with pieceElement:", pieceElement);
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
refreshPieceEventListeners(enableListeners) {
    const chessPieces = document.querySelectorAll('.chess-piece');
    chessPieces.forEach(pieceElement => {
        pieceElement.removeEventListener('click', this.boundHandleClick);
        if (enableListeners) {
            pieceElement.addEventListener('click', this.boundHandleClick);
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
  const enemyColor = this.color === "white" ? "black" : "white";
  const currentRow = parseInt(row, 10);
  const currentCol = parseInt(col, 10);
  game = this.game
  switch (type) {
    case 'pawn':
      const pawnSquare = document.querySelector(`.chess-square[data-row="${currentRow}"][data-col="${currentCol}"]`);
      console.log('pawnSquare', pawnSquare);
      console.log('pawnSquare class list:', pawnSquare.classList);
      const isPawnOnMiniBoard = pawnSquare.classList.contains('mini-board-highlight');
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
  } else {
       console.log("Processing pawn");
  let direction = this.color === "white" ? 1 : -1; // Adjusted for the board setup
  console.log('direction', direction); 
  let newRow = currentRow + direction;
  console.log('newRow for pawn in calculateValidMoves:', newRow);
  console.log('Board at newRow:', this.game.game.board[newRow]);
  console.log('Board state:', board);
  console.log("this.game.board", this.game.board);


  // Forward Move
  if (newRow >= 0 && newRow < 8 && !this.game.game.board[newRow][currentCol]) {
    validMoves.push({ row: newRow, col: currentCol });

      console.log("Pawn starting row check:", (this.color === "white" && row === 1) || (this.color === "black" && row === 6));
      console.log("Square directly in front is empty:", !this.game.game.board[currentRow + direction][currentCol]);
      console.log("Square two steps ahead is empty:", !this.game.game.board[currentRow + 2 * direction][currentCol]);

    // Double Move on First Move
    if ((this.color === "white" && currentRow === 1) || (this.color === "black" && currentRow === 6)) {
      let doubleMoveRow = newRow + direction;
      if (!this.game.game.board[doubleMoveRow][currentCol]) {
        validMoves.push({ row: doubleMoveRow, col: currentCol });
      }
    }
  }

  // Capturing Moves
  const captureOffsets = [1, -1];
  for (let offset of captureOffsets) {
    let captureCol = currentCol + offset;
    if (captureCol >= 0 && captureCol < 8) {
      let captureSquare = this.game.game.board[newRow][captureCol];
      if (captureSquare && captureSquare.color !== this.color) {
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


chaosWarp(board) {
    console.log("chaosWarp called");

    const squares = document.querySelectorAll('.chess-square');
    console.log("squares found:", squares);

    // Extract pieces from the game board
    let pieces = [];
    squares.forEach(square => {
        square.classList.remove('has-piece');
        square.removeAttribute('data-type');
        square.removeAttribute('data-color');
        square.style.backgroundImage = '';
        const pieceElement = square.querySelector('.chess-piece');
        if (pieceElement) {
            pieces.push({
                element: pieceElement,
                type: pieceElement.classList[1].split('-')[1], // Assuming second class is piece type
                color: pieceElement.classList[1].split('-')[0]  // Assuming second class is piece color
            });
            // Remove the piece element from the square
            square.removeChild(pieceElement);
        }
    });

    // Shuffle the pieces array
    for (let i = pieces.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
  // this.game.board = this.createEmptyBoard();
    // Place the shuffled pieces back on the board
    pieces.forEach(pieceData => {
        let placementFound = false;
        while (!placementFound) {
            let randomIndex = Math.floor(Math.random() * squares.length);
            let randomSquare = squares[randomIndex];

            if (!randomSquare.hasChildNodes()) {
                const newRow = parseInt(randomSquare.getAttribute('data-row'), 10);
                const newCol = parseInt(randomSquare.getAttribute('data-col'), 10);

                randomSquare.appendChild(pieceData.element);
                randomSquare.classList.add('has-piece');
                randomSquare.setAttribute('data-type', pieceData.type);
                randomSquare.setAttribute('data-color', pieceData.color);

                // Update the internal board
                this.game.board[newRow][newCol] = {
                    type: pieceData.type,
                    color: pieceData.color,
                    // Add any other necessary properties
                };

                placementFound = true;
            }
        }
    });

    console.log("Shuffling complete, internal board updated.");
      this.updateInternalBoardStateFromDOM();
    this.updateBoardVisuals();
  
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

  getPieceFromCoords(i, j) {
    console.log('getPieceFromCoords called');
    // Convert the row and column to integers
    const x = parseInt(i, 10);
    const y = parseInt(j, 10);
    console.log("Board:", this.game.board, "X:", x, "Y:", y);

    // Assuming this.game.board is a 2D array representing the chessboard
    // Check if the coordinates are within the board bounds
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        return this.game.board[x][y];
    } else {
        return null; // Return null if the coordinates are out of bounds
    }
}


castAdeptWandSpell() {
        // Initialize the rift duration
        this.riftDuration = Math.floor(Math.random() * 6) + 1; // Duration between 1 and 6 turns
        console.log(`Rift started with duration: ${this.riftDuration} turns`);
       // this.updateRiftTurns = this.showNotification("Rift", this.riftDuration, "Piece teleported to a random square.");
  // Define and visually represent the rift area
        this.defineAndShowRiftArea();

        // // Check if this piece is in the rift area
        // if (this.isInRift(this.row, this.col)) {
        //     this.randomlyPlacePiece();
        // }

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
        this.showNotification(spell.name, spell.duration, "Piece teleported to a random square.");
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
  const shuffledPieces = pieces.sort(() => 0.5 - Math.random());
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

    //BEGIN OF STICK OF THE FOREST SPELL
    castStickOfTheForestSpell()
    {
      
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
swapPiece(piece) {
    console.log('swapPiece function called with', piece);
    // const pieceColor = piece.dataset.color;

    // Fetch all pieces of the same color
    //     const pieces = Array.from(document.querySelectorAll(`.chess-piece.${pieceColor}-rook, .chess-piece.${pieceColor}-bishop, .chess-piece.${pieceColor}-knight, .chess-piece.${pieceColor}-pawn, .chess-piece.${pieceColor}-queen, .chess-piece.${pieceColor}-king`))
    const pieceTypes = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
const pieceColor = this.color; // or "black", depending on the color you need

// Create a selector for each piece type and concatenate them
const selectors = pieceTypes.map(type => `.chess-piece.${pieceColor}-${type}`).join(', ');

// Query all pieces of the specified color and types
const allPieces = Array.from(document.querySelectorAll(selectors));
    // const allPieces = Array.from(document.querySelectorAll(`.chess-piece.${pieceColor}`));
    console.log('All pieces before filtering:', allPieces);

    // Filter out the piece that triggered the swap
    const eligiblePieces = allPieces.filter(p => p !== piece);
    console.log('Eligible pieces for swap:', eligiblePieces);

    if (eligiblePieces.length < 2) {
        console.error('Not enough pieces available to swap.');
        return;
    }

    // Randomly select two different pieces to swap
    let randomIndex1 = Math.floor(Math.random() * eligiblePieces.length);
    let randomPiece1 = eligiblePieces[randomIndex1];
    let randomIndex2;
    do {
        randomIndex2 = Math.floor(Math.random() * eligiblePieces.length);
    } while (randomIndex2 === randomIndex1);
    let randomPiece2 = eligiblePieces[randomIndex2];

    // Swap the pieces
    const randomPiece1Square = randomPiece1.parentNode;
    const randomPiece2Square = randomPiece2.parentNode;
    randomPiece1Square.appendChild(randomPiece2);
    randomPiece2Square.appendChild(randomPiece1);
    this.pieceSwapped = true;

    console.log('Swapped pieces:', randomPiece1, randomPiece2);
}


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
forceRandomMove(piece, excludeMiniBoardArea = false) {
    console.log('forceRandomMove called for:', piece);
    const parent = piece.parentNode;
    const fromRow = parseInt(parent.getAttribute('data-row'));
    const fromCol = parseInt(parent.getAttribute('data-col'));

    
    console.log('fromRow', fromRow, 'fromCol', fromCol);

    // Assuming your board is an 8x8 grid
    const totalRows = 8;
    const totalCols = 8;

    let toRow, toCol;

    do {
        toRow = Math.floor(Math.random() * totalRows);
        toCol = Math.floor(Math.random() * totalCols);

        // If excluding mini-board area, ensure the destination is outside this area
        if (excludeMiniBoardArea) {
            // Check if the coordinates fall outside the mini-board
            if (!this.isOutsideMiniBoard(toRow, toCol)) {
              toRow = Math.floor(Math.random() * totalRows);
              toCol = Math.floor(Math.random() * totalCols);
                // continue; // Skip if inside mini-board, and generate new coordinates
            }
        }
    } while (this.game.board[toRow][toCol] !== null || (toRow === fromRow && toCol === fromCol));

    this.forceMove(piece, fromRow, fromCol, toRow, toCol);
}
isOutsideMiniBoard(row, col) {
    return row < this.miniBoardArea.y1 || row > this.miniBoardArea.y2 ||
           col < this.miniBoardArea.x1 || col > this.miniBoardArea.x2;
}

// END OF CASTENCHANTEDGROUNDSPELL\\

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

  




castDaggerSpell() {
        console.log('Casting Dagger Spell');
        const enemyColor = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(enemyColor);
        const board = document.querySelector('#chessboard');

        const enemyPieces = document.querySelectorAll(`.chess-piece.${enemyColor}-pawn`);
        console.log("enemyPieces", enemyPieces);
        enemyPieces.forEach(piece => {
            const daggerImg = document.createElement('img');
            daggerImg.src = 'img/dagger.png'; // Path to your dagger image
            daggerImg.classList.add('dagger');
            piece.appendChild(daggerImg);

            if (Math.random() < 0.125) {
                 const parent = piece.parentNode; // Get the parent node of the piece
        if (parent) {
            parent.removeChild(piece); // Safely remove the piece from the DOM
        } // Replace with your method of removing a piece
            }
        });

       
    }

    activateDaggerSpell() {
        
            this.castDaggerSpell();
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
removePiece(row, col) {
    // Remove the piece from the game state and update the DOM
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
    if (piece.classList.contains('pawn')) return 'pawn';
    if (piece.classList.contains('rook')) return 'rook';
    if (piece.classList.contains('king')) return 'king';
    if (piece.classList.contains('queen')) return 'queen';
     if (piece.classList.contains('bishop')) return 'bishop';
    if (piece.classList.contains('knight')) return 'knight';
   
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
    console.log('this.game', this.game);  

  console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.game.board);  
    console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.board); 
     this.syncBoardState();
console.log('this.game.game.board in addPieceToPlayerSet after syncBoardState', this.game.game.board);
    console.log('this.game.board in addPieceToPlayerSet after syncBoardState', this.game.board);  

     

  console.log("this.currentPlayer in necromancerspell subfunction", this.currentPlayer);
    console.log("playerColor in necromancerspell subfunction", playerColor);

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
    newPiece.style.backgroundImage = `url('img/${playerColor}-${pieceType}.png')`; // Update this path

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
    console.log('this.game', this.game);  
    console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.game.board);  
    console.log('this.game.board in addPieceToPlayerSet before syncBoardState', this.game.board);  
    console.log("newPiece value :", newPiece);
    this.game.game.board[row][col] = { type: pieceType, color: playerColor }; // Update this to match how your game tracks pieces
    console.log('this.game.game.board in addPieceToPlayerSet after syncBoardState', this.game.game.board);
    console.log('this.game.board in addPieceToPlayerSet after syncBoardState', this.game.board);  

}

forceMove(piece, fromRow, fromCol, toRow, toCol, isRiftMove = false) {
    console.log('forceMove called with piece:', piece, 'fromRow:', fromRow, 'fromCol:', fromCol, 'toRow:', toRow, 'toCol:', toCol);

    // Validate positions
    if (fromRow === null || fromCol === null || toRow === null || toCol === null) {
        console.error('Invalid move: Position out of bounds');
        return;
    }

    // Handle the square the piece is moving from
    const fromSquare = document.getElementById(`square-${fromRow}-${fromCol}`);
    let pieceType = fromSquare.getAttribute('data-type');
    console.log('pieceType', pieceType);
    let pieceColor = fromSquare.getAttribute('data-color');    
    console.log('pieceColor', pieceColor);
    if (fromSquare && fromSquare.contains(piece)) {
        fromSquare.classList.remove('has-piece', 'enchanted-ground', 'event-listener-attached');
        fromSquare.removeAttribute('data-color');
        fromSquare.removeAttribute('data-type');
        fromSquare.removeAttribute('style');
        fromSquare.removeChild(piece);
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
        toSquare.appendChild(piece);
        toSquare.classList.add('has-piece');
        toSquare.setAttribute('data-type', pieceType);
        toSquare.setAttribute('data-color', pieceColor);
        toSquare.style.backgroundImage = `url('img/${pieceColor}-${pieceType}.png')`;
        console.log('isRiftMove', isRiftMove);
        if (!isRiftMove) {
          console.log('trying to addEventListener in forceMove');
            piece.addEventListener('click', this.boundHandleClick, { once: true });
        }
    } else {
        console.error(`Failed to find target square at position (${toRow}, ${toCol})`);
    }

    if (isRiftMove) {
        console.log('Rift-induced move completed.');
    }
}

//END OF NECROMANCER SPELL

castLightsaberSpell() {
    // Play lightsaber animation and sound across the columns
    const columnIndex = this.playLightsaberAnimation(); // Implement this animation logic

    // // Once the lightsaber stops
    // this.removePiecesInColumn(columnIndex);
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

playLightsaberAnimation() {
    const lightsaberSound = new Audio('sound/lightsaber.mp3');
    let currentColumn = 0;
    const totalColumns = 8; // For a standard chessboard with 8 columns

    // Determine a random number of individual columns to move through (3 to 15)
    const minColumns = 3;
    const maxColumns = 15;
    const targetColumns = Math.floor(Math.random() * (maxColumns - minColumns + 1)) + minColumns;

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
        }

        // Clear the background-image style from the square
        square.style.backgroundImage = ''; // This line removes the image
    }

    // Update the internal game state
    this.game.board[row][col] = null;
}
    getType() {
        // returns the type of the piece (e.g. "pawn", "rook", etc.)
      return this.type;
    }

    getColor() {
        // returns the color of the piece (e.g. "white", "black")
      return this.color;
    }

    getPosition() 
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
    chessPiece.placeTower()
    chessPiece.checkTowerCountAndActivateBeam();
});
