import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'NO SE PUDO CARGAR LA INFORMACIÓN',
  message = 'Por favor, comprueba tu conexión y vuelve a intentarlo.',
  onRetry
}) => {
  return (
    <div
      role="alert"
      className="w-full my-8 p-8 rounded-2xl border-2 border-[#B83A3A] bg-[#2a0e0e]/80 backdrop-blur-md shadow-2xl flex flex-col items-center text-center space-y-4 max-w-xl mx-auto"
    >
      <div className="w-16 h-16 rounded-full bg-[#B83A3A]/20 flex items-center justify-center border border-[#B83A3A] shadow-inner">
        <AlertTriangle className="w-8 h-8 text-[#B83A3A] animate-bounce" />
      </div>

      <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#F7FAFC] tracking-wider">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-[#E9D8B4] leading-relaxed max-w-md font-sans">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B83A3A] hover:bg-[#a12e2e] text-[#F7FAFC] font-cinzel font-bold text-sm tracking-widest shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>REINTENTAR</span>
        </button>
      )}
    </div>
  );
};
