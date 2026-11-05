import React from 'react';
import { Sparkles, Search, Compass } from 'lucide-react';
import { useFruits } from '../hooks/useFruits';
import { DevilFruitCard } from '../components/fruits/DevilFruitCard';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { EmptyState } from '../components/feedback/EmptyState';

export const FruitsPage: React.FC = () => {
  const {
    fruits,
    totalCount,
    rawCount,
    loading,
    error,
    search,
    setSearch,
    selectedType,
    setSelectedType,
    availableTypes,
    retry
  } = useFruits();

  const fruitCategories = [
    { id: 'all', label: 'Todas las Frutas' },
    { id: 'paramecia', label: 'Paramecia' },
    { id: 'zoan', label: 'Zoan' },
    { id: 'logia', label: 'Logia' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header section */}
      <div className="text-center sm:text-left space-y-2 border-b border-[#D9A441]/30 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
          <Sparkles className="w-4 h-4 text-[#D9A441]" />
          <span>ENCICLOPEDIA DE AKUMA NO MI</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
          LOS PODERES DEL MAR
        </h1>
        <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-2xl font-sans">
          Descubre los misterios que esconden las Frutas del Diablo y las habilidades sobrehumanas otorgadas a sus poseedores.
        </p>
      </div>

      {/* Search and Category Pill Filters */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#102E46]/80 border border-[#D9A441]/30 backdrop-blur-md">
        
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#D9A441] absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar fruta por nombre o poder..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#D9A441]/20">
          <span className="text-xs font-semibold text-[#E9D8B4] mr-2">Categoría:</span>
          {fruitCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              type="button"
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedType === cat.id
                  ? 'bg-[#22C7C9] text-[#071B2B] border-[#22C7C9] shadow-md'
                  : 'bg-[#071B2B] text-[#E9D8B4] border-[#D9A441]/30 hover:border-[#D9A441]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#E9D8B4]/70">
            {totalCount} de {rawCount} frutas
          </span>
        </div>

      </div>

      {/* Dynamic Content */}
      {loading && (
        <LoadingState
          message="Consultando la gran enciclopedia de las Frutas del Diablo..."
          count={8}
        />
      )}

      {error && !loading && (
        <ErrorState
          title="NO SE PUDIERON CARGAR LAS FRUTAS"
          message={error}
          onRetry={retry}
        />
      )}

      {!loading && !error && fruits.length === 0 && (
        <EmptyState
          title="Ninguna fruta localizada"
          message="No se encontraron frutas del diablo con los filtros actuales."
          actionText="Ver todas las frutas"
          onAction={() => {
            setSearch('');
            setSelectedType('all');
          }}
          icon={<Sparkles className="w-10 h-10 text-[#D9A441]" />}
        />
      )}

      {!loading && !error && fruits.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fruits.map(fruit => (
            <DevilFruitCard key={fruit.id} fruit={fruit} />
          ))}
        </div>
      )}

    </div>
  );
};
