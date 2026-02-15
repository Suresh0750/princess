'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

// For best results, place your video files in `public/videos`
// and reference them with paths like `/videos/YourVideo.mp4`.
// You don't need to import the files.

const videos = [
  {
    id: 3,
    title: 'Kuttty Movie 🎬💖',
    src: '/videos/KutttyMovie.mp4',
  },
  {
    id: 4,
    title: 'Mama & Beautiful Daughter 💕',
    src: '/videos/Mama_beautiful_daughter.mp4',
  },
];

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
                <div className="bg-white p-2 pt-3 flex flex-col items-center">
                  <video
                    src={video.src as string}
                    controls
                    className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
                  />
                  <h3 className="text-xl font-dancing text-pink-600 text-center">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* You can keep adding more videos by importing files at the top and
              adding new objects to the videos array. */}
        </div>
      </div>
    </DateGuard>
  );
}

