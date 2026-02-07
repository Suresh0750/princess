'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DateGuard({ children }: { children: React.ReactNode }) {
  const [isValidDate, setIsValidDate] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkDate = async () => {
      try {
        // Use real-world time API
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
        const data = await response.json();
        const currentDate = new Date(data.datetime);
        const month = currentDate.getMonth() + 1; // 0-indexed
        const day = currentDate.getDate();

        // Check if it's February 14
        if (month === 2 && day === 14) {
          setIsValidDate(true);
        } else {
          setIsValidDate(false);
        }
      } catch (error) {
        // Fallback to local time if API fails
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        setIsValidDate(month === 2 && day === 14);
      }
    };

    checkDate();
  }, []);

  if (isValidDate === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <div className="text-2xl font-poppins text-pink-800">Loading...</div>
        </div>
      </div>
    );
  }

  // if (!isValidDate) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300">
  //       <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
  //         <div className="text-6xl mb-4">💔</div>
  //         <h1 className="text-3xl font-dancing text-pink-600 mb-4">
  //           This surprise was only for Valentine's Day 💔
  //         </h1>
  //         <p className="text-pink-500 font-poppins">
  //           Come back on February 14th to see this special message!
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}

