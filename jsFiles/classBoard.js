const { default: ChessPiece } = await import('./classPiece.js');
const { default: ChessGame } = await import('./classGame.js');


export default class ChessBoard 
{
  constructor() 
  {
    this.chessPieces = [];
    this.squareElements = new Array(8).fill().map(() => new Array(8).fill(null));
    this.chessBoard = [
    [{color: 'white', type: 'rook'}, {color: 'white', type: 'knight'}, {color: 'white', type: 'bishop'}, {color: 'white', type: 'queen'}, {color: 'white', type: 'king'}, {color: 'white', type: 'bishop'}, {color: 'white', type: 'knight'}, {color: 'white', type: 'rook'}],
    [{color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [{color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}],
    [{color: 'black', type: 'rook'}, {color: 'black', type: 'knight'}, {color: 'black', type: 'bishop'}, {color: 'black', type: 'queen'}, {color: 'black', type: 'king'}, {color: 'black', type: 'bishop'}, {color: 'black', type: 'knight'}, {color: 'black', type: 'rook'}]
  ];
    this.chessBoard.forEach((row, i) => {
      row.forEach((square, j) => {
        if (square) {
          const ChessPiece = createChessPiece(square, i, j);
          this.addPiece(chessPiece);
        }
      });
    });
  
    
   
    this.currentlySelectedPiece = null;
    this.placePieces();
    this.createBoard();
    this.displayBoard();
    this.addChessPiece(whitePawn0);
    this.addEventListeners();
    this.handleClick = this.handleClick.bind(this);
    //this.chessPiece = new ChessPiece(type, color, row, col, imagePath, element);
    this.game = new ChessGame();
    //const chessPiece = require('./classPiece.js');

  }

createPiece = (square, i, j) => {
  const { color, type } = square;
  const imagePath = `images/${color}${type.charAt(0).toUpperCase()}${type.slice(1)}.png`;
  const element = document.getElementById(`square-${i}-${j}`);
  return new ChessPiece(type, color, i, j, imagePath, element);
}

  setPieceAttributes(inputColor, inputType, inputRow, inputCol, inputImagePath, inputElement) {
    this.color = inputColor;
    this.type = inputType;
    this.row = inputRow;
    this.col = inputCol;
    this.imagePath = inputImagePath;
    this.element = inputElement;
}

addPiece(type, color, row, col, imagePath, element) {
    // Create the Piece object and add it to the pieces array
 
    const chessPiece = new ChessPiece(type, color, row, col, imagePath, element);
    this.chessPieces.push(chessPiece);

    // Update the board array with the new piece
    this.board[row][col] = chessPiece;

    // Create an <img> element for the piece
    const img = document.createElement("img");
    img.src = imagePath;

    // Append the <img> element to the element for the square
    element.appendChild(img);
}



  handleClick(event) 
  {
    // Do something with the event object
    console.log(event);
  }
  handleSquareClick(squareElement) 
  {
    // Check if a piece is selected
    if (!this.currentlySelectedPiece) 
    {
      // No piece is selected, so do nothing
      return;
    }
    const toRow = parseInt(squareElement.dataset.row);
    const toCol = parseInt(squareElement.dataset.col);

    // Get the row and column of the selected piece
    const fromRow = parseInt(currentlySelectedPiece.parentElement.dataset.row);
    const fromCol = parseInt(currentlySelectedPiece.parentElement.dataset.col);

    // Attempt to move the piece to the clicked square
    if (board.movePiece(fromRow, fromCol, toRow, toCol)) 
    {
      // The move was successful, so update the current turn
      this.isWhiteTurn = !this.isWhiteTurn;
    }

    // Deselect the piece
    currentlySelectedPiece = null;
  }

  placePieces() 
  {

   
    for (let i = 0; i < 8; i++) 
    {
      for (let j = 0; j < 8; j++) 
      {
        const square = this.board[i][j];
        if (square && square !== ' ') 
        {
          const color = square.color;
          const type = square.type;
          const imagePath = `images/${color}${type.charAt(0).toUpperCase()}${type.slice(1)}.png`;
          const element = this.squareElements[i][j];
          if (element) 
          {
          const chessPiece = new ChessPiece(type, color, row, col, imagePath, element);
          this.addPiece(chessPiece);
          }
        }
      }
    }
}
  removePiece(row, col) {
  // Get the piece at the specified position on the board
  const piece = this.getPiece(row, col);

  // If there is a piece at the specified position...
  if (piece) {
    // Remove the piece from the pieces array
    const index = this.pieces.indexOf(piece);
    this.pieces.splice(index, 1);

    // Remove the piece's element from the square element
    const squareElement = this.squareElements[row][col];
    squareElement.innerHTML = '';
  }
}

  getPiece(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }
    for(let i = 0; i < this.pieces.length; i++) {
        const piece = this.pieces[i];
        if(piece.row === row && piece.col === col) {
            return piece;
        }
    }
    return null;
  }


  movePiece(pieceElement, destinationElement) 
  {
    const currentSquareElement = pieceElement.parentElement;
    // Check if the destination element is a valid square
    if (destinationElement && destinationElement.classList.contains("chess-square")) 
    {
      // Get the current square element

      // Check if the current square element is a valid square
      if (currentSquareElement && currentSquareElement.classList.contains("chess-square")) 
      {
        // Check if the move is legal (e.g., using chess rules)
        if (this.isLegalMove(pieceElement, currentSquareElement, destinationElement)) 
        {
          // Check if the move is valid (e.g., not putting oneself in check)
          if (this.isValidMove(pieceElement, currentSquareElement, destinationElement)) 
          {
            const capturedPiece = destinationElement.firstElementChild;
            if (capturedPiece) 
            {
              // Play the capture sound
              this.playCaptureSound();
            } else {
              // Play the move sound
              this.playMoveSound();
            }
            // Move the piece to the new square
            destinationElement.appendChild(pieceElement);
            currentSquareElement.innerHTML = "";
            // Update the game state
            this.updateGameState(pieceElement, destinationElement);
          } else {
            console.error('Error: Invalid move');
          }
        } else {
          console.error('Error: Illegal move');
        }
      } else {
        console.error('Error: Current square is invalid');
      }
    } else {
      console.error('Error: Destination square is invalid');
    }
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
    this.createBoard();
    this.displayBoard();
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
  getNumBlackBishops() 
  {
    let getNumBlackPieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
      return numWhitePieces;
    }
  }

  getNumWhiteBishops() {
    let getNumWhiteBishops = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
      return numWhitePieces;
    }
  }
  getNumBlackPieces() {
    // Initialize a counter to 0
    let getNumBlackPieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
    }
    return numWhitePieces;
  }
  getNumWhitePieces() {
    // Initialize a counter to 0
    let numWhitePieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        // Check if the current element is a white piece
        if (this.board[i][j] === 'W') {
          // Increment the counter
          numWhitePieces++;
        }
      }
    }

    // Return the number of white pieces
    return numWhitePieces;
  }
  generateBoardHTML() {
    // Create an empty string to store the HTML for the board
    let boardHTML = '';

    // Loop through the rows and columns of the board
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // Generate HTML for the square
        boardHTML += `<div class="chess-square ${(i + j) % 2 == 0 ? 'white' : 'black'}" id="square-${i}-${j}"></div>`;

        // Get the piece at the current position on the board
        const piece = this.pieces.find(piece => piece.position.row === i && piece.position.col === j);

        // If there is a piece at the current position, generate HTML for it and append it to the square
        if (piece) {
          boardHTML += `<div class="${piece.color}-${piece.type}" id="piece-${i}-${j}"></div>`;
        }
      }
    }

    // Append the generated HTML to the #chessboard element
    const boardElement = document.getElementById('chessboard');
    boardElement.innerHTML = boardHTML;
  }
  createChessBoard() {
    const chessBoard = document.createElement('div');
    chessBoard.classList.add('chess-board');

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `square-${row}-${col}`;

            if ((row + col) % 2 === 0) {
                square.classList.add('white-square');
            } else {
                square.classList.add('black-square');
            }

            const piece = getPieceAtPosition(row, col);
            if (chessPiece) {
                const imagePath = document.createElement('img');
                imagePath.src = `images/${piece.name}.png`;
                imagePath.classList.add('chess-piece');
                square.appendChild(pieceImg);
            }

            chessBoard.appendChild(square);
        }
    }

    document.body.appendChild(chessBoard);
}

