let chessArray;
let handlePieceSelection;
const initialize = async () => {
  
  const { default: ChessPiece } = await import('./classPiece.js');
    console.log(ChessPiece);
    console.log(typeof ChessPiece);
  const { default: ChessBoard } = await import('./classBoard.js');
    console.log(ChessBoard);
    console.log(typeof ChessBoard);
  const { default: ChessArray } = await import('./classArray.js');
    console.log(ChessArray);
    console.log(typeof ChessArray);
    //chessArray = new ChessArray();
  
  
  console.log("Classes imported successfully");
  chessArray = new ChessArray(ChessGame);
  const chessBoard = new ChessBoard(ChessGame);
  const game = new ChessGame(chessArray, chessBoard, handlePieceSelection);
  
  window.chessPiece = class extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
    }
  };
  
  
 
  const type = ChessPiece.type;
  const color = ChessPiece.color;
  const row = ChessPiece.row;
  const col = ChessPiece.col;
  const imagePath = ChessPiece.imagePath;
  //const game = new ChessGame(chessArray, chessBoard, handlePieceSelection);
  window.ChessPiece = ChessPiece;
  const piece = new window.ChessPiece(type, color, row, col, imagePath, `'square-${row}-${col}'`, game);
  const elementId = `'square-${piece.row}-${piece.col}'`;
  piece.elementId = elementId;


  
 
  const squareElement = document.getElementById(piece.elementId);
  squareElement.innerHTML = `<div class="chess-piece ${piece.color}-${piece.type}"></div>`;
  squareElement.classList.add('has-piece');
  //squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${chessPiece.imagePath})`;
  squareElement.style.gridRow = piece.row + 1;
  squareElement.style.gridColumn = piece.col + 1;

  window.ChessBoard = ChessBoard;
 //window.ChessGame = ChessGame;
  window.ChessArray = ChessArray;


  }

initialize().then(() => {
 
  console.log('Chess game initialized!');
});
 

export default class ChessGame 
{
  constructor(chessArray, chessBoard, handlePieceSelection, game) 
  {
    
    this.chessArray = chessArray;
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.pieces = this.chessArray?.board?.pieces || {};
    this.selectedPiece = null;
    this.whitePieces = [];
    this.blackPieces = [];
    this.whiteCaptured = [];
    this.blackCaptured = [];
    this.currentPlayer = 'white';
    this.squares = document.querySelectorAll('.chess-square');

    this.validMoves = [];
    this.game = {  
      board: this.board,
      pieces: this.chessArray?.board?.pieces|| {},  // the ?. operator is used to ensure that this.chessArray.pieces is only accessed if this.chessArray is defined.
      id : this.id,
      status : 'ongoing',
      turn: this.player1Id
    };

        // Bind the context of this to the event listener function
    this.handlePieceSelection = this.handlePieceSelection.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);

  }

 

  startTimer(player) 
  {
  const timeLimit = this.timeLimit;
  let timeRemaining = timeLimit * 60; // convert minutes to seconds
  let timerId;

  // update the clock every second
  timerId = setInterval(() => {
    timeRemaining--;

    // update the clock display
    this.updateClock(player, timeRemaining);

    if (timeRemaining <= 0) {
      // player has run out of time, end the game
      clearInterval(timerId);
      this.endGame(player.opponent);
    }
  }, 1000);
}

  updateGameState(move) {
    const sourcePiece = move.sourcePiece;
    const targetPiece = move.targetPiece;

    // Check if a piece was captured
    if (targetPiece) {
      if (targetPiece.color === 'white') {
        this.whiteCaptured.push(targetPiece);
      } else {
        this.blackCaptured.push(targetPiece);
      }
    }

    // Switch the current player
    if (this.currentPlayer === 'white') {
      this.currentPlayer = 'black';
    } else {
      this.currentPlayer = 'white';
    }
  }

 handleMove(selectedPiece, row, col) {
  const currentRow = selectedPiece.row;
  const currentCol = selectedPiece.col;

  const newRow = row;
  const newCol = col;

  if (this.chessArray.board.isValidMove(currentRow, currentCol, newRow, newCol)) {
    const sourcePiece = this.chessArray.board[currentRow][currentCol];
    const targetPiece = this.chessArray.board[newRow][newCol];

    if (targetPiece) {
      if (targetPiece.color === 'white') {
        this.whiteCaptured.push(targetPiece);
      } else {
        this.blackCaptured.push(targetPiece);
      }
    }

    this.chessArray.board[newRow][newCol] = sourcePiece;
    this.chessArray.board[currentRow][currentCol] = null;

    const targetSquare = document.getElementById(`square-${newRow}-${newCol}`);
    targetSquare.appendChild(selectedPiece.element);

    const sourceSquare = document.getElementById(`square-${currentRow}-${currentCol}`);
    sourceSquare.innerHTML = "";

    this.timer += 60;
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';

    const isWhiteTurn = this.currentPlayer === 'white';
    if (this.chessArray.board.isCheck(isWhiteTurn)) {
      console.log(`${this.currentPlayer} is in check`);
    }

    const isBlackTurn = this.currentPlayer === 'black';
    if (this.chessArray.board.isCheckmate(isBlackTurn)) {
      console.log(`${this.currentPlayer} wins by checkmate!`);
    }
  }

  selectedPiece.element.classList.remove("selected");
}


