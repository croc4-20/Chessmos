
const { default: ChessGame } = await import('./classPiece.js');
const { default: ChessBoard } = await import('./classBoard.js');

   const chessGame = new ChessGame();
  // createChessPieces();

const chessBoard = new ChessBoard();
   const chessPiece = new ChessPiece(type, color, row, col, imagePath, element);
  

export default class ChessPiece {
    constructor(type, color, row, col, imagePath, element) {
      this.type = type;
      this.color = color;
      this.row = row;
      this.col = col;
      //this.handleClick = this.handleClick.bind(this);
      //this.isWhiteTurn = true;
      this.imagePath = imagePath;
      switch (type) {
            case "pawn":
                this.element = elements.pawnElement;
                break;
            case "rook":
                this.element = elements.rookElement;
                break;
            case "knight":
                this.element = elements.knightElement;
                break;
            case "bishop":
                this.element = elements.bishopElement;
                break;
            case "queen":
                this.element = elements.queenElement;
                break;
            case "king":
                this.element = elements.kingElement;
                break;
            default:
                throw new Error("Invalid piece type");
        }
        this.element = elements[`${type}Element`];
    this.element.addEventListener('click', this.handleClick.bind(this));
      squareElement.appendChild(this.element);
      this.element.style.background  = `url(${imagePath})`;
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

const blackPawn0 = new ChessPiece("pawn", "black", 6, 0, "images/blackPAWN.png", pawnElement);
const blackPawn1 = new ChessPiece("pawn", "black", 6, 1, "images/blackPAWN.png", pawnElement);
const blackPawn2 = new ChessPiece("pawn", "black", 6, 2, "images/blackPAWN.png", pawnElement);
const blackPawn3 = new ChessPiece("pawn", "black", 6, 3, "images/blackPAWN.png", pawnElement);
const blackPawn4 = new ChessPiece("pawn", "black", 6, 4, "images/blackPAWN.png", pawnElement);
const blackPawn5 = new ChessPiece("pawn", "black", 6, 5, "images/blackPAWN.png", pawnElement);
const blackPawn6 = new ChessPiece("pawn", "black", 6, 6, "images/blackPAWN.png", pawnElement);
const blackPawn7 = new ChessPiece("pawn", "black", 6, 7, "images/blackPAWN.png", pawnElement);

const whitePawn0 = new ChessPiece("pawn", "white", 1, 0, "images/whitePAWN.png", pawnElement);
const whitePawn1 = new ChessPiece("pawn", "white", 1, 1, "images/whitePAWN.png", pawnElement);
const whitePawn2 = new ChessPiece("pawn", "white", 1, 2, "images/whitePAWN.png", pawnElement);
const whitePawn3 = new ChessPiece("pawn", "white", 1, 3, "images/whitePAWN.png", pawnElement);
const whitePawn4 = new ChessPiece("pawn", "white", 1, 4, "images/whitePAWN.png", pawnElement);
const whitePawn5 = new ChessPiece("pawn", "white", 1, 5, "images/whitePAWN.png", pawnElement);
const whitePawn6 = new ChessPiece("pawn", "white", 1, 6, "images/whitePAWN.png", pawnElement);
const whitePawn7 = new ChessPiece("pawn", "white", 1, 7, "images/whitePAWN.png", pawnElement);

const blackRook0 = new ChessPiece("rook", "black", 7, 0, "images/blackROOK.png", rookElement);
const blackRook1 = new ChessPiece("rook", "black", 7, 7, "images/blackROOK.png", rookElement);
const whiteRook0 = new ChessPiece("rook", "white", 0, 0, "images/whiteROOK.png", rookElement);
const whiteRook1 = new ChessPiece("rook", "white", 0, 7, "images/whiteROOK.png", rookElement);

const blackKnight0 = new ChessPiece("knight", "black", 7, 1, "images/blackKNIGHT.png", knightElement);
const blackKnight = new ChessPiece("knight", "black", 7, 6, "images/blackKNIGHT.png", knightElement);
const whiteKnight0 = new ChessPiece("knight", "white", 0, 1, "images/whiteKNIGHT.png", knightElement);
const whiteKnight = new ChessPiece("knight", "white", 0, 6, "images/whiteKNIGHT.png", knightElement);

const blackKing = new ChessPiece("king", "black", 7, 4, "images/blacKING.png", kingElement);
const whiteKing = new ChessPiece("king", "white", 0, 4, "images/whiteKING.png", kingElement);
    
const blackBishop0 = new ChessPiece("bishop", "black", 7, 2, "images/blackBISHOP.png", bishopElement);
const blackBishop = new ChessPiece("bishop", "black", 7, 5, "images/blackBISHOP.png", bishopElement);
const whiteBishop0 = new ChessPiece("bishop", "white", 0, 2, "images/whiteBISHOP.png", bishopElement);
const whiteBishop = new ChessPiece("bishop", "white", 0, 5, "images/whiteBISHOP.png", bishopElement);

const blackQueen = new ChessPiece("queen", "black", 7, 3, "images/blackQUEEN.png", queenElement);
const whiteQueen = new ChessPiece("queen", "white", 0, 3, "images/whiteQUEEN.png", queenElement);

this.addChessPiece(blackQueen);
this.addChessPiece(whiteQueen);

this.addChessPiece(blackKing);
this.addChessPiece(whiteKing);

this.addChessPiece(blackKnight0);
this.addChessPiece(blackKnight1);

this.addChessPiece(whiteKnight0);
this.addChessPiece(whiteKnight1);

this.addChessPiece(blackBishop0);
this.addChessPiece(blackBishop);

this.addChessPiece(whiteBishop0);
this.addChessPiece(whiteBishop);

this.addChessPiece(whiteRook0);
this.addChessPiece(whiteRook1);
this.addChessPiece(blackRook0);
this.addChessPiece(blackRook1);


this.addChessPiece(blackPawn0);
this.addChessPiece(blackPawn1);
this.addChessPiece(blackPawn2);
this.addChessPiece(blackPawn3);
this.addChessPiece(blackPawn4);
this.addChessPiece(blackPawn5);
this.addChessPiece(blackPawn6);
this.addChessPiece(blackPawn7);

this.addChessPiece(whitePawn0);
this.addChessPiece(whitePawn1);
this.addChessPiece(whitePawn2);
this.addChessPiece(whitePawn3);
this.addChessPiece(whitePawn4);
this.addChessPiece(whitePawn5);
this.addChessPiece(whitePawn6);
this.addChessPiece(whitePawn7);

}

