   // Create ChessBoard instance
  function createChessBoard(game) {
    const boardElement = document.getElementById('board');
    const chessBoard = new ChessBoard(game, boardElement);
    return chessBoard;
  }

   
async function initializeArray() 
{
  const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessArray } = await import('./classArray.js');
  const { default: ChessGame } = await import('./classGame.js');
  
  console.log(typeof ChessPiece);
  console.log(typeof ChessBoard);
  console.log(typeof ChessGame);
  console.log(typeof ChessArray);

  const chessGame = new ChessGame();

 

  const chessBoard = createChessBoard(chessGame);
  const chessArray = new ChessArray(chessGame, createChessBoard);
  chessArray.createPieces(chessGame);

  const newChessPiece = chessArray.pieces[0];
  
  const squareElement = document.getElementById(newChessPiece.elementId);

  squareElement.style.gridRow = newChessPiece.row + 1;
  squareElement.style.gridColumn = newChessPiece.col + 1;
   
  return { ChessPiece, ChessBoard, ChessArray, ChessGame, chessGame };
}
initializeArray().then(() => {
   console.log("Classes have been initialized and instances have been created(In classArray).");

  
  });

export default class ChessArray 
{
  constructor(game) 
  {
    this.ChessPiece = ChessPiece;
    this.pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
    this.pieceColors = ['white', 'black'];
    this.pieces = [];
    this.game = game;
    this.createChessBoard = createChessBoard;
  }

  
  createPieces(game) {
    const startingRows = 
    {
      white: [0, 1],
      black: [6, 7]
    };

    const pieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']; // Order of pieces on the board
    const chessBoard = this.createChessBoard(game); // Create a ChessBoard instance
    
    for (let color of this.pieceColors) {
      for (let i = 0; i < pieceOrder.length; i++) {
        const type = pieceOrder[i];
        const row = startingRows[color][0];
        const col = i;
        const imagePath = `images/${color.toUpperCase()}_${type.toUpperCase()}.png`;
        
        let chessPiece;
        switch (type) {
          case 'rook':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
            break;
          case 'knight':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
            break;
          case 'bishop':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
            break;
          case 'queen':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
            break;
          case 'king':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
            break;
          case 'pawn':
            chessPiece = new ChessPiece(type, color, row, col, imagePath, null, game);
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
        const chessPiece = new ChessPiece('pawn', color, row, i, imagePath, null, game);
        this.pieces.push(chessPiece);
      }
    }
  }
}
