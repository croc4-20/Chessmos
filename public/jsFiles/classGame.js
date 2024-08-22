let chessArray;
let handlePieceSelection;
const initialize = async () => {
  
  // const { default: ChessPiece } = await import('../savedFiles/classPiece.js');
  const { default: ChessPiece } = await import('https://github.com/croc4-20/Chessmos/main/public/jsFiles/classPiece.js');
    console.log(ChessPiece);
    console.log(typeof ChessPiece);
  const { default: ChessBoard } = await import('https://github.com/croc4-20/Chessmos/main/public/jsFiles/classBoard.js');
    console.log(ChessBoard);
    console.log(typeof ChessBoard);
  const { default: ChessArray } = await import('https://github.com/croc4-20/Chessmos/main/public/jsFiles/classArray.js');
    console.log(ChessArray);
    console.log(typeof ChessArray);
    //chessArray = new ChessArray();
  
  
  console.log("Classes imported successfully");
  chessArray = new ChessArray(ChessGame);
  const chessBoard = new ChessBoard(ChessGame);
  const game = new ChessGame(chessArray, chessBoard, handlePieceSelection);
  
  window.chessPiece = class extends ChessPiece {
    constructor(type, color, row, col, imagePath, elementId, game) {
      super(type, color, row, col, imagePath, elementId, game);
      // this.checkAndUpdateSpellEffects = this.checkAndUpdateSpellEffects.bind(this);
      this.forceMove = this.forceMove.bind(this);
    }
  };
  window.chessGame = class extends ChessGame {
    constructor(chessArray, chessBoard, handlePieceSelection, game) {
      super(chessArray, chessBoard, handlePieceSelection, game);
      // this.updateTurnDisplay = this.updateTurnDisplay.bind(this);
      
    }
  };
   
   
  const type = ChessPiece.type;
  const color = ChessPiece.color;
  const row = ChessPiece.row;
  const col = ChessPiece.col;
  const imagePath = ChessPiece.imagePath;
  //const game = new ChessGame(chessArray, chessBoard, handlePieceSelection);
  window.ChessPiece = ChessPiece;
  const piece = new window.ChessPiece(type, color, row, col, imagePath, `'square-${row}-${col}'`, game);
  const elementId = `'square-${piece.row}-${piece.col}'`;
  piece.elementId = elementId;


  
 
  const squareElement = document.getElementById(piece.elementId);
  squareElement.innerHTML = `<div class="chess-piece ${piece.color}-${piece.type}"></div>`;
  squareElement.classList.add('has-piece');
  //squareElement.querySelector('.chess-piece').style.backgroundImage = `url(${chessPiece.imagePath})`;
  squareElement.style.gridRow = piece.row + 1;
  squareElement.style.gridColumn = piece.col + 1;

  window.ChessBoard = ChessBoard;
 window.ChessGame = ChessGame;
  window.ChessArray = ChessArray;


  }

initialize().then(() => {
 
  console.log('Chess game initialized!');
});
 

export default class ChessGame 
{
  constructor(chessArray, chessBoard, handlePieceSelection, game) 

  {
    // if (ChessGame.instance) {
    //         return ChessGame.instance;
    //     }
    // this.castDigitzKingSpell = this.castDigitzKingSpell.bind(this);
    this.chessArray = chessArray;
    this.chessBoard = chessBoard;
    this.board = Array(8).fill(null).map(() => Array(8).fill(null));
    this.pieces = this.chessArray?.board?.pieces || {};
    this.selectedPiece = null;
    this.whitePieces = [];
    this.blackPieces = [];
    this.whiteCaptured = [];
    this.blackCaptured = [];
    this.currentPlayer = 'white';
    this.squares = document.querySelectorAll('.chess-square');
    this.checkGameStatus = 'ongoing';
    this.validMoves = [];
    this.game = {  
      board: this.board,
      pieces: this.chessArray?.board?.pieces|| {},  // the ?. operator is used to ensure that this.chessArray.pieces is only accessed if this.chessArray is defined.
      id : this.id,
      status : 'ongoing',
      turn: this.player1Id
    };
     //this.checkAndUpdateSpellEffects = this.checkAndUpdateSpellEffects.bind(this);

    this.turnCount = 0;
    this.turnDuration = 60; // Duration of a turn in seconds
    this.currentTurnTimeLeft = this.turnDuration;
    this.turnTimer = null;
     this.updateTurnDisplay = this.updateTurnDisplay.bind(this);
    this.extraTimeLimit = 5 * 60; // 5 minutes in seconds
    this.extraTimer = null;
    this.extraWhiteTimeLeft = this.extraTimeLimit;
    this.extraBlackTimeLeft = this.extraTimeLimit;
    this.extraWhiteTimer = null;
    this.extraBlackTimer = null;
    
        // Bind the context of this to the event listener function
    this.handlePieceSelection = this.handlePieceSelection.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.startTurnTimer();
    //this.initializeBoard();
    ChessGame.instance = this;
  }

