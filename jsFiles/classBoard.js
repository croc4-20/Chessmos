let chessArray;
let chessBoard;
let handlePieceSelection;
let game;

let pieceElement;
let destinationElement;

 const validPieceTypes = ["king", "queen", "rook", "bishop", "knight", "pawn"];

  
  const { default: ChessPiece } = await import('./classPiece.js');

  class ExtendedPiece extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
    }
  }

  async function defineExtendedPiece() {

  window.ChessPiece = ExtendedPiece;
  }
  

async function initialize(game, pieces) 
{
  
  
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js');

  console.log("Classes imported successfully");

  // window.ChessBoard = ChessBoard;
  // window.ChessGame = ChessGame;
  // window.ChessArray = ChessArray;
  
      // Initialize the game objects using the imported classes
  const chessArray = new ChessArray();
  const chessGame = new ChessGame(chessArray, null, handlePieceSelection);
  console.log("Initialized chessGame in classBoard:", chessGame);

  const chessBoard = new ChessBoard(chessGame, ChessPiece, pieces, game);
  await chessBoard.initialize();
 
  
//   chessBoard.chessGame = chessGame;
//     console.log("chessBoard.chessGame:", chessBoard.chessGame);
//     console.log("chessGame:", chessGame);
//   chessGame.chessBoard = chessBoard;
//     console.log("chessGame.chessBoard:", chessGame.chessBoard);
//     console.log("chessGame:", chessGame);

//Call initializeBoard after the assignments
try {
    await chessBoard.initializeBoard();
  } catch (error) {
    console.error("Failed to initialize boaaard:", error);
    throw error;
  }

      // Attach event listeners
   chessBoard.squareElements.forEach((square) => {
    square.addEventListener("click", chessBoard.handleSquareClick);
  });
   console.log("Square event listeners attached."); // Add this line
   console.log("Initialization in classBoard completed.");
  return { chessArray, chessBoard, chessGame };
}

  

export default class ChessBoard
{
  constructor(chessGame, ChessPiece, pieces, game) 
  {
    this.chessPieces = [];
    this.squareElements = Array.from(document.querySelectorAll(".chess-square"));
    this.moveHistory = [];
    this.currentPlayer = "white";
    this.gameStatus = "active";
    this.game = chessGame;
    console.log('this.Game', this.game);
    // this.game.board = [];

    this.boardElement = document.getElementById('chessboard'); // Set boardElement here
    this.pieces = pieces;
    this.currentlySelectedPiece = null;
    //this.defineExtendedPiece = this.defineExtendedPiece.bind(this); // Binding this
    this.initializeBoard = this.initializeBoard.bind(this);
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.board.length = 8;
    this.ChessPiece = ChessPiece;
    this.initialize();
    this.blackPieces = [];
    this.whitePieces = [];
    //this.setupInitialPosition(pieces);
    //this.createBoard();
    //this.handleSquareClick = this.handleSquareClick.bind(this);
   //  this.initializeBoard()
   //    .then(this.defineExtendedPiece)
   //    .then(this.runChessGame)
   //    .catch((error) => {
   //      console.error("Failed to initialize the chess board:", error);
   //    });
    }

 


  async initialize() 
  {
    try 
    {
      await this.initializeBoard();
     // await this.defineExtendedPiece(); // Assuming defineExtendedPiece is async, else you can omit await
      await this.runChessGame(); // Assuming runChessGame is async, else you can omit await
    } 
    catch (error) 
    {
      console.error("Failed to initialize the chess board:", error);
    }
  }

  // Initialize the board with pieces in their starting position

