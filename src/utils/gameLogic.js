export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const checkWinner = (board) => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }
  
  return null;
};

export const getEmptySquares = (board) => {
  return board.reduce((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
};

export const minimax = (
  board,
  depth,
  maximizing,
  maxDepth = Infinity
) => {
  const winner = checkWinner(board);
  
  if (winner === 'X') return { score: -10 + depth };
  if (winner === 'O') return { score: 10 - depth };
  if (winner === 'draw') return { score: 0 };
  if (depth >= maxDepth) return { score: 0 };

  const emptySquares = getEmptySquares(board);
  
  if (maximizing) {
    let bestScore = -Infinity;
    let bestMove;
    
    for (const move of emptySquares) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const { score } = minimax(newBoard, depth + 1, false, maxDepth);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove;
    
    for (const move of emptySquares) {
      const newBoard = [...board];
      newBoard[move] = 'X';
      const { score } = minimax(newBoard, depth + 1, true, maxDepth);
      
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return { score: bestScore, move: bestMove };
  }
};

export const getAIMove = (board, difficulty) => {
  const emptySquares = getEmptySquares(board);
  
  if (difficulty === 'easy') {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }
  
  const maxDepth = difficulty === 'medium' ? 2 : Infinity;
  const { move } = minimax(board, 0, true, maxDepth);
  return move;
};