import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Anchor, Eye } from 'lucide-react';
import { Character } from '../../types/character';
import { formatBounty } from '../../services/api';
import { useFavorites } from '../../context/FavoritesContext';
import { getCharacterPortrait, getNauticalAvatarSvg } from '../../utils/characterAvatars';
import { normalizeCrewName, normalizeStatus } from '../../utils/normalize';

interface CharacterCardProps {
  character: Character;
  onRequestDelete?: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onRequestDelete }) => {
  const { isFavorite, addFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const portrait = getCharacterPortrait(character.name, character.id) || getNauticalAvatarSvg(character.name, character.bounty);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      if (onRequestDelete) {
        onRequestDelete(character);
      } else {
        // Direct favorite toggle if no modal handler
        addFavorite(character);
      }
    } else {
      addFavorite(character);
    }
  };

  return (
    <article
      className="group relative flex flex-col wanted-poster rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      aria-label={`Cartel de recompensa de ${character.name}`}
    >
      {/* Top WANTED header banner */}
      <div className="pt-3 pb-1 text-center border-b border-[#754C24]/30">
        <h3 className="font-pirate text-2xl sm:text-3xl tracking-widest text-[#2c1a0a] uppercase leading-none">
          WANTED
        </h3>
        <p className="text-[9px] font-bold tracking-widest text-[#754C24] uppercase">
          DEAD OR ALIVE
        </p>
      </div>

      {/* Favorite Button (Star) */}
      <button
        onClick={handleFavoriteClick}
        type="button"
        aria-label={favorite ? `Quitar a ${character.name} de favoritos` : `Añadir a ${character.name} a favoritos`}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer ${
          favorite
            ? 'bg-[#D9A441] text-[#071B2B] ring-2 ring-[#D9A441]'
            : 'bg-[#071B2B]/70 text-[#E9D8B4] hover:text-[#D9A441] hover:bg-[#071B2B]'
        }`}
      >
        <Star className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
      </button>

      {/* Character Image Container */}
      <div className="p-3">
        <div className="relative w-full aspect-[4/4.5] rounded-lg overflow-hidden bg-[#071B2B] border-2 border-[#754C24]/60 shadow-inner group-hover:border-[#D9A441] transition-colors">
          <img
            src={portrait}
            alt={`Retrato oficial de ${character.name}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getNauticalAvatarSvg(character.name, character.bounty);
            }}
          />
          {character.status && (() => {
            const displayStatus = normalizeStatus(character.status);
            const isAlive = displayStatus === 'Alive';
            return (
              <span
                className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                  isAlive
                    ? 'bg-[#102E46]/90 text-[#22C7C9] border border-[#22C7C9]/40'
                    : 'bg-[#2a0e0e]/90 text-[#B83A3A] border border-[#B83A3A]/40'
                }`}
              >
                {displayStatus}
              </span>
            );
          })()}
        </div>
      </div>

      {/* Character Info */}
      <div className="px-3 pb-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="text-center">
          <h4 className="font-cinzel font-black text-lg text-[#2c1a0a] line-clamp-1 uppercase tracking-tight group-hover:text-[#B83A3A] transition-colors">
            {character.name}
          </h4>
          
          {/* Bounty Section */}
          <div className="mt-1 py-1 px-2 rounded bg-[#754C24]/10 border border-[#754C24]/20">
            <span className="text-[10px] font-semibold text-[#754C24] uppercase block">
              RECOMPENSA
            </span>
            <span className="font-pirate text-xl text-[#B83A3A] tracking-wider font-bold">
              {formatBounty(character.bounty)}
            </span>
          </div>
        </div>

        {/* Crew & Job metadata */}
        <div className="space-y-1 text-xs text-[#553414] font-medium pt-1 border-t border-[#754C24]/20">
          <div className="flex items-center gap-1.5 truncate">
            <Anchor className="w-3.5 h-3.5 shrink-0 text-[#754C24]" />
            <span className="truncate">
              {normalizeCrewName(character.crew?.name) ?? 'Pirata solitario'}
            </span>
          </div>
          {character.job && (
            <div className="flex items-center gap-1.5 truncate">
              <Shield className="w-3.5 h-3.5 shrink-0 text-[#754C24]" />
              <span className="truncate">{character.job}</span>
            </div>
          )}
        </div>

        {/* Action Button: Ver detalles */}
        <Link
          to={`/personaje/${character.id}`}
          className="mt-2 w-full py-2 px-3 rounded-lg bg-[#102E46] hover:bg-[#071B2B] text-[#F7FAFC] font-cinzel text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer group-hover:bg-[#22C7C9] group-hover:text-[#071B2B]"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>VER DETALLES</span>
        </Link>
      </div>
    </article>
  );
};
