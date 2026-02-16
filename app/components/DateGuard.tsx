'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagicSpell from './MagicSpell';

export default function DateGuard({ children }: { children: React.ReactNode }) {
  const [isValidDate, setIsValidDate] = useState<boolean | null>(null);
  const [showMagic, setShowMagic] = useState(false);
  const [bypassDate, setBypassDate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkDate = () => {
      try {
        // Use real-world time API

        const today = new Date();
        const expiryDate = new Date("2026-02-17");
        if (today < expiryDate) {
          setIsValidDate(true);
        } else {
          setIsValidDate(false);
        }
      } catch (error) {
        // Fallback to local time if API fails
        const now = new Date();
        const expirationDate = new Date('2026-02-15T23:59:59');
        setIsValidDate(now <= expirationDate);
      }
    };

    checkDate();
  }, []);

  if (isValidDate === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <div className="text-2xl font-poppins text-pink-800">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if click is on the sides (left or right 20% of screen)
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    const sideWidth = screenWidth * 0.2;

    if (clickX < sideWidth || clickX > screenWidth - sideWidth) {
      if (!showMagic && !bypassDate) {
        setShowMagic(true);
      }
    }
  };

  const handleMagicComplete = () => {
    setShowMagic(false);
    setBypassDate(true);
  };

  if (!isValidDate) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300 relative cursor-pointer"
        onClick={handleSideClick}
      >
        <AnimatePresence>
          {showMagic && <MagicSpell onComplete={handleMagicComplete} />}
        </AnimatePresence>

        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4 relative z-10">
          <div className="text-6xl mb-4">�</div>
          <h1 className="text-3xl font-dancing text-pink-600 mb-4">
            This Application Has Expired
          </h1>
          <p className="text-pink-500 font-poppins mb-4">
            Please contact the admin!.
          </p>
          {
            isValidDate && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                className="text-pink-400 font-poppins text-xs italic"
              >
                💖 Click on the sides for a surprise... 💖
              </motion.p>
            )
          }

        </div>
      </div>
    );
  }

  return <>{children}</>;
}

