import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Skull, Anchor, Sparkles, Ship, ArrowRight, Compass } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { CharacterGrid } from '../components/characters/CharacterGrid';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { Character } from '../types/character';
import { api, parseBountyNumeric } from '../services/api';

export const HomePage: React.FC = () => {
  const [legends, setLegends] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLegends = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCharacters();
      // Select famous legends with highest bounties or iconic heroes
      const sorted = [...data]
        .sort((a, b) => parseBountyNumeric(b.bounty) - parseBountyNumeric(a.bounty))
        .slice(0, 6);
      setLegends(sorted);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al conectar con los mares de One Piece.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLegends();
  }, []);

  const discoveryCards = [
    {
      title: 'Piratas y Aventureros',
      desc: 'Consulta los expedientes y carteles de SE BUSCA de los forajidos más notorios.',
      image: '/assets/images/characters.jpg',
      to: '/explorar',
      icon: Skull,
      badge: '780+ Expedientes'
    },
    {
      title: 'Grandes Flotas y Tripulaciones',
      desc: 'Explora los territorios y armadas piratas que dominan las cuatro esquinas del mar.',
      image: '/assets/images/crews.jpg',
      to: '/tripulaciones',
      icon: Anchor,
      badge: '140+ Armadas'
    },
    {
      title: 'Poderes de Frutas del Diablo',
      desc: 'Adéntrate en los secretos de las frutas Paramecia, Zoan y Logia.',
      image: '/assets/images/fruits.jpg',
      to: '/frutas',
      icon: Sparkles,
      badge: '210+ Habilidades'
    },
    {
      title: 'Navíos y Rutas Marítimas',
      desc: 'Conoce las carabelas y galeones legendarios que navegan por el Grand Line.',
      image: '/assets/images/ships.jpg',
      to: '/barcos',
      icon: Ship,
      badge: '90+ Embarcaciones'
    }
  ];

  return (
    <div className="w-full space-y-20 pb-20">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Discovery Section: EL GRAND LINE TE ESPERA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102E46] border border-[#D9A441] text-[#D9A441] text-xs font-cinzel font-bold">
            <Compass className="w-4 h-4 text-[#22C7C9]" />
            <span>CARTOGRAFÍA DEL MUNDO</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-[#D9A441] tracking-tight">
            EL GRAND LINE TE ESPERA
          </h2>
          <p className="text-base text-[#E9D8B4] font-sans">
            Elige tu rumbo de navegación y descubre los cuatro pilares fundamentales que gobiernan los océanos del mundo.
          </p>
        </div>

        {/* 4 Visual Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoveryCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.to}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#D9A441]/40 bg-[#102E46] shadow-xl hover:border-[#22C7C9] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image background with overlay */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#071B2B]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102E46] via-[#102E46]/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#071B2B]/90 border border-[#D9A441] text-[#D9A441]">
                    {card.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#22C7C9]">
                      <Icon className="w-5 h-5 text-[#D9A441]" />
                      <h3 className="font-cinzel font-bold text-lg text-[#F7FAFC]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#E9D8B4]/80 leading-relaxed font-sans">
                      {card.desc}
                    </p>
                  </div>

                  <Link
                    to={card.to}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#071B2B] hover:bg-[#22C7C9] text-[#D9A441] hover:text-[#071B2B] font-cinzel text-xs font-bold tracking-widest border border-[#D9A441]/40 hover:border-[#22C7C9] transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg cursor-pointer"
                  >
                    <span>EXPLORAR</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Characters: LEYENDAS DE LOS MARES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9A441]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
              <Skull className="w-4 h-4 text-[#D9A441]" />
              <span>LOS MÁS BUSCADOS DEL GOBIERNO MUNDIAL</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-[#D9A441]">
              LEYENDAS DE LOS MARES
            </h2>
            <p className="text-sm text-[#E9D8B4]/80 max-w-xl">
              Navegantes cuyas recompensas desafían el orden del mundo. Obtenidos en tiempo real desde la bitácora naval.
            </p>
          </div>

          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#102E46] hover:bg-[#22C7C9] text-[#D9A441] hover:text-[#071B2B] border border-[#D9A441] hover:border-[#22C7C9] font-cinzel font-bold text-xs tracking-wider transition-all duration-200 shadow-md shrink-0 cursor-pointer"
          >
            <span>VER TODOS LOS PIRATAS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic State */}
        {loading && <LoadingState message="Buscando las leyendas del Grand Line..." count={6} />}
        
        {error && (
          <ErrorState
            title="NO SE PUDO CARGAR LAS LEYENDAS"
            message={error}
            onRetry={fetchLegends}
          />
        )}

        {!loading && !error && legends.length > 0 && (
          <CharacterGrid characters={legends} />
        )}

      </section>

    </div>
  );
};
