'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';
import HeartShapeAnimation from '../components/HeartShapeAnimation';
import LockAndKey from '../components/LockAndKey';

export default function LoginPage() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHeartAnimation, setShowHeartAnimation] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Hide heart animation after 2 seconds
    const timer = setTimeout(() => {
      setShowHeartAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    if (nickname.trim().toLowerCase() === 'princess' && password === '143') {
      setIsUnlocked(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } else {
      setError('Invalid credentials! Only my heart\'s owner can enter 💔');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Double-click no longer submits, just fills the form
  };

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      {showHeartAnimation && <HeartShapeAnimation />}
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 relative overflow-hidden">
        <div className="relative z-20 flex flex-col items-center">
          {/* Lock and Key above heart */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <LockAndKey onUnlock={handleUnlock} isUnlocked={isUnlocked} />
          </motion.div>

          {/* Heart-shaped container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Heart shape SVG background */}
            <svg
              className="w-full max-w-md"
              viewBox="0 0 400 400"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))' }}
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffe4e1" />
                </linearGradient>
              </defs>
              <path
                d="M200,350 C200,350 50,250 50,150 C50,100 100,50 150,50 C175,50 200,75 200,100 C200,75 225,50 250,50 C300,50 350,100 350,150 C350,250 200,350 200,350 Z"
                fill="url(#heartGradient)"
                stroke="#ff69b4"
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              {/* Decorative swirls */}
              <circle cx="120" cy="120" r="3" fill="#ff69b4" opacity="0.6" />
              <circle cx="280" cy="120" r="3" fill="#ff69b4" opacity="0.6" />
              <circle cx="200" cy="200" r="2" fill="#ff69b4" opacity="0.4" />
              <circle cx="150" cy="180" r="2" fill="#ff69b4" opacity="0.4" />
              <circle cx="250" cy="180" r="2" fill="#ff69b4" opacity="0.4" />
            </svg>

            {/* Content inside heart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
              <div className="text-center mb-6 w-full">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl md:text-4xl font-dancing mb-2 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                >
                  Enter My Heart 💖
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-pink-500 font-poppins text-xs md:text-sm"
                >
                  "Only my heart's owner can enter 💗"
                </motion.p>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onDoubleClick={handleDoubleClick}
                    className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-poppins text-pink-700 bg-white/80 backdrop-blur-sm transition-all hover:border-pink-300 hover:bg-white"
                    placeholder="💕 nickname..."
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onDoubleClick={handleDoubleClick}
                    className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-poppins text-pink-700 bg-white/80 backdrop-blur-sm transition-all hover:border-pink-300 hover:bg-white"
                    placeholder="🔐 password..."
                    required
                  />
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-poppins text-center bg-red-50 p-2 rounded-lg border border-red-200"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <p className="text-pink-400 font-poppins text-xs">
                    💖 Fill both fields, then click the key above 💖
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-4 text-center text-2xl"
              >
                💖 💕 💘 💝 💞
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </DateGuard>
  );
}

