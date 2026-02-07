'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';
import VoicePassword from '../components/VoicePassword';

const dummyMessages = [
  { id: 1, sender: 'me', text: 'Hi Malini! 💖', time: '10:00 AM' },
  { id: 2, sender: 'you', text: 'Hi! How are you? 😊', time: '10:01 AM' },
  { id: 3, sender: 'me', text: 'I\'m great! Just thinking about you 💕', time: '10:02 AM' },
  { id: 4, sender: 'you', text: 'Aww, that\'s so sweet! 🥰', time: '10:03 AM' },
  { id: 5, sender: 'me', text: 'You make every day special, my princess 👑💖', time: '10:04 AM' },
  { id: 6, sender: 'you', text: 'I love you too! 💞', time: '10:05 AM' },
];

export default function ChatPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

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
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
          {/* Header */}
          <div className="text-center mb-4">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-2 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-3xl md:text-5xl font-dancing text-pink-600 mb-4">
              Our Chat 💬💖
            </h1>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                    message.sender === 'me'
                      ? 'bg-[#E8B4B8] text-white'
                      : 'bg-pink-100 text-pink-700'
                  }`}
                >
                  <p className="font-poppins text-sm md:text-base">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">{message.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message... 💕"
              className="flex-1 px-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-poppins"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#E8B4B8] hover:bg-[#FF69B4] text-white px-6 py-3 rounded-full font-dancing text-xl"
            >
              Send 💖
            </motion.button>
          </form>
        </div>
      </div>
    </DateGuard>
  );
}