    handleClick(pieceElement) 
    {
      console.log('piece clicked');
      // Check if it is the current player's turn to move
      if (this.isWhiteTurn !== (this.color === 'white')) 
      {
        // It is not the current player's turn, so do nothing
        return;
      }
      pieceElement.classList.add('selected-piece');
      // It is the current player's turn, so select the piece
      this.element.classList.add('selected-piece');
    this.selectedPiece = this;
    this.handlePieceSelection(this);
    }

    
createElement() {
    this.element = document.createElement("img");
    this.element.src = this.imagePath;
    this.element.classList.add("chess-piece");
    this.element.classList.add(`${this.color}-${this.type}`);
    pieceElement.style.backgroundImage = `url(images/${this.color}${this.type.charAt(0).toUpperCase()}${this.type.slice(1)}.png)`;
    this.element.addEventListener("click", (event) => {
        console.log("Piece clicked!");
    });
  }




    addChessPiece(type, color, row, col, imagePath, element) {
  const pieceElement = new ChessPiece(type, color, row, col, imagePath, element).element;
  const squareElement = document.getElementById(`square-${row}-${col}`);
  if(squareElement)
  {
  squareElement.appendChild(pieceElement);
}
}


    handlePieceSelection(selectedPiece, currentSquareElement) {
      // Highlight the selected piece
      selectedPiece.classList.add("selected");

      // Add event listeners to each square on the board
      const squares = document.querySelectorAll(".chess-square");
      squares.forEach(square => {
        square.addEventListener("click", function () {
          // Check if the move to the new square is legal
          if (board.isLegalMove(selectedPiece, this, currentSquareElement)) {
            // If the move is legal, move the piece to the new square
            this.appendChild(selectedPiece);

            // Deselect the piece
            deselectPiece(selectedPiece);
          } else {
            // If the move is not legal, display an error message
            console.log("Illegal move!");
          }
        });
      });
    }
 /*   createPieces() {
    // Create an array of all the chess piece types
    const pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

    // Create an array of all the chess piece colors
    const pieceColors = ['white', 'black'];

    // Create an empty array to store all the chess pieces
    const Pieces = [];

    // Loop through the piece types and colors
    for (let type of pieceTypes) {
        for (let color of pieceColors) {
            // Create a new chess piece and add it to the array
            Pieces.push(new Piece(type, color));
        }
    }

    // Loop through the chess pieces array and add each piece to the board
    for (let piece of Pieces) {
        addPiece(piece);
    }
}
*/
    //currentlySelectedPiece = null;

