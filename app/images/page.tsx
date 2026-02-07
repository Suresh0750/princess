'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

// Dummy romantic images (using placeholder images)
const images = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/400/400?random=${i + 1}`,
  title: `Romantic Memory ${i + 1} 💖`,
}));

export default function ImagesPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const router = useRouter();

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Our Beautiful Memories 📸💖
            </h1>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(index)}
                className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg group"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <div className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ❤️
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Slider Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white text-4xl z-10 hover:scale-110"
                >
                  ✕
                </button>
                
                <div className="relative">
                  <img
                    src={images[selectedImage].url}
                    alt={images[selectedImage].title}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-8xl opacity-30">❤️</div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                    className="bg-[#E8B4B8] text-white px-6 py-3 rounded-full hover:bg-[#FF69B4] transition-colors"
                    disabled={selectedImage === 0}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
                    className="bg-[#E8B4B8] text-white px-6 py-3 rounded-full hover:bg-[#FF69B4] transition-colors"
                    disabled={selectedImage === images.length - 1}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DateGuard>
  );
}

