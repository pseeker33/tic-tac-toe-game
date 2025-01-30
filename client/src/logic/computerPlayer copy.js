// src/logic/computerPlayer.js
import { WINNER_COMBOS, TURNS } from './constants';

export const getComputerMove = (board) => {
  // 1. Check if computer can win in next move
  const winningMove = findWinningMove(board, TURNS.O);
  if (winningMove !== null) return winningMove;

  // 2. Block player's winning move
  const blockingMove = findWinningMove(board, TURNS.X);
  if (blockingMove !== null) return blockingMove;

  // 3. Take center if available
  if (board[4] === null) return 4;

  // 4. Take a corner if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => board[corner] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Take any available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(side => board[side] === null);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  return null;
};

const findWinningMove = (board, player) => {
  // Check each winning combination
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    const line = [board[a], board[b], board[c]];
    
    // Count player's marks and empty spaces in this line
    const playerCount = line.filter(cell => cell === player).length;
    const nullCount = line.filter(cell => cell === null).length;

    // If player has 2 marks and 1 empty space, we found a winning move
    if (playerCount === 2 && nullCount === 1) {
      // Return the empty position
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
};