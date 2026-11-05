import React, { useState } from 'react';
import { Sparkles, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Fruit } from '../../types/fruit';
import { normalizeFruitType, getFruitTypeBadgeClass } from '../../utils/normalize';

interface DevilFruitCardProps {
  fruit: Fruit;
}

export const DevilFruitCard: React.FC<DevilFruitCardProps> = ({ fruit }) => {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const displayType = normalizeFruitType(fruit.type);

  return (
    <article className="rounded-2xl border-2 border-[#D9A441]/30 bg-[#102E46]/80 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-300 hover:border-[#22C7C9] hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between">
      
      <div>
        {/* Fruit Image Container */}
        <div className="relative w-full aspect-video sm:aspect-[4/3] bg-[#071B2B] flex items-center justify-center p-4 overflow-hidden border-b border-[#D9A441]/20">
          {!imgError && fruit.filename ? (
            <img
              src={fruit.filename}
              alt={`Ilustración de la fruta ${fruit.name}`}
              className="max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(217,164,65,0.3)] transition-transform duration-500 hover:scale-110"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            /* Mystic Fallback Devil Fruit SVG */
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(34,199,201,0.5)]">
                <circle cx="50" cy="55" r="35" fill="#7928CA" stroke="#D9A441" stroke-width="2.5" />
                {/* Devil Fruit Spiral Swirls */}
                <path d="M40,45 A8,8 0 0,1 55,45 A8,8 0 0,1 40,45" fill="none" stroke="#F3E8CE" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M30,60 A8,8 0 0,1 45,60 A8,8 0 0,1 30,60" fill="none" stroke="#F3E8CE" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M52,62 A8,8 0 0,1 67,62 A8,8 0 0,1 52,62" fill="none" stroke="#F3E8CE" stroke-width="2.5" stroke-linecap="round"/>
                {/* Stem */}
                <path d="M50,20 Q55,10 45,8 Q35,6 38,15 Q42,22 50,22" fill="none" stroke="#22C7C9" stroke-width="3" stroke-linecap="round"/>
              </svg>
              <span className="text-[11px] font-mono text-[#22C7C9] uppercase tracking-wider">
                Fruta Mística Legendaria
              </span>
            </div>
          )}

          {/* Type Badge Floating */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${getFruitTypeBadgeClass(displayType)}`}
          >
            {displayType}
          </span>
        </div>

        {/* Content Info */}
        <div className="p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[#22C7C9] font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>ID #{fruit.id}</span>
          </div>

          <h3 className="font-cinzel text-xl font-bold text-[#F7FAFC] leading-snug">
            {fruit.name}
          </h3>

          {fruit.roman_name && (
            <p className="text-xs text-[#D9A441] italic font-serif">
              "{fruit.roman_name}"
            </p>
          )}

          <p className={`text-xs text-[#E9D8B4]/85 leading-relaxed font-sans mt-2 ${expanded ? '' : 'line-clamp-3'}`}>
            {fruit.description || 'Poder arcano transmitido a través del linaje del Grand Line.'}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      {fruit.description && fruit.description.length > 120 && (
        <div className="p-4 pt-0">
          <button
            onClick={() => setExpanded(!expanded)}
            type="button"
            className="w-full py-1.5 rounded-lg bg-[#071B2B] hover:bg-[#040e17] text-[#22C7C9] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-[#D9A441]/20"
          >
            <span>{expanded ? 'Mostrar menos' : 'Leer descripción completa'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

    </article>
  );
};
