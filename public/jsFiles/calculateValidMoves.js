// This is a utility file for calculating valid moves

export function calculateValidMoves(row, col, board, type, color) {
    let validMoves = [];

    switch (type) {
        case 'pawn':
            validMoves = calculatePawnMoves(row, col, board, color);
            break;
        case 'knight':
            validMoves = calculateKnightMoves(row, col, board);
            break;
        case 'bishop':
            validMoves = calculateSlidingMoves(row, col, board, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
            break;
        case 'rook':
            validMoves = calculateSlidingMoves(row, col, board, [[1, 0], [0, 1], [-1, 0], [0, -1]]);
            break;
        case 'queen':
            validMoves = calculateSlidingMoves(row, col, board, [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]]);
            break;
        case 'king':
            validMoves = calculateKingMoves(row, col, board);
            break;
        default:
            break;
    }

    return validMoves;
}

function calculatePawnMoves(row, col, board, color) {
    let moves = [];
    const direction = color === 'white' ? 1 : -1;

    // Move forward
    if (!board.find(p => p.row === row + direction && p.col === col)) {
        moves.push({ row: row + direction, col });
    }

    // Capture diagonally
    if (board.find(p => p.row === row + direction && p.col === col + 1 && p.color !== color)) {
        moves.push({ row: row + direction, col: col + 1 });
    }
    if (board.find(p => p.row === row + direction && p.col === col - 1 && p.color !== color)) {
        moves.push({ row: row + direction, col: col - 1 });
    }

    return moves;
}

function calculateKnightMoves(row, col, board) {
    const knightMoves = [
        { row: 2, col: 1 },
        { row: 2, col: -1 },
        { row: -2, col: 1 },
        { row: -2, col: -1 },
        { row: 1, col: 2 },
        { row: 1, col: -2 },
        { row: -1, col: 2 },
        { row: -1, col: -2 }
    ];

    return knightMoves
        .map(move => ({ row: row + move.row, col: col + move.col }))
        .filter(move => isValidMove(move, board));
}

function calculateSlidingMoves(row, col, board, directions) {
    let moves = [];
    for (const [dRow, dCol] of directions) {
        let r = row + dRow;
        let c = col + dCol;

        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            if (!board.find(p => p.row === r && p.col === c)) {
                moves.push({ row: r, col: c });
            } else {
                if (board.find(p => p.row === r && p.col === c && p.color !== color)) {
                    moves.push({ row: r, col: c });
                }
                break;
            }
            r += dRow;
            c += dCol;
        }
    }
    return moves;
}

function calculateKingMoves(row, col, board) {
    const kingMoves = [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
        { row: -1, col: -1 }
    ];

    return kingMoves
        .map(move => ({ row: row + move.row, col: col + move.col }))
        .filter(move => isValidMove(move, board));
}

function isValidMove(move, board) {
    return move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8 &&
        !board.find(p => p.row === move.row && p.col === move.col && p.color === color);
}
