import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Skull, ChevronRight, Wind } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Background panoramic image with deep ocean gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero.jpg"
          alt="Barco pirata surcando el Grand Line al atardecer"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />
        {/* Cinematic Ocean Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B2B] via-[#071B2B]/40 to-[#040e17]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#071B2B]/30 to-[#071B2B]" />
      </div>

      {/* Decorative Wind Rose / Compass Elements in background */}
      <div className="absolute top-12 right-12 hidden lg:block opacity-20 pointer-events-none animate-spin" style={{ animationDuration: '60s' }}>
        <Compass className="w-64 h-64 text-[#D9A441]" />
      </div>

      {/* Decorative Nautical Coordinates */}
      <div className="absolute top-8 left-8 hidden sm:flex items-center gap-2 text-xs font-mono text-[#22C7C9] tracking-widest z-10 bg-[#071B2B]/80 px-3 py-1.5 rounded-full border border-[#D9A441]/30">
        <Wind className="w-3.5 h-3.5 text-[#D9A441]" />
        <span>CALM BELT &gt; REVERSE MOUNTAIN &gt; GRAND LINE (N 35° 18' W 139° 44')</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
        
        {/* Pirate Emblem Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#102E46]/90 border border-[#D9A441] shadow-xl backdrop-blur-md">
          <Skull className="w-4 h-4 text-[#D9A441]" />
          <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E9D8B4] tracking-widest uppercase">
            TRAVESÍA HACIA EL ONE PIECE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-[#F7FAFC] tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
          EL MAR TE ESTÁ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A441] via-[#22C7C9] to-[#D9A441]">LLAMANDO</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#E9D8B4] font-medium leading-relaxed drop-shadow-md">
          Traza tu rumbo, descubre nuevas islas y conoce a los piratas que están cambiando el destino del mundo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/explorar"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#22C7C9] to-[#189da0] hover:from-[#1bb2b4] hover:to-[#147e80] text-[#071B2B] font-cinzel font-black text-base tracking-widest shadow-2xl hover:shadow-[0_0_25px_rgba(34,199,201,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#22C7C9]/40"
          >
            <span>ZARPAR AHORA</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/explorar"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#071B2B]/85 hover:bg-[#102E46] text-[#D9A441] hover:text-[#22C7C9] border-2 border-[#D9A441] hover:border-[#22C7C9] font-cinzel font-black text-base tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D9A441]/40"
          >
            <Compass className="w-5 h-5 text-[#D9A441]" />
            <span>EXPLORAR PIRATAS</span>
          </Link>
        </div>

        {/* Rose of the winds / subtle anchor footer accent */}
        <div className="pt-6 flex items-center justify-center gap-4 text-xs font-mono text-[#E9D8B4]/60">
          <span>★ RUMBO NUEVO MUNDO</span>
          <span>•</span>
          <span>LOG POSE SINTONIZADO</span>
          <span>•</span>
          <span>780+ PIRATAS ARCHIVADOS</span>
        </div>

      </div>

      {/* Wave bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />

    </section>
  );
};
