let chessArray;
let chessBoard;
let handlePieceSelection;
let game;


 const validPieceTypes = ["king", "queen", "rook", "bishop", "knight", "pawn"];

  async function defineExtendedPiece() {
  const { default: ChessPiece } = await import('./classPiece.js');

  class ExtendedPiece extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
    }
  }

  window.ChessPiece = ExtendedPiece;
}

await defineExtendedPiece();
  

async function initialize(game, pieces) 
{
  await defineExtentedPiece();
  const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js');

  console.log("Classes imported successfully");

  window.ChessBoard = ChessBoard;
  window.ChessGame = ChessGame;
  window.ChessArray = ChessArray;
      // Initialize the game objects using the imported classes
  const chessArray = new ChessArray();
  const chessBoard = new ChessBoard(game, ChessPiece, pieces);
  const chessGame = new ChessGame(chessArray, chessBoard, handlePieceSelection);

      // Attach event listeners
   chessBoard.squareElements.forEach((square) => {
    square.addEventListener("click", chessBoard.handleSquareClick);
  });

   //chessBoard.setupInitialPosition(chessBoard, pieces, game, chessArray);
  return { chessArray, chessBoard, chessGame };
}

  

export default class ChessBoard
{
  constructor(game, ChessPiece, pieces) 
  {
    this.chessPieces = [];
    this.squareElements = Array.from(document.querySelectorAll(".chess-square"));
    this.moveHistory = [];
    this.currentPlayer = "white";
    this.gameStatus = "active";
    this.board = [];

    this.boardElement = document.getElementById('chessboard'); // Set boardElement here
    this.pieces = pieces;
    this.currentlySelectedPiece = null;
    this.game = game;
    this.ChessPiece = ChessPiece;
    // this.setupInitialPosition(pieces);
    //this.createBoard();
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.initializeBoard();
    
  }
  // Initialize the board with pieces in their starting position

   initializeBoard() {
   this.game = 
   {
    board: [] 
  };
    
    // create a 2D array to represent the board
    for (let row = 0; row < 8; row++) {
      this.game.board[row] = [];
      for (let col = 0; col < 8; col++) {
        this.game.board[row][col] = null;
        console.log("Initial board state:", this.game.board);
      }

      
     }

    // Add black pieces
  this.game.board[7][0] = new window.ChessPiece("rook", "black", 7, 0, "images/blackROOK.png", "square-7-0", this);
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
  this.renderBoard(this.game.board);
  this.registerSquareClickHandlers();
  console.log("Board initialization completed.");
}

renderBoard(board) {
  console.log("Rendering the board...");
  console.log("Game board:", board);
  const boardContainer = document.getElementById("chessboard");
  boardContainer.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("chess-square");
      square.id = `square-${row}-${col}`;
      square.dataset.row = row;
      square.dataset.col = col;

      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
      }

      if (this.game.board[row][col] !== null) {
        const piece = document.createElement("img");
        piece.src = this.game.board[row][col].imagePath;
        piece.classList.add("chess-piece");
        square.appendChild(piece);
      }

      boardContainer.appendChild(square);
    }
  }console.log("Board rendering completed.");
}