  startTurn() {
        console.log('startTurn function entered in classGame');

        this.currentTurnTimeLeft = this.turnDuration;
        this.updateTurnDisplay();
        this.startTurnTimer();
    }
    static startTurnServ(instance) {
      // debugger;
        console.log('startTurnServ function entered in classGame, instance being :', instance);
        ChessGame.instance = new ChessGame();
        console.log('ChessGame', ChessGame);
     instance.chessGame.endTurnMoveServ(instance);
     // ChessGame.instance.changeTurn();
        // this.currentTurnTimeLeft = this.turnDuration;
        // instance.chessGame.updateTurnDisplayServ(instance);
        // instance.chessGame.startTurnTimerServ(instance);
    }


static startTurnTimerServ(instance) {
  console.log('startTurnTimerServ function entered, instance being : ', instance);
  instance.chessGame.endTurnMoveServ(instance);
        // if (instance.turnTimer) {
        //     clearInterval(instance.turnTimer);
        // }
        // instance.turnTimer = setInterval(() => {
        //     if (instance.currentTurnTimeLeft > 0) {
        //         instance.currentTurnTimeLeft--;
        //          instance.updateTurnDisplayServ(instance);
        //     } else {
        //         clearInterval(instance.turnTimer);
        //         instance.chessGame.endTurnMoveServ(instance);
        //     }
        // }, 1000);
    }