handlePieceSelection(row, col) {
  const selectedPiece = this.board[row][col];

  // If no piece is selected, or if the selected piece belongs to the opponent, do nothing
  if (!selectedPiece || selectedPiece.color !== this.currentPlayer) {
    return;
  }

  // If the selected piece is already the currently selected piece, deselect it
  if (this.currentlySelectedPiece === selectedPiece) {
    this.currentlySelectedPiece = null;
    this.unhighlightSquares();
  } else {
    // If a new piece is selected, update the currentlySelectedPiece and highlight the valid moves
    this.currentlySelectedPiece = selectedPiece;

    // Replace this block with the following line
    const validMoves = this.currentlySelectedPiece.calculateValidMoves(row, col, this.board);

    this.highlightSquares(validMoves);
  }
}
 
  
startNewGame() 
  {

    chessBoard.setupEventListeners();
      // If the game is already over, display a message and return
    if (this.checkGameOver()) 
    {
      alert("The game is already over. Please start a new game.");
      return;
    }

      // Reset the board to the starting position
    this.pieceArray.createPieces();
    this.pieceArray.addPiecesToBoard();
    this.chessBoard = new ChessBoard();
    this.chessBoard.placePieces();
    this.whiteTurn = true;
    this.selectedPiece = null;
    this.checkGameOver = () => {};

    squares.forEach(square => square.innerHTML = "");
    this.chessBoard.placePieces();
    const squares = document.querySelectorAll('.chess-square');
  }
  
   handleSquareClick(square) {
    // Check if a piece is already selected
    console.log("handleSquareClick called");
    if (this.selectedPiece) {
      // Check if the clicked square is a legal move for the selected piece
      if (this.legalMoves.includes(square)) {
        // Move the selected piece to the clicked square
        square.appendChild(this.selectedPiece);
        // Clear the selected piece and legal moves
        this.selectedPiece = null;
        this.legalMoves = [];
        // End the player's turn
        this.endTurn();
      }
    } else {
      // Check if the square contains a piece
      if (square.firstElementChild) {
        // Highlight the clicked square
        square.classList.add('selected');
        // Store the selected piece
        this.selectedPiece = square.firstElementChild;
        // Calculate the legal moves for the selected piece
        this.legalMoves = this.getLegalMoves(this.selectedPiece);
        // Highlight the legal moves
        this.legalMoves.forEach(move => {
          move.classList.add('legal-move');
        });
      }
    }
  }

 
    getLegalMoves(piece) {
    let legalMoves = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        if (this.isLegalMove(pieceRow, pieceCol, row, col) && this.isClearPath(pieceRow, pieceCol, row, col)) {
          legalMoves.push([row, col]);
        }
      }
    }
    return legalMoves;
  }
  

  endTurn() {
    // Code to end the player's turn
  }

