'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';
import VoicePassword from '../components/VoicePassword';

type TamilLetter = {
  id: number;
  text: string;
  translation: string;
  songUrl: string;
};

const tamilLetters: TamilLetter[] = [
  {
    id: 1,
    text: `மரணத்திற்கு பயம் மண்ணில் வாழ அல்ல,
என் மாலினியின் மனதில் வாழ! ❤️`,
    translation:
      'Fear of death is not to live in the soil, but to live in the mind of my Malini! 💖',
    // TODO: update this with the real song file / URL
    songUrl: '/songs/letter-1.mp3',
  },
  {
    id: 2,
    text: 'அவள் பூட்டிய இதயத்தை அவள் கண்களால் திருடிவிட்டாள். திருப்பிக் கேட்கப் போனால் என்னை வார்த்தைகளால் வதைக்கிறாள். 💙',
    translation:
      "She stole my heart when it was locked. When I went to ask it back, she teased me with her words. 😘",
    // TODO: update this with the real song file / URL
    songUrl: '/songs/letter-2.mp3',
  },
];

type TypewriterTextProps = {
  text: string;
  visible: boolean;
};

function TypewriterText({ text, visible }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!visible) return;

    // If already animated once, just show full text
    if (hasAnimatedRef.current) {
      setDisplayed(text);
      return;
    }

    setDisplayed('');
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        hasAnimatedRef.current = true;
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [visible, text]);

  return <>{displayed}</>;
}

export default function LettersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenLetter = (letter: TamilLetter) => {
    setSelectedLetterId(letter.id);
    if (letter.songUrl) {
      setCurrentSong(letter.songUrl);
    }
  };

  const handleCloseModal = () => {
    setSelectedLetterId(null);
    setCurrentSong(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Reload and play the new song
      audioRef.current.load();
      void audioRef.current.play().catch(() => {
        // ignore play errors (e.g. autoplay restrictions)
      });
    }
  }, [currentSong]);

  useEffect(() => {
    // Play background music once authenticated and on this page
    if (isAuthenticated && bgAudioRef.current) {
      bgAudioRef.current.volume = 0.6;
      void bgAudioRef.current.play().catch(() => {
        // ignore autoplay / user gesture errors
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <DateGuard>
        <VoicePassword onSuccess={() => setIsAuthenticated(true)} />
      </DateGuard>
    );
  }

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />

      {/* Background music for this page */}
      <audio
        ref={bgAudioRef}
        src="http:localhost:3001/audio/SURYA_24.mpeg"
        loop
        className="hidden"
      />

      {/* Hidden audio element for songs */}
      {currentSong && (
        <audio ref={audioRef} src={currentSong} className="hidden" />
      )}

      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            > 
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Love Letters 💌💖
            </h1>
            <p className="text-pink-700 font-poppins">
              Tap a love box to open the letter and play the song.
            </p>
          </div>

          {/* Letter selection boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {tamilLetters.map((letter, index) => (
              <button
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="bg-white/80 rounded-2xl p-6 shadow-xl fade-in transition-transform hover:scale-105 hover:shadow-2xl flex flex-col items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-20 w-24 md:h-24 md:w-28 rounded-2xl bg-pink-100 flex items-center justify-center text-4xl md:text-5xl mb-3 shadow-inner">
                  💌
                </div>
                <p className="font-poppins text-pink-700 text-lg md:text-xl">
                  Letter {index + 1}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal overlay for opened letter */}
      {selectedLetterId && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-pink-600 hover:text-pink-800 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {tamilLetters
              .filter((letter) => letter.id === selectedLetterId)
              .map((letter) => (
                <div key={letter.id}>
                  <div className="text-3xl mb-4 text-center">💌</div>
                  <p className="text-xl md:text-2xl font-poppins text-pink-700 mb-4 text-center leading-relaxed">
                    <TypewriterText
                      text={letter.text}
                      visible={selectedLetterId === letter.id}
                    />
                  </p>
                  <p className="text-sm md:text-base font-poppins text-pink-500 text-center italic">
                    {letter.translation}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </DateGuard>
  );
}