    startTurnTimer() {
        if (this.turnTimer) {
            clearInterval(this.turnTimer);
        }
        this.turnTimer = setInterval(() => {
            if (this.currentTurnTimeLeft > 0) {
                this.currentTurnTimeLeft--;
                this.updateTurnDisplay();
                this.updateTurnDisplay();
            } else {
                this.endTurnMove();
            }
        }, 1000);
    }
    static checkAndUpdateSpellEffectsServ(instance) {
    console.log('checkAndUpdateSpellEffects function entered in classPiece');
    const allPawnElements = document.querySelectorAll('.chess-piece.pawn-random-move');
    allPawnElements.forEach(pawnElement => {
        const spellExpirationTurn = parseInt(pawnElement.dataset.spellExpirationTurn, 10);
        if (spellExpirationTurn > 0) {
            pawnElement.dataset.spellExpirationTurn = spellExpirationTurn - 1; // Decrement the value
        } else {
            // If the expiration turn has passed, remove the spell effect
            ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight', 'pawn-random-move'].forEach(dir => pawnElement.classList.remove(dir));
            // Clean up data attribute
            delete pawnElement.dataset.spellExpirationTurn; // Corrected to delete the dataset attribute
        }
    });
}
checkAndUpdateSpellEffects() {
    console.log('checkAndUpdateSpellEffects function entered in classPiece');
    const allPawnElements = document.querySelectorAll('.chess-piece.pawn-random-move');
    allPawnElements.forEach(pawnElement => {
        const spellExpirationTurn = parseInt(pawnElement.dataset.spellExpirationTurn, 10);
        if (spellExpirationTurn > 0) {
            pawnElement.dataset.spellExpirationTurn = spellExpirationTurn - 1; // Decrement the value
        } else {
            // If the expiration turn has passed, remove the spell effect
            ['forward', 'left', 'right', 'diagonalLeft', 'diagonalRight', 'pawn-random-move'].forEach(dir => pawnElement.classList.remove(dir));
            // Clean up data attribute
            delete pawnElement.dataset.spellExpirationTurn; // Corrected to delete the dataset attribute
        }
    });
}
//     static endTurnMoveServ(instance) {
//     console.log('endTurn function entered in classGame, instance being : ', instance);
//     // clearInterval(instance.turnTimer);

//     // Determine which player's extra timer to handle
//     const player = this.currentPlayer;
//     if (this.currentTurnTimeLeft === 0) {
//         // If the current turn time runs out, start or continue the extra timer for the current player
//         if (!this.extraTimer) {
//             this.startExtraTimer(player);
//         }
//     } else {
//         // If the turn ended normally, switch players and start the next turn
//         // this.currentPlayer = player === 'white' ? 'black' : 'white';
//       console.log('instance before trying to call startTurnServ', instance);

//         instance.chessGame.startTurnServ(instance);
//         instance.turnCount++;
//         instance.chessGame.updateTurnCountDisplayServ(instance);
//         // console.log('this context in endturnMove', this);
//         console.log('window.chessPiece', window.chessPiece);
//          // instance.chessGame.checkAndUpdateSpellEffects(instance);
//     }
// }
 static endTurnMoveServ(instance) {
        console.log('endTurnMoveServ function entered in classGame, instance being:', instance);

        // Prevent action if the instance is not in the expected state
        if (!instance) {
            console.error("Instance is undefined.");
            return;
        }

        // Use instance to access and modify its properties
        if (instance.currentTurnTimeLeft === 0) {
            if (!instance.extraTimer) {
                // Assuming startExtraTimer is properly defined on the instance
                instance.startExtraTimer(instance.currentPlayer);
            }
        } else {
            // Assuming startTurnServ and updateTurnCountDisplayServ are static methods that accept instance as an argument
            console.log('instance before trying to call startTurnServ', instance);

            // Ensure that startTurnServ changes the state to prevent re-entry
            // ChessGame.startTurnServ(instance);
            
            // Incrementing turn count to reflect a change in game state
            instance.turnCount++;
            
            
            // Assuming updateTurnCountDisplayServ is a static method that accepts instance as an argument
            ChessGame.updateTurnCountDisplayServ(instance);

            // console.log('this context in endTurnMove', this);
            console.log('window.chessPiece', window.chessPiece);
            
            console.log('instance before the updateTurnDIsplay call', instance);
            // console.log('this before the updateTurnDIsplay call', this);

            let myChessGame = new window.chessGame(chessArray, null, null, null);
            console.log('myChessGame', myChessGame);
            console.log('myTurn', myTurn, 'turnCount', myChessGame.turnCount);
            const instanceTurnCount = myChessGame.turnCount;
            const turnPlayer = myChessGame.currentPlayer;
            console.log('instanceTurnCount', instanceTurnCount, 'turnPlayer', turnPlayer);
            myChessGame.changeTurn();
            myChessGame.updateTurnDisplay(myTurn, instanceTurnCount); // This should work if the method is defined and bound correctly.
  
            console.log('turn player after changing turn', instance.chessGame.instance.currentPlayer);
            // If checkAndUpdateSpellEffects needs to be called, ensure it can handle the instance appropriately
            // ChessGame.checkAndUpdateSpellEffects(instance);
        }
    }
    updateTurnDisplay(myTurn, turnCount) {
      console.log('updateTurnDisplay function entered with ', myTurn, 'turnCount', turnCount);
    const turnText = turn ? "Your Turn" : "Opponent's Turn";
    document.getElementById("turn-count-display").textContent = `${turnText} - Turn: ${turnCount}`;
    
}
 endTurnMove() {
    // console.log('endTurn function entered in classGame, instance being : ', instance);
    clearInterval(this.turnTimer);

    // Determine which player's extra timer to handle
    const player = this.currentPlayer;
    if (this.currentTurnTimeLeft === 0) {
        // If the current turn time runs out, start or continue the extra timer for the current player
        if (!this.extraTimer) {
            this.startExtraTimer(player);
        }
    } else {
        // If the turn ended normally, switch players and start the next turn
        // this.currentPlayer = player === 'white' ? 'black' : 'white';
      console.log('instance before trying to call startTurnServ', instance);

        this.startTurn();
        this.turnCount++;
        this.updateTurnCountDisplay();
        console.log('this context in endturnMove', this);
        console.log('window.chessPiece', window.chessPiece);
         this.checkAndUpdateSpellEffects();
    }
}
    startExtraTimer(player) {
    if (player === 'white') {
        if (this.extraWhiteTimer) clearInterval(this.extraWhiteTimer);
        this.extraWhiteTimer = setInterval(() => {
            if (this.extraWhiteTimeLeft > 0) {
                this.extraWhiteTimeLeft--;
                this.updateExtraTimerDisplay('white');
            } else {
                clearInterval(this.extraWhiteTimer);
                this.endGame("White's time is up!");
            }
        }, 1000);
    } else {
        if (this.extraBlackTimer) clearInterval(this.extraBlackTimer);
        this.extraBlackTimer = setInterval(() => {
            if (this.extraBlackTimeLeft > 0) {
                this.extraBlackTimeLeft--;
                this.updateExtraTimerDisplay('black');
            } else {
                clearInterval(this.extraBlackTimer);
                this.endGame("Black's time is up!");
            }
        }, 1000);
    }
}
static updateTurnCountDisplayServ(instance) {
    const turnCountDisplay = document.getElementById('turn-count-display');
    if (turnCountDisplay) {
        turnCountDisplay.textContent = `Turn: ${instance.turnCount}`;
    }
}