deselectPiece(selectedPiece) {
    selectedPiece.classList.remove("selected");
    this.currentSquareElement = null;
  }


  highlightSquare(squareElement) 
  {
    // Check if the clicked square is occupied by a piece
    if (squareElement.children.length > 0) 
    {
      // Get the piece element
      const pieceElement = squareElement.children[0];

      // Check if the piece is the correct color (based on the current player turn)
      if (this.isWhiteTurn && pieceElement.classList.contains('white') || !this.isWhiteTurn && pieceElement.classList.contains('black')) 
      {
        // Deselect the previously selected piece (if there was one)
        if (this.selectedPiece) 
        {
          this.selectedPiece.classList.remove('highlight');
        }

        // Add the 'highlight' class to the square element
        squareElement.classList.add('highlight');

        // Update the selected piece
        this.selectedPiece = squareElement;
        console.log(chessPiece);
      }
    }
  }

clearSelectedSquares() 
{
    const selectedSquares = document.querySelectorAll('.selected-piece');
    selectedSquares.forEach(square => square.classList.remove('selected-piece'));
}

  isLegalMove(chessPiece, newSquare) 
    {
      // Get the piece's type (e.g. pawn, knight, etc.) and color
      const pieceType = piece.type;
      const pieceColor = piece.color;
      // Get the current and new square coordinates
      const currentRow = parseInt(chessPiece.row);
      const currentCol = parseInt(chessPiece.col);
      const newRow = parseInt(newSquare.getAttribute('data-row'));
      const newCol = parseInt(newSquare.getAttribute('data-col'));

      switch (pieceType) 
      {
        case "queen":
          // Queens can move diagonally, horizontally, or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          return true;
        case "rook":
          // Rooks can move horizontally or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          break;
        case "bishop":
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            // Check if there are no pieces blocking the way
            if (isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              // The move is legal
              return true;
            }
          }

          // The move is not legal
          return false;

        case "knight":
          // Knights can move in an L-shaped pattern (two squares in one direction, and one square in the other)
          return Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === 2 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1 || Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === 1 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 2;
        case "pawn":
          // Pawns can only move forward one square, unless it is their first move and they are allowed to move two squares
          // They can also capture pieces diagonally
          if (pieceColor === "white") {
            // White pawns can only move forward
            if (newSquareCoords[0] === currentSquareCoords[0] - 1) {
              // Check if the pawn is moving straight ahead
              if (newSquareCoords[1] === currentSquareCoords[1]) {
                // Check if the square is unoccupied
                if (!getPieceOnSquare(newSquare)) {
                  return true;
                }
              }
              // Check if the pawn is capturing a piece
              if (Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1) {
                // Check if the square is occupied by an enemy piece
                const enemyPiece = getPieceOnSquare(newSquare);
                if (enemyPiece && enemyPiece.classList[1] !== pieceColor) {
                  return true;
                }
              }
            }
            // Check if the pawn is making a double move (on their first move only)
            // Black pawns can only move backwards
            if (newSquareCoords[0] === currentSquareCoords[0] + 1) {
              // Check if the pawn is moving straight ahead
              if (newSquareCoords[1] === currentSquareCoords[1]) {
                // Check if the square is unoccupied
                if (!getPieceOnSquare(newSquare)) {
                  return true;
                }
              }
              // Check if the pawn is capturing a piece
              if (Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1) {
                // Check if the square is occupied by an enemy piece
                const enemyPiece = getPieceOnSquare(newSquare);
                if (enemyPiece && enemyPiece.classList[1] !== pieceColor) {
                  return true;
                }
              }
            }
            // Check if the pawn is making a double move (on their first move only)
            if (newSquareCoords[0] === currentSquareCoords[0] + 2 && newSquareCoords[1] === currentSquareCoords[1] && !piece.hasMoved) {
              // Check that there are no pieces blocking the move
              const squareInBetween = document.getElementById(`square-${currentSquareCoords[0] + 1}-${currentSquareCoords[1]}`);
              if (!getPieceOnSquare(squareInBetween)) {
                return true;
              }
            }
            break;
          }
        default:
        case "king":
          // Kings can move one square in any direction
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) <= 1 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) <= 1) {
            return true;
          }
          // Kings can also castle (move two squares towards the rook) if certain conditions are met
          if (newSquareCoords[1] === currentSquareCoords[1] + 2 && !piece.hasMoved) {
            // Check that there are no pieces between the king and the rook
            const rightSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] + 1}`);
            const rookSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] + 3}`);
            if (getPieceOnSquare(rightSquare) || getPieceOnSquare(rookSquare)) {
              return false;
            }
            // Check that the rook has not moved
            const rook = getPieceOnSquare(rookSquare);
            if (rook && rook.hasMoved) {
              return false;
            }
            // Check that the king is not in check
            if (isSquareInCheck(chessBoard, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(chessBoard, rightSquare) || isSquareInCheck(chessBoard, newSquare)) {
              return false;
            }
            return true;
          }
          if (newSquareCoords[1] === currentSquareCoords[1] - 2 && !piece.hasMoved) {
            // Check that there are no pieces between the king and the rook
            const leftSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] - 1}`);
            const rookSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] - 4}`);
            if (getPieceOnSquare(leftSquare) || getPieceOnSquare(rookSquare)) {
              return false;
            }
            // Check that the rook has not moved
            const rook = getPieceOnSquare(rookSquare);
            if (rook && rook.hasMoved) {
              return false;
            }
            // Check that the king is not in check
            if (isSquareInCheck(chessBoard, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(chessBoard, leftSquare) || isSquareInCheck(chessBoard, newSquare)) {
              return false;
            }
            return true;
          }
        //break;
      }
    }

