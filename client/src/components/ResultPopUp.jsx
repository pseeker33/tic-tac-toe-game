import { Square } from "./Square";
import { audioManager } from '../utils/audioManager';

export const ResultPopUp = ({ winner, resetGame }) => {
  // si el prop winner es nulo el componente no renderiza nada
  if (winner === null) return null;

  const resultText = winner === false ? "Draw!" : `${winner} won!`;
  const soundType = winner === false ? 'draw' : 'win';

  const handlePlayAgain = async () => {
    resetGame();
    await audioManager.playResultAndRestartMusic(soundType);
  };

  // Detener la música cuando aparece el popup
  audioManager.stopBackgroundMusic();
  // Reproducir sonido de resultado
  audioManager.playSound(soundType);  

  return (
    <div className="resultPopUp-container">
      <div className="resultPopUp-body">
        <h2>{resultText}</h2>

        <div className="resultPopUp-square">
            {winner && <Square>{winner}</Square>}
        </div>

        <button onClick={handlePlayAgain}>Play again?</button>
      </div>
    </div>
  );
};