import React from 'react';
import { Link } from 'react-router-dom';
import { Skull, Compass, Anchor, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#040e17] text-[#E9D8B4] border-t border-[#D9A441]/30 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand & Concept */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#102E46] border border-[#D9A441]">
              <Skull className="w-5 h-5 text-[#D9A441]" />
            </div>
            <span className="font-cinzel text-xl font-bold tracking-widest text-[#D9A441]">
              GRAND LINE
            </span>
          </div>
          <p className="text-sm text-[#E9D8B4]/70 max-w-md leading-relaxed font-sans">
            Una expedición interactiva por el universo de One Piece. Descubre carteles de recompensa, las tripulaciones más temidas, los poderes místicos de las Frutas del Diablo y las leyendas que desafían al Gobierno Mundial.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#22C7C9] font-mono">
            <Compass className="w-4 h-4 animate-spin text-[#D9A441]" style={{ animationDuration: '20s' }} />
            <span>COORDENADAS LOG POSE: 0° 19' S, 124° 50' E • MAR DEL NUEVO MUNDO</span>
          </div>
        </div>

        {/* Nautical Routes */}
        <div>
          <h4 className="font-cinzel text-base font-bold text-[#D9A441] mb-3 flex items-center gap-2">
            <Anchor className="w-4 h-4 text-[#22C7C9]" /> Rutas del Mar
          </h4>
          <ul className="space-y-2 text-sm text-[#E9D8B4]/80">
            <li>
              <Link to="/explorar" className="hover:text-[#22C7C9] transition-colors">
                Archivo de Piratas
              </Link>
            </li>
            <li>
              <Link to="/tripulaciones" className="hover:text-[#22C7C9] transition-colors">
                Tripulaciones y Flotas
              </Link>
            </li>
            <li>
              <Link to="/frutas" className="hover:text-[#22C7C9] transition-colors">
                Frutas del Diablo
              </Link>
            </li>
            <li>
              <Link to="/barcos" className="hover:text-[#22C7C9] transition-colors">
                Navíos Legendarios
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="hover:text-[#22C7C9] transition-colors">
                Mi Botín Guardado
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-[#22C7C9] transition-colors">
                Mensaje en una Botella
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Lore */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-base font-bold text-[#D9A441] mb-3">
            Bitácora de Navegación
          </h4>
          <p className="text-xs text-[#E9D8B4]/60 leading-relaxed">
            One Piece y todos sus personajes son propiedad de Eiichiro Oda, Shueisha y Toei Animation. Datos náuticos obtenidos mediante la API pública de api-onepiece.com.
          </p>
          <div className="p-3 rounded-lg bg-[#102E46]/50 border border-[#D9A441]/20">
            <p className="text-xs font-pirate text-[#D9A441] text-base italic">
              "¡La era de los piratas que buscan sus sueños nunca terminará!"
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#102E46] flex flex-col sm:flex-row items-center justify-between text-xs text-[#E9D8B4]/60 gap-4">
        <p>© 2026 GRAND LINE EXPLORER • Travesía desarrollada con React, TypeScript y Tailwind CSS.</p>
        <p className="flex items-center gap-1">
          Hecho con <Heart className="w-3.5 h-3.5 text-[#B83A3A] fill-current" /> para exploradores del océano por Jhasel
        </p>
      </div>
    </footer>
  );
};
