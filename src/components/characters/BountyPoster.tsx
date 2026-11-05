import React from 'react';
import { Star, Shield, Anchor, Sparkles, User, Ruler, Calendar, Award } from 'lucide-react';
import { Character } from '../../types/character';
import { formatBounty } from '../../services/api';
import { useFavorites } from '../../context/FavoritesContext';
import { getCharacterPortrait, getNauticalAvatarSvg } from '../../utils/characterAvatars';

interface BountyPosterProps {
  character: Character;
  onRequestDelete?: (character: Character) => void;
}

export const BountyPoster: React.FC<BountyPosterProps> = ({ character, onRequestDelete }) => {
  const { isFavorite, addFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const portrait = getCharacterPortrait(character.name, character.id) || getNauticalAvatarSvg(character.name, character.bounty);

  const handleFavoriteToggle = () => {
    if (favorite) {
      if (onRequestDelete) {
        onRequestDelete(character);
      } else {
        addFavorite(character);
      }
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      
      {/* Authentic Large WANTED Poster (Left side on desktop) */}
      <div className="md:col-span-5 wanted-poster rounded-2xl p-5 shadow-2xl relative flex flex-col items-center">
        
        {/* Marine Seal / Wanted Header */}
        <div className="w-full text-center pb-2 border-b-2 border-[#754C24]/40">
          <span className="text-[10px] tracking-widest font-black uppercase text-[#754C24] block">
            MARINE HEADQUARTERS
          </span>
          <h2 className="font-pirate text-5xl sm:text-6xl text-[#2c1a0a] tracking-widest leading-none my-1">
            WANTED
          </h2>
          <span className="font-serif font-black text-xs tracking-widest text-[#754C24] uppercase">
            DEAD OR ALIVE
          </span>
        </div>

        {/* Large Portrait */}
        <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#071B2B] border-4 border-[#754C24] shadow-inner my-4 relative">
          <img
            src={portrait}
            alt={`Retrato oficial de ${character.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getNauticalAvatarSvg(character.name, character.bounty);
            }}
          />
          {character.status && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#071B2B]/90 border border-[#D9A441] text-[#D9A441] text-xs font-bold uppercase tracking-wider">
              {character.status}
            </div>
          )}
        </div>

        {/* Name on Poster */}
        <div className="w-full text-center py-2 border-t-2 border-[#754C24]/40">
          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#2c1a0a] uppercase tracking-wide">
            {character.name}
          </h3>
          {character.crew?.roman_name && (
            <p className="text-xs text-[#754C24] italic font-serif">
              "{character.crew.roman_name}"
            </p>
          )}
        </div>

        {/* Big Highlighted Bounty */}
        <div className="w-full my-3 p-3 rounded-xl bg-[#754C24]/15 border-2 border-[#754C24]/30 text-center">
          <span className="text-xs font-black tracking-widest text-[#754C24] uppercase block">
            RECOMPENSA EN BERRIES
          </span>
          <p className="font-pirate text-3xl sm:text-4xl text-[#B83A3A] font-bold tracking-wider leading-none mt-1">
            {formatBounty(character.bounty)}
          </p>
        </div>

        <p className="text-[10px] text-center font-serif text-[#754C24]/80 tracking-wider">
          KONO SAKUHIN WA FICTION DETHUNODE JITSUZAISURU JINBUTSU DANTAI SONOTA NO SOSHIKI TO WA ISSAI KANKEI ARIMASEN
        </p>

        {/* Favorite Action Button on Poster */}
        <button
          onClick={handleFavoriteToggle}
          type="button"
          className={`mt-4 w-full py-3 px-4 rounded-xl font-cinzel font-bold text-sm tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            favorite
              ? 'bg-[#B83A3A] hover:bg-[#962828] text-white ring-2 ring-[#B83A3A]'
              : 'bg-[#102E46] hover:bg-[#071B2B] text-[#D9A441] hover:text-[#22C7C9]'
          }`}
        >
          <Star className={`w-5 h-5 ${favorite ? 'fill-current text-[#D9A441]' : ''}`} />
          <span>{favorite ? 'EN TU BOTÍN (QUITAR)' : 'AGREGAR A BOTÍN FAVORITO'}</span>
        </button>
      </div>

      {/* Explorer Logbook File / Ficha de Exploración (Right side on desktop) */}
      <div className="md:col-span-7 bg-[#102E46]/90 border border-[#D9A441]/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl text-[#F7FAFC] space-y-6">
        
        <div className="border-b border-[#D9A441]/30 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
            <Award className="w-4 h-4 text-[#D9A441]" />
            <span>EXPEDIENTE NAVAL OFICIAL • REGISTRO #{character.id}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-[#D9A441] mt-1">
            {character.name}
          </h1>
          <p className="text-sm text-[#E9D8B4]/80 mt-1">
            {character.job ? `${character.job} • ` : ''}
            {character.crew?.name || 'Pirata independiente del Grand Line'}
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          
          {/* Tripulación */}
          <div className="p-3.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <div className="flex items-center gap-2 text-[#22C7C9] mb-1 font-semibold text-xs uppercase">
              <Anchor className="w-4 h-4 text-[#D9A441]" />
              <span>Tripulación</span>
            </div>
            <p className="font-medium text-[#F7FAFC]">
              {character.crew?.name || 'No afiliado / Desconocida'}
            </p>
            {character.crew?.is_yonko && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D9A441] text-[#071B2B]">
                FLOTA EMPERADOR (YONKO)
              </span>
            )}
          </div>

          {/* Cargo */}
          <div className="p-3.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <div className="flex items-center gap-2 text-[#22C7C9] mb-1 font-semibold text-xs uppercase">
              <Shield className="w-4 h-4 text-[#D9A441]" />
              <span>Cargo / Profesión</span>
            </div>
            <p className="font-medium text-[#F7FAFC]">
              {character.job || 'Sin cargo registrado'}
            </p>
          </div>

          {/* Edad */}
          <div className="p-3.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <div className="flex items-center gap-2 text-[#22C7C9] mb-1 font-semibold text-xs uppercase">
              <Calendar className="w-4 h-4 text-[#D9A441]" />
              <span>Edad</span>
            </div>
            <p className="font-medium text-[#F7FAFC]">
              {character.age || 'Edad no revelada'}
            </p>
          </div>

          {/* Altura / Tamaño */}
          <div className="p-3.5 rounded-xl bg-[#071B2B]/70 border border-[#D9A441]/20">
            <div className="flex items-center gap-2 text-[#22C7C9] mb-1 font-semibold text-xs uppercase">
              <Ruler className="w-4 h-4 text-[#D9A441]" />
              <span>Estatura</span>
            </div>
            <p className="font-medium text-[#F7FAFC]">
              {character.size || 'Estatura no registrada'}
            </p>
          </div>

        </div>

        {/* Fruta del Diablo Section (If exists) */}
        {character.fruit ? (
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#102E46] to-[#071B2B] border-2 border-[#22C7C9]/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#22C7C9] font-bold text-sm">
                <Sparkles className="w-5 h-5 text-[#D9A441]" />
                <span className="font-cinzel">Poder de Fruta del Diablo</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#22C7C9]/20 text-[#22C7C9] border border-[#22C7C9]/40">
                {character.fruit.type || 'Tipo desconocido'}
              </span>
            </div>

            <h4 className="font-cinzel text-lg font-bold text-[#D9A441]">
              {character.fruit.name}
              {character.fruit.roman_name && (
                <span className="text-xs text-[#E9D8B4]/70 font-normal ml-2 italic">
                  ({character.fruit.roman_name})
                </span>
              )}
            </h4>

            <p className="text-sm text-[#E9D8B4]/90 leading-relaxed font-sans">
              {character.fruit.description || 'Poderes místicos no detallados en los anales marinos.'}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#071B2B]/50 border border-[#D9A441]/20 text-xs text-[#E9D8B4]/70 flex items-center gap-2">
            <User className="w-4 h-4 text-[#D9A441]" />
            <span>Este personaje no es usuario conocido de Fruta del Diablo o combate con artes marciales / espadas.</span>
          </div>
        )}

      </div>

    </div>
  );
};
