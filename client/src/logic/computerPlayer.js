// src/logic/computerPlayer.js
import { WINNER_COMBOS, TURNS } from './constants';

export const getComputerMove = (board) => {
  // 1. Si puede ganar en el siguiente movimiento, tomar esa posición (30% de las veces)
  if (Math.random() < 0.3) {
    const winningMove = findWinningMove(board, TURNS.O);
    if (winningMove !== null) return winningMove;
  }

  // 2. Si el jugador puede ganar en el siguiente movimiento, bloquearlo (50% de las veces)
  if (Math.random() < 0.5) {
    const blockingMove = findWinningMove(board, TURNS.X);
    if (blockingMove !== null) return blockingMove;
  }

  // 3. Obtener todas las posiciones disponibles
  const availablePositions = board
    .map((cell, index) => cell === null ? index : null)
    .filter(pos => pos !== null);

  // 4. Si el centro está disponible, tomarlo con 40% de probabilidad
  if (board[4] === null && Math.random() < 0.4) {
    return 4;
  }

  // 5. Elegir una posición aleatoria entre las disponibles
  if (availablePositions.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex];
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