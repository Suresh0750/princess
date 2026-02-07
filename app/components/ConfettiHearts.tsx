'use client';

import { useEffect, useState } from 'react';

export default function ConfettiHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([]);

  useEffect(() => {
    const heartEmojis = ['❤️', '💖', '💘', '💝', '💞', '💕', '🌹', '🌸', '💍', '🎁'];
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(newHearts);

    const timer = setTimeout(() => {
      setHearts([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute confetti-heart text-3xl"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            bottom: '0',
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}