    selectPiece(pieceElement) {
      // Deselect any previously selected piece
      deselectPiece(currentlySelectedPiece);

      // Select the new piece
      currentlySelectedPiece = pieceElement;

      // Get the current square element
      const currentSquareElement = currentlySelectedPiece.parentElement;

      // Highlight the selected piece
      currentlySelectedPiece.classList.add("selected");

      // remove highlighting on the previously selected piece's valid squares
      if (previouslySelectedPiece) {
        removeHighlighting(previouslySelectedPiece);
      }

      // add highlighting on the new piece's valid squares
      highlightValidMoves(currentlySelectedPiece);

      // Other statements go here...

      // Step 1: Add event listeners to each piece on the board
      const pieces = document.querySelectorAll(".piece");
      chessPieces.forEach(piece => {
        piece.addEventListener("click", function () {
          selectPiece(piece);
        });
      });
    }

    deselectPiece(selectedPiece) {
      // Deselect the piece
      selectedPiece.classList.remove("selected");
      // Remove event listeners from each square on the board
      const chessSquares = document.querySelectorAll(".chess-square");
      chessSquares.forEach(square => {
        square.removeEventListener("click", function () {});
      });
    }
    highlightValidMoves(piece) {
      const validMoves = piece.getValidMoves();
      validMoves.forEach(([row, col]) => {
        const square = this.squareElements[row][col];
        square.classList.add('highlight');
      });
    }

    handleMove(event) {
      let isWhiteTurn; // Declare the isWhiteTurn variable
      let selectedPiece;

      // Check if the clicked element is a chess square
      if (event.target.classList.contains("chess-square")) {
        const selectedPiece = document.querySelector('.selected');

        // Get the current position of the selected piece
        const currentRow = Number(selectedPiece.id.split("-")[0]);
        const currentCol = Number(selectedPiece.id.split("-")[1]);

        // Get the clicked square's position
        const newRow = Number(event.target.id.split("-")[0]);
        const newCol = Number(event.target.id.split("-")[1]);

        // Check if the move is valid (add your own logic here)
        if (ChessBoard.isValidMove(currentRow, currentCol, newRow, newCol)) {
          // Update the board state
          board[newRow][newCol] = board[currentRow][currentCol];
          board[currentRow][currentCol] = null;

          // Update the DOM to reflect the new board state
          event.target.appendChild(selectedPiece);
          document.getElementById(`square-${currentRow}-${currentCol}`).innerHTML = "";

          // Increment the timer by 1 minute
          timer += 60;

          // Switch player turn
          let isWhiteTurn = !isWhiteTurn;
        }
      }
      selectedPiece.classList.remove("selected");

      // Remove event listeners from each square on the board
      const chessSquares = document.querySelectorAll(".chess-square");
      chessSquares.forEach(square => {
        square.removeEventListener("click", function () {});
      });
    }

    canAttack(piece, row, col, color) {
      // get the piece's type, color, and current position.
      let type = ChessPiece.type;
      let pieceRow = piece.row;
      let pieceCol = piece.col;

      // check if the piece can attack the square based on its type and color
      switch (type) {
        case 'pawn':
          // pawns can attack diagonally, one square ahead and to the left or right.
          if (color === 'white' && Math.abs(pieceRow - row) == 1 && Math.abs(pieceCol - col) == 1 && row < pieceRow) {
            return true;
          } else if (color === 'black' && Math.abs(pieceRow - row) == 1 && Math.abs(pieceCol - col) == 1 && row > pieceRow) {
            return true;
          }
          break;
        case 'rook':
          // rooks can attack horizontally or vertically, as long as there are no pieces blocking their path
          if (pieceRow == row || pieceCol == col) {
            // check for pieces blocking the rook's path.
            if (!isBlocked(piece, row, col)) {
              return true;
            }
          }
          break;
        case 'knight':
          // knights can attack squares that are two rows and one column, or two columns and one row away.
          if (Math.abs(pieceRow - row) == 2 && Math.abs(pieceCol - col) == 1 || Math.abs(pieceRow - row) == 1 && Math.abs(pieceCol - col) == 2) {
            return true;
          }
          break;
        case 'bishop':
          // bishops can attack diagonally, as long as there are no pieces blocking their path.
          if (Math.abs(pieceRow - row) == Math.abs(pieceCol - col)) {
            // check for pieces blocking the bishop's path
            if (!isBlocked(piece, row, col)) {
              return true;
            }
          }
          break;
        case 'queen':
          // queens can attack horizontally, vertically, or diagonally, as long as there are no pieces blocking their path
          if (pieceRow == row || pieceCol == col || Math.abs(pieceRow - row) == Math.abs(pieceCol - col)) {
            // check for pieces blocking the queen's path
            if (!isBlocked(piece, row, col)) {
              return true;
            }
          }
          break;
        case 'king':
          // kings can attack squares that are one row and one column away
          if (Math.abs(pieceRow - row) <= 1 && Math.abs(pieceCol - col) <= 1) {
            return true;
          }
          break;
      }

      // if none of the above conditions are met, the piece cannot attack the square
      return false;
    }

