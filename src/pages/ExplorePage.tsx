import React from 'react';
import { Link } from 'react-router-dom';
import { Skull, Compass, ChevronRight } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';
import { SearchBar } from '../components/characters/SearchBar';
import { FiltersPanel } from '../components/characters/FiltersPanel';
import { CharacterGrid } from '../components/characters/CharacterGrid';
import { Pagination } from '../components/characters/Pagination';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { EmptyState } from '../components/feedback/EmptyState';

export const ExplorePage: React.FC = () => {
  const {
    characters,
    totalCount,
    rawCount,
    loading,
    error,
    filters,
    hasActiveFilters,
    availableCrews,
    availableStatuses,
    currentPage,
    totalPages,
    setCurrentPage,
    updateSearch,
    updateFilter,
    clearFilters,
    retry
  } = useCharacters();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb Navigation matching reference image */}
      <nav aria-label="Miga de pan" className="flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
        <Link to="/" className="hover:text-[#D9A441] transition-colors">
          INICIO
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#E9D8B4]/60" />
        <span className="text-[#D9A441]">EXPLORAR PERSONAJES</span>
      </nav>

      {/* Header section */}
      <div className="text-center sm:text-left space-y-2 border-b border-[#D9A441]/30 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
          <Skull className="w-4 h-4 text-[#D9A441]" />
          <span>EXPEDIENTES MARINOS DEL GRAND LINE</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
          ARCHIVO DE PIRATAS
        </h1>
        <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-2xl font-sans">
          Descubre las historias, poderes y recompensas de quienes se atreven a conquistar los mares.
        </p>
      </div>

      {/* Search and Quick Tools */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchBar
          value={filters.search}
          onChange={updateSearch}
          placeholder="Buscar pirata por nombre, fruta o tripulación..."
        />
      </div>

      {/* Filter Panel */}
      <FiltersPanel
        filters={filters}
        availableCrews={availableCrews}
        availableStatuses={availableStatuses}
        totalResults={totalCount}
        totalAvailable={rawCount}
        hasActiveFilters={hasActiveFilters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      {/* Main Content Area */}
      {loading && (
        <LoadingState
          message="Descifrando los carteles de recompensa del Cuartel General de la Marina..."
          count={12}
        />
      )}

      {error && !loading && (
        <ErrorState
          title="NO SE PUDO CARGAR LA INFORMACIÓN"
          message={error}
          onRetry={retry}
        />
      )}

      {!loading && !error && characters.length === 0 && (
        <EmptyState
          title="No hemos encontrado ningún pirata con esas características."
          message="Intenta cambiar los términos de búsqueda o restablecer los filtros para volver a divisar el horizonte."
          actionText="Limpiar filtros"
          onAction={clearFilters}
          icon={<Compass className="w-10 h-10 text-[#D9A441]" />}
        />
      )}

      {!loading && !error && characters.length > 0 && (
        <div className="space-y-8">
          <CharacterGrid characters={characters} />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

    </div>
  );
};
