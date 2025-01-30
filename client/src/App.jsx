import { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { audioManager } from './utils/audioManager';

function App() {
  const [nickname, setNickname] = useState('Guest 1');
  const location = useLocation();

  useEffect(() => {
    // Ajustar volumen basado en la ruta actual
    if (location.pathname === '/') {
      audioManager.restoreBackgroundVolume();
    } else if (location.pathname === '/game') {
      audioManager.reduceBackgroundVolume();
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game nickname={nickname} />} />
    </Routes>
  );
}

export default App;