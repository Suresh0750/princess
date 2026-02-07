'use client';

import { useState, useEffect } from 'react';

interface VoicePasswordProps {
  onSuccess: () => void;
  expectedPhrase?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export default function VoicePassword({ onSuccess, expectedPhrase = 'I love you' }: VoicePasswordProps) {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('Click the microphone and say "I love you" 💖');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setMessage('Listening... Speak now! 🎤');
      };

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const expected = expectedPhrase.toLowerCase().trim();
        
        if (transcript.includes(expected) || expected.includes(transcript)) {
          setMessage('Perfect! Access granted! 💖✨');
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setMessage(`You said: "${transcript}". Please say "${expectedPhrase}" 💕`);
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setMessage('Error listening. Please try again! 💔');
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setMessage('Voice recognition not supported. Please use Chrome or Edge browser. 💔');
    }
  }, [onSuccess, expectedPhrase]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center fade-in">
        <div className="text-6xl mb-6">🎤</div>
        <h2 className="text-3xl font-dancing text-pink-600 mb-4">Voice Password</h2>
        <p className="text-pink-500 font-poppins mb-6">{message}</p>
        <button
          onClick={startListening}
          disabled={isListening}
          className={`bg-[#E8B4B8] hover:bg-[#FF69B4] text-white rounded-full p-6 text-4xl transition-all ${
            isListening ? 'pulse-animation' : ''
          } disabled:opacity-50`}
        >
          {isListening ? '🎙️' : '🎤'}
        </button>
      </div>
    </div>
  );
}