/*getPieceAtPosition(row, col) {
    // This function would typically retrieve the piece at the given position from the game state
    // For this example, we'll just place a few pieces on the board for demonstration purposes
    if (row === 0 && col === 0) {
        return { name: 'rook', color: 'white' };
    } else if (row === 0 && col === 1) {
        return { name: 'knight', color: 'white' };
    } else if (row === 0 && col === 2) {
        return { name: 'bishop', color: 'white' };
    } else {
        return null;
    }
}*/

  displayBoard() {
    // Get a reference to the HTML element that represents the board
    const boardElement = document.getElementById("chessboard");
    boardElement.innerHTML = '';
    // Create a 2D array to store the square elements

    // Loop through the rows and columns of the board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Get the current piece at this position on the board
        const piece = this.getPiece(row, col);

        // If there is a piece at this position...
        if (piece) {
          // Create a new HTML element for the piece
          const squareElement = document.createElement("div");
          squareElement.classList.add(`chess-square ${(row + col) % 2 === 0 ? 'white' : 'black'}`);

            // Create an img element
          const img = document.createElement("img");
          // Set the src attribute to the image path
          img.src = piece.imagePath;
          // Append the img element to the square element
          squareElement.appendChild(img);


          // Add the piece element to the chess board element
          boardElement.appendChild(squareElement);
        }
      }
    }
  }
  addEventListeners() {
    this.squares = document.querySelectorAll('.chess-square');
    this.squares.forEach(square => {
      squareElement.addEventListener('click', event => {
        this.handleSquareClick(event);
      });
    });
  }
}

