import React from 'react';
import { Ship as ShipIcon, Search, Compass, Info, Map } from 'lucide-react';
import { useShips } from '../hooks/useShips';
import { ShipCard } from '../components/ships/ShipCard';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { EmptyState } from '../components/feedback/EmptyState';

export const ShipsPage: React.FC = () => {
  const {
    ships,
    totalCount,
    rawCount,
    loading,
    error,
    search,
    setSearch,
    retry
  } = useShips();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header section */}
      <div className="text-center sm:text-left space-y-2 border-b border-[#D9A441]/30 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
          <ShipIcon className="w-4 h-4 text-[#D9A441]" />
          <span>FLOTA NAVAL Y EMBARCACIONES</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
          FLOTA DEL GRAND LINE
        </h1>
        <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-2xl font-sans">
          Las embarcaciones legendarias que surcan los mares más peligrosos, desde el Vogue Merry hasta los buques de guerra de la Marina.
        </p>
      </div>

      {/* Styled Nautical Sea Chart Banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#D9A441] shadow-2xl bg-[#071B2B]">
        <img
          src="/assets/images/ships.jpg"
          alt="Mapa cartográfico y navío de alta mar"
          className="w-full h-56 sm:h-72 object-cover object-center filter brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B2B] via-[#071B2B]/40 to-transparent flex items-end p-6 sm:p-8">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9A441] text-[#071B2B] font-cinzel">
              CARTOGRAFÍA NAVAL OFICIAL
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#F7FAFC]">
              Bitácora de Embarcaciones Registradas
            </h2>
            <p className="text-xs sm:text-sm text-[#E9D8B4] leading-relaxed">
              Catálogo histórico de navíos piratas, buques de los Marines y embarcaciones legendarias verificadas por la bitácora de la API oficial de One Piece.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#102E46]/80 border border-[#D9A441]/30 backdrop-blur-md">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#D9A441] absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar navío por nombre, capitán o tripulación..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9]"
          />
        </div>

        <span className="text-xs text-[#E9D8B4] font-medium">
          Mostrando {totalCount} de {rawCount} navíos
        </span>
      </div>

      {/* Content states */}
      {loading && (
        <LoadingState
          message="Inspeccionando los astilleros de Water 7 y el registro de la marina..."
          count={6}
        />
      )}

      {error && !loading && (
        <ErrorState
          title="NO SE PUDIERON CARGAR LAS EMBARCACIONES"
          message={error}
          onRetry={retry}
        />
      )}

      {!loading && !error && ships.length === 0 && (
        <EmptyState
          title="Ningún navío localizado"
          message="No encontramos barcos que coincidan con la búsqueda introducida."
          actionText="Restablecer búsqueda"
          onAction={() => setSearch('')}
          icon={<Compass className="w-10 h-10 text-[#D9A441]" />}
        />
      )}

      {!loading && !error && ships.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ships.map(ship => (
            <ShipCard key={ship.id} ship={ship} />
          ))}
        </div>
      )}

    </div>
  );
};