  static updateTurnDisplayServ(instance) {
    const turnDisplay = document.getElementById('turn-timer');
    if (turnDisplay) {
        turnDisplay.textContent = `Time Left: ${instance.currentTurnTimeLeft} seconds`;
        if (instance.currentTurnTimeLeft === 0) {
            turnDisplay.classList.add('blinking');
        } else {
            turnDisplay.classList.remove('blinking');
        }
    }
}

    // Update the display based on current player
static updateExtraTimerDisplayServ(instance, player) {
  console.log('nstane  before trying to change player turn', instance);
    const extraTimerDisplay = player === 'white' 
        ? document.getElementById('extra-white-timer-display') 
        : document.getElementById('extra-black-timer-display');
    

    if (extraTimerDisplay) {
        const timeLeft = player === 'white' ? instance.extraWhiteTimeLeft : instance.extraBlackTimeLeft;
        extraTimerDisplay.textContent = `Extra Time for ${player === 'white' ? 'White' : 'Black'} Player: ${timeLeft} seconds`;
    }
}

 updateTurnCountDisplay() {
    const turnCountDisplay = document.getElementById('turn-count-display');
    if (turnCountDisplay) {
        turnCountDisplay.textContent = `Turn: ${this.turnCount}`;
    }
}

   updateTurnDisplay() {

    const turnDisplay = document.getElementById('turn-timer');
    if (turnDisplay) {
        turnDisplay.textContent = `Time Left: ${this.currentTurnTimeLeft} seconds`;
        if (this.currentTurnTimeLeft === 0) {
            turnDisplay.classList.add('blinking');
        } else {
            turnDisplay.classList.remove('blinking');
        }
    }
}
    // Update the display based on current player
 updateExtraTimerDisplay(player) {
    const extraTimerDisplay = player === 'white' 
        ? document.getElementById('extra-white-timer-display') 
        : document.getElementById('extra-black-timer-display');
    if (extraTimerDisplay) {
        const timeLeft = player === 'white' ? this.extraWhiteTimeLeft : this.extraBlackTimeLeft;
        extraTimerDisplay.textContent = `Extra Time for ${player === 'white' ? 'White' : 'Black'} Player: ${timeLeft} seconds`;
    }
}


// syncBoardState = () => {
//     console.log("Synchronizing board state...");

//     // Initialize the game board as a 2D array
//     this.game.board = Array.from({ length: 8 }, () => Array(8).fill(null));

//     // Find all chess squares on the board
//     const squares = document.querySelectorAll('.chess-square');

//     squares.forEach(square => {
//         const row = parseInt(square.getAttribute('data-row'), 10);
//         const col = parseInt(square.getAttribute('data-col'), 10);

//         // Find the chess piece within the square
//         const pieceElement = square.querySelector('.chess-piece');

//         if (pieceElement) {
//             // If a piece is found, extract its type and color
//             const type = pieceElement.getAttribute('data-type');
//             const color = pieceElement.getAttribute('data-color');

//             this.game.board[row][col] = {
//                 occupied: true,
//                 type: type ? type : null,
//                 color: color ? color : null,
//             };
//         } else {
//             // If no piece is found, mark the square as unoccupied
//             this.game.board[row][col] = { occupied: false };
//         }
//     });

//     console.log("Board state synchronized:", this.game.board);
// };
syncBoardState = () => {
    console.log("Synchronizing board state...");

    const squares = document.querySelectorAll('.chess-square');
    squares.forEach(square => {
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);
        const pieceElement = square.querySelector('.chess-piece');

        if (pieceElement) {
            const parent = pieceElement.parentNode;
            const type = parent.getAttribute('data-type');
             // col = parent.getAttribute('data-col');
             // row = parent.getAttribute('data-row');
            const color = parent.getAttribute('data-color');
            // Assuming you have a constructor or factory method for ChessPiece
            this.game.board[row][col] = new ChessPiece(type, color, row, col, this.imagePath, this.elementId, this.game, this.game.board);
            // or if you have existing instances, find and reference them
        } else {
            this.game.board[row][col] = null;
        }
    });

    console.log("this.game.board state synchronized:", this.game.board);
};

// syncBoardState = () => {
//     console.log("Synchronizing board state...");
   
