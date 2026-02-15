'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';
import MusicPlayer from '../components/MusicPlayer';

const cards = [
  { emoji: '📸', title: 'Images', path: '/images', color: 'from-pink-400 to-[#E8B4B8]' },
  { emoji: '🎥', title: 'Videos', path: '/videos', color: 'from-[#E8B4B8] to-pink-400' },
  { emoji: '💌', title: 'Letters', path: '/letters', color: 'from-pink-300 to-[#E8B4B8]' },
  { emoji: '🌙', title: 'Describe Her', path: '/memories', color: 'from-[#E8B4B8] to-pink-300' },
  { emoji: '💬', title: 'Chat', path: '/chat', color: 'from-pink-400 to-pink-500' },
];

export default function Dashboard() {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [starryMode, setStarryMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auto-play music on dashboard load
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Handle autoplay restrictions
    });
  }, []);

  const handleHeartClick = () => {
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);
    if (newCount >= 5) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 5000);
    }
  };

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      <MusicPlayer />
      
      <div className={`min-h-screen p-4 md:p-8 ${starryMode ? 'starry-night' : 'bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Welcome My Princess 👑💖
            </h1>
            <div className="flex justify-center gap-4 items-center">
              <button
                onClick={handleHeartClick}
                className="text-4xl hover:scale-110 transition-transform cursor-pointer"
              >
                ❤️
              </button>
              <button
                onClick={() => setStarryMode(!starryMode)}
                className="text-2xl hover:scale-110 transition-transform"
                title="Toggle Starry Night Mode"
              >
                {starryMode ? '☀️' : '🌙✨'}
              </button>
            </div>
          </motion.div>

          {/* Secret Message */}
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                <div className="text-6xl mb-4">💖💖💖💖💖</div>
                <h2 className="text-3xl font-dancing text-pink-600 mb-4">
                  Secret Message Revealed! 💕
                </h2>
                <p className="text-pink-500 font-poppins">
                  You found the secret! I love you more than words can express, Malini! 💞✨
                </p>
              </div>
            </motion.div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(card.path)}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 cursor-pointer shadow-xl hover:shadow-2xl transition-all text-center`}
              >
                <div className="text-6xl md:text-7xl mb-4">{card.emoji}</div>
                <h2 className="text-2xl md:text-3xl font-dancing text-white">
                  {card.title}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DateGuard>
  );
}

