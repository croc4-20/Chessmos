let clickedPiece;
let pieces;
let handleClick;



async function initialize() 
{
  const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js');
 
 
  const chessArray = new ChessArray();
  const chessBoard = new ChessBoard();
  chessBoard.initializeBoard();

  //const game = new ChessGame(this.game.chessArray, this.game.chessBoard, () => this).bind(this);
  const game = new ChessGame(chessArray, chessBoard, this);
  //const game = new ChessGame(chessArray, chessBoard, this);
  
 const pieces = [

{ type: 'rook', color: 'black', row: 7, col: 0, imagePath: 'images/blackROOK.png', elementId: 'square-7-0', game: game },
{ type: 'knight', color: 'black', row: 7, col: 1, imagePath: 'images/blackKNIGHT.png', elementId: 'square-7-1', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 2, imagePath: 'images/blackBISHOP.png', elementId: 'square-7-2', game: game },
{ type: 'queen', color: 'black', row: 7, col: 3, imagePath: 'images/blackQUEEN.png', elementId: 'square-7-3', game: game },
{ type: 'king', color: 'black', row: 7, col: 4, imagePath: 'images/blackKING.png', elementId: 'square-7-4', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 5, imagePath: 'images/blackBISHOP.png', elementId: 'square-7-5', game: game },
{ type: 'knight', color: 'black', row: 7, col: 6, imagePath: 'images/blackKNIGHT.png', elementId: 'square-7-6', game: game },
{ type: 'rook', color: 'black', row: 7, col: 7, imagePath: 'images/blackROOK.png', elementId: 'square-7-7', game: game },
 
{ type: 'pawn', color: 'black', row: 6, col: 0, imagePath: 'images/blackPAWN.png', elementId: 'square-6-0', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 1, imagePath: 'images/blackPAWN.png', elementId: 'square-6-1', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 2, imagePath: 'images/blackPAWN.png', elementId: 'square-6-2', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 3, imagePath: 'images/blackPAWN.png', elementId: 'square-6-3', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 4, imagePath: 'images/blackPAWN.png', elementId: 'square-6-4', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 5, imagePath: 'images/blackPAWN.png', elementId: 'square-6-5', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 6, imagePath: 'images/blackPAWN.png', elementId: 'square-6-6', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 7, imagePath: 'images/blackPAWN.png', elementId: 'square-6-7', game: game },

{ type: 'rook', color: 'white', row: 0, col: 0, imagePath: 'images/whiteROOK.png', elementId: 'square-0-0', game: game },
{ type: 'knight', color: 'white', row: 0, col: 1, imagePath: 'images/whiteKNIGHT.png', elementId: 'square-0-1', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 2, imagePath: 'images/whiteBISHOP.png', elementId: 'square-0-2', game: game },
{ type: 'queen', color: 'white', row: 0, col: 3, imagePath: 'images/whiteQUEEN.png', elementId: 'square-0-3', game: game },
{ type: 'king', color: 'white', row: 0, col: 4, imagePath: 'images/whiteKING.png', elementId: 'square-0-4', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 5, imagePath: 'images/whiteBISHOP.png', elementId: 'square-0-5', game: game },
{ type: 'knight', color: 'white', row: 0, col: 6, imagePath: 'images/whiteKNIGHT.png', elementId: 'square-0-6', game: game },
{ type: 'rook', color: 'white', row: 0, col: 7, imagePath: 'images/whiteROOK.png', elementId: 'square-0-7', game: game },

{ type: 'pawn', color: 'white', row: 1, col: 0, imagePath: 'images/whitePAWN.png', elementId: 'square-1-0', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 1, imagePath: 'images/whitePAWN.png', elementId: 'square-1-1', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 2, imagePath: 'images/whitePAWN.png', elementId: 'square-1-2', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 3, imagePath: 'images/whitePAWN.png', elementId: 'square-1-3', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 4, imagePath: 'images/whitePAWN.png', elementId: 'square-1-4', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 5, imagePath: 'images/whitePAWN.png', elementId: 'square-1-5', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 6, imagePath: 'images/whitePAWN.png', elementId: 'square-1-6', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 7, imagePath: 'images/whitePAWN.png', elementId: 'square-1-7', game: game },
 
]

 
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
    

  }


