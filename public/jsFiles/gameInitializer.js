import { ChessBoard } from './classBoard.js'; // Import the ChessBoard class
import { ChessGame } from './classGame.js';
import { ChessArray } from './classArray.js';

export async function initializeGame(pieces) {
  const chessArray = new ChessArray();
  const chessGame = new ChessGame(chessArray, chessBoard, handlePieceSelection);
  const chessBoard = new ChessBoard(chessGame, ChessPiece, pieces);
  chessGame.chessBoard = chessBoard;

  chessBoard.squareElements.forEach((square) => {
    square.addEventListener("click", chessBoard.handleSquareClick);
  });

  await chessBoard.initializeBoard();
  console.log("Initialization in classBoard completed.");
  return { chessArray, chessBoard, chessGame };
}
