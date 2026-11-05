import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { CharacterGrid } from '../components/characters/CharacterGrid';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';
import { Character } from '../types/character';

export const FavoritesPage: React.FC = () => {
  const { favorites, favoritesCount, removeFavorite } = useFavorites();
  const [deleteCandidate, setDeleteCandidate] = useState<Character | null>(null);

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      removeFavorite(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9A441]/30 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
            <Star className="w-4 h-4 text-[#D9A441] fill-current" />
            <span>COFRE PRIVADO DE PIRATA</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
            MI BOTÍN
          </h1>
          <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-xl font-sans">
            Tus piratas, camaradas y recompensas guardadas en tu propia tripulación del Grand Line.
          </p>
        </div>

        {favoritesCount > 0 && (
          <div className="px-4 py-2 rounded-xl bg-[#102E46] border border-[#D9A441] text-[#D9A441] text-xs font-cinzel font-bold shadow-md">
            <span>{favoritesCount} {favoritesCount === 1 ? 'CAMARADA GUARDADO' : 'CAMARADAS GUARDADOS'}</span>
          </div>
        )}
      </div>

      {/* Empty State when no favorites */}
      {favoritesCount === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
          {/* Treasure chest SVG / Icon */}
          <div className="relative w-28 h-28 rounded-full bg-[#102E46] border-4 border-[#D9A441] flex items-center justify-center shadow-2xl animate-float">
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#D9A441]">
              {/* Chest base */}
              <rect x="15" y="45" width="70" height="40" rx="6" fill="#754C24" stroke="#D9A441" strokeWidth="3"/>
              {/* Chest lid */}
              <path d="M15,45 Q50,20 85,45 Z" fill="#936132" stroke="#D9A441" strokeWidth="3"/>
              {/* Gold bands */}
              <line x1="32" y1="35" x2="32" y2="85" stroke="#D9A441" strokeWidth="3"/>
              <line x1="68" y1="35" x2="68" y2="85" stroke="#D9A441" strokeWidth="3"/>
              {/* Lock */}
              <circle cx="50" cy="52" r="5" fill="#D9A441"/>
              <rect x="47" y="52" width="6" height="8" rx="1" fill="#D9A441"/>
            </svg>
            <Sparkles className="w-6 h-6 text-[#22C7C9] absolute -top-1 -right-1 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="font-cinzel text-2xl font-bold text-[#F7FAFC]">
              Todavía no tienes ningún tesoro guardado.
            </h2>
            <p className="text-sm text-[#E9D8B4]/70 leading-relaxed">
              Explora los carteles de recompensa del archivo pirata y añade a tus personajes favoritos pulsando el icono de la estrella.
            </p>
          </div>

          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#22C7C9] to-[#189da0] text-[#071B2B] font-cinzel font-black text-sm tracking-widest shadow-xl hover:shadow-[0_0_20px_rgba(34,199,201,0.5)] transition-all duration-200 cursor-pointer"
          >
            <span>VOLVER A EXPLORAR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="space-y-6">
          <CharacterGrid
            characters={favorites}
            onRequestDelete={(char) => setDeleteCandidate(char)}
          />
        </div>
      )}

      {/* Confirmation Dialog with educational dark pattern */}
      <ConfirmDialog
        isOpen={Boolean(deleteCandidate)}
        character={deleteCandidate}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />

    </div>
  );
};
