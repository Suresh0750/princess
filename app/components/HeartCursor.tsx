'use client';

import { useEffect } from 'react';

export default function HeartCursor() {
  useEffect(() => {
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💝', '💞', '💘', '✨', '⭐'];
    
    const createHeart = (e: MouseEvent) => {
      // Create multiple small hearts for magical effect
      const count = Math.random() > 0.5 ? 2 : 1;
      
      for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.innerHTML = emoji;
        heart.style.position = 'fixed';
        heart.style.left = `${e.clientX + (Math.random() - 0.5) * 20}px`;
        heart.style.top = `${e.clientY + (Math.random() - 0.5) * 20}px`;
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = `${8 + Math.random() * 6}px`; // 8-14px - smaller and varied
        heart.style.zIndex = '9999';
        heart.className = 'magical-heart';
        heart.style.textShadow = '0 0 8px rgba(255, 105, 180, 0.8), 0 0 15px rgba(255, 215, 0, 0.5)';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 800);
      }
    };

    let timeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Math.random() > 0.4) { // More frequent hearts
          createHeart(e);
        }
      }, 50); // Faster response
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}

