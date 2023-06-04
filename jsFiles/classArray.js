let createChessBoard;
export default class ChessArray 
{
  constructor(game, ChessBoard) 
  {
    this.pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
    this.pieceColors = ['white', 'black'];
    this.pieces = [];
    this.game = game;
    this.ChessBoard = ChessBoard;
  }

createChessBoard() {
    const boardElement = document.getElementById('board');
    const chessBoard = new this.ChessBoard(this.game, boardElement);
    return chessBoard;
  }
  
  createPieces(game) {
    const startingRows = 
    {
      white: [0, 1],
      black: [6, 7]
    };

    const pieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']; // Order of pieces on the board
    const chessBoard = this.createChessBoard(); // Create a ChessBoard instance
    
    for (let color of this.pieceColors) {
      for (let i = 0; i < pieceOrder.length; i++) {
        const type = pieceOrder[i];
        const row = startingRows[color][0];
        const col = i;
        const imagePath = `images/${color.toUpperCase()}_${type.toUpperCase()}.png`;
       let chessPiece;

       switch (type) {
       case 'rook':
       case 'knight':
       case 'bishop':
       case 'queen':
       case 'king':
       case 'pawn':
       const chessPiece = new ChessPiece(type, color, row, col, imagePath, null, this.game);
        break;
      default:
        throw new Error(`Invalid piece type: ${type}`);
      }
        this.pieces.push(chessPiece);
      }
        // Add pawns to the board
      const row = startingRows[color][1];
      for (let i = 0; i < 8; i++) {
        const imagePath = `images/${color.toUpperCase()}_PAWN.png`;
        const chessPiece = new ChessPiece('pawn', color, row, i, imagePath, null, this.game);
        this.pieces.push(chessPiece);
      }
    }
  }
}