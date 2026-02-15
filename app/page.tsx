'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from './components/DateGuard';
import FloatingHearts from './components/FloatingHearts';
import HeartCursor from './components/HeartCursor';
import ConfettiHearts from './components/ConfettiHearts';

export default function ProposalPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [showSadEmoji, setShowSadEmoji] = useState(false);
  const router = useRouter();

  const handleNoHover = () => {
    // Show sad emoji with jumping animation
    setShowSadEmoji(true);
    
    // Button dimensions (approximate: px-12 py-6 = ~200px width, ~60px height)
    const buttonWidth = 200;
    const buttonHeight = 80;
    const padding = 20; // Padding from window edges
    
    // Calculate safe area within window bounds
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    const minX = padding;
    const minY = padding;
    
    // Generate random position within safe bounds
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    
    setNoButtonPosition({ x, y });
  };

  const handleNoClick = () => {
    // Show sad emoji when NO is clicked
    setShowSadEmoji(true);
    handleNoHover();
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setShowConfetti(true);
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      {showConfetti && <ConfettiHearts />}
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 relative overflow-hidden">
        <div className="text-center z-20 fade-in">
          {!yesClicked ? (
            <>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-dancing text-pink-600 mb-6"
              >
                Malini, Will you marry me? 💍
                {showSadEmoji && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 1, 1],
                      scale: [0, 1.2, 1, 1.3, 1],
                      y: [0, -20, 0, -15, 0, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                      repeat: 2
                    }}
                    className="inline-block"
                  >
                    🙀
                  </motion.span>
                )}
              </motion.h1>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="bg-[#E8B4B8] hover:bg-[#FF69B4] text-white text-3xl font-dancing px-12 py-6 rounded-full shadow-xl pulse-animation cursor-pointer"
                >
                  YES ❤️
                </motion.button>
                
                <motion.button
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  onClick={handleNoClick}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-3xl font-dancing px-12 py-6 rounded-full shadow-xl "
                  style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}  
                >
                  NO 💔😿 
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-8xl mb-4">😹🥳😻</div>
              <h2 className="text-4xl md:text-6xl font-dancing text-pink-600">
                I knew you would say YES 💖
              </h2>
              <p className="text-2xl md:text-4xl font-dancing text-pink-500">
                I love you forever Malini 💞
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </DateGuard>
  );
}
