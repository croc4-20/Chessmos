import chessPiece from './classPiece.js';
import chessGame from './classGame.js';
import {createElements} from './classPiece.js';
class chessBoard 
{
  constructor() 
  {
    this.squareElements = new Array(8).fill().map(() => new Array(8).fill(null));
    this.grid = [      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ];
    
    for(let i=0; i<8; i++) 
    {
  for(let j=0; j<8; j++) 
  {
    if(document.getElementById(`square-${i}-${j}`))
    {
   squareElements[i][j] = document.getElementById(`square-${i}-${j}`);
}

  }
}
document.addEventListener("DOMContentLoaded", function(event) 
{ 
  // Create the elements
  createElements();

  // Create an instance of the chessBoard class
  const board = new chessBoard();
});
console.log(squareElements)
    this.chessPieces = [];

    this.placePieces();
    this.createBoard();
    this.displayBoard();
    this.updateGameState();
  for (let i = 0; i < 8; i++) 
  {
    for (let j = 0; j < 8; j++) 
    {
      const square = this.grid[i][j];
      if (square !== ' ') 
      {
        const color = (square === square.toLowerCase()) ? 'black' : 'white';
        const type = square.toLowerCase();
        const imagePath = `images/${color}${type.charAt(0).toUpperCase()}${type.slice(1)}.png`;
        const element = squareElements[i][j];
        //this.pieces.push(new Piece(type, color, i, j, imagePath, element));
      }
    }
  }
  this.addEventListeners();
  this.handleClick = this.handleClick.bind(this);
  //const chessPiece();
  }
handleClick(event) 
{
  // Do something with the event object
  console.log(event);
}
  handleSquareClick(squareElement) 
  {
  // Check if a piece is selected
  if (!currentlySelectedPiece) 
  {
    // No piece is selected, so do nothing
    return;
  }
  const toRow = parseInt(event.target.dataset.row);
  const toCol = parseInt(event.target.dataset.col);

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
 placePieces() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = this.grid[i][j];
        if (square !== ' ') {
          const color = (square === square.toLowerCase()) ? 'black' : 'white';
          const type = square.toLowerCase();
          const imagePath = `images/${color}${type.charAt(0).toUpperCase()}${type.slice(1)}.png`;
          const element = squareElements[i][j];
          this.pieces.push(new Piece(type, color, i, j, imagePath, element));
        }
      }
    }
  }



 getPiece(row, col) 
 {
  if (row < 0 || row > 7 || col < 0 || col > 7) 
  {
    return null;
  }
  return this.pieces[row][col];
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
          } 
         else 
          {
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

createBoardElements() {
  this.squareElements = []
  for (let i = 0; i < 8; i++) {
    this.squareElements[i] = [];
    for (let j = 0; j < 8; j++) {
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
    for (let i = 0; i < this.board.length; i++) 
    {
      for (let j = 0; j < this.board[i].length; j++) 
      {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') 
        {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
      return numWhitePieces;
  }
}

getNumWhiteBishops()
{
let getNumWhiteBishops = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) 
    {
      for (let j = 0; j < this.board[i].length; j++) 
      {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') 
        {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
      return numWhitePieces;
  }
}
getNumBlackPieces()
{
// Initialize a counter to 0
    let getNumBlackPieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) 
    {
      for (let j = 0; j < this.board[i].length; j++) 
      {
        // Check if the current element is a black piece
        if (this.board[i][j] === 'B') 
        {
          // Increment the counter
          getNumBlackPieces++;
        }
      }
    }
    return numWhitePieces;
  }
getNumWhitePieces() 
{
    // Initialize a counter to 0
    let numWhitePieces = 0;

    // Iterate through the board array
    for (let i = 0; i < this.board.length; i++) 
    {
      for (let j = 0; j < this.board[i].length; j++) 
      {
        // Check if the current element is a white piece
        if (this.board[i][j] === 'W') 
        {
          // Increment the counter
          numWhitePieces++;
        }
      }
    }

    // Return the number of white pieces
    return numWhitePieces;
  }
generateBoardHTML() 
    {
    // Create an empty string to store the HTML for the board
    let boardHTML = '';

    // Loop through the rows and columns of the board
    for (let i = 0; i < 8; i++) 
    {
      for (let j = 0; j < 8; j++) 
      {
        // Generate HTML for the square
        boardHTML += `<div class="chess-square ${(i + j) % 2 == 0 ? 'white' : 'black'}" id="square-${i}-${j}"></div>`;

        // Get the piece at the current position on the board
        const piece = this.pieces.find(piece => piece.position.row === i && piece.position.col === j);

        // If there is a piece at the current position, generate HTML for it and append it to the square
        if (piece) 
        {
          boardHTML += `<div class="chess-piece ${piece.color}-${piece.type}" id="piece-${i}-${j}"></div>`;
        }
      }
    }

    // Append the generated HTML to the #chessboard element
    const boardElement = document.getElementById('chessboard');
    boardElement.innerHTML = boardHTML;
  } 
  createBoard() 
  {
    // Initialize the board array
    this.squareElements = [];
    for (let row = 0; row < 8; row++) 
    {
      this.squareElements[row] = [];
      for (let col = 0; col < 8; col++) 
      {
        // Create a new square element and add it to the board array
        const squareElement = document.createElement("div");
        squareElement.classList.add(`chess-square-${(row + col) % 2 === 0 ? 'white' : 'black'}`);
        squareElement.dataset.row = row;
        squareElement.dataset.col = col;
        this.squareElements[row][col] = squareElement;

        // Create a new Piece object and store it in the this.pieces array
        const type = this.grid[row][col];
        if (type !== ' ') {
          const color = (type === type.toUpperCase()) ? 'white' : 'black';
          const imagePath = `images/${color}${type.toUpperCase()}.png`;
          const piece = new chessPiece(type, color, row, col, imagePath, squareElement);
          this.pieces.push(piece);
          squareElement.appendChild(piece.element);
        }
        // Add event listeners to the square element
        squareElement.addEventListener('click', (e) => {
          this.handleSquareClick(e.target);
        });

        // Add the square element to the DOM
        document.getElementById('chessboard').appendChild(squareElement);
      }
    }
  }

  displayBoard() 
  {
    // Get a reference to the HTML element that represents the board
    const boardElement = document.getElementById("chessboard");
    boardElement.innerHTML = '';
     // Create a 2D array to store the square elements
    
    // Loop through the rows and columns of the board
    for (let row = 0; row < 8; row++) 
    {
      for (let col = 0; col < 8; col++) 
      {
        // Get the current piece at this position on the board
        const piece = this.getPiece(row, col);

        // If there is a piece at this position...
        if (piece) 
        {
          // Create a new HTML element for the piece
          const squareElement = document.createElement("div");
          squareElement.classList.add(`chess-square ${(row + col) % 2 === 0 ? 'white' : 'black'}`);

          // Add the piece element to the chess board element
          boardElement.appendChild(squareElement);
        }
      }
    }
  }
  addEventListeners() 
  {
    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => 
    {
      square.addEventListener('click', event => 
      {
        this.handleSquareClick(event);
      });

})
}
}
export default chessBoard;
