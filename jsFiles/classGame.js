
const { default: ChessPiece } = await import('./classPiece.js');
const { default: ChessBoard } = await import('./classBoard.js');

const chessBoard = new ChessBoard();
//const chessPiece = new ChessPiece(type, color, row, col, imagePath, element);
   


export default class ChessGame 
{
  constructor() 
  {
    this.board = new ChessBoard();
    this.whitePieces = [];
    this.blackPieces = [];
    this.currentTurn = 'white';
    this.squares = document.querySelectorAll('.chess-square');
    //const chessPiece = require('./classPiece.js');
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
    this.chessBoard = [[{ color: 'white', type: 'rook' }, { color: 'white', type: 'knight' }, { color: 'white', type: 'bishop' }, { color: 'white', type: 'queen' }, { color: 'white', type: 'king' }, { color: 'white', type: 'bishop' }, { color: 'white', type: 'knight' }, { color: 'white', type: 'rook' }], [{ color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }, { color: 'white', type: 'pawn' }], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], [{ color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }, { color: 'black', type: 'pawn' }], [{ color: 'black', type: 'rook' }, { color: 'black', type: 'knight' }, { color: 'black', type: 'bishop' }, { color: 'black', type: 'queen' }, { color: 'black', type: 'king' }, { color: 'black', type: 'bishop' }, { color: 'black', type: 'knight' }, { color: 'black', type: 'rook' }]];
    this.whiteTurn = true;
    this.selectedPiece = null;
    this.checkGameOver = () => {};

    squares.forEach(square => square.innerHTML = "");

    this.chessBoard.placePieces();
  }
  
  

  setupEventListeners() 
  {
    // Initialize the board array
    const squares = document.querySelectorAll('.chess-square');
    const pieces = document.querySelectorAll('.piece');

    // Add event listeners to each square and piece
    squares.forEach(square => 
    {
      square.addEventListener('click', event => 
      {
        // Handle square click event
        this.highlightSquare(event.target);
      });
    });
    pieces.forEach(piece => 
    {
      piece.addEventListener('click', event => 
      {
        // Deselect the previously selected piece
        if (this.selectedPiece) 
        {
          this.selectedPiece.classList.remove('selected');
        }
        // Select the clicked piece
        this.selectedPiece = event.target;
        this.selectedPiece.classList.add('selected');
        // Get the starting position of the selected piece
        const fromRow = parseInt(this.selectedPiece.parentElement.dataset.row);
        const fromCol = parseInt(this.selectedPiece.parentElement.dataset.col);

        // Highlight all legal moves for the selected piece
        const legalMoves = this.board.getLegalMoves(fromRow, fromCol);
        legalMoves.forEach(move => 
        {
          const squareElement = document.getElementById(`square-${move[0]}-${move[1]}`);
          squareElement.classList.add('highlight');
        });
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
