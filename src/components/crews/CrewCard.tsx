import React, { useState } from 'react';
import { Anchor, Users, Award, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Crew } from '../../types/crew';
import { formatBounty } from '../../services/api';
import { normalizeCrewName } from '../../utils/normalize';

interface CrewCardProps {
  crew: Crew;
}

export const CrewCard: React.FC<CrewCardProps> = ({ crew }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-2xl border-2 border-[#D9A441]/40 bg-[#102E46]/80 backdrop-blur-md p-5 shadow-xl transition-all duration-300 hover:border-[#22C7C9] hover:shadow-2xl flex flex-col justify-between">
      
      <div>
        {/* Top Header & Yonko Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#071B2B] border border-[#D9A441] text-[#D9A441]">
              <Anchor className="w-5 h-5 text-[#22C7C9]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#F7FAFC] leading-snug">
                {normalizeCrewName(crew.name)}
              </h3>
              {crew.roman_name && (
                <p className="text-xs text-[#E9D8B4]/70 italic">
                  {crew.roman_name}
                </p>
              )}
            </div>
          </div>

          {crew.is_yonko && (
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D9A441] text-[#071B2B] shadow">
              YONKO
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 my-4 text-xs">
          <div className="p-2.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <span className="text-[#E9D8B4]/70 flex items-center gap-1 mb-0.5">
              <Users className="w-3.5 h-3.5 text-[#22C7C9]" /> Miembros
            </span>
            <strong className="text-sm text-[#F7FAFC]">{crew.number || 'Desconocido'}</strong>
          </div>

          <div className="p-2.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <span className="text-[#E9D8B4]/70 flex items-center gap-1 mb-0.5">
              <Award className="w-3.5 h-3.5 text-[#D9A441]" /> Recompensa
            </span>
            <strong className="text-xs text-[#B83A3A] font-bold font-mono truncate block">
              {formatBounty(crew.total_prime)}
            </strong>
          </div>
        </div>

        {/* Description or details */}
        {crew.description && (
          <p className={`text-xs text-[#E9D8B4]/80 leading-relaxed font-sans ${expanded ? '' : 'line-clamp-2'}`}>
            {crew.description}
          </p>
        )}
      </div>

      {/* Expand/Collapse details button */}
      <div className="mt-4 pt-3 border-t border-[#D9A441]/20 flex items-center justify-between text-xs">
        <span className="text-[#22C7C9] font-mono capitalize">
          Estado: {crew.status || 'Activo en alta mar'}
        </span>
        {crew.description && crew.description.length > 80 && (
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
