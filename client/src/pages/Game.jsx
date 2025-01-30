import { useGameState } from "../hooks/useGameState";
import { Square } from "../components/Square";
import { TURNS } from "../logic/constants";
import { ResultPopUp } from "../components/ResultPopUp";
import './Game.css';

function Game({ nickname }) {
  const { board, turn, updateBoard, resetGame, winner, isComputerThinking } = useGameState();

  return (
    <main className="ttt-game">
      <h1>Welcome {nickname}</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="ttt-game-board">
        {board.map((square, index) => (
          <Square 
            key={index}
            index={index}
            updateBoard={updateBoard}
            isComputerThinking={isComputerThinking}
          >
            {square}
          </Square>
        ))}
      </section>

      <section className="ttt-game-newTurnSquares">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <ResultPopUp resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default Game;