   async initializeBoard() {
    try {
      console.log("Current context (this):", this);
      console.log("Current context (this.game):", this.game);
      if (!this.game) {
        throw new Error("Game not initialized");
      }
      console.log("this.game:", this.game);
      console.log("this.chessGame:", this.chessGame);
      this.initializeEmptyBoard();
      await this.populateBoardWithPieces();
      await this.defineExtendedPiece();
      this.renderBoard(this.game.board);
      this.registerSquareClickHandlers();
    } catch (error) 
    {
      console.error("Failed to initialize board:", error);
      throw error;
    }
  }

populateBoardWithPieces() {
  this.game.board = [];
  console.log("this.game.board:", this.game.board);
    
    // create a 2D array to represent the board
    for (let row = 0; row < 8; row++) {
      this.game.board[row] = [];
      for (let col = 0; col < 8; col++) {
        this.game.board[row][col] = null;
      }

     }
      //this.defineExtendedPiece();

    // Add black pieces
  this.game.board[7][0] = new window.ChessPiece("rook", "black", 7, 0, "images/blackROOK.png", "square-7-0", this);
  console.log('this.game.board[7][0]]', this.game.board[7][0]);
  this.game.board[7][1] = new window.ChessPiece("knight", "black", 7, 1, "images/blackKNIGHT.png", "square-7-1", this);
  this.game.board[7][2] = new window.ChessPiece("bishop", "black", 7, 2, "images/blackBISHOP.png", "square-7-2", this);
  this.game.board[7][3] = new window.ChessPiece("queen", "black", 7, 3, "images/blackQUEEN.png", "square-7-3", this);
  this.game.board[7][4] = new window.ChessPiece("king", "black", 7, 4, "images/blackKING.png", "square-7-4", this);
  this.game.board[7][5] = new window.ChessPiece("bishop", "black", 7, 5, "images/blackBISHOP.png", "square-7-5", this);
  this.game.board[7][6] = new window.ChessPiece("knight", "black", 7, 6, "images/blackKNIGHT.png", "square-7-6", this);
  this.game.board[7][7] = new window.ChessPiece("rook", "black", 7, 7, "images/blackROOK.png", "square-7-7", this);
  
    //Add Black PAWNS

  this.game.board[6][0] = new window.ChessPiece("pawn", "black", 6, 0, "images/blackPAWN.png", "square-6-0", this);
  this.game.board[6][1] = new window.ChessPiece("pawn", "black", 6, 1, "images/blackPAWN.png", "square-6-1", this);
  this.game.board[6][2] = new window.ChessPiece("pawn", "black", 6, 2, "images/blackPAWN.png", "square-6-2", this);
  this.game.board[6][3] = new window.ChessPiece("pawn", "black", 6, 3, "images/blackPAWN.png", "square-6-3", this);
  this.game.board[6][4] = new window.ChessPiece("pawn", "black", 6, 4, "images/blackPAWN.png", "square-6-4", this);
  this.game.board[6][5] = new window.ChessPiece("pawn", "black", 6, 5, "images/blackPAWN.png", "square-6-5", this);
  this.game.board[6][6] = new window.ChessPiece("pawn", "black", 6, 6, "images/blackPAWN.png", "square-6-6", this);
  this.game.board[6][7] = new window.ChessPiece("pawn", "black", 6, 7, "images/blackPAWN.png", "square-6-7", this);
  
    // Add WHITE pieces
  this.game.board[0][0] = new window.ChessPiece("rook", "white", 0, 0, "images/whiteROOK.png", "square-0-0", this);
  this.game.board[0][1] = new window.ChessPiece("knight", "white", 0, 1, "images/whiteKNIGHT.png", "square-0-1", this);
  this.game.board[0][2] = new window.ChessPiece("bishop", "white", 0, 2, "images/whiteBISHOP.png", "square-0-2", this);
  this.game.board[0][3] = new window.ChessPiece("queen", "white", 0, 3, "images/whiteQUEEN.png", "square-0-3", this);
  this.game.board[0][4] = new window.ChessPiece("king", "white", 0, 4, "images/whiteKING.png", "square-0-4", this);
  this.game.board[0][5] = new window.ChessPiece("bishop", "white", 0, 5, "images/whiteBISHOP.png", "square-0-5", this);
  this.game.board[0][6] = new window.ChessPiece("knight", "white", 0, 6, "images/whiteKNIGHT.png", "square-0-6", this);
  this.game.board[0][7] = new window.ChessPiece("rook", "white", 0, 7, "images/whiteROOK.png", "square-0-7", this);
  
      //Add white pawns
  this.game.board[1][0] = new window.ChessPiece("pawn", "white", 1, 0, "images/whitePAWN.png", "square-1-0", this);
  this.game.board[1][1] = new window.ChessPiece("pawn", "white", 1, 1, "images/whitePAWN.png", "square-1-1", this);
  this.game.board[1][2] = new window.ChessPiece("pawn", "white", 1, 2, "images/whitePAWN.png", "square-1-2", this);
  this.game.board[1][3] = new window.ChessPiece("pawn", "white", 1, 3, "images/whitePAWN.png", "square-1-3", this);
  this.game.board[1][4] = new window.ChessPiece("pawn", "white", 1, 4, "images/whitePAWN.png", "square-1-4", this);
  this.game.board[1][5] = new window.ChessPiece("pawn", "white", 1, 5, "images/whitePAWN.png", "square-1-5", this);
  this.game.board[1][6] = new window.ChessPiece("pawn", "white", 1, 6, "images/whitePAWN.png", "square-1-6", this);
  this.game.board[1][7] = new window.ChessPiece("pawn", "white", 1, 7, "images/whitePAWN.png", "square-1-7", this);
  
  console.log("Initializing the board...");
  console.log("Initial board state:", this.game.board);
 // this.renderBoard(this.game.board);
  this.squareElements = document.querySelectorAll(".chess-square");
  this.registerSquareClickHandlers();

  // await this.defineExtendedPiece();
  console.log("Board initialization completed.");
  return Promise.resolve();
}

initializeEmptyBoard() {
  this.game.board = Array.from({ length: 8 }, () => Array(8).fill(null));
}

// renderBoard(board) {
//   console.log("Rendering the board...");
//   console.log("Game board:", board);
//   const boardContainer = document.getElementById("chessboard");
//   boardContainer.innerHTML = "";

//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       const square = document.createElement("div");
//       square.classList.add("chess-square");
//       square.id = `square-${row}-${col}`;
//       square.dataset.row = row;
//       square.dataset.col = col;

//       if ((row + col) % 2 === 0) {
//         square.classList.add("light");
//       } else {
//         square.classList.add("dark");
//       }

//       if (board[row][col] !== null) {
//         const piece = document.createElement("img");
//         piece.src = board[row][col].imagePath;
//         piece.classList.add("chess-piece");
//         square.appendChild(piece);
//       }

//       boardContainer.appendChild(square);
//     }
//   }
//   console.log("Board rendering completed.");
// }

async runChessGame() {
  try {
    await this.defineExtendedPiece();
    const { chessArray, chessBoard, chessGame } = await this.initialize(game, this.pieces);
    
    this.chessArray = chessArray;
    this.chessBoard = chessBoard;
    this.chessGame = chessGame;
    this.game = game;

    console.log("Chess game is running...");
    console.log("chessArray:", this.chessArray);
    console.log("chessBoard:", this.chessBoard);
    console.log("chessGame:", this.chessGame);

    this.game.runChessGame();
  } catch (error) {
    console.error("Failed to run the chess game:", error);
  }
}

registerSquareClickHandlers() {
  const self = this; // Store the reference to 'this' for later use

  this.squareElements.forEach((squareElement) => {
    squareElement.addEventListener("click", function(event) {
      self.handleSquareClick(event); // Pass the event object to handleSquareClick
    });
  });
}

setupInitialPosition(pieces, chessBoard, game, chessArray) {
  pieces.forEach((piece) => {
    const { type, color, row, col, imagePath, elementId } = piece;

    if (!validPieceTypes.includes(type)) {
      throw new Error(`Invalid piece type: ${type}`);
    }

    const newChessPiece = new ChessPiece(type, color, row, col, imagePath, elementId, game);
    chessBoard.addPiece(newChessPiece);
    this.board.push(newChessPiece);
    chessArray.addPiece(newChessPiece);

    const squareElement = document.getElementById(elementId); // Use the provided elementId directly
    squareElement.innerHTML = `<div class="chess-piece ${color}-${type}"></div>`;
    squareElement.classList.add('has-piece');
    squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${imagePath})`;
    squareElement.style.gridRow = row + 1; // Adjust the grid row and column values
    squareElement.style.gridColumn = col + 1;
  });
}

  createPieceFromBoard()
  {
    this.chessBoard.forEach((row, i) => {
      row.forEach((square, j) => {
        if (square) {
          const chessPiece = this.createPiece(this.type, this.color, this.row, this.col, this.imagePath, this.elementId, this.game);
          this.addPiece(chessPiece);
        }
      });
    }); 
  }
createPiece(type, color, row, col, imagePath, elementId, game) {
    const chessPiece = new ChessPiece(type, color, row, col, imagePath, elementId, this.game);
    // add chessPiece to chessPieces array
    this.chessPieces.push(chessPiece); 
    this.placePieces(chessPiece);
    return chessPiece;
  }


placePieces() {
    this.chessPieces.forEach((piece) => {
      const square = this.squareElements[piece.position];
      square.innerHTML = piece.html;
    });
  }

addPiece(chessPiece) {
  // Add the piece to the pieces array
  this.chessPieces.push(chessPiece);
  console.log("adding piece to the array :", chessPiece)

  // Update the board array with the new piece
  this.board[chessPiece.row][chessPiece.col] = chessPiece;
console.log("updating board array :",  this.board[chessPiece.row][chessPiece.col])
  // Create an <img> element for the piece
  const img = document.createElement("img");
  img.src = chessPiece.imagePath;

  // Append the <img> element to the element for the square
  const squareElement = document.getElementById(chessPiece.elementId);
  squareElement.appendChild(img);
}

verifyPiecePlacement() {
  const squares = document.querySelectorAll(".chess-square");
  squares.forEach((square) => {
    const piece = square.firstElementChild;
    if (piece) {
      console.log(`chessPieces: ${piece.dataset.chessPieces} placed in square with class/id: ${square.className}`);
    } else {
      console.log(`No piece placed in square with class/id: ${square.className}`);
    }
  });
}

setGame(game) {
  this.game = game;
}

// clearValidMoves() {
//   const highlightedSquares = document.querySelectorAll(".chess-square.valid-move");
//   highlightedSquares.forEach(square => {
//     square.classList.remove("valid-move");
//         square.classList.remove("pattern");

//   });
// }


// async handleSquareClick(event) {
//   let targetSquare;
//   targetSquare = event.target;
//   console.log("handleSquareClick called");
//   const clickedSquare = event.target.closest(".chess-square");
//   const clickedSquareRow = parseInt(clickedSquare.dataset.row) - 1;
//   const clickedSquareCol = parseInt(clickedSquare.dataset.col) - 1;
//   console.log("Parsed clickedSquareRow:", clickedSquareRow);
//   console.log("Parsed clickedSquareCol:", clickedSquareCol);
//   const clickedPiece = this.board[clickedSquareRow][clickedSquareCol];

//   console.log('clickedSquare:', clickedSquare);
//   console.log('clickedSquareRow:', clickedSquareRow);
//   console.log('clickedSquareCol:', clickedSquareCol);
//   console.log("Square data attributes:", clickedSquare.dataset);
//   console.log("Entire board:", this.board);
//   console.log("Specific row:", this.board[clickedSquareRow]);
//   console.log("Specific cell:", this.board[clickedSquareRow][clickedSquareCol]);
//   console.log('clickedPiece:', clickedPiece);
//   console.log("Target square ID before movePiece:", clickedSquare.id);
//   console.log("Game board before movePiece:", this.board);

//   console.log("Handling square click event. Target:", event.target);

//   if (this.currentlySelectedPiece === null) {
//     if (clickedPiece !== null && clickedPiece.color === this.currentPlayer) {
//       this.currentlySelectedPiece = clickedPiece;
//       if (this.currentPlayer === clickedPiece.color) {
//         this.currentlySelectedPiece.element.classList.add("selected-piece");
//         this.currentlySelectedPiece.showValidMoves(this.currentlySelectedPiece);
//         console.log("validmoves called");
//       }
//     }
//   } else {
//     if (this.currentlySelectedPiece.row === clickedSquareRow && this.currentlySelectedPiece.col === clickedSquareCol) {
//       this.currentlySelectedPiece.element.classList.remove("selected-piece");
//       this.clearValidMoves();
//       this.currentlySelectedPiece = null;
//     } else {
//       const pieceElement = this.currentlySelectedPiece.element;
//       const destinationElement = clickedSquare;
//       const moveResult = this.movePiece(targetSquare, this.game, pieceElement, destinationElement);

//       if (moveResult) {
//         this.currentlySelectedPiece.element.classList.remove("selected-piece");
//         this.currentlySelectedPiece = null;
//         console.log("Game board after movePiece:", this.board);
//       } else {
//         this.currentlySelectedPiece.element.classList.remove("selected-piece");
//         this.clearValidMoves();
//         this.currentlySelectedPiece = null;
//       }
//     }
//   }
// }

// async handleSquareClick(event) {
//   let targetSquare;
//   targetSquare = event.target;
//   console.log("handleSquareClick called");
//   const clickedSquare = event.target.closest(".chess-square");
//   const clickedSquareRow = parseInt(clickedSquare.dataset.row) - 1;
//   const clickedSquareCol = parseInt(clickedSquare.dataset.col) - 1;
//   console.log("Parsed clickedSquareRow:", clickedSquareRow);
//   console.log("Parsed clickedSquareCol:", clickedSquareCol);
//   const clickedPiece = this.board[clickedSquareRow][clickedSquareCol];

//   console.log('clickedSquare:', clickedSquare);
//   console.log('clickedSquareRow:', clickedSquareRow);
//   console.log('clickedSquareCol:', clickedSquareCol);
//   console.log("Square data attributes:", clickedSquare.dataset);
//   console.log("Entire board:", this.board);
//   console.log("Specific row:", this.board[clickedSquareRow]);
//   console.log("Specific cell:", this.board[clickedSquareRow][clickedSquareCol]);
//   console.log('clickedPiece:', clickedPiece);
//   console.log("Target square ID before movePiece:", clickedSquare.id);
//   console.log("Game board before movePiece:", this.board);

//   console.log("Handling square click event. Target:", event.target);

//  if (this.currentlySelectedPiece === null) {
//     if (clickedPiece !== null && clickedPiece.color === this.currentPlayer) {
//       this.currentlySelectedPiece = clickedPiece;
//       if (this.currentPlayer === clickedPiece.color) {
//         this.currentlySelectedPiece.element.classList.add("selected-piece");
//         this.currentlySelectedPiece.showValidMoves(this.currentlySelectedPiece);
//         console.log("validmoves called");
//       }
//     }
//   } else {
//     const isValidMove = this.currentlySelectedPiece.validMoves.some(move => move.row === clickedSquareRow && move.col === clickedSquareCol);
    
//     if (isValidMove) {
//       // Code block to handle the actual move
//       const pieceElement = this.currentlySelectedPiece.element;
//       const destinationElement = clickedSquare;
//       const moveResult = await this.movePiece(targetSquare, this.game, pieceElement, destinationElement);

//       if (moveResult) {
//         this.currentlySelectedPiece.element.classList.remove("selected-piece");
//         this.clearValidMoves();
//         this.currentlySelectedPiece = null;
//         console.log("Game board after movePiece:", this.board);
//       } 
//     } else if (this.currentlySelectedPiece.row === clickedSquareRow && this.currentlySelectedPiece.col === clickedSquareCol) {
//       // Deselecting the currently selected piece
//       this.currentlySelectedPiece.element.classList.remove("selected-piece");
//       this.clearValidMoves();
//       this.currentlySelectedPiece = null;
//     } else {
//       // Clicked on an invalid square or another piece
//       this.currentlySelectedPiece.element.classList.remove("selected-piece");
//       this.clearValidMoves();
//       this.currentlySelectedPiece = null;
//     }
//   }
// }


resetBoardColors() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.getElementById(`square-${col}-${row}`);
      square.classList.remove("light", "dark");
      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
      }
    }
  }
}


  
  removePiece(row, col) {
  // Get the piece at the specified position on the board
  const chessPieces = this.board[row][col];

  // If there is a piece at the specified position...
  if (chessPieces) {
    // Remove the piece from the pieces array
    const index = this.chessPieces.indexOf(chessPieces);
    this.chessPieces.splice(index, 1);

    // Remove the piece's element from the square element
    const squareElement = this.squareElements[row * 8 + col];
    squareElement.innerHTML = '';

    // Update the board array to remove the piece
    this.chessBoard[row][col] = null;
  }
}


getPiece(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }
    for(let i = 0; i < this.chessPieces.length; i++) {
        const piece = this.chessPieces[i];
        if(piece.row === row && piece.col === col) {
            return this.board[row][col];
        }
    }
    return null;
  }



  movePiece(targetSquare, game, pieceElement, destinationElement) {
    console.log("movePiece function in classBoard.js called"); 
    console.log("game in movePiece:", game);
    console.log("this.game in movePiece:", this.game);
    
    console.log("targetSquare in movePiece:", targetSquare);
    console.log("pieceElement in movePiece:", pieceElement);
    console.log("destinationElement in movePiece:", destinationElement);

    if (!targetSquare || !game || !pieceElement || !destinationElement) 
    {
      console.error('Invalid arguments.');
      return false;
    }

    const targetRow = parseInt(targetSquare.dataset.row, 10);
    const targetCol = parseInt(targetSquare.dataset.col, 10);
    this.setGame(game);
    console.log("game set", this.setGame(game));

    if (isNaN(targetRow) || isNaN(targetCol)) 
    {
      console.error('Invalid target row or column.');
      return false;
    }

    // Check if a piece is selected and find it on the board
    const selectedElement = document.querySelector('.selected-piece');
    if (selectedElement) 
    {
      const parentElement = selectedElement.closest('.chess-square');
       if (parentElement) {
      console.log('pieceFound', selectedElement);
      console.log('squareFound', parentElement);
      console.log('Dataset row:', parentElement.dataset.row);
      console.log('Dataset col:', parentElement.dataset.col);
      const row = parseInt(parentElement.dataset.row, 10);
      const col = parseInt(parentElement.dataset.col, 10);

      console.log('row from parseInt:', row);
      console.log('col from parseInt:', col);
      
      console.log("Is row >= 0?", row >= 0);
      console.log("Is col >= 0?", col >= 0);
      console.log("Board length:", this.board.length);
      console.log("Board :", this.board);
      console.log("this.boardElement :", this.boardElement);


      console.log("Is row < this.board.length?", row < this.board.length);
      console.log("Is col < this.board[0].length?", col < this.game.board[0].length);
      console.log("Board dimensions:", this.board.length, this.game.board[0].length);
      
      if (row >= 0 && col >= 0 && row < this.game.board.length && col < this.game.board[0].length) 
      {
        console.log(`Board piece at [${row}][${col}]:`, this.game.board[row][col]);
        this.currentlySelectedPiece = this.game.board[row][col];
        } else {
          console.log("Row and/or Col are out of bounds.");
        }
      } else {
        console.log("Parent element not found.");
      }
    } else {
      console.log("Selected piece not found.");
    }

    if (!this.currentlySelectedPiece) 
      {
        console.error('No piece is currently selected. Returned movePiece in classBoard.js');
        return;
      }
      
      // Calculate valid moves
      const validMoves = this.currentlySelectedPiece.calculateValidMoves
      (
        this.currentlySelectedPiece.row,
        this.currentlySelectedPiece.col,
        this.board
        );

      console.log(validMoves);
      console.log("Target Row:before invalidmove statement:", targetRow);
      console.log("Target Col:before invalidmove statement:", targetCol);
     // console.log("Board before move:", JSON.stringify(this.game.board));

      if (!validMoves.some(move => move.row === targetRow && move.col === targetCol)) 
      {
        alert("Invalid move");
        return;
      }

      // Perform the actual move
      const originalRow = this.currentlySelectedPiece.row;
      const originalCol = this.currentlySelectedPiece.col;
      this.game.board[originalRow][originalCol] = null;
      this.game.board[targetRow][targetCol] = this.currentlySelectedPiece;
      this.currentlySelectedPiece.row = targetRow;
      this.currentlySelectedPiece.col = targetCol;

      Array.from(destinationElement.children).forEach(child => 
      {
        if (child.classList.contains("pattern")) 
        {
          destinationElement.removeChild(child);
        }
      });

      this.resetBoardColors();

      //const pieceElement = document.getElementById(`square-${originalRow}-${originalCol}`);
      pieceElement.classList.remove("selected-piece", "has-piece");

      // this.currentlySelectedPiece.row = targetRow;
      // this.currentlySelectedPiece.col = targetCol;
          console.log("destinationElement right before Updategamestatecall in movePiece:", destinationElement);

      this.updateGameState(event, pieceElement, destinationElement, game);

      this.currentlySelectedPiece.element.style.gridRow = targetRow + 1;
      this.currentlySelectedPiece.element.style.gridColumn = targetCol + 1;

      this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
      this.game.currentPlayer = this.currentPlayer;
      this.game.checkGameStatus();
      //this.clearValidMoves();

      this.moveHistory.push
      ({
        piece: this.currentlySelectedPiece,
        from: { row: originalRow, col: originalCol },
        to: {row: targetRow, col: targetCol }
      });

      this.currentlySelectedPiece.element.classList.remove("selected-piece");
      this.currentlySelectedPiece = null;
      console.log('this.game.board', this.game.board);
      // console.log("Board after move:", JSON.stringify(this.game.board));
      
      console.log("piecemoved");
      return true;
    }


  createBoardElements() 
  {
    this.squareElements = [];
    for (let i = 0; i < 8; i++) 
    {
      this.squareElements[i] = [];
      for (let j = 0; j < 8; j++) 
      {
        this.squareElements[i][j] = document.getElementById(`${i}-${j}`);
      }
    }
    this.displayBoard();
     //console.log("Initial board state:", this.chessBoard);
  }

isCheck(color) {
  const [opponentPieces, king] = color === "white" ? [this.blackPieces, this.whiteKing] : [this.whitePieces, this.blackKing];

  return opponentPieces.some(piece => 
    piece.calculateValidMoves(piece.row, piece.col, this.chessBoard)
      .some(move => move.row === king.row && move.col === king.col)
  );
}

 isCheckmate(color) {
  if (!this.isCheck(color)) {
    return false;
  }

  // Check if there is any move that can get the player out of check
  for (const piece of this.getValidPieces(color)) {
    const validMoves = piece.calculateValidMoves(piece.row, piece.col, this.chessBoard);
    for (const move of validMoves) {
      const [targetRow, targetCol] = move;
      if (!this.isBlocked(piece.row, piece.col, targetRow, targetCol)) {
        return false;
      }
    }
  }

  return true;
}

  isDraw() {
  // Check if there are only kings left on the board
  if (this.getNumWhitePieces() === 1 && this.getNumBlackPieces() === 1) {
    return true;
  }

  // Check if there are only kings and bishops left on the board
  if (this.getNumWhitePieces() === 2 && this.getNumBlackPieces() === 2) {
    // Check that each player has one bishop
    if (this.getNumWhiteBishops() === 1 && this.getNumBlackBishops() === 1) {
      return true;
    }
  }

  // If none of the above conditions are met, the game is not a draw
  return false;
}

getNumBishops(color) {
  return (color === "white" ? this.whitePieces : this.blackPieces)
          .filter(piece => piece instanceof Bishop).length;
}

getNumPieces(color) {
  return (color === "white" ? this.whitePieces : this.blackPieces).length;
}
  generateBoardHTML() {
  let boardHTML = '';
  for (let row = 0; row < this.numRows; row++) {
    for (let col = 0; col < this.numCols; col++) {
      const square = this.chessBoard[row][col];
      const piece = this.getPieceAtPosition({row, col});
      if (piece) {
        console.log(`Generating piece HTML at (${row}, ${col}):`, piece); // Add this console log
      }
      const pieceHTML = piece ? piece.generateHTML() : '';
      const squareClass = (row + col) % 2 === 0 ? 'light' : 'dark';
      const squareId = `square-${row}-${col}`; // Add square ID
      const squareHTML = `<div id="${squareId}" class="square ${squareClass}">${pieceHTML}</div>`; // Generate square HTML
      boardHTML += squareHTML;
    }
  }
  return boardHTML;
}

  

getPieceAtPosition(row, col) {
  return this.chessPieces.find(piece => piece.row === row && piece.col === col);
}

  displayBoard() {
  const boardHTML = this.generateBoardHTML();
  if (!this.boardElement) {
    console.error("Board element not found!", this.boardElement);
    return;
  }
  console.log("Initial board state:", this.chessBoard);

  this.boardElement.innerHTML = boardHTML;
}




endTurn() {
  this.isPlayerTurn = !isPlayerTurn;
    this.selectedPiece = null;
}

  highlightLegalMoves(fromRow, fromCol) {
    const legalMoves = this.chessGame.getLegalMoves(fromRow, fromCol);
    legalMoves.forEach(move => {
      const squareElement = document.getElementById(`chess-square-${move[0]}-${move[1]}`);
      squareElement.classList.add('highlight');
    });
  }

removeHighlightFromAllSquares() {
  const squares = document.querySelectorAll('.chess-square');
  for (const square of squares) {
    square.classList.remove('highlight');
  }
}

  updateSquareElements(fromIndex, toIndex, element) {
  this.squareElements.splice(fromIndex, 1);
  this.squareElements.splice(toIndex, 0, element);
}



 
updateGameState(event, pieceElement, destinationElement, game) {
  console.log("updateGameState called");  // To check if the function itself is called
  console.log("Event:", event);
  console.log("Piece Element:", pieceElement);
  console.log("Destination Element:", destinationElement);
  console.log("Game:", game);
  const targetSquare = event.target; // Assuming the event object is accessible here

  // Call movePiece method to handle the move logic
 // this.movePiece(targetSquare, game, pieceElement, destinationElement);

  // Update the history of moves
  this.moveHistory.push({
    piece: pieceElement ? pieceElement.dataset.piece : null, // Check if pieceElement is defined
    from: {
      row: pieceElement ? Math.floor(pieceElement.dataset.row / 8) : null,
      col: pieceElement ? pieceElement.dataset.col % 8 : null
    },
    to: {
      row: Math.floor(destinationElement.dataset.row / 8),
      col: destinationElement.dataset.col % 8
    },
    captured: destinationElement.firstElementChild
      ? destinationElement.firstElementChild.dataset.piece
      : null,
  });
  console.log("Move History:", JSON.stringify(this.moveHistory));

  // // Check if the game is over (e.g., checkmate, stalemate, etc.)
  // if (this.isCheckmate()) {
  //   this.gameStatus = "checkmate";
  //   this.announceWinner();
  //   console.log("updateGameState Exited due to checkmate");
  //   return;
  // }

  // if (this.isStalemate()) {
  //   this.gameStatus = "stalemate";
  //   this.announceDraw();
  //   console.log("updateGameState Exited due to Stalemate");

  //   return;
  // }
}
announceWinner() {
  const message = `Checkmate! ${this.currentPlayer} wins!`;
  alert(message);
}

announceDraw() {
  const message = `Stalemate. The game is a draw.`;
  alert(message);
}

// isStalemate() {
//   const currentPlayer = this.currentPlayer;
//   console.log(`Checking stalemate for ${currentPlayer}`);

//   if (this.isCheck(currentPlayer)) {
//     console.log(`${currentPlayer} is in check, so it cannot be stalemate.`);
//     return false;
//   }

//   const allPossibleMoves = [];
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       const piece = this.board[row][col];
//       if (piece && piece.color === currentPlayer) {
//         const validMoves = piece.calculateValidMoves(row, col, this.board);
//         validMoves.forEach(move => allPossibleMoves.push({ piece, move }));
//       }
//     }
//   }

//   console.log("All possible moves:", allPossibleMoves);

//   for (let i = 0; i < allPossibleMoves.length; i++) {
//     const { piece, move } = allPossibleMoves[i];
//     const { row, col } = move;
//     const capturedPiece = this.board[row][col];
    
//     this.board[piece.row][piece.col] = null;
//     this.board[row][col] = piece;
//     piece.row = row;
//     piece.col = col;

//     const isCheck = this.isCheck(currentPlayer);

//     this.board[row][col] = capturedPiece;
//     this.board[piece.row][piece.col] = piece;
//     piece.row = piece.row;
//     piece.col = piece.col;

//     if (!isCheck) {
//       console.log(`A valid move was found for ${currentPlayer}, so it's not a stalemate.`);
//       return false;
//     }
//   }

//   console.log(`No valid moves were found for ${currentPlayer}, declaring stalemate.`);
//   return true;
// }

// FUnction commented due to errs in the move action.
// isStalemate() {
//   const currentPlayer = this.currentPlayer;
//   console.log("currentPlayer", currentPlayer);

//   // Check if the player is already in check
//   if (this.isCheck(currentPlayer)) {
//     console.log("current player is already checked so function returned ");
//     return false;
//   }

//   // Generate all possible moves for the current player
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       const squareElement = document.querySelector(`#square-${row}-${col}`);
//       const pieceElement = squareElement ? squareElement.querySelector('.chess-piece') : null;
      
//       if (pieceElement) {
//         const color = pieceElement.classList.contains('white') ? 'white' : 'black';
        
//         if (color === currentPlayer) {
//           const piece = this.board[row][col]; // Now retrieve the piece object from your board array.
//           console.log("Piece", piece);
//           console.log("Piece.color", color);

//           const validMoves = piece.calculateValidMoves(row, col, this.board);
//           console.log("validMoves in isStalemate", validMoves);

//           for (const {row: newRow, col: newCol} of validMoves) {
//             // Simulate the move
//             const originalSpot = this.board[newRow][newCol];
//             this.board[newRow][newCol] = piece;
//             this.board[row][col] = null;
            
//             // Check if this move puts the player in check
//             const isCheckAfterMove = this.isCheck(currentPlayer);
            
//             // Undo the move
//             this.board[newRow][newCol] = originalSpot;
//             this.board[row][col] = piece;

//             // If we find a move that doesn't result in a check, it's not stalemate
//             if (!isCheckAfterMove) {
//               return false;
//             }
//           }
//         }
//       }
//     }
//   }

//   // If we get here, it means no valid moves are possible without being in check, thus it's a stalemate
//   return true;
// }

isBlocked(currentRow, currentCol, targetRow, targetCol) {
      // determine direction of movement
    const rowDir = targetRow > currentRow ? 1 : targetRow < currentRow ? -1 : 0;
    const colDir = targetCol > currentCol ? 1 : targetCol < currentCol ? -1 : 0;

      // loop through squares between current and target squares in the given direction
    for (let row = currentRow + rowDir, col = currentCol + colDir; row != targetRow || col != targetCol; row += rowDir, col += colDir) {
      if (this.board[row][col]) {
        // square is occupied
        return true;
      }
    }

      // no squares were found to be occupied
    return false;
  }
}

