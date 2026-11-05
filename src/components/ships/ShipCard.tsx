import React, { useState } from 'react';
import { Ship as ShipIcon, Anchor, User, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { Ship } from '../../types/ship';

interface ShipCardProps {
  ship: Ship;
}

export const ShipCard: React.FC<ShipCardProps> = ({ ship }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-2xl border-2 border-[#D9A441]/40 bg-[#102E46]/80 backdrop-blur-md p-5 shadow-xl transition-all duration-300 hover:border-[#22C7C9] hover:shadow-2xl flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-3 rounded-xl bg-[#071B2B] border border-[#D9A441] text-[#22C7C9] shrink-0">
            <ShipIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9A441] block">
              {ship.type || 'Embarcación del Grand Line'}
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#F7FAFC] leading-snug">
              {ship.name}
            </h3>
            {ship.roman_name && (
              <p className="text-xs text-[#E9D8B4]/70 italic">
                {ship.roman_name}
              </p>
            )}
          </div>
        </div>

        {/* Crew & Captain Info */}
        <div className="space-y-2 my-4 text-xs">
          {ship.crew && (
            <div className="p-2.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20 flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#22C7C9] shrink-0" />
              <div>
                <span className="text-[#E9D8B4]/60 block text-[10px]">Tripulación Asociada</span>
                <span className="font-semibold text-[#F7FAFC]">{ship.crew.name}</span>
              </div>
            </div>
          )}

          {ship.character_captain && (
            <div className="p-2.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20 flex items-center gap-2">
              <User className="w-4 h-4 text-[#D9A441] shrink-0" />
              <div>
                <span className="text-[#E9D8B4]/60 block text-[10px]">Capitán del Navío</span>
                <span className="font-semibold text-[#F7FAFC]">{ship.character_captain.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* Description if present */}
        {ship.description && (
          <p className={`text-xs text-[#E9D8B4]/80 leading-relaxed font-sans ${expanded ? '' : 'line-clamp-2'}`}>
            {ship.description}
          </p>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#D9A441]/20 flex items-center justify-between text-xs">
        <span className="text-[#22C7C9] font-mono flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-[#D9A441]" />
          <span>Navío #{ship.id}</span>
        </span>
        {ship.description && ship.description.length > 80 && (
          <button
            onClick={() => setExpanded(!expanded)}
            type="button"
            className="flex items-center gap-1 text-[#D9A441] hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <span>{expanded ? 'Menos' : 'Ver más'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

    </article>
  );
};
