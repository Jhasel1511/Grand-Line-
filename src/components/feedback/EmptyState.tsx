import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Sin hallazgos en la bitácora',
  message = 'No hemos encontrado ningún pirata con esas características.',
  actionText = 'Limpiar filtros',
  onAction,
  icon
}) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center space-y-5 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-full bg-[#102E46]/80 border-2 border-[#D9A441]/40 flex items-center justify-center shadow-xl text-[#D9A441]">
        {icon ? icon : <Compass className="w-10 h-10 text-[#22C7C9]" />}
      </div>

      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#D9A441]">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-[#E9D8B4]/80 leading-relaxed max-w-md">
        {message}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          type="button"
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22C7C9] hover:bg-[#1bb2b4] text-[#071B2B] font-bold text-sm tracking-wide shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
        >
          <Sparkles className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
