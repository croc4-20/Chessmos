import chessBoard from './classBoard.js';
//import chessPiece from './classPiece.js';

class chessGame
{
  constructor() 
  {
    this.board = new Board();
    this.whitePieces = [];
    this.blackPieces = [];
    this.currentTurn = 'white';
    this.squares = document.querySelectorAll('.chess-square');  
  }
  startNewGame()

  {
    this.setupEventListeners();
   // If the game is already over, display a message and return
  if (this.checkGameOver()) 
  {
    alert("The game is already over. Please start a new game.");
    return;

  }

  // Reset the board to the starting position
  this.board.grid = [  
    [{color: 'white', type: 'rook'}, {color: 'white', type: 'knight'}, {color: 'white', type: 'bishop'}, {color: 'white', type: 'queen'}, {color: 'white', type: 'king'}, {color: 'white', type: 'bishop'}, {color: 'white', type: 'knight'}, {color: 'white', type: 'rook'}],
    [{color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}, {color: 'white', type: 'pawn'}],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [{color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}, {color: 'black', type: 'pawn'}],
    [{color: 'black', type: 'rook'}, {color: 'black', type: 'knight'}, {color: 'black', type: 'bishop'}, {color: 'black', type: 'queen'}, {color: 'black', type: 'king'}, {color: 'black', type: 'bishop'}, {color: 'black', type: 'knight'}, {color: 'black', type: 'rook'}]
    ];
    this.whiteTurn = true;
    this.selectedPiece = null;
    this.checkGameOver = () => {}

    squares.forEach(square => square.innerHTML = "");

    this.board.placePieces();
  }
handleMove(fromRow, fromCol, toRow, toCol) 
{
    // check if the move is legal and update the board and pieces accordingly
  }

  isCheckmate(color) 
  {
    // check if the player with the specified color is in checkmate
  }
  

  setupEventListeners() 
  {
  // Initialize the board array
  const squares = document.querySelectorAll('.chess-square');
  const pieces = document.querySelectorAll('.chess-piece');

  // Add event listeners to each square and piece
  squares.forEach(square => 
  {
    square.addEventListener('click', event => 
    {
      // Handle square click event
      highlightSquare(event.target);
    });
  });
  pieces.forEach(piece => 
  {
    piece.addEventListener('click', event => 
    {
      // Handle piece click event
    });
  });
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
console.log(piece);
      }
    }
  }
}
export default chessGame;
    