isPlayerTurn(currentPlayer)
{
let isPlayerTurn = true; // to keep track of whose turn it is to play
const squares = document.querySelectorAll('.chess-square');

squares.forEach(square => 
{
  square.addEventListener('click', event => 
  {
    // Check if it's the player's turn
    if (!isPlayerTurn) 
    {
      return;
    }

    // Check if the square contains a piece
    if (event.target.firstElementChild) 
    {
      // Highlight the clicked square
      square.classList.add('highlighted');

      // Get the legal moves for the piece
      const legalMoves = isLegalMoves(square);

      // Highlight the legal moves
      legalMoves.forEach(move => {
        move.classList.add('legal-move');
      });
    } else {
      // Check if the square is a legal move
      if (!square.classList.contains('legal-move')) {
        return;
      }

      // Move the piece to the square
      square.appendChild(/* ... */);

      // Unhighlight all squares
      squares.forEach(sq => {
        sq.classList.remove('highlighted', 'legal-move');
      });

      // End the player's turn
      endTurn();
    }
  });
});
}
endTurn() {
  this.isPlayerTurn = !this.isPlayerTurn;
}
isClearPath(chessBoard, currentRow, currentCol, newRow, newCol) 
    {
      // Check if the move is horizontal or vertical
      if (currentRow === newRow || currentCol === newCol) 
      {
        // Check if the path is clear along the row or column
        const start = Math.min(currentRow, newRow);
        const end = Math.max(currentRow, newRow);
        for (let i = start + 1; i < end; i++) 
        {
          if (chessBoard[i][currentCol]) 
          {
            return false;
          }
        }
      } else {
        // The move is diagonal
        // Check if the path is clear along the diagona
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newCol - currentCol);
        if (rowDiff !== colDiff) 
        {
          // The move is not diagonal
          return false;
        }
        const rowStep = (newRow - currentRow) / rowDiff;
        const colStep = (newCol - currentCol) / colDiff;
        let row = currentRow + rowStep;
        let col = currentCol + colStep;
        while (row !== newRow && col !== newCol) 
        {
          if (chessBoard[row][col]) 
          {
            return false;
          }
          row += rowStep;
          col += colStep;
        }
      }
      return true;
    } 

    getKing(color) {
        // iterate over all of the squares on the board
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // get the piece at the current square
          let piece = chessBoard.getBoard()[i][j];

            // if the piece is a king of the right color, return it
          if (piece && piece.type == 'king' && piece.color == color) {
            return piece;
          }
        }
      }
    }

 checkGameOver() 
    {
        // check if either player has no pieces left
      if (getNumWhitePieces() == 0 || getNumBlackPieces() == 0) 
      {
        return true;
      }

        // check if either player is in checkmate
      if (isCheckmate('white') || isCheckmate('black')) {
        return true;
      }

        // check if the game is a draw (e.g., insufficient material to checkmate)
      if (isDraw()) {
        return true;
      }

      // if none of the above conditions are met, the game is not over
      return false;
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

    
    
}