    isValidMove(currentPiece, currentRow, currentCol, newRow, newCol) {
      // get the type and color of the piece
      let type = currentPiece.type;
      let color = currentPiece.color;
      const piece = new chessPiece(pieceElement);
      // check if the piece can move to the new square based on its type and the rules of chess
      switch (type) {
        case 'pawn':
          // pawns can move forward one square, or forward two squares on their first move
          if (color == 'white') {
            if (newRow == currentRow - 1 && newCol == currentCol && !board[newRow][newCol]) {
              // move is valid
              return true;
            } else if (newRow == currentRow - 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow - 1][currentCol] && currentRow == 6) {
              // move is valid
              return true;
            }
          } else if (color == 'black') {
            if (newRow == currentRow + 1 && newCol == currentCol && !board[newRow][newCol]) {
              // move is valid
              return true;
            } else if (newRow == currentRow + 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow + 1][currentCol] && currentRow == 1) {
              // move is valid
              return true;
            }
          }
          break;
        case 'rook':
          // rooks can move horizontally or vertically, as long as there are no pieces blocking their path
          if (newRow == currentRow || newCol == currentCol) {
            // check for pieces blocking the rook's path
            if (!isBlocked(piece, newRow, newCol)) {
              // move is valid
              return true;
            }
          }
          break;
        case 'knight':
          // knights can move to squares that are two rows and one column, or two columns and one row away
          if (Math.abs(newRow - currentRow) == 2 && Math.abs(newCol - currentCol) == 1 || Math.abs(newRow - currentRow) == 1 && Math.abs(newCol - currentCol) == 2) {
            // move is valid
            return true;
          }
          break;
        case 'bishop':
          // bishops can move diagonally, as long as there are no pieces blocking their path
          if (Math.abs(newRow - currentRow) == Math.abs(newCol - currentCol)) {
            // check for pieces blocking the bishop's path
            if (!isBlocked(piece, newRow, newCol)) {
              // move is valid
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
          return false;
      }
      if (piece.isValidMove(currentRow, currentCol, newRow, newCol)) {
        return true;
      } else {
        return false;
      }
    }
    getType() {
      // returns the type of the piece (e.g. "pawn", "rook", etc.)
      return this.type;
    }

    getColor() {
      // returns the color of the piece (e.g. "white", "black")
      return this.color;
    }
    getKing(color) {
      // iterate over all of the squares on the board
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          // get the piece at the current square
          let piece = board.getBoard()[i][j];

          // if the piece is a king of the right color, return it
          if (piece && piece.type == 'king' && piece.color == color) {
            return piece;
          }
        }
      }
    }
    getPosition() {
      // returns the current position of the piece on the board as an array [row, col]
      return [this.row, this.col];
    }

    setPosition(row, col) {
      // sets the position of the piece on the board
      this.row = row;
      this.col = col;
    }
    playMoveSound() {
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

    playWrongSound() {
      // create an audio element for the wrong sound
      const audioElement = document.createElement('audio');
      audioElement.src = '/sounds/wrong.mp3';
      document.body.appendChild(audioElement);
      // play the sound
      audioElement.play();
    }
    checkGameOver() {
      // check if either player has no pieces left
      if (getNumWhitePieces() == 0 || getNumBlackPieces() == 0) {
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

    isLegalMove(piece, newSquare, board, currentSquare) 
    {
      // Get the piece's type (e.g. pawn, knight, etc.) and color
      const pieceType = piece.type;
      const pieceColor = piece.color;
      // Get the current and new square coordinates
      const currentSquareCoords = getSquareCoords(currentSquare);
      const newSquareCoords = getSquareCoords(newSquare);

      switch (pieceType) 
      {
        case "queen":
          // Queens can move diagonally, horizontally, or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            if (!isClearPath(board, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(board, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          return true;
        case "rook":
          // Rooks can move horizontally or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(board, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          break;
        case "bishop":
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            // Check if there are no pieces blocking the way
            if (isClearPath(board, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
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
            if (isSquareInCheck(board, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(board, rightSquare) || isSquareInCheck(board, newSquare)) {
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
            if (isSquareInCheck(board, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(board, leftSquare) || isSquareInCheck(board, newSquare)) {
              return false;
            }
            return true;
          }
        //break;
      }
    }
    isClearPath(board, currentRow, currentCol, newRow, newCol) 
    {
      // Check if the move is horizontal or vertical
      if (currentRow === newRow || currentCol === newCol) 
      {
        // Check if the path is clear along the row or column
        const start = Math.min(currentRow, newRow);
        const end = Math.max(currentRow, newRow);
        for (let i = start + 1; i < end; i++) 
        {
          if (board[i][currentCol]) 
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
          if (board[row][col]) 
          {
            return false;
          }
          row += rowStep;
          col += colStep;
        }
      }
      return true;
    } 
}