registerSquareClickHandlers() {
  this.squareElements.forEach((squareElement) => {
    squareElement.addEventListener("click", this.handleSquareClick.bind(this));
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
    game.addPiece(newChessPiece);
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
    this.placePiece(chessPiece);
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

clearValidMoves() {
  const highlightedSquares = document.querySelectorAll(".chess-square.valid-move");
  highlightedSquares.forEach(square => {
    square.classList.remove("valid-move");
  });
}



async handleSquareClick(event) {
  console.log("handleSquareClick called");
  const clickedSquare = event.target.closest(".chess-square");
  const clickedSquareRow = parseInt(clickedSquare.dataset.row);
  const clickedSquareCol = parseInt(clickedSquare.dataset.col);
  console.log("Parsed clickedSquareRow:", clickedSquareRow);
console.log("Parsed clickedSquareCol:", clickedSquareCol);
  const clickedPiece = this.game.board[clickedSquareRow][clickedSquareCol];

  console.log('clickedSquare:', clickedSquare);
  console.log('clickedSquareRow:', clickedSquareRow);
  console.log('clickedSquareCol:', clickedSquareCol);
  console.log('clickedPiece:', clickedPiece);
  console.log("Target square ID before movePiece:", clickedSquare.id);
  console.log("Game board before movePiece:", this.game.board);

  console.log("Handling square click event. Target:", event.target);

  if (this.currentlySelectedPiece === null) {
    if (clickedPiece !== null && clickedPiece.color === this.currentPlayer) {
      this.currentlySelectedPiece = clickedPiece;
      if (this.currentPlayer === clickedPiece.color) {
        this.currentlySelectedPiece.element.classList.add("selected-piece");
        this.currentlySelectedPiece.showValidMoves(this.currentlySelectedPiece);
      }
    }
  } else {
    if (this.currentlySelectedPiece.row === clickedSquareRow && this.currentlySelectedPiece.col === clickedSquareCol) {
      this.currentlySelectedPiece.element.classList.remove("selected");
      this.clearValidMoves();
      this.currentlySelectedPiece = null;
    } else {
      const moveResult = this.movePiece(clickedSquare);

      if (moveResult) {
        this.currentlySelectedPiece.element.classList.remove("selected-piece");
        this.currentlySelectedPiece = null;
        console.log("Game board after movePiece:", this.game.board);
      } else {
        this.currentlySelectedPiece.element.classList.remove("selected-piece");
        this.clearValidMoves();
        this.currentlySelectedPiece = null;
      }
    }
  }
}


resetBoardColors() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.getElementById(`square-${row}-${col}`);
      square.classList.remove("light", "dark");
      if ((row + col) % 2 === 0) {
        square.classList.add("dark");
      } else {
        square.classList.add("light");
      }
    }
  }
}


  
  removePiece(row, col) {
  // Get the piece at the specified position on the board
  const chessPieces = this.chessBoard[row][col];

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
            return chessPieces;
        }
    }
    return null;
  }

 checkGameStatus() {
      if (checkGameOver()) {
        // game is over
        // do something here to end the game (e.g., display a message or redirect to a game over screen)
      } else {
          // game is not over
          // continue playing the game as normal
        }
    }


  movePiece(targetSquare) {

  const targetRow = parseInt(targetSquare.dataset.row);
  const targetCol = parseInt(targetSquare.dataset.col);
  const targetPosition = ((targetRow - 1) * 8) + (targetCol - 1);
  const validMoves = this.currentlySelectedPiece.calculateValidMoves(this.currentlySelectedPiece.row, this.currentlySelectedPiece.col, this.board);

  console.log("Moving from:", this.currentlySelectedPiece.row, this.currentlySelectedPiece.col);
  console.log("Moving to:", targetRow, targetCol);
  console.log("Valid moves:", validMoves);



  const targetElement = document.getElementById(targetSquare.id);
  console.log('Target element:', targetElement.id);
   console.log("Target element DOM before appending piece:", targetElement.innerHTML);

    // Check if the move is valid
  if (!validMoves.some(move => move.row === targetRow && move.col === targetCol)) {
    alert("Invalid move");
    return;
  }

   // Store original row and col before updating
  const originalRow = this.currentlySelectedPiece.row;
  const originalCol = this.currentlySelectedPiece.col;

    // Move the piece on the board
  this.board[this.currentlySelectedPiece.row][this.currentlySelectedPiece.col] = null;
  this.board[targetRow][targetCol] = this.currentlySelectedPiece;

    // Update the piece's position
  this.currentlySelectedPiece.row = targetRow;
  this.currentlySelectedPiece.col = targetCol;

    // Move the piece on the board visually
  console.log("Target element DOM after appending piece:", targetElement.innerHTML);
  Array.from(targetElement.children).forEach(child => 
  {
    if (child.classList.contains("pattern")) 
    {
      targetElement.removeChild(child);
    }
  });

    // Reset board colors
  this.resetBoardColors();

    // Remove the "selected" and "has-piece" classes from the source square
  const sourceSquare = document.getElementById(`square-${originalRow}-${originalCol}`);
  sourceSquare.classList.remove("selected-piece", "has-piece");
  
  // Update the data-row and data-col attributes of the square element
this.currentlySelectedPiece.row = targetRow;
this.currentlySelectedPiece.col = targetCol;


  // Move the piece on the board visually
this.currentlySelectedPiece.element.style.gridRow = targetRow + 1;
this.currentlySelectedPiece.element.style.gridColumn = targetCol + 1;

   // Update player turn
this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
this.game.currentPlayer = this.currentPlayer;
this.game.checkGameStatus();

    // Clear valid moves
this.clearValidMoves();

  // Update move history
  this.moveHistory.push({
    piece: this.currentlySelectedPiece,
    from: this.currentlySelectedPiece.position,
    to: targetPosition,
  });

    // Deselect the piece
  this.currentlySelectedPiece.element.classList.remove("selected-piece");
  this.currentlySelectedPiece = null;

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

  isCheckmate(color) 
  {
    // logic for checking if the specified color is in checkmate
  }

  isDraw() 
  {
      // check if there are only kings left on the board
    if (getNumWhitePieces() == 1 && getNumBlackPieces() == 1) 
    {
      return true;
    }
      // check if there are only kings and bishops left on the board
    if (getNumWhitePieces() == 2 && getNumBlackPieces() == 2) 
    {
        // check that each player has one bishop
      if (getNumWhiteBishops() == 1 && getNumBlackBishops() == 1) 
      {
        return true;
      }
    }
      // if none of the above conditions are met, the game is not a draw
    return false;
  }

  getNumBlackBishops() {
    let numBlackBishops = 0;

    // Iterate through the board array
    for (let i = 0; i < this.chessBoard.length; i++) {
      for (let j = 0; j < this.chessBoard[i].length; j++) {
        // Check if the current element is a black bishop
        if (this.chessBoard[i][j] instanceof Bishop && this.chessBoard[i][j].color === 'black') {
          // Increment the counter
          numBlackBishops++;
        }
      }
    }

    return numBlackBishops;
  }

  getNumWhiteBishops() {
    let numWhiteBishops = 0;

    // Iterate through the board array
    for (let i = 0; i < this.chessBoard.length; i++) {
      for (let j = 0; j < this.chessBoard[i].length; j++) {
        // Check if the current element is a white bishop
        if (this.chessBoard[i][j] instanceof Bishop && this.chessBoard[i][j].color === 'white') {
          // Increment the counter
          numWhiteBishops++;
        }
      }
    }

    return numWhiteBishops;
  }

  getNumBlackPieces() {
    // Initialize a counter to 0
    let numBlackPieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.chessBoard.length; i++) {
      for (let j = 0; j < this.chessBoard[i].length; j++) {
        // Check if the current element is a black piece
        if (this.chessBoard[i][j] && this.chessBoard[i][j].color === 'black') {
          // Increment the counter
          numBlackPieces++;
        }
      }
    }

    return numBlackPieces;
  }

  getNumWhitePieces() 
  {
      // Initialize a counter to 0
    let numWhitePieces = 0;

      // Iterate through the board array
    for (let i = 0; i < this.chessBoard.length; i++) 
    {
      for (let j = 0; j < this.chessBoard[i].length; j++) 
      {
          // Check if the current element is a white piece
        if (this.chessBoard[i][j] && this.chessBoard[i][j].color === 'white') 
        {
            // Increment the counter
          numWhitePieces++;
        }
      }
    }

    // Return the number of white pieces
    return numWhitePieces;
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
  isPlayerTurn = !isPlayerTurn;
    this.selectedPiece = null;
}

  highlightLegalMoves(fromRow, fromCol) {
    const legalMoves = this.chessBoard.getLegalMoves(fromRow, fromCol);
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



updateGameState(pieceElement, destinationElement) {
  // Call movePiece method to handle the move logic
  this.movePiece(destinationElement);

  // Update the history of moves
  this.moveHistory.push({
    piece: pieceElement.dataset.piece,
    from: {
      row: Math.floor(fromIndex / 8),
      col: fromIndex % 8
    },
    to: {
      row: Math.floor(toIndex / 8),
      col: toIndex % 8
    },
    captured: destinationElement.firstElementChild
      ? destinationElement.firstElementChild.dataset.piece
      : null,
  });

  // Check if the game is over (e.g., checkmate, stalemate, etc.)
  if (this.isCheckmate()) {
    this.gameStatus = "checkmate";
    this.announceWinner();
  } else if (this.isStalemate()) {
    this.gameStatus = "stalemate";
    this.announceDraw();
  }
}

announceWinner() {
  const message = `Checkmate! ${this.currentPlayer} wins!`;
  alert(message);
}

announceDraw() {
  const message = `Stalemate. The game is a draw.`;
  alert(message);
}

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