//     console.log('this.game.board in syncBoardState', this.game.board);

//     // this.game.game.board = Array.from({ length: 8 }, () => Array(8).fill(null));

//     const squares = document.querySelectorAll('.chess-square');
//     squares.forEach(square => {
//         const row = parseInt(square.dataset.row, 10);
//         const col = parseInt(square.dataset.col, 10);
//         const pieceElement = square.querySelector('.chess-piece > div');

//         if (pieceElement) {
//             const [color, type] = pieceElement.className.split('-');
//             this.game.board[row][col] = { type, color };
//         }
//     });

//     console.log("this.game.board state synchronized:", this.board);
//     console.log('this.game.game.board state synchronized', this.game.board);

// };

  startTimer(player) 
  {
  const timeLimit = this.timeLimit;
  let timeRemaining = timeLimit * 60; // convert minutes to seconds
  let timerId;

  // update the clock every second
  timerId = setInterval(() => {
    timeRemaining--;

    // update the clock display
    this.updateClock(player, timeRemaining);

    if (timeRemaining <= 0) {
      // player has run out of time, end the game
      clearInterval(timerId);
      this.endGame(player.opponent);
    }
  }, 1000);
}

  updateGameState(move) {
    const sourcePiece = move.sourcePiece;
    const targetPiece = move.targetPiece;

    // Check if a piece was captured
    if (targetPiece) {
      if (targetPiece.color === 'white') {
        this.whiteCaptured.push(targetPiece);
      } else {
        this.blackCaptured.push(targetPiece);
      }
    }

  
  }
  changeTurn(){
console.log('changeTurn function entered with this.currentPlayer  being :', this.currentPlayer);
    if (this.currentPlayer === 'white') {
      console.log('thiscurrent player being white checking:', this.currentPlayer);
      this.currentPlayer = 'black';
      console.log('thiscurrent player value after the change, normally black checking:', this.currentPlayer);

    } else {
      console.log('tryig to change to white')
      this.currentPlayer = 'white';
    }
  }

//  handleMove(selectedPiece, row, col) {
//   const currentRow = selectedPiece.row;
//   const currentCol = selectedPiece.col;

//   const newRow = row;
//   const newCol = col;

//   if (this.chessArray.board.isValidMove(currentRow, currentCol, newRow, newCol)) {
//     const sourcePiece = this.chessArray.board[currentRow][currentCol];
//     const targetPiece = this.chessArray.board[newRow][newCol];

//     if (targetPiece) {
//       if (targetPiece.color === 'white') {
//         this.whiteCaptured.push(targetPiece);
//       } else {
//         this.blackCaptured.push(targetPiece);
//       }
//     }

//     this.chessArray.board[newRow][newCol] = sourcePiece;
//     this.chessArray.board[currentRow][currentCol] = null;

//     const targetSquare = document.getElementById(`square-${newRow}-${newCol}`);
//     targetSquare.appendChild(selectedPiece.element);

//     const sourceSquare = document.getElementById(`square-${currentRow}-${currentCol}`);
//     sourceSquare.innerHTML = "";

//     this.timer += 60;
//     this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';

//     const isWhiteTurn = this.currentPlayer === 'white';
//     if (this.chessArray.board.isCheck(isWhiteTurn)) {
//       console.log(`${this.currentPlayer} is in check`);
//     }

//     const isBlackTurn = this.currentPlayer === 'black';
//     if (this.chessArray.board.isCheckmate(isBlackTurn)) {
//       console.log(`${this.currentPlayer} wins by checkmate!`);
//     }
//   }

//   selectedPiece.element.classList.remove("selected");
// }
handleMove(selectedPiece, row, col) {
  if (!this.chessArray || !this.chessArray.board || !selectedPiece) return;

  const currentRow = selectedPiece.row;
  const currentCol = selectedPiece.col;

  if (this.chessArray.board.isValidMove(currentRow, currentCol, row, col)) {
    const sourcePiece = this.chessArray.board[currentRow][currentCol];
    const targetPiece = this.chessArray.board[row][col];

    if (targetPiece) {
      if (targetPiece.color === 'white') {
        this.whiteCaptured.push(targetPiece);
      } else {
        this.blackCaptured.push(targetPiece);
      }
    }

    this.chessArray.board[row][col] = sourcePiece;
    this.chessArray.board[currentRow][currentCol] = null;

    const targetSquare = document.getElementById(`square-${row}-${col}`);
    targetSquare.appendChild(selectedPiece.element);

    const sourceSquare = document.getElementById(`square-${currentRow}-${currentCol}`);
    sourceSquare.innerHTML = "";

    this.timer += 60;
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    this.selectedPiece = null;  // Reset selected piece

    const isTurn = this.currentPlayer === 'white' ? true : false;
    if (this.chessArray.board.isCheck(isTurn)) {
      console.log(`${this.currentPlayer} is in check`);
    }
    if (this.chessArray.board.isCheckmate(isTurn)) {
      console.log(`${this.currentPlayer} wins by checkmate!`);
      // Implement the reset game logic here or trigger the 'startNewGame'
    }
  }

  if (selectedPiece && selectedPiece.element) {
    selectedPiece.element.classList.remove("selected");
  }
}


