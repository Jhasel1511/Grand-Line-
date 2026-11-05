import React from 'react';
import { Anchor, Search, Filter, Compass } from 'lucide-react';
import { useCrews } from '../hooks/useCrews';
import { CrewCard } from '../components/crews/CrewCard';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { EmptyState } from '../components/feedback/EmptyState';

export const CrewsPage: React.FC = () => {
  const {
    crews,
    totalCount,
    rawCount,
    loading,
    error,
    search,
    setSearch,
    onlyYonko,
    setOnlyYonko,
    retry
  } = useCrews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header section */}
      <div className="text-center sm:text-left space-y-2 border-b border-[#D9A441]/30 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
          <Anchor className="w-4 h-4 text-[#D9A441]" />
          <span>TERRITORIOS Y FLOTAS PIRATAS</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
          ARMADAS Y TRIPULACIONES
        </h1>
        <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-2xl font-sans">
          Conoce las organizaciones piratas que disputan el control de los mares y desafían el poder del Gobierno Mundial.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#102E46]/80 border border-[#D9A441]/30 backdrop-blur-md">
        
        {/* Search input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#D9A441] absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tripulación por nombre..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9]"
          />
        </div>

        {/* Yonko Toggle & Counter */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <button
            onClick={() => setOnlyYonko(!onlyYonko)}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              onlyYonko
                ? 'bg-[#D9A441] text-[#071B2B] border-[#D9A441] shadow-lg'
                : 'bg-[#071B2B] text-[#E9D8B4] border-[#D9A441]/40 hover:border-[#D9A441]'
            }`}
          >
            <span>Solo Flotas Yonko (Emperadores)</span>
          </button>

          <span className="text-xs text-[#E9D8B4] font-medium whitespace-nowrap">
            {totalCount} de {rawCount} flotas
          </span>
        </div>

      </div>

      {/* Content states */}
      {loading && (
        <LoadingState
          message="Mapeando los dominios marítimos y las flotas del Nuevo Mundo..."
          count={8}
        />
      )}

      {error && !loading && (
        <ErrorState
          title="NO SE PUDIERON CARGAR LAS TRIPULACIONES"
          message={error}
          onRetry={retry}
        />
      )}

      {!loading && !error && crews.length === 0 && (
        <EmptyState
          title="Ninguna tripulación avistada"
          message="No hay registros náuticos que coincidan con los criterios de búsqueda seleccionados."
          actionText="Mostrar todas las tripulaciones"
          onAction={() => {
            setSearch('');
            setOnlyYonko(false);
          }}
          icon={<Compass className="w-10 h-10 text-[#D9A441]" />}
        />
      )}

      {!loading && !error && crews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crews.map(crew => (
            <CrewCard key={crew.id} crew={crew} />
          ))}
        </div>
      )}

    </div>
  );
};
