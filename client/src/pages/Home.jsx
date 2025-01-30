import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { audioManager } from "../utils/audioManager";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar audio y empezar música de fondo al cargar Home
    audioManager.init();
  }, []);

  const handlePlayNow = () => {
    // Primero iniciamos la música con volumen reducido
    audioManager.startBackgroundMusic(true);
    audioManager.playSound("playNow");
    audioManager.reduceBackgroundVolume();
    navigate("/game");
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="icon-container">
          <Gamepad2 className="game-icon" />
        </div>
        <button className="play-button" onClick={handlePlayNow}>
          Play Now
        </button>
      </div>
    </div>
  );
}

export default Home;
