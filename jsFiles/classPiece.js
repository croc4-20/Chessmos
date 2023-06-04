let clickedPiece;
let pieces;
let handleClick;

async function initialize() 
{
  //const { default: ChessPiece } = await import('./classPiece.js');
  const { default: ChessBoard } = await import('./classBoard.js');
  const { default: ChessGame } = await import('./classGame.js');
  const { default: ChessArray } = await import('./classArray.js');
 
 
  const chessArray = new ChessArray();
  const chessBoard = new ChessBoard();
  //const game = new ChessGame(this.game.chessArray, this.game.chessBoard, () => this).bind(this);
  //const game = new ChessGame(chessArray, chessBoard, () => this.bind(this));
  const game = new ChessGame(chessArray, chessBoard, this);
  
 const pieces = [

{ type: 'rook', color: 'black', row: 7, col: 0, imagePath: 'images/blackROOK.png', elementId: 'square-7-0', game: game },
{ type: 'knight', color: 'black', row: 7, col: 1, imagePath: 'images/blackKNIGHT.png', elementId: 'square-7-1', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 2, imagePath: 'images/blackBISHOP.png', elementId: 'square-7-2', game: game },
{ type: 'queen', color: 'black', row: 7, col: 3, imagePath: 'images/blackQUEEN.png', elementId: 'square-7-3', game: game },
{ type: 'king', color: 'black', row: 7, col: 4, imagePath: 'images/blackKING.png', elementId: 'square-7-4', game: game },
{ type: 'bishop', color: 'black', row: 7, col: 5, imagePath: 'images/blackBISHOP.png', elementId: 'square-7-5', game: game },
{ type: 'knight', color: 'black', row: 7, col: 6, imagePath: 'images/blackKNIGHT.png', elementId: 'square-7-6', game: game },
{ type: 'rook', color: 'black', row: 7, col: 7, imagePath: 'images/blackROOK.png', elementId: 'square-7-7', game: game },
 
{ type: 'pawn', color: 'black', row: 6, col: 0, imagePath: 'images/blackPAWN.png', elementId: 'square-6-0', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 1, imagePath: 'images/blackPAWN.png', elementId: 'square-6-1', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 2, imagePath: 'images/blackPAWN.png', elementId: 'square-6-2', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 3, imagePath: 'images/blackPAWN.png', elementId: 'square-6-3', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 4, imagePath: 'images/blackPAWN.png', elementId: 'square-6-4', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 5, imagePath: 'images/blackPAWN.png', elementId: 'square-6-5', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 6, imagePath: 'images/blackPAWN.png', elementId: 'square-6-6', game: game },
{ type: 'pawn', color: 'black', row: 6, col: 7, imagePath: 'images/blackPAWN.png', elementId: 'square-6-7', game: game },

{ type: 'rook', color: 'white', row: 0, col: 0, imagePath: 'images/whiteROOK.png', elementId: 'square-0-0', game: game },
{ type: 'knight', color: 'white', row: 0, col: 1, imagePath: 'images/whiteKNIGHT.png', elementId: 'square-0-1', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 2, imagePath: 'images/whiteBISHOP.png', elementId: 'square-0-2', game: game },
{ type: 'queen', color: 'white', row: 0, col: 3, imagePath: 'images/whiteQUEEN.png', elementId: 'square-0-3', game: game },
{ type: 'king', color: 'white', row: 0, col: 4, imagePath: 'images/whiteKING.png', elementId: 'square-0-4', game: game },
{ type: 'bishop', color: 'white', row: 0, col: 5, imagePath: 'images/whiteBISHOP.png', elementId: 'square-0-5', game: game },
{ type: 'knight', color: 'white', row: 0, col: 6, imagePath: 'images/whiteKNIGHT.png', elementId: 'square-0-6', game: game },
{ type: 'rook', color: 'white', row: 0, col: 7, imagePath: 'images/whiteROOK.png', elementId: 'square-0-7', game: game },

{ type: 'pawn', color: 'white', row: 1, col: 0, imagePath: 'images/whitePAWN.png', elementId: 'square-1-0', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 1, imagePath: 'images/whitePAWN.png', elementId: 'square-1-1', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 2, imagePath: 'images/whitePAWN.png', elementId: 'square-1-2', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 3, imagePath: 'images/whitePAWN.png', elementId: 'square-1-3', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 4, imagePath: 'images/whitePAWN.png', elementId: 'square-1-4', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 5, imagePath: 'images/whitePAWN.png', elementId: 'square-1-5', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 6, imagePath: 'images/whitePAWN.png', elementId: 'square-1-6', game: game },
{ type: 'pawn', color: 'white', row: 1, col: 7, imagePath: 'images/whitePAWN.png', elementId: 'square-1-7', game: game },
 
]

 
for (const piece of pieces) 
{
    const chessPiece = new ChessPiece(piece.type, piece.color, piece.row, piece.col, piece.imagePath, piece.elementId, piece.game);
    const squareElement = document.getElementById(chessPiece.elementId);
    squareElement.innerHTML = `<div class="chess-piece ${chessPiece.color}-${chessPiece.type}"></div>`;
    squareElement.classList.add('has-piece');
    squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${chessPiece.imagePath})`;
    squareElement.style.gridRow = chessPiece.row + 1;
    squareElement.style.gridColumn = chessPiece.col + 1;
    

  }


// console.log(typeof ChessPiece);
  // console.log(ChessPiece);
  console.log(typeof ChessBoard);
  console.log(ChessBoard);
  console.log(typeof ChessGame);
  console.log(ChessGame);
  console.log(typeof ChessArray);
  console.log(ChessArray);
console.log("Classes imported successfully");
    
  
}
initialize().then(() => {
  // Get all chess squares
 
    console.log("Pieces have been initialized and instances have been created.");
});

export default class ChessPiece {
  constructor(type, color, row, col, imagePath, elementId, game, squares) {
    // debugger
    
   
   this.type = type;
    switch (type) {
  case "pawn":
    console.log("Pawn created");
    break;
  case "rook":
    console.log("Rook created");
    break;
  case "knight":
    console.log("Knight created");
    break;
  case "bishop":
    console.log("Bishop created");
    break;
  case "queen":
    console.log("Queen created");
    break;
  case "king":
    console.log("King created");
    break;
  default:
    throw new Error("Invalid piece type");
}
    //this.type = type;
    this.color = color;
      console.log('Constructor color:', this.color);
      
    this.row = row;
      
    this.col = col;
      
    this.imagePath = imagePath;
    const id = `square-${this.row}-${this.col}`;
    this.elementId = elementId || id;
    this.game = game;
    this.selectedSquare = null;
    this.prevTarget = null;
    this.squares = squares;
    //this.squares = [];
    this.validMoves = [];
    this.selectedPiece = null;
    this.currentPlayer = game.currentPlayer;
        // Bind handleMove to the ChessPiece object
    //this.handleMove = this.handleMove.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);
      
    this.element = document.getElementById(this.elementId);
    
    if (this.element) 
    {
      console.log('Adding event listener to:', this.element);
      this.element.removeEventListener('click', this.boundHandleClick);
      this.element.addEventListener('click', this.boundHandleClick);
    } 
    else 
    {
      console.error(`Invalid element ID: ${id}`);
    }
      
   if (elementId) {
  console.log("Type:", type, "color:", color, "! row,col: ", row, col, "imagePath: ", imagePath, "elementId :", elementId, "game", game, "squares", squares);
}

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

    const chessPieces = {
        whitePawns: [],
        blackPawns: [],
        whiteRooks: [],
        blackRooks: [],
        whiteKnights: [],
        blackKnights: [],
        whiteBishops: [],
        blackBishops: [],
        whiteQueen: [],
        blackQueen: [],
        whiteKing: [],
        blackKing: [],
    };

      // create white pawns
    for (let col = 0; col < 8; col++) {
        const pawn = new ChessPiece('pawn', 'white', 1, col, './images/whitePAWN.png', `pawn_1_${col}`, this);
        chessPieces.whitePawns.push(pawn);
        this.addPieceToBoard(pawn);
            console.log("White pawn added to board"); 


    }

      // create black pawns
    for (let col = 0; col < 8; col++) {
        const pawn = new ChessPiece('pawn', 'black', 6, col, './images/blackPAWN.png', `pawn_6_${col}`, this);
        chessPieces.blackPawns.push(pawn);
        this.addPieceToBoard(pawn);
    }

      // create white rooks
    const rook1 = new ChessPiece('rook', 'white', 0, 0, './images/whiteROOK.png', 'rook_0_0', this);
    const rook2 = new ChessPiece('rook', 'white', 0, 7, './images/whiteROOK.png', 'rook_0_7', this);
    chessPieces.whiteRooks.push(rook1, rook2);
    this.addPieceToBoard(rook1);
    this.addPieceToBoard(rook2);

      // create black rooks
    const rook3 = new ChessPiece('rook', 'black', 7, 0, './images/blackROOK.png', 'rook_7_0', this);
    const rook4 = new ChessPiece('rook', 'black', 7, 7, './images/blackROOK.png', 'rook_7_7', this);
    chessPieces.blackRooks.push(rook3, rook4);
    this.addPieceToBoard(rook3);
    this.addPieceToBoard(rook4);

      // create white knights
    const knight1 = new ChessPiece('knight', 'white', 0, 1, './images/whiteKNIGHT.png', 'knight_0_1', this);
    const knight2 = new ChessPiece('knight', 'white', 0, 6, './images/whiteKNIGHT.png', 'knight_0_6', this);
    chessPieces.whiteKnights.push(knight1, knight2);
    this.addPieceToBoard(knight1);
    this.addPieceToBoard(knight2);

      // create black knights
    const knight3 = new ChessPiece('knight', 'black', 7, 1, './images/blackKNIGHT.png', 'knight_7_1', this);
    const knight4 = new ChessPiece('knight', 'black', 7, 6, './images/blackKNIGHT.png', 'knight_7_6', this);
    chessPieces.blackKnights.push(knight3, knight4);
    this.addPieceToBoard(knight3);
    this.addPieceToBoard(knight4);

      // create black bishops
    const bishop2 = new ChessPiece('bishop', 'black', 7, 2, './images/blackBishop.png', 'bishop_7_2', this);
    const bishop3 = new ChessPiece('bishop', 'black', 7, 5, './images/blackBishop.png', 'bishop_7_5', this);
    chessPieces.blackBishops.push(bishop2, bishop3);
    this.addPieceToBoard(bishop2);
    this.addPieceToBoard(bishop3);

      // create white bishops
    const bishop1 = new ChessPiece('bishop', 'white', 0, 2, './images/whiteBISHOP.png', 'bishop_0_2', this);
    const bishop4 = new ChessPiece('bishop', 'white', 0, 5, './images/whiteBISHOP.png', 'bishop_0_5', this);
    chessPieces.whiteBishops.push(bishop1, bishop4);
    this.addPieceToBoard(bishop1);
    this.addPieceToBoard(bishop4);

      // create black queen
    const queen2 = new ChessPiece('queen', 'black', 7, 3, './images/blackQUEEN.png', 'queen_7_3', this);
    chessPieces.blackQueen.push(queen2);
    this.addPieceToBoard(queen2);

      // create black king
    const king2 = new ChessPiece('king', 'black', 7, 4, './images/blackKING.png', 'king_7_4', this);
    chessPieces.blackKing.push(king2);
    this.addPieceToBoard(king2);

      // create white queen
    const queen1 = new ChessPiece('queen', 'white', 0, 3, './images/whiteQUEEN.png', 'queen_0_3', this);
    chessPieces.whiteQueen.push(queen1);
    this.addPieceToBoard(queen1);

      // create white king
    const king1 = new ChessPiece('king', 'white', 0, 4, './images/whiteKING.png', 'king_0_4', this, squares);
    chessPieces.whiteKing.push(king1);
    this.addPieceToBoard(king1);

}

initialize() {
    console.log('Initialization complete');
  }

initSquares(board, game) {
  this.squares = [];
  this.squares.push(...document.querySelectorAll('.chess-square.has-piece'));
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = board[row][col];
      if (square) {
        this.squares.push(square);
        this.game.board[row][col] = square.querySelector('.chess-piece');
      } else {
        this.game.board[row][col] = null;
      }
    }
  }
}




handleClick = (event) => {
  console.log("Clicked element:", event.target);

  const clickedSquareElement = event.target.closest('.chess-square');
  if (!clickedSquareElement) {
    return;
  }
  console.log("Clicked square ID:", clickedSquareElement.id);

  const clickedPieceElement = clickedSquareElement.querySelector('.chess-piece');
  console.log("clickedPieceElement:", clickedPieceElement);

  const clickedPiece = clickedPieceElement ? this.getPieceFromElement(clickedPieceElement) : null;
 console.log('getPieceFromElement result:', clickedPiece);
  if (clickedPieceElement && !clickedPiece) return;
  console.log("After clickedPieceElement check");
  console.log("clickedPiece:", clickedPiece);

  // If the clicked piece is the same as the selected piece, deselect it and return
  if (this.selectedPiece && this.selectedPiece.element === clickedPieceElement) {
    this.selectedPiece.element.classList.remove('selected-piece');
    this.clearSelectedSquares(); // Clear the valid moves pattern
    this.selectedPiece = null;
    return;
  }

  if (!this.game || !this.game.board) {
    console.log("Game is not defined or has no board property.");
    return;
  }

  if (!clickedPieceElement && this.selectedPiece) {
    const newRow = parseInt(clickedSquareElement.dataset.row);
    const newCol = parseInt(clickedSquareElement.dataset.col);

    // Check if the clicked square is a legal move for the selected piece
    const validMoves = this.selectedPiece.piece.calculateValidMoves(this.selectedPiece.piece.row, this.selectedPiece.piece.col, this.game.board);

    if (validMoves.some(move => move.row === newRow && move.col === newCol)) {
  this.selectedPiece = {
    row: this.selectedPiece.piece.row,
    col: this.selectedPiece.piece.col,
    element: this.selectedPiece.element,
    piece: this.selectedPiece.piece,
    validMoves: validMoves,
  };
  this.movePiece(clickedSquareElement);
  this.deselectPiece(this.selectedPiece.element);
  this.endTurn();
} else {
  console.log("Illegal move!");
}
    return;
  }

  if (!clickedPieceElement) {
    console.log("No piece on clicked square.");
    return;
  }

  if (clickedPiece.color !== this.game.currentPlayer) {
    alert("It's not your turn!");
    return;
  }

  if (!this.selectedPiece) {
    clickedPieceElement.classList.add('selected-piece');
    this.selectedPiece = {
      row: clickedPiece.row,
      col: clickedPiece.col,
      element: clickedPieceElement,
      piece: clickedPiece,
      validMoves: this.calculateValidMoves(clickedPiece.row, clickedPiece.col, this.game.board),
    };

    // Show the valid moves pattern for the selected piece
    this.showValidMoves(this.selectedPiece);
  } else {
    // If a different piece is clicked, deselect the previous piece and select the new one
    this.deselectPiece(this.selectedPiece.element);
    this.selectedPiece = null;

    clickedPieceElement.classList.add('selected-piece');
    this.selectedPiece = {
      row: clickedPiece.row,
      col: clickedPiece.col,
      element: clickedPieceElement,
      validMoves: this.calculateValidMoves(clickedPiece.row, clickedPiece.col, this.game.board),
    };

      // Show the valid moves pattern for the selected piece
    this.showValidMoves(this.selectedPiece);

      // Clear selected squares and piece
    this.clearSelectedSquares();

  }
};
showValidMoves(selectedPiece) {
  console.log("showValidMoves called", selectedPiece);

  // Clear previous valid moves
  const allSquares = document.querySelectorAll('.chess-square');

  allSquares.forEach(square => {
    square.classList.remove('valid-move');
    const pattern = square.querySelector('.pattern');
    if (pattern) {
      square.removeChild(pattern);
    }
  });

  console.log("selectedPiece", selectedPiece)
  // Calculate new valid moves
  const validMoves = selectedPiece.piece.calculateValidMoves(selectedPiece.row, selectedPiece.col, this.game.board);

  // Highlight new valid moves
  for (const move of validMoves) {
    const square = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);

    // Add a green background to the valid move square
    square.classList.add('valid-move');

    // Create a pattern on the valid move square
    const pattern = document.createElement('div');
    pattern.classList.add('pattern');
    square.appendChild(pattern);
  }
}
//     clearValidMoves() 
//     {
//         for (const square of this.squares) 
//         {
//         square.classList.remove('valid-move');
//         square.innerHTML = '';
//         }
//     }
    
    
clearSelectedSquares = (game) => 
{
  if (!this.selectedPiece) {
    return;
  }
    
  this.selectedPiece.isValidMove(this.currentRow, this.currentCol, this.newRow, this.newCol).forEach(([row, col]) => {

    const square = getSquare(row, col);
    square.classList.remove('valid-move');
  });
    // check if this.game.validMoves is defined
  //console.log('this.game.validMoves:', isValidMoves); 
   let validMoves = [];
  //let selectedPiece = null;

  const selectedPiece = document.querySelector('.selected-piece');
  if (selectedPieceElement) 
  {
    selectedPiece.classList.remove('selected-piece');
  }
};
    
/*createElement() 
{
    this.element = document.createElement("img");
    this.element.src = this.imagePath;
    this.element.classList.add("chess-piece");
    this.element.classList.add(`square-${this.color}-${this.type}`);
    this.element.style.backgroundImage = `url(images/${this.color}${this.type.charAt(0).toUpperCase()}${this.type.slice(1)}.png)`;
    this.element.addEventListener("click", (event) => 
    {
        console.log("Piece clicked!");
    });
}
*/
getPieceFromElement(pieceElement) {

  const squareElement = pieceElement.parentElement;

  console.log("pieceElement:", pieceElement);
  console.log("squareElement:", squareElement);
  const row = parseInt(squareElement.dataset.row);
  const col = parseInt(squareElement.dataset.col);

  console.log("Row:", row);
  console.log("Col:", col);
  console.log("Game board:", this.game.board);
  console.log("Game.board[row][col]:", this.game.board[row][col]);
  

  return this.game.board[row][col];
}


    addChessPiece(type, color, row, col, imagePath, elementId, game, squares) {
  const squareElement = squares.item(row * 8 + col); // Get square element from NodeList
  if (!squareElement) {
    console.error(`Cannot add piece at row ${row}, col ${col}. Square does not exist.`);
    return;
  }

  const chessPiece = new ChessPiece(type, color, row, col, imagePath, elementId, game, squares);
  console.log("Adding piece: ", chessPiece);

    console.log(`Added piece color: ${chessPiece.color}, row: ${row}, col: ${col}`);

  const pieceElement = chessPiece.element;
  if (!pieceElement) {
    console.error(`Failed to create piece element for ${color} ${type} at row ${row}, col ${col}.`);
    return;
  }

  const existingPieceElement = squareElement.firstChild;
  if (existingPieceElement) {
    squareElement.replaceChild(pieceElement, existingPieceElement);
  } else {
    squareElement.appendChild(pieceElement);
  }
  this.game.board[row][col] = chessPiece;
}

calculateValidMoves(row, col, board) {
  console.log("Board in calculateValidMoves:", board);
  const validMoves = [];

    // The pawn can move forward only (white moves up, black moves down)
  const direction = this.color === "white" ? 1 : -1;

  console.log("Row:", row);
  console.log("Col:", col);
  console.log("Direction:", direction);

    // Check for the forward move (one square)
  const newRow = row + direction;
  console.log("New row:", newRow);
  if (newRow >= 0 && newRow < 8) {
    const forwardSquare = game.board[newRow][col];
    if (!forwardSquare) {
      validMoves.push({ row: newRow, col: col });
      console.log("Added forward move:", { row: newRow, col: col });

        // Check for the double-move on the pawn's first move
      if ((this.color === "white" && row === 1) || (this.color === "black" && row === 6)) 
      {
        const doubleMoveRow = newRow + direction;
        const doubleMoveSquare = this.game.board[doubleMoveRow][col];
        console.log("Double move square:", doubleMoveSquare);
        if (!doubleMoveSquare) 
        {
          validMoves.push({ row: doubleMoveRow, col: col });
        }
      }
    } 
    else 
    {
      console.log("Forward square blocked:", forwardSquare);
    }
  } 
  else 
  {
    console.log("New row out of bounds:", newRow);
  }

  const newRowForCapture = newRow;

    // Check for captures (diagonal moves)
  //const newRowForCapture = newRow;
  const captureCols = [col - 1, col + 1];
  if (newRowForCapture >= 0 && newRowForCapture < 8) {
    for (const captureCol of captureCols) {
      console.log("New row for capture:", newRowForCapture);
      console.log("Capture col:", captureCol);
      if (captureCol >= 0 && captureCol < 8) {
        const captureSquare = board[newRowForCapture][captureCol];
        console.log("Capture square:", captureSquare);
        if (captureSquare && captureSquare.color !== this.color) {
          validMoves.push({ row: newRowForCapture, col: captureCol });
          console.log("Added capture move:", { row: newRowForCapture, col: captureCol });
        } else {
          console.log("Invalid capture square:", captureSquare);
        }
      } else {
        console.log("Capture col out of bounds:", captureCol);
      }
    }
  } else {
    console.log("New row for capture out of bounds:", newRowForCapture);
  }

  console.log("Valid moves in calculateValidMoves:", validMoves);
  return validMoves;
}


    isValidMove(currentRow, currentCol, newRow, newCol, board) {
    // create a new ChessPiece object with the current piece's information
    const currentPiece = new ChessPiece(this.type, this.color, this.row, this.col, this.imagePath, this.element, this.board);

    // check if the move is within the board boundaries
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
        return false;
    }

    // check if the piece can move to the new square based on its type and the rules of chess
    switch (currentPiece.type) {
        case 'pawn':
            // pawns can move forward one square, or forward two squares on their first move
            if (currentPiece.color == 'white') {
                if (newRow == currentRow - 1 && newCol == currentCol && !board[newRow][newCol]) {
                    return true;
                } else if (newRow == currentRow - 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow - 1][currentCol] && currentRow == 6) {
                    return true;
                }
            } else if (currentPiece.color == 'black') {
                if (newRow == currentRow + 1 && newCol == currentCol && !board[newRow][newCol]) {
                    return true;
                } else if (newRow == currentRow + 2 && newCol == currentCol && !board[newRow][newCol] && !board[currentRow + 1][currentCol] && currentRow == 1) {
                    return true;
                }
            }
            break;
        case 'rook':
            // rooks can move horizontally or vertically, as long as there are no pieces blocking their path
            if (newRow == currentRow || newCol == currentCol) {
                // check for pieces blocking the rook's path
                if (!isBlocked(currentPiece, newRow, newCol)) {
                    return true;
                }
            }
            break;
        case 'knight':
            // knights can move to squares that are two rows and one column, or two columns and one row away
            if (Math.abs(newRow - currentRow) == 2 && Math.abs(newCol - currentCol) == 1 || Math.abs(newRow - currentRow) == 1 && Math.abs(newCol - currentCol) == 2) {
                return true;
            }
            break;
        case 'bishop':
            // bishops can move diagonally, as long as there are no pieces blocking their path
            if (Math.abs(newRow - currentRow) == Math.abs(newCol - currentCol)) {
                // check for pieces blocking the bishop's path
                if (!isBlocked(currentPiece, newRow, newCol)) {
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

    // if the move is not valid, return false
    return false;
}
    getType() {
        // returns the type of the piece (e.g. "pawn", "rook", etc.)
      return this.type;
    }

    getColor() {
        // returns the color of the piece (e.g. "white", "black")
      return this.color;
    }

    getPosition() 
    {
        // returns the current position of the piece on the board as an array [row, col]
      return [this.row, this.col];
    }

    setPosition(row, col) 
    {
        // sets the position of the piece on the board
      this.row = row;
      this.col = col;
    }

    playMoveSound() 
    {
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

    playWrongSound() 
    {
        // create an audio element for the wrong sound
      const audioElement = document.createElement('audio');
      audioElement.src = '/sounds/wrong.mp3';
      document.body.appendChild(audioElement);
        // play the sound
      audioElement.play();
    }
   }