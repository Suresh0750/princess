'use client';

import { motion } from 'framer-motion';

export default function HeartShapeAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 1],
          opacity: [0, 1, 0.8, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.3, 0.7, 1],
          ease: "easeOut"
        }}
        className="text-9xl md:text-[200px]"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(255, 105, 180, 0.8))',
        }}
      >
        ❤️
      </motion.div>
      
      {/* Multiple heart layers for depth */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeOut",
          delay: 0.2
        }}
        className="absolute text-9xl md:text-[200px]"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 105, 180, 0.5))',
        }}
      >
        💖
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.5, 0],
          opacity: [0, 0.4, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeOut",
          delay: 0.4
        }}
        className="absolute text-9xl md:text-[200px]"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.3))',
        }}
      >
        💕
      </motion.div>
    </div>
  );
}

