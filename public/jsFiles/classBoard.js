let chessArray;
let chessBoard;
let handlePieceSelection;
let game;

let pieceElement;
let destinationElement;

 const validPieceTypes = ["king", "queen", "rook", "bishop", "knight", "pawn"];

  

 const { default: ChessPiece } = await import('https://github.com/croc4-20/Chessmos/blob/main/public/jsFiles/classPiece.js');
  class ExtendedPiece extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
    }
    
  }

  async function defineExtendedPiece() {

  window.chessPiece  = ExtendedPiece;
  
  }
  

async function initialize(game, pieces) 
{
  
  
  const { default: ChessBoard } = await import('https://github.com/croc4-20/Chessmos/blob/main/public/jsFiles/classBoard.js');
  const { default: ChessGame } = await import('https://github.com/croc4-20/Chessmos/blob/main/public/jsFiles/classGame.js');
  const { default: ChessArray } = await import('https://github.com/croc4-20/Chessmos/blob/main/public/jsFiles/classArray.js');

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

//Call initializeBoard after the assignments
try {
    await chessBoard.initializeBoard();
  } catch (error) {
    console.error("Failed to initialize boaaard:", error);
    throw error;
  }

      // Attach event listeners
   chessBoard.squareElements.forEach((square) => {
    square.addEventListener("click", ExtendedPiece.handleClick);
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
     this.game = game;
    console.log('this.Game', this.game);
    // this.game.board = [];

    this.boardElement = document.getElementById('chessboard'); // Set boardElement here
    this.pieces = pieces;
    this.currentlySelectedPiece = null;
   defineExtendedPiece = defineExtendedPiece; // Binding this
    this.initializeBoard = this.initializeBoard.bind(this);
     this.board = Array(8).fill(null).map(() => Array(8).fill(null));
  // this.board = this.initializeBoard();
    this.board.length = 8;
    this.ChessPiece = ChessPiece;
    this.initialize();
    this.blackPieces = [];
    this.whitePieces = [];
     this.selectedPieceElement = null;
     this.movePiece = this.movePiece.bind(this);

    // this.populateBoardWithPieces = this.populateBoardWithPieces.bind(this);
    // this.chaosWarp();
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
      console.log("Current context (this.game):", this.game);

      console.log("Current context (this.game):", this.game);
      if (!this.game) {
        throw new Error("Game not initialized");
      }
      console.log("this.game:", this.game);
      console.log("this.chessGame:", this.chessGame);
      this.initializeEmptyBoard();
      await this.populateBoardWithPieces();
       defineExtendedPiece();
      // renderBoard(this.game.board);
      console.log("ExtendedPiece", ExtendedPiece);
      // this.registerPieceClickHandlers();
    } catch (error) 
    {
      console.error("Failed to initialize board:", error);
      throw error;
    }
  }
  async populateBoardWithPieces() {
    // ... existing code to create pieces ...
    // Loop through each piece and place it on the board
    this.pieces.forEach(piece => {
      const chessPiece = new ChessPiece(piece.type, piece.color, piece.row, piece.col, piece.imagePath, piece.elementId, this.game);
      this.board[piece.row][piece.col] = chessPiece;
      this.chessPieces.push(chessPiece);

      // Update the DOM for the chess piece
      const squareElement = document.getElementById(`square-${piece.row}-${piece.col}`);
      squareElement.innerHTML = `<div class="chess-piece ${piece.color}-${piece.type}" style="background-image: url('${piece.imagePath}')"></div>`;
    });

    console.log("Board populated with pieces:", this.board);
  }

// async populateBoardWithPieces(chessPiece) {
//   this.game.board = [];
//   console.log("this.game.board:", this.game.board);
    
//     // create a 2D array to represent the board
//     for (let row = 0; row < 8; row++) {
//       this.game.board[row] = [];
//       for (let col = 0; col < 8; col++) {
//         this.game.board[row][col] = null;
//       }

//      }
//       //this.defineExtendedPiece();

//     // Add black pieces
//   this.game.board[7][0] = new ExtendedPiece("rook", "black", 7, 0, "img/blackROOK.png", "square-7-0", this);
//   console.log('this.game.board[7][0]]', this.game.board[7][0]);
//   this.game.board[7][1] = new ExtendedPiece("knight", "black", 7, 1, "img/blackKNIGHT.png", "square-7-1", this);
//   this.game.board[7][2] = new ExtendedPiece("bishop", "black", 7, 2, "img/blackBISHOP.png", "square-7-2", this);
//   this.game.board[7][3] = new ExtendedPiece("queen", "black", 7, 3, "img/BlackQUEEN.png", "square-7-3", this);
//   this.game.board[7][4] = new ExtendedPiece("king", "black", 7, 4, "img/BlackKING.png", "square-7-4", this);
//   this.game.board[7][5] = new ExtendedPiece("bishop", "black", 7, 5, "img/BlackBISHOP.png", "square-7-5", this);
//   this.game.board[7][6] = new ExtendedPiece("knight", "black", 7, 6, "img/BlackKNIGHT.png", "square-7-6", this);
//   this.game.board[7][7] = new ExtendedPiece("rook", "black", 7, 7, "img/BlackROOK.png", "square-7-7", this);
  
//     //Add Black PAWNS

//   this.game.board[6][0] = new ExtendedPiece("pawn", "black", 6, 0, "images/blackPAWN.png", "square-6-0", this);
//   this.game.board[6][1] = new ExtendedPiece("pawn", "black", 6, 1, "images/blackPAWN.png", "square-6-1", this);
//   this.game.board[6][2] = new ExtendedPiece("pawn", "black", 6, 2, "images/blackPAWN.png", "square-6-2", this);
//   this.game.board[6][3] = new ExtendedPiece("pawn", "black", 6, 3, "images/blackPAWN.png", "square-6-3", this);
//   this.game.board[6][4] = new ExtendedPiece("pawn", "black", 6, 4, "images/blackPAWN.png", "square-6-4", this);
//   this.game.board[6][5] = new ExtendedPiece("pawn", "black", 6, 5, "images/blackPAWN.png", "square-6-5", this);
//   this.game.board[6][6] = new ExtendedPiece("pawn", "black", 6, 6, "images/blackPAWN.png", "square-6-6", this);
//   this.game.board[6][7] = new ExtendedPiece("pawn", "black", 6, 7, "images/blackPAWN.png", "square-6-7", this);
  
//     // Add WHITE pieces
//   this.game.board[0][0] = new ExtendedPiece("rook", "white", 0, 0, "images/whiteROOK.png", "square-0-0", this);
//   this.game.board[0][1] = new ExtendedPiece("knight", "white", 0, 1, "img/whiteKNIGHT.png", "square-0-1", this);
//   this.game.board[0][2] = new ExtendedPiece("bishop", "white", 0, 2, "img/whiteBISHOP.png", "square-0-2", this);
//   this.game.board[0][3] = new ExtendedPiece("queen", "white", 0, 3, "images/whiteQUEEN.png", "square-0-3", this);
//   this.game.board[0][4] = new ExtendedPiece("king", "white", 0, 4, "images/whiteKING.png", "square-0-4", this);
//   this.game.board[0][5] = new ExtendedPiece("bishop", "white", 0, 5, "img/whiteBISHOP.png", "square-0-5", this);
//   this.game.board[0][6] = new ExtendedPiece("knight", "white", 0, 6, "img/whiteKNIGHT.png", "square-0-6", this);
//   this.game.board[0][7] = new ExtendedPiece("rook", "white", 0, 7, "images/whiteROOK.png", "square-0-7", this);
  
//       //Add white pawns
//   this.game.board[1][0] = new ExtendedPiece("pawn", "white", 1, 0, "images/whitePAWN.png", "square-1-0", this);
//   this.game.board[1][1] = new ExtendedPiece("pawn", "white", 1, 1, "images/whitePAWN.png", "square-1-1", this);
//   this.game.board[1][2] = new ExtendedPiece("pawn", "white", 1, 2, "images/whitePAWN.png", "square-1-2", this);
//   this.game.board[1][3] = new ExtendedPiece("pawn", "white", 1, 3, "images/whitePAWN.png", "square-1-3", this);
//   this.game.board[1][4] = new ExtendedPiece("pawn", "white", 1, 4, "images/whitePAWN.png", "square-1-4", this);
//   this.game.board[1][5] = new ExtendedPiece("pawn", "white", 1, 5, "images/whitePAWN.png", "square-1-5", this);
//   this.game.board[1][6] = new ExtendedPiece("pawn", "white", 1, 6, "images/whitePAWN.png", "square-1-6", this);
//   this.game.board[1][7] = new ExtendedPiece("pawn", "white", 1, 7, "images/whitePAWN.png", "square-1-7", this);
  
//   console.log("Initializing the board...");
//   console.log("Initial board state:", this.game.board);
//  // this.renderBoard(this.game.board);
//   this.squareElements = document.querySelectorAll(".chess-square");
//   console.log("chesspiece in populateBoardWithPieces", ExtendedPiece);
//   // this.registerPieceClickHandlers();

//   // await this.defineExtendedPiece();
//   console.log("Board initialization completed.");
//   return Promise.resolve();
// }

initializeEmptyBoard() {
  this.game.board = Array.from({ length: 8 }, () => Array(8).fill(null));
}


async runChessGame() {
  try {
    this.defineExtendedPiece();
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
registerPieceClickHandlers() {
    this.chessPieces.forEach((piece) => {
        const pieceElement = piece.getDOMElement(); // Assuming getDOMElement() returns the DOM element of the piece
        pieceElement.addEventListener("click", (event) => {
            piece.handleClick(event);
            
        }, { once: true });
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
      if (square) {  // Make sure the square exists
        square.classList.remove("light", "dark");
        if ((row + col) % 2 === 0) {
          square.classList.add("dark");
        } else {
          square.classList.add("light");
        }
      } else {
        console.error(`Square at ${col}-${row} not found.`);
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
  console.log('getPiece function called');
    if (row < 0 || row > 7 || col < 0 || col > 7) {
        return null;
    }
    return this.game.board[row][col];
}


    movePiece(targetSquare, game, pieceElement, destinationElement) {
      console.log('Target Square:', targetSquare);
      console.log('Game:', game);
      console.log('Destination Element:', destinationElement)
      pieceElement = document.querySelector(".selected-piece");
      console.log('Piece Element in movePiece:', pieceElement);
      console.log("Current context of this in movePiece:", this);
      console.log("game in in movePiece", game);
      console.log("game.game.board in movePiece", game.game.board);


        if (!this.validateMoveInputs(targetSquare, game, pieceElement, destinationElement)) {
            return false;
        }
         this.selectPiece(pieceElement);

        const targetCoords = this.getSquareCoords(targetSquare);
        console.log("targetCoords in movePiece :", targetCoords);
        if (!this.validateCoords(targetCoords, game)) {
            return false;
        }

       const selectedElement = this.getSelectedPieceElement();
       const parentElement = this.selectedPieceParent; // Use the stored parent
        console.log("Parent element in movePiece :", parentElement);

        console.log('selectedElement', selectedElement);
        if (!selectedElement) {
            console.log("Selected piece not found.");
            return false;
        }



        if (!parentElement) {
            console.log("Parent element not found.");
            return false;
        }

        const originalCoords = this.getSquareCoords(parentElement);
        if (!this.validateCoords(originalCoords)) {
          console.log('false corords');
            return false;
        }


        if (targetSquare.classList.contains('valid-move')) {
          console.log('validmove entered trying to call executemove');
          this.executeMove(originalCoords, targetCoords, selectedElement, parentElement, game);
          
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
            return true;
        }
        
        console.log("Invalid move attempted.");
        return false;
    }
    isPieceInRift(targetCoords, game) {
      console.log('isPieceInRift function called');
    const riftArea = game.getRiftArea();
    console.log("Rift Area:", riftArea);
    console.log("Target Coordinates:", targetCoords);

    return riftArea.some(([riftRow, riftCol]) => {
        console.log(`Checking rift position: (${riftRow}, ${riftCol}) against target position: (${targetCoords.row}, ${targetCoords.col})`);
        return riftRow === targetCoords.row && riftCol === targetCoords.col;
    });
}

    // Helper Functions
    validateMoveInputs(targetSquare, game, pieceElement, destinationElement) {
    if (!targetSquare || !game || !pieceElement || !destinationElement) {
        console.error('Invalid arguments.', "targetSquare", targetSquare, "game", game, "pieceElement", pieceElement, "destinationElement", destinationElement);
        return false;
    }
    return true;
}


    getSquareCoords(square) {
    return {
        row: parseInt(square.dataset.row, 10),
        col: parseInt(square.dataset.col, 10)
    };
}
validateCoords({ row, col }) {
    const isRowValid = row >= 0 && row < 8; // Board size is hardcoded to 8x8
    const isColValid = col >= 0 && col < 8;

    if (!isRowValid || !isColValid) {
        console.error('Invalid target row or column.');
        return false;
    }
    return true;
}

//     validateCoords({ row, col }, game) {
//     console.log("Current context of this in validateCoords:", this);
//     // console.log("game.game in validateCoords", this.game.game);
    
//     // console.log("this.game in validateCoords", this.game);
//     console.log("game.game.board in validateCoords", game.game.board);
//     console.log("game.game.board in validateCoords.length", game.game.board.length);
//     const lengthRow = game.game.board.length;
//     const lengthCol = game.game.board[0].length;
//     console.log("lengthRow", lengthRow);
//     console.log("lengthCol", lengthCol);
//     const isRowValid = row >= 0 && row < lengthRow;
//     console.log("isRowValid in validateCoords", isRowValid);

//     const isColValid = col >= 0 && col < lengthCol;
//     console.log("isColValid in validateCoords", isColValid);

//     if (!isRowValid || !isColValid) {
//         console.error('Invalid target row or column.');
//         return false;
//     }
//     console.log('end of validateCoords funtion');
//     return true;
// }

    selectPiece(pieceElement) {
      console.log("pieceElement in selecPiece function :", pieceElement);
        if (pieceElement && pieceElement instanceof Element) {
            this.selectedPieceElement = pieceElement;
            this.selectedPieceParent = pieceElement.parentNode;
            console.log("this.selectedPieceParent in selectPiece :", this.selectedPieceParent);


            pieceElement.classList.add('selected-piece');
        } else {
            console.error('Invalid piece element selected:', pieceElement);
        }
    }

    deselectPiece() {
        if (this.selectedPieceElement) {
            this.selectedPieceElement.classList.remove('selected-piece');
            this.selectedPieceElement = null;
        }
    }

    getSelectedPieceElement() {
        return this.selectedPieceElement;
    }

    executeMove(originalCoords, targetCoords, selectedElement, oldSquare, game) {
      console.log("this context in executeMove in classBoard", this);
      console.log("game context in executeMove in classBoard", game);
      console.log("game.board in executeMove in classBoard", game.game.board);
      console.log("oldSquare in executeMove in classBoard", oldSquare);


      const { row: originalRow, col: originalCol } = originalCoords;
      const { row: targetRow, col: targetCol } = targetCoords;

      // Update the board data
      game.game.board[originalRow][originalCol] = null;
      game.game.board[targetRow][targetCol] = this.currentlySelectedPiece;

      // Move the piece element on the UI
      const newSquare = document.querySelector(`#square-${targetRow}-${targetCol}`);
      console.log("newSquare in executeMove in classBoard", newSquare);
      console.log("selectedElement in executeMove in classBoard", selectedElement);
      oldSquare.removeChild(selectedElement);
      newSquare.appendChild(selectedElement);

      // Update UI and piece position
      selectedElement.style.gridRow = targetRow + 1;
      selectedElement.style.gridColumn = targetCol + 1;
      selectedElement.classList.remove("selected-piece");

      this.currentlySelectedPiece = null;
      this.resetBoardColors();
      // Post-move actions specific to the chess piece
    // const chessPiece = this.getPiece(targetCoords.row, targetCoords.col);
    // console.log('testest chessPiece', chessPiece);
    // if (chessPiece) {
    //     chessPiece.postMoveActions(targetCoords);
    // } else {
    //     console.error("ChessPiece instance not found after move.");
    // }

    // // Update the game state, including handling active spells and turn changes
    // this.updateGameStateInMovePiece();

    // console.log("Ending executeMove");
  }
   


//   movePiece(targetSquare, game, pieceElement, destinationElement) {
//     console.log("movePiece function in classBoard.js called"); 
//     console.log("game in movePiece:", game);
//     console.log("this.game in movePiece:", this.game);
//     console.log('this.game.board at the beginning of movePiece function', this.game.board);

//     console.log("targetSquare in movePiece:", targetSquare);
//     console.log("pieceElement in movePiece:", pieceElement);
//     console.log("destinationElement in movePiece:", destinationElement);
//         console.log("this.selectedPiece in movePiece:", this.selectedPiece);


//     if (!targetSquare || !game || !pieceElement || !destinationElement) 
//     {
//       console.error('Invalid arguments.');
//       return false;
//     }

//     const targetRow = parseInt(targetSquare.dataset.row, 10);
//     const targetCol = parseInt(targetSquare.dataset.col, 10);
//     this.setGame(game);
//     console.log("game set", this.setGame(game));

//     if (isNaN(targetRow) || isNaN(targetCol)) 
//     {
//       console.error('Invalid target row or column.');
//       return false;
//     }

//     // Check if a piece is selected and find it on the board
//     const selectedElement = document.querySelector('.selected-piece');
//     if (selectedElement) 
//     {
//       const parentElement = selectedElement.closest('.chess-square');
//        if (parentElement) {
//       console.log('pieceFound, aka selectedElement', selectedElement);
//       console.log('squareFound', parentElement);
//       console.log('Dataset row:', parentElement.dataset.row);
//       console.log('Dataset col:', parentElement.dataset.col);
//       const row = parseInt(parentElement.dataset.row, 10);
//       const col = parseInt(parentElement.dataset.col, 10);

//       console.log('row from parseInt:', row);
//       console.log('col from parseInt:', col);
      
//       console.log("Is row >= 0?", row >= 0);
//       console.log("Is col >= 0?", col >= 0);
//       console.log("Board length:", this.board.length);
//       console.log("this.game.board :", this.game.board);
//       console.log("this.boardElement :", this.boardElement);


//       console.log("Is row < this.board.length?", row < this.board.length);
//       console.log("Is col < this.board[0].length?", col < this.game.board[0].length);
//       console.log("Board dimensions:", this.game.board.length, this.game.board[0].length);
      
//       if (row >= 0 && col >= 0 && row < this.game.board.length && col < this.game.board[0].length) 
//       {
//         console.log(`Board piece at [${row}][${col}]:`, this.game.board[row][col]);
//         // console.log("this.game.board:", JSON.parse(JSON.stringify(this.game.board)));
//         this.currentlySelectedPiece = this.game.board[row][col];
//                  console.log("this.currentlySelectedPiece right after its initialization :", this.currentlySelectedPiece);

//         } else {
//           console.log("Row and/or Col are out of bounds.");
//         }
//       } else {
//         console.log("Parent element not found.");
//       }
//     } else {
//       console.log("Selected piece not found.");
//     }

//        // console.log(validMoves);
//       console.log("Target Row:before invalidmove statement:", targetRow);
//       console.log("Target Col:before invalidmove statement:", targetCol);
//      // console.log("Board before move:", JSON.stringify(this.game.board));

//       if (targetSquare.classList.contains('valid-move')) {
      
// const parentElement = selectedElement.closest('.chess-square');
// console.log("parentElement", parentElement);
//       // Perform the actual move
//       const originalRow = parseInt(parentElement.dataset.row, 10);
//       const originalCol = parseInt(parentElement.dataset.col, 10);
//       console.log("originalCol", originalCol);
//             console.log("originalRow", originalRow);

//       this.game.board[originalRow][originalCol] = null;
//       this.game.board[targetRow][targetCol] = this.currentlySelectedPiece;
      
      

//       // Get the parent (square) of the piece that needs to be moved
//       const oldSquare = parentElement.closest('.chess-square');
//        console.log("this.currentlySelectedPiece.element :", this.currentlySelectedPiece.element);
//       console.log("this.currentlySelectedPiece :", this.currentlySelectedPiece);
//       console.log("oldSquare before attempting to remove child:", oldSquare);

//       // Get the new square where the piece should go
//       const newSquare = document.querySelector(`#square-${targetRow}-${targetCol}`);
      
//       console.log("targetRow :", targetRow);
//       console.log("targetCol :", targetCol);
//       const actualPieceElement = oldSquare.querySelector('.chess-piece');
//       console.log('actualPieceElement', actualPieceElement);

//     // Remove the original piece from oldSquare
//      if (oldSquare && actualPieceElement) 
//      {
//       console.log('Properties before removal:', actualPieceElement.classList, actualPieceElement.style);
//       console.log('actualPieceElement', actualPieceElement);
//       console.log("newSquare :", newSquare);
      
//       window.requestAnimationFrame(() => {
//         oldSquare.removeChild(actualPieceElement);
//         newSquare.appendChild(actualPieceElement);

//         if (!oldSquare.querySelector('.chess-piece')) {
//         oldSquare.removeAttribute("data-color");
//         oldSquare.removeAttribute("data-type");
//         oldSquare.classList.remove("has-piece");
//             oldSquare.style.backgroundImage = '';
      
//       // Assuming the piece type and color are stored in the class of actualPieceElement
//     const pieceType = actualPieceElement.className.split(' ')[1]; // e.g., "white-pawn"
//     const [pieceColor, pieceName] = pieceType.split('-'); // Split into "white" and "pawn"

       
//         newSquare.setAttribute("data-type", pieceType);
//         newSquare.setAttribute("data-color", pieceColor);
//         newSquare.classList.add("has-piece");

// }
//       });
//           // Update the piece's DOM properties
//       actualPieceElement.style.gridRow = targetRow + 1;
//       actualPieceElement.style.gridColumn = targetCol + 1;
//       actualPieceElement.classList.remove("selected-piece");
      
//       // Deselect the piece after moving
      
//       console.log('Properties after removal:', actualPieceElement.classList, actualPieceElement.style);
     
//       this.currentlySelectedPiece = null;
     
//       newSquare.offsetHeight; // no need to store this anywhere, just access it
//       const gridRow = targetRow + 1; // CSS grid lines start at 1, not 0
//       const gridColumn = targetCol + 1;
//         // Set the grid-area style on the new square to place it correctly
//       newSquare.style.gridArea = `${gridRow} / ${gridColumn}`;

//       // Append the actual piece to the wrapper
//       console.log('Actual Piece Element before appendChild method:', actualPieceElement);
      
           
//       console.log('Actual Piece Element after appendChild method:', actualPieceElement);
       
//       console.log("newSquare.outerHTML", newSquare.outerHTML);
//       console.log("newSquare.innerHTML", newSquare.innerHTML);
    
//     }
      
//     //this.currentlySelectedPiece.element = actualPieceElement;


//       console.log("destinationElement: ", destinationElement);
//       console.log("destinationElement children: ", destinationElement.children);


// //       Array.from(oldSquare.children).forEach(child => {
// //     console.log("Iterating child: ", child);
// //     if (child && child.classList && child.classList.contains("pattern")) {
// //         console.log("Removing child: ", child);
// //         destinationElement.removeChild(child);
// //     }
// // });


//       this.resetBoardColors();
//           console.log("destinationElement right before Updategamestatecall in movePiece:", destinationElement);

     
//       // this.currentlySelectedPiece.element.style.gridRow = targetRow + 1;
//       // this.currentlySelectedPiece.element.style.gridColumn = targetCol + 1;

//       this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
//       this.game.currentPlayer = this.currentPlayer;
//       this.game.checkGameStatus();
//       this.clearValidMoves();
//       // oldSquare.clearValidMoves();

//       this.moveHistory.push
//       ({
//         piece: this.currentlySelectedPiece,
//         from: { row: originalRow, col: originalCol },
//         to: {row: targetRow, col: targetCol }
//       });
//       actualPieceElement.classList.remove("selected-piece");
//         this.currentlySelectedPiece = null;
//       //this.currentlySelectedPiece.element.classList.remove("selected-piece");
//       // oldSquare.removeChild(this.currentlySelectedPiece.element);
      
//       // this.currentlySelectedPiece = null;
//       console.log('this.game.board at the end of movePiece function', this.game.board);
//       // console.log("Board after move:", JSON.stringify(this.game.board));
//        this.updateGameState(event, actualPieceElement, destinationElement, game);
//       console.log("piecemoved");
//       console.log("newSquare", newSquare);
//       console.log("actualPieceElement", actualPieceElement);
     
//       return true;
// }
    // }
//   movePiece(targetSquare, game, pieceElement, destinationElement) {
//   if (!this.isValidMove(targetSquare, game, pieceElement, destinationElement)) {
//     return false;
//   }
  
//   const targetRow = parseInt(targetSquare.dataset.row, 10);
//   const targetCol = parseInt(targetSquare.dataset.col, 10);
//   this.setGame(game);
//   const selectedPieceElement = this.getSelectedPieceElement();
//   const oldSquare = this.findSquareOfSelectedPiece(selectedPieceElement);
//   const originalPosition = this.getPiecePosition(oldSquare);
  
//   this.updateBoardState(originalPosition, targetRow, targetCol);
//   this.movePieceOnBoard(selectedPieceElement, oldSquare, destinationElement, targetCol, targetRow);
//   this.updatePieceDOMProperties(selectedPieceElement, targetRow, targetCol);
//   this.deselectPiece(selectedPieceElement);
  
//   this.currentPlayer = this.togglePlayerTurn();
//   this.game.checkGameStatus();
//   this.clearValidMoves();
  
//   this.addToMoveHistory(selectedPieceElement, originalPosition, targetRow, targetCol);
//   this.updateGameState(event, selectedPieceElement, destinationElement, game);
  
//   return true;
// }

// isValidMove(targetSquare, game, pieceElement, destinationElement) {
//   if (!targetSquare || !game || !pieceElement || !destinationElement) {
//     console.error('Invalid arguments.');
//     return false;
//   }

//   const targetRow = parseInt(targetSquare.dataset.row, 10);
//   const targetCol = parseInt(targetSquare.dataset.col, 10);
//   this.setGame(game);

//   if (isNaN(targetRow) || isNaN(targetCol)) {
//     console.error('Invalid target row or column.');
//     return false;
//   }

//   const selectedPieceElement = this.getSelectedPieceElement();
//   if (!selectedPieceElement) {
//     console.log("Selected piece not found.");
//     return false;
//   }

//   const oldSquare = this.findSquareOfSelectedPiece(selectedPieceElement);
//   if (!oldSquare) {
//     console.log("Parent element not found.");
//     return false;
//   }

//   return true;
// }

// getSelectedPieceElement() {
//   return document.querySelector('.selected-piece');
// }

// findSquareOfSelectedPiece(selectedPieceElement) {
//   return selectedPieceElement.closest('.chess-square');
// }

// getPiecePosition(square) {
//   return {
//     row: parseInt(square.dataset.row, 10),
//     col: parseInt(square.dataset.col, 10)
//   };
// }

// updateBoardState(originalPosition, targetRow, targetCol) {
//   this.game.board[originalPosition.row][originalPosition.col] = null;
//   this.game.board[targetRow][targetCol] = this.currentlySelectedPiece;
// }

// movePieceOnBoard(selectedPieceElement, oldSquare, destinationElement, targetCol, targetRow) {
//   const actualPieceElement = this.getActualPieceElement(selectedPieceElement, oldSquare);
//   const newSquare = this.getNewSquare(targetRow, targetCol);

//   if (actualPieceElement && newSquare) {
//     oldSquare.removeChild(actualPieceElement);
//     const clonedPieceElement = actualPieceElement.cloneNode(true); // Clone the actual piece element
//     newSquare.appendChild(clonedPieceElement); // Append the cloned piece element to the new square

//     if (!oldSquare.querySelector('.chess-piece')) {
//       this.clearSquareData(oldSquare);
//     }
//   }
// }
// getActualPieceElement(selectedPieceElement, oldSquare) {
//   const actualPieceElement = oldSquare.querySelector('.chess-piece');
//   return actualPieceElement;
// }

// getNewSquare(targetRow, targetCol) {
//   console.log("targetCol", targetCol);
//   console.log("targetRow", targetRow);

//   return document.getElementById(`square-${targetRow}-${targetCol}`);
// }

// clearSquareData(square) {
//   square.removeAttribute("data-color");
//   square.removeAttribute("data-type");
//   square.classList.remove("has-piece");
//   square.style.backgroundImage = '';
// }

// updatePieceDOMProperties(selectedPieceElement, targetRow, targetCol) {
//   selectedPieceElement.style.gridRow = targetRow + 1;
//   selectedPieceElement.style.gridColumn = targetCol + 1;
// }

// deselectPiece(selectedPieceElement) {
//   selectedPieceElement.classList.remove("selected-piece");
//   this.currentlySelectedPiece = null;
// }

// togglePlayerTurn() {
//   return this.currentPlayer === "white" ? "black" : "white";
// }

// addToMoveHistory(selectedPieceElement, originalPosition, targetRow, targetCol) {
//   this.moveHistory.push({
//     piece: this.currentlySelectedPiece,
//     from: { row: originalPosition.row, col: originalPosition.col },
//     to: { row: targetRow, col: targetCol }
//   });
// }
// clearValidMoves() {
//     const validMoveSquares = document.querySelectorAll('.valid-move');
//     validMoveSquares.forEach(square => {
//         square.classList.remove('valid-move');
//         square.innerHTML = '';
//     });
// }
    
   

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
  this.isPlayerTurn = !this.isPlayerTurn;
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
  console.log("updateGameState called");
  console.log("Event:", event);
  console.log("Piece Element:", pieceElement);
  console.log("Destination Element:", destinationElement);
  console.log("Game:", game);

  // The actual target square should be the destinationElement
  // If event.target is not reliable, use destinationElement directly
  const targetSquare = destinationElement; 

  // Update the history of moves
  this.moveHistory.push({
    piece: pieceElement ? pieceElement.dataset.piece : null,
    from: {
      row: pieceElement ? parseInt(pieceElement.dataset.row, 10) : null,
      col: pieceElement ? parseInt(pieceElement.dataset.col, 10) : null
    },
    to: {
      row: parseInt(destinationElement.dataset.row, 10),
      col: parseInt(destinationElement.dataset.col, 10)
    },
    captured: destinationElement.querySelector('.chess-piece')
      ? destinationElement.querySelector('.chess-piece').dataset.piece
      : null,
  });

  // Additional game state updates can go here
}

  //console.log("Move History:", JSON.stringify(this.moveHistory));

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

