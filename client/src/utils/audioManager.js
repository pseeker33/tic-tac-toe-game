class AudioManager {
  constructor() {
    this.sounds = {};
    this.bgMusic = null;
    this.isMusicPlaying = false;
    this.defaultVolume = 0.5; // Volumen por defecto de la música
    this.gameVolume = 0.15;   // Volumen reducido durante el juego
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    try {
      // Cargar efectos de sonido
      this.sounds = {
        guest1_move: new Audio('/sounds/guest1-move.mp3'),
        computer_move: new Audio('/sounds/computer-move.wav'),        
        playNow: new Audio('/sounds/play-now.mp3'),
        draw: new Audio('/sounds/draw.mp3'),
        win: new Audio('/sounds/win.mp3'),
        playAgain: new Audio('/sounds/play-again.mp3')
      };

      // Cargar y configurar música de fondo
      this.bgMusic = new Audio('/sounds/background-music.mp3');
      this.bgMusic.loop = true;
      this.bgMusic.volume = this.defaultVolume;
      this.isInitialized = true;
    } catch (error) {
      console.error('Error loading audio files:', error);
    }
  }

  playSound(soundName) {
    if (this.sounds[soundName]) {
      // Clonar el sonido para permitir múltiples reproducciones simultáneas
      const sound = this.sounds[soundName].cloneNode();
      sound.volume = 0.6; // 60% del volumen máximo
      sound.play().catch(error => console.error('Error playing sound:', error));
    }
  }

  startBackgroundMusic(reduced = false) {
    if (this.bgMusic && !this.isMusicPlaying && this.isInitialized) {
      this.bgMusic.volume = reduced ? this.gameVolume : this.defaultVolume;
      this.bgMusic.currentTime = 0; // Reiniciar desde el principio
      this.bgMusic.play()
        .then(() => {
          this.isMusicPlaying = true;
        })
        .catch(error => 
          console.error('Error playing background music:', error));
          this.isMusicPlaying = false;
    }
  }

  reduceBackgroundVolume() {
    if (this.bgMusic && this.isMusicPlaying) {
      this.bgMusic.volume = this.gameVolume;
    }
  }

  restoreBackgroundVolume() {
    if (this.bgMusic && this.isMusicPlaying) {
      this.bgMusic.volume = this.defaultVolume;
    }
  }

  stopBackgroundMusic() {
    if (this.bgMusic && this.isMusicPlaying) {
      this.bgMusic.pause();
      this.isMusicPlaying = false;
    }
  }

  async playResultAndRestartMusic(soundName) {
    this.stopBackgroundMusic();
    // this.playSound(soundName);
    
    // Esperar 2 segundos y reiniciar la música
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.startBackgroundMusic();
  }

  
}

export const audioManager = new AudioManager();