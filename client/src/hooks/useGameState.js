import { useState } from "react";
import { saveGametoStg, removeGameInStg } from "../logic/gameStorage";
import { checkWinner, checkDraw } from "../logic/checkGameStatus";
import { TURNS, EMPTY_BOARD } from "../logic/constants";
import { getComputerMove } from "../logic/computerPlayer";
import { audioManager } from '../utils/audioManager';
import confetti from "canvas-confetti";

export const useGameState = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStg = window.localStorage.getItem("board");
    if (boardFromStg) return JSON.parse(boardFromStg);
    return EMPTY_BOARD;
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStg = window.localStorage.getItem("turn");
    return turnFromStg ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const updateBoard = (index) => {    
    if (isComputerThinking || board[index] || winner) return;

    // Player move
    audioManager.playSound('guest1_move');
    const newBoard = [...board];
    newBoard[index] = TURNS.X;
    setBoard(newBoard);
    setTurn(TURNS.O); // Cambiar el turno al computador

    // Check if player won or game is drawn
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      // setTimeout(() => setWinner(newWinner), 500);
      audioManager.playSound('win');
      confetti();
      setWinner(newWinner);
      return;
    } 
    if (checkDraw(newBoard)) {
      // setTimeout(() => setWinner(false), 500);
      audioManager.playSound('draw');
      setWinner(false);
      return;
    }

    // Computer move
    setIsComputerThinking(true);
    setTimeout(() => {
      audioManager.playSound('computer_move');
      const computerMove = getComputerMove(newBoard);
      if (computerMove !== null) {
        newBoard[computerMove] = TURNS.O;
        setBoard([...newBoard]);
        setTurn(TURNS.X); // Devolver el turno al jugador
        
        // Check if computer won or game is drawn
        const computerWinner = checkWinner(newBoard);
        if (computerWinner) {
          // setTimeout(() => setWinner(computerWinner), 500);
          audioManager.playSound('win');
          setWinner(computerWinner);
          setIsComputerThinking(false);
          return;
        }
        if (checkDraw(newBoard)) {
          // setTimeout(() => setWinner(false), 500);
          audioManager.playSound('draw');
          setWinner(false);
          setIsComputerThinking(false);
          return;
        }
      }
      setIsComputerThinking(false);
    }, 1500); // Add a small delay to make computer's move feel more natural

    saveGametoStg({
      board: newBoard,
      turn: TURNS.X, // Always player's turn after saving
    });
  };

  const resetGame = () => {
    setBoard(EMPTY_BOARD);
    setTurn(TURNS.X);
    setWinner(null);
    removeGameInStg();
  };

  return { board, turn, winner, updateBoard, resetGame, isComputerThinking };
};