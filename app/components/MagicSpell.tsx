'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MagicSpell({ onComplete }: { onComplete: () => void }) {
  const [showSpell, setShowSpell] = useState(true);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Show magic spell first
    setTimeout(() => {
      setShowSpell(false);
      setShowHearts(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {showSpell && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl md:text-9xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 105, 180, 0.8))',
            }}
          >
            ✨
          </motion.div>
        )}
      </AnimatePresence>

      {showHearts && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-dancing text-pink-600 mb-4"
          >
            My Princess 👑💖
          </motion.h1>
          <FallingHearts />
        </motion.div>
      )}
    </div>
  );
}

function FallingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([]);

  useEffect(() => {
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💝', '💞', '💘', '🌹', '🌸'];
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -100, opacity: 0, scale: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: heart.delay,
            ease: 'easeIn',
          }}
          className="absolute text-3xl md:text-4xl"
          style={{
            left: `${heart.left}%`,
            filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.6))',
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}

