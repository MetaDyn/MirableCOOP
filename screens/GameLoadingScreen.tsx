import React, { useEffect } from 'react';

interface GameLoadingScreenProps {
  onComplete: () => void;
}

export const GameLoadingScreen: React.FC<GameLoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // 1.5 seconds logo display

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative">
         {/* Pulsating Circles */}
         <div className="absolute inset-0 bg-brand-red/20 rounded-full animate-ping"></div>
         <div className="relative bg-white p-6 rounded-full shadow-xl border-4 border-brand-red/10">
            {/* Simple Text Logo Placeholder as per Mockup "LOGO" */}
            <div className="w-24 h-24 flex items-center justify-center bg-brand-red rounded-full text-white font-bold text-2xl tracking-widest shadow-inner">
                COOP
            </div>
         </div>
      </div>
      <p className="mt-8 text-gray-500 font-medium animate-pulse tracking-wide uppercase text-sm">Loading Adventure...</p>
    </div>
  );
};