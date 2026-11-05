import React from 'react';
import { Compass } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Consultando los mapas del Grand Line...',
  count = 6
}) => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center space-y-8" role="status" aria-live="polite">
      {/* Central Rotating Compass */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#102E46] border-2 border-[#D9A441] shadow-2xl animate-pulse">
          <Compass className="w-10 h-10 text-[#22C7C9] animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <p className="font-cinzel text-base sm:text-lg font-bold text-[#D9A441] tracking-wide animate-pulse text-center">
          {message}
        </p>
      </div>

      {/* Skeletons styled as aged wanted posters */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border-4 border-[#754C24]/40 bg-[#102E46]/30 p-4 space-y-4 animate-pulse shadow-lg"
          >
            {/* Header placeholder */}
            <div className="h-6 bg-[#D9A441]/20 rounded w-2/3 mx-auto" />
            {/* Image portrait placeholder */}
            <div className="w-full aspect-[4/5] bg-[#071B2B]/60 rounded-lg border border-[#D9A441]/20" />
            {/* Title / bounty placeholder */}
            <div className="space-y-2">
              <div className="h-5 bg-[#D9A441]/30 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-[#22C7C9]/20 rounded w-1/2 mx-auto" />
            </div>
            {/* Footer action placeholder */}
            <div className="h-9 bg-[#754C24]/30 rounded-lg w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
