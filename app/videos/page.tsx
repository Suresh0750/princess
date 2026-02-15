'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DateGuard from '../components/DateGuard';
import FloatingHearts from '../components/FloatingHearts';
import HeartCursor from '../components/HeartCursor';

// For best results, place your video files in `public/videos`
// and reference them with paths like `/videos/YourVideo.mp4`.
// You don't need to import the files.

const videos = [
  {
    id: 1,
    title: '24 💖',
    src: '/videos/24.mp4',
  },
  {
    id: 2,
    title: 'VVS 💕',
    src: '/videos/vvs.mp4',
  },
  {
    id: 3,
    title: 'Kushi 🎬💖',
    src: '/videos/Kushi.mp4',
  },
  {
    id: 4,
    title: 'Jayam 💖',
    src: '/videos/Jayam.mp4',
  },
  {
    id: 5,
    title: 'Kuttty Movie 🎬💖',
    src: '/videos/KutttyMovie.mp4',
  },
  {
    id: 6,
    title: 'Mama & Beautiful Daughter 💕',
    src: '/videos/Mama_beautiful_daughter.mp4',
  },
];

export default function VideosPage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = (videoId: number) => {
    setSelectedVideo(videoId);
    setIsPlaying(false);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.load();
    }
  }, [selectedVideo]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedVideo]);

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
                onClick={() => handleVideoClick(video.id)}
                className="relative cursor-pointer rounded-xl overflow-hidden shadow-xl group"
              >
                <div className="bg-white p-2 pt-3 flex flex-col items-center">
                  <div className="relative w-full h-48 md:h-64 rounded-lg shadow-md overflow-hidden bg-gray-200">
                    <video
                      src={video.src as string}
                      preload="metadata"
                      muted
                      className="w-full h-full object-cover"
                      onLoadedMetadata={(e) => {
                        // Set first frame as thumbnail
                        const target = e.target as HTMLVideoElement;
                        target.currentTime = 0.1;
                      }}
                      onError={(e) => {
                        console.error('Video loading error:', video.src);
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                      }}
                    />
                    {/* Play button overlay on thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="bg-white/90 rounded-full p-4 md:p-6 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-12 h-12 md:w-16 md:h-16 text-pink-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-dancing text-pink-600 text-center mt-2">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* You can keep adding more videos by importing files at the top and
              adding new objects to the videos array. */}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute -top-12 right-0 text-white text-4xl hover:scale-110 transition-transform z-10"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Video container */}
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    src={videos.find((v) => v.id === selectedVideo)?.src}
                    controls={isPlaying}
                    className="w-full h-auto max-h-[80vh]"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    onError={(e) => {
                      console.error('Video playback error');
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Play button overlay (shown when video is not playing) */}
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlayClick}
                        className="bg-white/90 rounded-full p-6 md:p-8 hover:bg-white transition-colors cursor-pointer"
                        aria-label="Play video"
                      >
                        <svg
                          className="w-16 h-16 md:w-20 md:h-20 text-pink-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Video title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-2xl md:text-3xl font-dancing text-white text-center">
                      {videos.find((v) => v.id === selectedVideo)?.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DateGuard>
  );
}

