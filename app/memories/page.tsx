'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

export default function MemoriesPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Describe Her 🌙💖
            </h1>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl p-4 md:p-6 shadow-2xl"
          >
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/describe.mp4"
                controls={isPlaying}
                className="w-full h-auto max-h-[70vh]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={(e) => {
                  console.error('Video playback error');
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                }}
              >
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay (shown when video is not playing) */}
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayClick}
                    className="bg-white/90 rounded-full p-6 md:p-8 hover:bg-white transition-colors cursor-pointer"
                    aria-label="Play video"
                  >
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DateGuard>
  );
}