// handlePieceSelection(row, col) {
//   const selectedPiece = this.board[row][col];

//   // If no piece is selected, or if the selected piece belongs to the opponent, do nothing
//   if (!selectedPiece || selectedPiece.color !== this.currentPlayer) {
//     return;
//   }

//   // If the selected piece is already the currently selected piece, deselect it
//   if (this.currentlySelectedPiece === selectedPiece) {
//     this.currentlySelectedPiece = null;
//     this.unhighlightSquares();
//   } else {
//     // If a new piece is selected, update the currentlySelectedPiece and highlight the valid moves
//     this.currentlySelectedPiece = selectedPiece;

//     // Replace this block with the following line
//     const validMoves = this.currentlySelectedPiece.calculateValidMoves(row, col, this.board);

//     this.highlightSquares(validMoves);
//   }
// }
 handlePieceSelection(row, col) {
  if (!this.board) return;

  const selectedPiece = this.board[row][col];

  if (!selectedPiece || selectedPiece.color !== this.currentPlayer) {
    return;
  }

  if (this.currentlySelectedPiece === selectedPiece) {
    this.currentlySelectedPiece = null;
    this.unhighlightSquares();
  } else {
    this.currentlySelectedPiece = selectedPiece;
    const validMoves = this.currentlySelectedPiece.calculateValidMoves(row, col, this.board);
    this.highlightSquares(validMoves);
  }
}
  
startNewGame() {
  if (this.checkGameOver()) {
    alert("The game is already over. Please start a new game.");
    return;
  }

  this.pieceArray.createPieces();
  this.pieceArray.addPiecesToBoard();
  this.chessBoard = new ChessBoard();
  this.chessBoard.placePieces();
  this.whiteTurn = true;
  this.selectedPiece = null;
  this.legalMoves = [];  // Reset legal moves
  this.currentPlayer = 'white';  // Reset current player

}

  
   handleSquareClick(square) {
    // Check if a piece is already selected
    console.log("handleSquareClick called");
    if (this.selectedPiece) {
      // Check if the clicked square is a legal move for the selected piece
      if (this.legalMoves.includes(square)) {
        // Move the selected piece to the clicked square
        square.appendChild(this.selectedPiece);
        // Clear the selected piece and legal moves
        this.selectedPiece = null;
        this.legalMoves = [];
        // End the player's turn
        this.endTurn();
      }
    } else {
      // Check if the square contains a piece
      if (square.firstElementChild) {
        // Highlight the clicked square
        square.classList.add('selected');
        // Store the selected piece
        this.selectedPiece = square.firstElementChild;
        // Calculate the legal moves for the selected piece
        this.legalMoves = this.getLegalMoves(this.selectedPiece);
        // Highlight the legal moves
        this.legalMoves.forEach(move => {
          move.classList.add('legal-move');
        });
      }
    }
  }

 getLegalMoves(piece) {
  let legalMoves = [];
  const pieceRow = piece.row;
  const pieceCol = piece.col;

  for (let row = 0; row < this.board.length; row++) {
    for (let col = 0; col < this.board[0].length; col++) {
      const newSquare = document.getElementById(`square-${row}-${col}`); // Assuming you use this ID pattern for squares
      if (this.isLegalMove(piece, newSquare) && this.isClearPath(pieceRow, pieceCol, row, col)) {
        legalMoves.push([row, col]);
      }
    }
  }
  return legalMoves;
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
        console.log(chessPiece);
      }
    }
  }

