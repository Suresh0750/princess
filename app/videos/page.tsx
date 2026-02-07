'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

const videos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Romantic Video ${i + 1} 🎥💖`,
  thumbnail: `https://picsum.photos/400/300?random=${i + 10}`,
}));

export default function VideosPage() {
  const router = useRouter();

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Our Video Memories 🎥💖
            </h1>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer rounded-xl overflow-hidden shadow-xl group"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <div className="text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶️
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="text-xl font-dancing text-pink-600 text-center">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-pink-500 font-poppins">
            <p>💖 Replace these with your actual romantic videos! 💖</p>
          </div>
        </div>
      </div>
    </DateGuard>
  );
}

