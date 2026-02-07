'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a romantic song URL
    // Using a free romantic music URL (you can replace with your own)
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log('Autoplay prevented');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-30'}`}>
      <button
        onClick={togglePlay}
        onMouseEnter={() => setIsVisible(true)}
        className="bg-[#E8B4B8] hover:bg-[#FF69B4] text-white rounded-full p-4 shadow-lg pulse-animation flex items-center justify-center w-16 h-16 text-2xl"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>
    </div>
  );
}