clearSelectedSquares() 
{
    const selectedSquares = document.querySelectorAll('.selected-piece');
    selectedSquares.forEach(square => square.classList.remove('selected-piece'));
}

  isLegalMove(chessPiece, newSquare) 
    {
      console.log("isLegalMove entered")
      // Get the piece's type (e.g. pawn, knight, etc.) and color
      const pieceType = piece.type;
      const pieceColor = piece.color;

      console.log ("pieceType in isLegalMove", pieceType);
      console.log ("pieceColor in isLegalMove", pieceColor);
      // Get the current and new square coordinates
      const currentRow = parseInt(chessPiece.row);
      const currentCol = parseInt(chessPiece.col);
      const newRow = parseInt(newSquare.getAttribute('data-row'));
      const newCol = parseInt(newSquare.getAttribute('data-col'));

      switch (pieceType) 
      {
        case "queen":
          // Queens can move diagonally, horizontally, or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          return true;
        case "rook":
          // Rooks can move horizontally or vertically any number of squares, as long as there are no other pieces blocking the way
          // Check if the move is horizontal or vertical
          if (newSquareCoords[0] === currentSquareCoords[0] || newSquareCoords[1] === currentSquareCoords[1]) {
            if (!isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              return false;
            }
          }
          break;
        case "bishop":
          // Check if the move is diagonal
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === Math.abs(newSquareCoords[1] - currentSquareCoords[1])) {
            // Check if there are no pieces blocking the way
            if (isClearPath(chessBoard, currentSquareCoords[0], currentSquareCoords[1], newSquareCoords[0], newSquareCoords[1])) {
              // The move is legal
              return true;
            }
          }

          // The move is not legal
          return false;

        case "knight":
          // Knights can move in an L-shaped pattern (two squares in one direction, and one square in the other)
          return Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === 2 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1 || Math.abs(newSquareCoords[0] - currentSquareCoords[0]) === 1 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 2;
        case "pawn":
          // Pawns can only move forward one square, unless it is their first move and they are allowed to move two squares
          // They can also capture pieces diagonally
          if (pieceColor === "white") {
            // White pawns can only move forward
            if (newSquareCoords[0] === currentSquareCoords[0] - 1) {
              // Check if the pawn is moving straight ahead
              if (newSquareCoords[1] === currentSquareCoords[1]) {
                // Check if the square is unoccupied
                if (!getPieceOnSquare(newSquare)) {
                  return true;
                }
              }
              // Check if the pawn is capturing a piece
              if (Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1) {
                // Check if the square is occupied by an enemy piece
                const enemyPiece = getPieceOnSquare(newSquare);
                if (enemyPiece && enemyPiece.classList[1] !== pieceColor) {
                  return true;
                }
              }
            }
            // Check if the pawn is making a double move (on their first move only)
            // Black pawns can only move backwards
            if (newSquareCoords[0] === currentSquareCoords[0] + 1) {
              // Check if the pawn is moving straight ahead
              if (newSquareCoords[1] === currentSquareCoords[1]) {
                // Check if the square is unoccupied
                if (!getPieceOnSquare(newSquare)) {
                  return true;
                }
              }
              // Check if the pawn is capturing a piece
              if (Math.abs(newSquareCoords[1] - currentSquareCoords[1]) === 1) {
                // Check if the square is occupied by an enemy piece
                const enemyPiece = getPieceOnSquare(newSquare);
                if (enemyPiece && enemyPiece.classList[1] !== pieceColor) {
                  return true;
                }
              }
            }
            // Check if the pawn is making a double move (on their first move only)
            if (newSquareCoords[0] === currentSquareCoords[0] + 2 && newSquareCoords[1] === currentSquareCoords[1] && !piece.hasMoved) {
              // Check that there are no pieces blocking the move
              const squareInBetween = document.getElementById(`square-${currentSquareCoords[0] + 1}-${currentSquareCoords[1]}`);
              if (!getPieceOnSquare(squareInBetween)) {
                return true;
              }
            }
            break;
          }
        default:
        case "king":
          // Kings can move one square in any direction
          if (Math.abs(newSquareCoords[0] - currentSquareCoords[0]) <= 1 && Math.abs(newSquareCoords[1] - currentSquareCoords[1]) <= 1) {
            return true;
          }
          // Kings can also castle (move two squares towards the rook) if certain conditions are met
          if (newSquareCoords[1] === currentSquareCoords[1] + 2 && !piece.hasMoved) {
            // Check that there are no pieces between the king and the rook
            const rightSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] + 1}`);
            const rookSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] + 3}`);
            if (getPieceOnSquare(rightSquare) || getPieceOnSquare(rookSquare)) {
              return false;
            }
            // Check that the rook has not moved
            const rook = getPieceOnSquare(rookSquare);
            if (rook && rook.hasMoved) {
              return false;
            }
            // Check that the king is not in check
            if (isSquareInCheck(chessBoard, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(chessBoard, rightSquare) || isSquareInCheck(chessBoard, newSquare)) {
              return false;
            }
            return true;
          }
          if (newSquareCoords[1] === currentSquareCoords[1] - 2 && !piece.hasMoved) {
            // Check that there are no pieces between the king and the rook
            const leftSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] - 1}`);
            const rookSquare = document.getElementById(`square-${currentSquareCoords[0]}-${currentSquareCoords[1] - 4}`);
            if (getPieceOnSquare(leftSquare) || getPieceOnSquare(rookSquare)) {
              return false;
            }
            // Check that the rook has not moved
            const rook = getPieceOnSquare(rookSquare);
            if (rook && rook.hasMoved) {
              return false;
            }
            // Check that the king is not in check
            if (isSquareInCheck(chessBoard, currentSquare)) {
              return false;
            }
            // Check that the king does not move through a square that is in check
            if (isSquareInCheck(chessBoard, leftSquare) || isSquareInCheck(chessBoard, newSquare)) {
              return false;
            }
            return true;
          }
        //break;
      }
    }

isPlayerTurn(currentPlayer)
{
let isPlayerTurn = true; // to keep track of whose turn it is to play
const squares = document.querySelectorAll('.chess-square');

squares.forEach(square => 
{
  square.addEventListener('click', event => 
  {
    // Check if it's the player's turn
    if (!isPlayerTurn) 
    {
      return;
    }

    // Check if the square contains a piece
    if (event.target.firstElementChild) 
    {
      // Highlight the clicked square
      square.classList.add('highlighted');

      // Get the legal moves for the piece
      const legalMoves = isLegalMoves(square);

      // Highlight the legal moves
      legalMoves.forEach(move => {
        move.classList.add('legal-move');
      });
    } else {
      // Check if the square is a legal move
      if (!square.classList.contains('legal-move')) {
        return;
      }

      // Move the piece to the square
      square.appendChild(/* ... */);

      // Unhighlight all squares
      squares.forEach(sq => {
        sq.classList.remove('highlighted', 'legal-move');
      });

      // End the player's turn
      endTurn();
    }
  });
});
}

// endTurn() {
//   this.isPlayerTurn = !this.isPlayerTurn;
// }

isClearPath(chessBoard, currentRow, currentCol, newRow, newCol) 
    {
      // Check if the move is horizontal or vertical
      if (currentRow === newRow || currentCol === newCol) 
      {
        // Check if the path is clear along the row or column
        const start = Math.min(currentRow, newRow);
        const end = Math.max(currentRow, newRow);
        for (let i = start + 1; i < end; i++) 
        {
          if (chessBoard[i][currentCol]) 
          {
            return false;
          }
        }
      } else {
        // The move is diagonal
        // Check if the path is clear along the diagona
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newCol - currentCol);
        if (rowDiff !== colDiff) 
        {
          // The move is not diagonal
          return false;
        }
        const rowStep = (newRow - currentRow) / rowDiff;
        const colStep = (newCol - currentCol) / colDiff;
        let row = currentRow + rowStep;
        let col = currentCol + colStep;
        while (row !== newRow && col !== newCol) 
        {
          if (chessBoard[row][col]) 
          {
            return false;
          }
          row += rowStep;
          col += colStep;
        }
      }
      return true;
    } 

    getKing(color) {
        // iterate over all of the squares on the board
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // get the piece at the current square
          let piece = chessBoard.getBoard()[i][j];

            // if the piece is a king of the right color, return it
          if (piece && piece.type == 'king' && piece.color == color) {
            return piece;
          }
        }
      }
    }

checkGameOver() 
    {
        // check if either player has no pieces left
      if (getNumWhitePieces() == 0 || getNumBlackPieces() == 0) 
      {
        return true;
      }

        // check if either player is in checkmate
      if (isCheckmate('white') || isCheckmate('black')) {
        return true;
      }

        // check if the game is a draw (e.g., insufficient material to checkmate)
      if (isDraw()) {
        return true;
      }

      // Check if the extra time has run out
      if (this.extraTimeLeft === 0) {
        return true;
      }

      // if none of the above conditions are met, the game is not over
      return false;
    }

checkGameStatus() {
  if (this.chessBoard.isCheckmate()) {
    this.gameStatus = "checkmate";
    this.chessBoard.announceWinner();
    return;
  }

  // if (this.chessBoard.isStalemate()) {
  //   this.gameStatus = "stalemate";
  //   this.chessBoard.announceDraw();
  //   return;
  // }

  // If none of the end-of-game conditions are met, the game continues
  this.gameStatus = "ongoing";
}

}
