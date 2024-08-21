async function defineExtendedPiece() {
  const { default: ChessPiece } = await import('./classPiece.js');

  class ExtendedPiece extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
    }
  }

  window.ChessPiece = ExtendedPiece;
}

defineExtendedPiece();