'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';
import VoicePassword from '../components/VoicePassword';

const tamilLetters = [
  {
    id: 1,
    text: "நீ என் வாழ்க்கைக்கு வந்த நாள் முதல் என் உலகம் அழகாக மாறியது 💖",
    translation: "Since the day you came into my life, my world has become beautiful 💖"
  },
  {
    id: 2,
    text: "நீ இல்லாத ஒரு நாளையும் நான் நினைக்க முடியாது 😘",
    translation: "I cannot imagine even a single day without you 😘"
  },
  {
    id: 3,
    text: "என் இதயம் முழுவதும் நீ மட்டுமே மலினி 💞",
    translation: "You are the only one in my entire heart, Malini 💞"
  },
  {
    id: 4,
    text: "உன்னை பார்க்கும் ஒவ்வொரு நொடியும் எனக்கு ஒரு பரிசு 💕",
    translation: "Every moment I see you is a gift to me 💕"
  },
  {
    id: 5,
    text: "நீ என் கனவுகளின் முடிவு, என் வாழ்க்கையின் ஆரம்பம் 🌹",
    translation: "You are the end of my dreams and the beginning of my life 🌹"
  },
];

export default function LettersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <DateGuard>
        <VoicePassword onSuccess={() => setIsAuthenticated(true)} />
      </DateGuard>
    );
  }

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Love Letters 💌💖
            </h1>
          </div>

          {/* Letters */}
          <div className="space-y-6">
            {tamilLetters.map((letter, index) => (
              <div
                key={letter.id}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-4 text-center">💌</div>
                <p className="text-xl md:text-2xl font-poppins text-pink-700 mb-4 text-center leading-relaxed">
                  {letter.text}
                </p>
                <p className="text-sm md:text-base font-poppins text-pink-500 text-center italic">
                  {letter.translation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DateGuard>
  );
}

