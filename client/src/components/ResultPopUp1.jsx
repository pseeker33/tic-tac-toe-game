import { useEffect } from "react";
import { Square } from "./Square";
import { audioManager } from '../utils/audioManager';

export const ResultPopUp = ({ winner, resetGame }) => {
  if (winner === null) return null;

  // Determinar mensaje y sonido de resultado
  const resultText = winner === false ? "It's a Draw!" : winner === "X" ? "You won! 🎉" : "Computer won! 🤖";
  const soundType = winner === false ? "draw" : "win";

  useEffect(() => {
    audioManager.stopBackgroundMusic();
    audioManager.playSound(soundType);
  }, []); // Eliminé `soundType` para evitar cambios innecesarios en el render

  const handlePlayAgain = async () => {
    await audioManager.playResultAndRestartMusic(soundType);
    resetGame();
  };

  return (
    <div className="resultPopUp-container">
      <div className="resultPopUp-body">
        <h2>{resultText}</h2>

        <div className="resultPopUp-square">
          {winner && winner !== false && <Square>{winner}</Square>}
        </div>

        <button onClick={handlePlayAgain}>Play again?</button>
      </div>
    </div>
  );
};
