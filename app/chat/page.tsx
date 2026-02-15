'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

export default function ChatPage() {
  const router = useRouter();

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
          </div>

          {/* Birthday Gift Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-8xl md:text-9xl mb-6"
            >
              🎁🎂💝
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-6">
              This is a Birthday Gift! 🎉
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-xl md:text-2xl font-poppins text-pink-700">
                This chat feature is part of your special birthday gift! 💖
              </p>
              <p className="text-lg md:text-xl font-poppins text-pink-600">
                It's not accessible right now, but it's waiting for you on your special day! 🎈
              </p>
            </div>

            <motion.div
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl md:text-7xl"
            >
              🎂✨🎉
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DateGuard>
  );
}

