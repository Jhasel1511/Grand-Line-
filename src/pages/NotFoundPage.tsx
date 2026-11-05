import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Skull, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 space-y-6">
      
      {/* 404 Broken Compass Illustration */}
      <div className="relative">
        <h1 className="font-cinzel text-8xl sm:text-9xl font-black text-[#22C7C9] tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          404
        </h1>
        <div className="absolute -top-4 -right-4 p-2 rounded-full bg-[#102E46] border-2 border-[#D9A441] shadow-xl animate-bounce">
          <Skull className="w-8 h-8 text-[#B83A3A]" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D9A441]">
          Página no encontrada
        </h2>
        <p className="text-sm sm:text-base text-[#E9D8B4]/80 leading-relaxed font-sans">
          Has naufragado en aguas desconocidas del Triángulo Florian. No existe ninguna isla ni tesoro en estas coordenadas.
        </p>
      </div>

      {/* Return button matching the mockup */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#22C7C9] hover:bg-[#1bb2b4] text-[#071B2B] font-cinzel font-black text-sm tracking-widest shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#22C7C9]/40"
      >
        <Home className="w-4 h-4" />
        <span>VOLVER AL INICIO</span>
      </Link>

    </div>
  );
};
