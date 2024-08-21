async function initialize() 
{
  const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js')
  const { pieces } = await import('./pieceInstances.js')
  
  console.log(typeof pieces);
  console.log(pieces)
  console.log(typeof ChessPiece);
  console.log(ChessPiece);
  console.log(typeof ChessBoard);
  console.log(ChessBoard);
  console.log(typeof ChessGame);
  console.log(ChessGame);
  console.log(typeof ChessArray);
  console.log(ChessArray);
  console.log("Classes imported successfully");

  const chessGame = new ChessGame();
  const chessBoard = new ChessBoard(chessGame);
  const chessArray = new ChessArray(chessGame, ChessBoard);
  await chessArray.createPieces(chessGame);

  const newChessPiece = chessArray.pieces[0];
  
  const squareElement = document.getElementById(newChessPiece.elementId);

  squareElement.style.gridRow = newChessPiece.row + 1;
  squareElement.style.gridColumn = newChessPiece.col + 1;
   
  return { ChessPiece, ChessBoard, ChessArray, ChessGame, chessGame, chessBoard, chessArray, pieces };
}
initialize().then(({ chessBoard, pieces, chessGame, chessArray }) => {
   console.log("Classes have been initialized and instances have been created.");
    setupInitialPosition(chessBoard, pieces, game, chessArray);
});

function setupInitialPosition(chessBoard, pieces, game, chessArray) {
  pieces.forEach((piece) => {
    const { type, color, row, col, imagePath } = piece;
    const elementId = `square-${row}-${col}`;

    if (!validPieceTypes.includes(type)) {
      throw new Error(`Invalid piece type: ${type}`);
    }

    const newChessPiece = new ChessPiece(type, color, row, col, imagePath, elementId, game);
    chessBoard.addPiece(newChessPiece);
    game.addPiece(newChessPiece);
    chessArray.addPiece(newChessPiece);

    const squareElement = document.getElementById(newChessPiece.elementId);
    squareElement.innerHTML = `<div class="chess-piece ${newChessPiece.color}-${newChessPiece.type}"></div>`;
    squareElement.classList.add('has-piece');
    squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${newChessPiece.imagePath})`;
    squareElement.style.gridRow = newChessPiece.row + 1;
    squareElement.style.gridColumn = newChessPiece.col + 1;
  });
}
