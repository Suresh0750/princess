'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface LockAndKeyProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function LockAndKey({ onUnlock, isUnlocked }: LockAndKeyProps) {
  const [keyPosition, setKeyPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleKeyClick = () => {
    if (isUnlocked) return;
    
    setIsAnimating(true);
    // Animate key to lock position
    setKeyPosition({ x: 0, y: -150 });
    
    setTimeout(() => {
      onUnlock();
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center mb-8">
      {/* Lock */}
      <motion.div
        animate={{
          scale: isUnlocked ? [1, 1.2, 1] : 1,
          rotate: isUnlocked ? [0, -15, 15, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
        className="text-6xl md:text-8xl mb-4 relative z-10"
      >
        {isUnlocked ? '🔓' : '🔒'}
      </motion.div>

      {/* Key */}
      <motion.button
        onClick={handleKeyClick}
        disabled={isAnimating || isUnlocked}
        animate={{
          x: isAnimating ? keyPosition.x : 0,
          y: isAnimating ? keyPosition.y : 0,
          scale: isAnimating ? 0.8 : 1,
          rotate: isAnimating ? 360 : 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileHover={!isAnimating && !isUnlocked ? { scale: 1.2, rotate: 15 } : {}}
        whileTap={!isAnimating && !isUnlocked ? { scale: 0.9 } : {}}
        className={`text-5xl md:text-7xl cursor-pointer transition-all ${
          isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:drop-shadow-lg'
        }`}
        style={{
          filter: isUnlocked ? 'grayscale(100%)' : 'none',
        }}
      >
        🔑
      </motion.button>

      {!isUnlocked && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-pink-400 font-poppins text-xs mt-2 text-center"
        >
          Click the key to unlock 💖
        </motion.p>
      )}

      {isUnlocked && (
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500 font-poppins text-sm mt-2 text-center font-bold"
        >
          Unlocked! 💖✨
        </motion.p>
      )}
    </div>
  );
}