// console.log(typeof ChessPiece);
  // console.log(ChessPiece);
  console.log(typeof ChessBoard);
  console.log(ChessBoard);
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
  default:
    throw new Error("Invalid piece type");
}
    this.board = chessBoard;
    //this.chessBoard = new ChessBoard();
    this.color = color;
      console.log('Constructor color:', this.color);
    this.row = row;  
    this.col = col;
    this.imagePath = imagePath;
    const id = `square-${this.row}-${this.col}`;
    this.elementId = elementId || id;
    this.imagePath = imagePath;
    this.game = game;
    this.selectedSquare = null;
    this.prevTarget = null;
    //this.squares = squares;
    //this.squares = [];
    this.validMoves = [];
    this.selectedPiece = null;
    this.currentPlayer = game.currentPlayer;
        // Bind handleMove to the ChessPiece object
    //this.handleMove = this.handleMove.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);
    this.activeClickListeners = {};
    this.element = document.getElementById(this.elementId);
    
    if (this.element) 
    {
      console.log('Adding event listener to:', this.element);
      this.element.removeEventListener('click', this.boundHandleClick);
      this.element.addEventListener('click', this.boundHandleClick);
    
    } 
    else 
    {
      console.error(`Invalid element ID: ${id}`);
    }
      
   if (elementId) {
  console.log("Type:", type, "color:", color, "! row,col: ", row, col, "imagePath: ", imagePath, "elementId :", elementId, "game", game);
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
    const queen2 = new ChessPiece('queen', 'black', 7, 3, './images/blackQUEEN.png', 'queen_7_3', this);
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

handleClick = (event, chessBoard) => {
  console.log("chessBoard in handleClick:", chessBoard);
  const clickedSquareElement = event.target.closest('.chess-square');
  if (!clickedSquareElement || !this.game || !this.game.board) return;

  const clickedPieceElement = clickedSquareElement.querySelector('.chess-piece');
  const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
  console.log("clickedPiece in handleclick:", clickedPiece);  // Debug line
  
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

  // Handle Movement
  if (this.selectedPiece && clickedSquareElement.classList.contains('valid-move')) {
    this.executeMove(clickedSquareElement, chessBoard);
    return;
  }

 // Handle New Selection
  if (clickedPiece) {
    this.selectNewPiece(clickedPiece, clickedPieceElement, chessBoard);
  } else {
    // Deselect if no new piece to select
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

// Helper function to deselect a piece and clear valid moves
// deselectAndClear() {
//   this.deselectPiece(this.selectedPiece.element);
//   this.clearValidMoves();
//   this.selectedPiece = null;
// }
deselectAndClear() {
  if (this.selectedPiece && this.selectedPiece.element) {
    this.selectedPiece.element.classList.remove('selected-piece');
  }
  
  this.clearValidMoves();
  
  // Clear the previous piece
  if (this.previousPiece) {
    if (this.previousPiece.element) {
      this.previousPiece.element.classList.remove('selected-piece');
    }
    this.previousPiece = null;
  }
  
  this.selectedPiece = null;
}

// Helper function to execute the move
executeMove(clickedSquareElement, chessBoard) {
    console.log("chessBoard in executeMove:", chessBoard);  // Debug line
  const newRow = parseInt(clickedSquareElement.dataset.row, 10);
  const newCol = parseInt(clickedSquareElement.dataset.col, 10);
      console.log("clickedSquareElement in executeMove:", clickedSquareElement);  // Debug line
      console.log("this.game in executeMove:", this.game);  // Debug line
      console.log("this.selectedPiece.element in executeMove:", this.selectedPiece.element);  // Debug line
      console.log('newRow in executeMove:', newRow);
      console.log('newCol in executeMove:', newCol);
      
  this.board.movePiece(clickedSquareElement, this.game, this.selectedPiece.element, newRow, newCol);
  this.deselectAndClear();
  this.endTurn();
}

// Helper function to select a new piece
selectNewPiece(clickedPiece, clickedPieceElement, chessBoard) {
  console.log("chessBoard in selectNewPiece:", chessBoard);
  if (this.selectedPiece) {
   
    this.previousPiece = this.selectedPiece;
     this.deselectAndClear();
  }
  
  // Calculate the valid moves once.
  
  console.log("clickedPiece:", clickedPiece);  // Debug line
  const validMoves = clickedPiece.calculateValidMoves(clickedPiece.row, clickedPiece.col, this.game.board);
  
  clickedPieceElement.classList.add('selected-piece');
  this.selectedPiece = {
    row: clickedPiece.row,
    col: clickedPiece.col,
    element: clickedPieceElement,
    piece: clickedPiece,
    validMoves: validMoves,
  };
  this.showValidMoves(this.selectedPiece, chessBoard, validMoves);  // Pass the valid moves
}




// handleClick = async(event, chessBoard) => 
// {
//   //const myChessBoard = new ChessBoard();

//   console.log("HandleClick triggered. Current this.selectedPiece:", this.selectedPiece);
//   console.log("Clicked element:", event.target);
  
//   const clickedSquareElement = event.target.closest('.chess-square');
//   if (!clickedSquareElement || !this.game || !this.game.board) return;
//   console.log("Clicked square ID:", clickedSquareElement.id);
//   console.log("Before selecting piece element", this.game.board);

//   const clickedPieceElement = clickedSquareElement.querySelector('.chess-piece');
//   console.log("After selecting piece element", this.game.board);
//   console.log("clickedPieceElement:", clickedPieceElement);
//   const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
//   console.log('getPieceFromElement result:', clickedPiece);

//  if (this.selectedPiece) {
//     const isSamePiece = clickedPieceElement === this.selectedPiece.element;
//     const isSameColor = clickedPiece && clickedPiece.color === this.selectedPiece.piece.color;
//     const isValidMove = clickedSquareElement.classList.contains('valid-move');

//     if (isSamePiece || isSameColor || !isValidMove) {
//       this.deselectPiece(this.selectedPiece.element);
//       this.clearValidMoves();
//       this.selectedPiece = null;
//       return;
//     }
//   }
//   if (clickedPieceElement && !clickedPiece) 
//   {
//     console.log("Invalid piece selection!");
//     return;
//   }
//    // If clicked square does not contain a piece, do nothing
//   if (!clickedPieceElement) 
//   {
//     console.log("No piece on clicked square.");
//     console.log("handleClick returned due to Square not containing piece .");
//     return;
//   }
      
//     // If it's not the player's turn, alert them
//   if (clickedPiece && clickedPiece.color !== this.game.currentPlayer) 
//   {
//     alert("It's not your turn!");
//     console.log("handleClick returned due to NOT UR TURN.");
//     return;
//   }
  
//   console.log("After clickedPieceElement check");
//   console.log("clickedPiece:", clickedPiece);
//   console.log('Currently selected piece:', this.selectedPiece);

//                      // Phase 1: Deselection Block
//   // Always check first if a piece is currently selected
//     if (this.selectedPiece) {

//           // Try to deselect if the same piece or another piece of the same color is clicked
//         if (clickedPieceElement === this.selectedPiece.element || 
//            (clickedPiece && clickedPiece.color === this.selectedPiece.piece.color)) {
            
//             this.clearValidMoves(this.selectedPiece.element);
//             this.deselectPiece(this.selectedPiece.element);
//             this.selectedPiece = null;
//     console.log("this.selectedPiece set to null at [ClickdPiece same as selectedPiece]");
//     console.log('Successfully deselected the piece.');
//     console.log("clicked piece is the same as the selected piece!");
//     console.log("handleClick returned due to Piece DEselected MOVE .");
//     return;  // Exit as the player deselected a piece
//         }
//     } 

//     // Additional Deselection Block for clicking outside of a 'valid move' square
// if (this.selectedPiece) {
//     const isClickedOnValidMove = clickedSquareElement.classList.contains('valid-move');
//     const shouldDeselect = !isClickedOnValidMove;  // Adjust this condition as necessary

//     if (shouldDeselect) 
//     {
//           console.log('Successfullyentered shouldDeselect.');

      
//       this.clearValidMoves(this.selectedPiece.element);
//       this.deselectPiece(this.selectedPiece.element);
//       this.selectedPiece = null;
//     return;  // Exit as the piece was deselected
//     }
//   }
//               // Phase 2: MOVEMENT BLOCK

//   console.log("Value of clickedPieceElement before MOVEMENT BLOCK: ", clickedPieceElement);
//   const hasPiece = clickedSquareElement.querySelector('.chess-piece') !== null;
//   console.log('hasPiece', hasPiece);
//   if (this.selectedPiece && !hasPiece)
//   {
//     console.log("Entered MOVEMENT BLOCK, attempting to move piece.");
//     const newRow = parseInt(clickedSquareElement.dataset.row, 10);
//     const newCol = parseInt(clickedSquareElement.dataset.col, 10);
//     // Check if the clicked square is a legal move for the selected piece
//     console.log(`Trying to move to row ${newRow}, col ${newCol}`);
//     const validMoves = this.selectedPiece ? this.calculateValidMoves(this.selectedPiece.row, this.selectedPiece.col, this.game.board) : [];
//     //const validMoves = this.calculateValidMoves(this.selectedPiece.row, this.selectedPiece.col, this.game.board);
//     console.log('Valid moves are:', validMoves);

//     if (this.selectedPiece && validMoves.some(move => move.row === newRow && move.col === newCol)) 
//     {
//       console.log("Move is valid. Performing the move.");
//       const destinationElement = document.querySelector(`[data-row='${newRow}'][data-col='${newCol}']`);
//       console.log("Trying to move piece:" );
//       chessBoard.movePiece(clickedSquareElement, this.game, this.selectedPiece.element, destinationElement, validMoves);
//       this.deselectPiece(this.selectedPiece.element);
//       this.clearValidMoves(this.selectedPiece.element);
//       this.selectedPiece = null;
//       this.endTurn();
//       console.log("attempt to move finished!");
//       console.log("handleClick returned due to MOVED PIECE.");
//       return;
//     } 
//     else 
//     {
//       console.log(`No valid move detected for the selected piece. newRow: ${newRow}, newCol: ${newCol}`);
//       console.log("Illegal move!");
//       console.log("handleClick returned due to ILLEGAL MOVE .");
//       return;
//     }
//   }

//   if (this.selectedPiece && this.selectedPiece.element === clickedPieceElement) 
//   {
//     console.log("Same piece clicked, deselecting.");
  
//     this.deselectPiece(this.selectedPiece.element);
//     this.clearValidMoves(this.selectedPiece.element);
//     this.selectedPiece = null;
//     console.log("handleClick returned due to SAME PIECE CLICKED .")
//     return;
//   }

 
// // Phase 3: NEW SELECTION
//   // At this point, a different piece is selected
//   // Deselect the previously selected piece, if any
//   console.log("this.selectedPiece before deselecting previous piece:", this.selectedPiece);
   
//   if (this.selectedPiece) 
//   {
//     console.log('Current value of this.selectedPiece:', this.selectedPiece);
//     console.log("Deselecting previous piece");
//     this.deselectPiece(this.selectedPiece.element);
//     this.clearValidMoves(this.selectedPiece.element);
    
//   }

//   // Update the selected piece
//   clickedPieceElement.classList.add('selected-piece');
//   this.selectedPiece = 
//   {
//     row: clickedPiece.row,
//     col: clickedPiece.col,
//     element: clickedPieceElement,
//     piece: clickedPiece,
//     validMoves: clickedPiece.calculateValidMoves(clickedPiece.row, clickedPiece.col, this.game.board),
//   };
//   this.showValidMoves(this.selectedPiece, chessBoard);

//   // Attach event listener to all valid move squares
//   const validMoveSquares = document.querySelectorAll('.valid-move');
//       console.log("Trying attaching event listeners to validmove.");

//   validMoveSquares.forEach((square) => {
//   square.addEventListener('click', async (event) => {  // Marking as async in case movePiece is an async function
//     console.log("Successfully attached event listeners to validmove.");
//     // Additional deselection code here
//     const clickedElement = event.target.closest('.chess-square');
//     const clickedPieceElement = clickedElement.querySelector('.chess-piece');
//     const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
    
//     if (this.selectedPiece && 
//         (clickedPieceElement === this.selectedPiece.element || 
//          (clickedPiece && clickedPiece.color === this.selectedPiece.piece.color))) {
//       // Deselection logic
     
//       this.clearValidMoves(this.selectedPiece.element);
//       this.deselectPiece(this.selectedPiece.element);
//       this.selectedPiece = null;
//       console.log("Successfully deselected the piece during valid move stage.");
//       return;
//     }

//     try {
//       // Assuming clickedSquareElement and destinationElement are the same as the clicked square
//       const clickedSquareElement = square;  
//       const destinationElement = square;

//       if (this.selectedPiece) 
//       {
//         const validMoves = this.selectedPiece.piece.calculateValidMoves
//         (
//           this.selectedPiece.row, 
//           this.selectedPiece.col, 
//           this.game.board
//         );

//         console.log("clickedSquareElement before movePiece call in handleClick", clickedSquareElement);
//         console.log("this.game before movePiece call in handleClick :", this.game);
//         console.log("validMoves before movePiece call in handleClick :", validMoves);
//         console.log("this.selectedPiece.element before movePiece call in handleClick :", this.selectedPiece.element);
//         const moveResult = this.board.movePiece(clickedSquareElement, this.game, this.selectedPiece.element, destinationElement, validMoves);  
      

//         if (moveResult) {
//           this.clearValidMoves();
//           this.deselectPiece(this.selectedPiece.element);
//           this.selectedPiece = null;
//         }
//       }
//     } catch (error) {
//       console.error("An error occurred while moving the piece:", error);
//     }
//   });
// });


  
// };

// clearValidMoveEventListeners = () => {
//   const validMoveSquares = document.querySelectorAll('.valid-move');
//   validMoveSquares.forEach((square) => {
//     const clone = square.cloneNode(true);
//     square.parentNode.replaceChild(clone, square);
//   });
// };

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

showValidMoves(selectedPiece, chessBoard, validMoves) {
  console.log("chessBoard in showValidMoves:", chessBoard);
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

    // Create a pattern on the valid move square
    const pattern = document.createElement('div');
    pattern.classList.add('pattern');
    square.appendChild(pattern);

    // Define the click event listener for this square
    const clickListener = (event) => {
      // Assuming executeMove is a method on the same class/object
      // First argument is the clicked square, and second argument is the chessBoard instance
      this.executeMove(square, this.chessBoard);

      // After executing the move, you may also wish to clear selections and valid moves
      this.deselectAndClear();
    };

    // Save this click event listener so we can remove it later
    const squareId = `${move.row}-${move.col}`;
    this.activeClickListeners[squareId] = clickListener;

    // Attach the event listener
    square.addEventListener('click', clickListener);
  }
}


// showValidMoves(selectedPiece, chessBoard, validMoves) {
//   console.log("showValidMoves called", selectedPiece);
//   console.log("Value of chessBoard in showValidMoves", chessBoard);

//   // Clear previous valid moves and remove listeners
//   const allSquares = document.querySelectorAll('.chess-square');

//   allSquares.forEach(square => {
//     square.classList.remove('valid-move');
//     const pattern = square.querySelector('.pattern');
//     if (pattern) {
//       square.removeChild(pattern);
//     }
//     // Example click event listener
//  const clickListener = (event) => {
//   // Assuming executeMove is a method on the same class/object
//   // The first argument is the selected piece, and the second argument is the new position from the validMove
//   this.executeMove(square, move);
//     console.log("Square clicked!");
//   // After executing the move, you may also wish to clear selections and valid moves
//   this.deselectAndClear();
// };

//     // Explicitly remove click event listeners if they exist
//     const squareId = `${square.dataset.row}-${square.dataset.col}`;
//     if (this.activeClickListeners[squareId]) {
//       square.removeEventListener('click', this.activeClickListeners[squareId]);
//       delete this.activeClickListeners[squareId]; // Remove the stored function reference
//     }
//   });

//   console.log("selectedPiece", selectedPiece);

//   // Highlight new valid moves
//   for (const move of validMoves) {
//     const square = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);
//     square.classList.add('valid-move');

//     // Create a pattern on the valid move square
//     const pattern = document.createElement('div');
//     pattern.classList.add('pattern');
//     square.appendChild(pattern);

//     // Example click event listener
//     const clickListener = (event) => {
//       // Handle the click event
//     };

//     // Save this click event listener so we can remove it later
//     const squareId = `${move.row}-${move.col}`;
//     this.activeClickListeners[squareId] = clickListener;

//     // Attach the event listener
//     square.addEventListener('click', clickListener);
//   }
// }



// showValidMoves(selectedPiece, chessBoard) {
//   console.log("showValidMoves called", selectedPiece);
//   console.log("Value of chessBoard in showValidMoves" ,chessBoard); // Should log an instance of ChessBoard
//   //console.log("Value of this.board.movePiece in showValidMoves", chessBoard.movePiece); // Should log a function

//   // Clear previous valid moves
//   const allSquares = document.querySelectorAll('.chess-square');

//   allSquares.forEach(square => {
//     square.classList.remove('valid-move');
//     const pattern = square.querySelector('.pattern');
//     if (pattern) {
//       square.removeChild(pattern);
//     }

//     // Remove any existing click event listeners by replacing the element with its clone
//     const clonedElement = square.cloneNode(true);
//     square.parentNode.replaceChild(clonedElement, square);
//   });

//   console.log("selectedPiece", selectedPiece)
//   // Calculate new valid moves
//   const validMoves = selectedPiece.piece.calculateValidMoves(selectedPiece.row, selectedPiece.col, this.game.board);

//   // Highlight new valid moves
//   for (const move of validMoves) {
//     const square = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);

//     // Add a green background to the valid move square
//     square.classList.add('valid-move');

//     // Create a pattern on the valid move square
//     const pattern = document.createElement('div');
//     pattern.classList.add('pattern');
//     square.appendChild(pattern);

    
//   }
// }
    clearValidMoves() {
    const validMoveSquares = document.querySelectorAll('.valid-move');
    validMoveSquares.forEach(square => {
        square.classList.remove('valid-move');
        square.innerHTML = '';
    });
}
    
    

    

     getPieceFromElement(pieceElement, board) {
  const squareElement = pieceElement.parentElement;
  console.log("squareElement", squareElement);

  const row = parseInt(squareElement.getAttribute('data-row'));
  const col = parseInt(squareElement.getAttribute('data-col'));

  console.log("row-col", row, col);
  console.log("this.game.board", this.game.board);

  if (isNaN(row) || isNaN(col)) {
    console.log("Row or col is not a number");
    return null;
  }

  if (row < 0 || row >= this.game.board.length) {
    console.log("Row is out of bounds");
    return null;
  }

  if (col < 0 || col >= this.game.board[row].length) {
    console.log("Col is out of bounds");
    return null;
  }

  const piece = this.game.board[row][col];
  console.log("Retrieved piece:", piece);


  return piece;
}

addChessPiece(type, color, row, col, imagePath, elementId, game, squares) {
  // Check if the calculated index is valid
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    console.error(`Invalid row ${row} or col ${col} for adding piece.`);
    return;
  }

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

calculateValidMoves(row, col, board) {
  console.log("Board in calculateValidMoves:", this.game.board);
  const validMoves = [];

    // The pawn can move forward only (white moves up, black moves down)
  const direction = this.color === "white" ? 1 : -1;

  console.log("Row:", row);
  console.log("Col:", col);
  console.log("Direction:", direction);
  console.log("Board:", board);

    // Check for the forward move (one square)
  const newRow = row + direction;
  console.log("New row:", newRow);
  if (newRow >= 0 && newRow < 8) {
    const forwardSquare = this.game.board[newRow][col];
    console.log("Checking board position for forward move: board[", newRow, "][", col, "] = ", forwardSquare);
    if (!forwardSquare) {
      validMoves.push({ row: newRow, col: col });
      console.log("Added forward move:", { row: newRow, col: col });

        // Check for the double-move on the pawn's first move
      if ((this.color === "white" && row === 1) || (this.color === "black" && row === 6)) 
      {
        const doubleMoveRow = newRow + direction;
        const doubleMoveSquare = this.game.board[doubleMoveRow][col];
        console.log("Checking board position for double move: board[", doubleMoveRow, "][", col, "] = ", doubleMoveSquare);
        console.log("Double move square:", doubleMoveSquare);
        if (!doubleMoveSquare) 
        {
          validMoves.push({ row: doubleMoveRow, col: col });
        }
      }
    } 
    else 
    {
      console.log("Forward square blocked:", forwardSquare);
    }
  } 
  else 
  {
    console.log("New row out of bounds:", newRow);
  }

  const newRowForCapture = newRow;

    // Check for captures (diagonal moves)
  //const newRowForCapture = newRow;
  const captureCols = [col - 1, col + 1];
  if (newRowForCapture >= 0 && newRowForCapture < 8) {
    for (const captureCol of captureCols) {
      console.log("New row for capture:", newRowForCapture);
      console.log("Capture col:", captureCol);
      if (captureCol >= 0 && captureCol < 8) {
        const captureSquare = this.game.board[newRowForCapture][captureCol];
        console.log("Checking board position for capture: board[", newRowForCapture, "][", captureCol, "] = ", captureSquare);
        console.log("Capture square:", captureSquare);
        if (captureSquare && captureSquare.color !== this.color) {
          validMoves.push({ row: newRowForCapture, col: captureCol });
          console.log("Added capture move:", { row: newRowForCapture, col: captureCol });
        } else {
          console.log("Invalid capture square:", captureSquare);
        }
      } else {
        console.log("Capture col out of bounds:", captureCol);
      }
    }
  } else {
    console.log("New row for capture out of bounds:", newRowForCapture);
  }

  console.log("Valid moves in calculateValidMoves:", validMoves);
  ///console.log('Comparing valid moves:', validMoves, 'with target:', {row: newRowForCapture, col: captureCol});

  return validMoves;
}


    isValidMove(currentRow, currentCol, newRow, newCol, board) {
    // create a new ChessPiece object with the current piece's information
    const currentPiece = new ChessPiece(this.type, this.color, this.row, this.col, this.imagePath, this.element, this.board);

    // check if the move is within the board boundaries
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
        return false;
    }

    // check if the piece can move to the new square based on its type and the rules of chess
    switch (currentPiece.type) {
        case 'pawn':
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
