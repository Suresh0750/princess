'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

const memories = [
  {
    emoji: '💘',
    title: 'First Meet Day',
    description: 'The day our eyes met and my heart skipped a beat 💖',
    date: 'That Special Day'
  },
  {
    emoji: '🌸',
    title: 'First Chat',
    description: 'Our first conversation that changed everything 🌹',
    date: 'The Beginning'
  },
  {
    emoji: '🎁',
    title: 'First Gift',
    description: 'The first gift I gave you, wrapped with all my love 💝',
    date: 'A Special Moment'
  },
  {
    emoji: '🌙',
    title: 'First Trip',
    description: 'Our first adventure together, creating beautiful memories ✨',
    date: 'An Unforgettable Journey'
  },
  {
    emoji: '💍',
    title: 'The Proposal',
    description: 'The moment I asked you to be mine forever 💞',
    date: 'Today'
  },
];

export default function MemoriesPage() {
  const router = useRouter();

  return (
    <DateGuard>
      <HeartCursor />
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <button
              onClick={() => router.back()}
              className="text-2xl mb-4 hover:scale-110 transition-transform"
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 mb-4">
              Our Memories 🌙💖
            </h1>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-pink-300 transform md:-translate-x-1/2"></div>

            {/* Memory Items */}
            <div className="space-y-8">
              {memories.map((memory, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-[#E8B4B8] rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10"></div>

                  {/* Memory Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                      <div className="text-4xl mb-3">{memory.emoji}</div>
                      <h3 className="text-2xl font-dancing text-pink-600 mb-2">
                        {memory.title}
                      </h3>
                      <p className="text-pink-700 font-poppins mb-2">
                        {memory.description}
                      </p>
                      <p className="text-sm text-pink-500 font-poppins italic">
                        {memory.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DateGuard>
  );
}

