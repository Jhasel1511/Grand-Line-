import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CharacterFilterOptions } from '../../types/character';

interface FiltersPanelProps {
  filters: CharacterFilterOptions;
  availableCrews: string[];
  availableStatuses: string[];
  totalResults: number;
  totalAvailable: number;
  hasActiveFilters: boolean;
  onFilterChange: (key: keyof CharacterFilterOptions, value: string) => void;
  onClearFilters: () => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  availableCrews,
  availableStatuses,
  totalResults,
  totalAvailable,
  hasActiveFilters,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <div className="w-full bg-[#102E46]/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#D9A441]/30 shadow-xl space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9A441]/20">
        <div className="flex items-center gap-2 text-[#D9A441] font-cinzel font-bold text-base">
          <Filter className="w-5 h-5 text-[#22C7C9]" />
          <span>Filtros Navales</span>
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-[#E9D8B4] font-medium">
            Mostrando <strong className="text-[#22C7C9]">{totalResults}</strong> de {totalAvailable} piratas
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#B83A3A] hover:bg-[#B83A3A]/10 border border-[#B83A3A]/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Select Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Crew Selector */}
        <div>
          <label htmlFor="filter-crew" className="block text-xs font-semibold text-[#E9D8B4] mb-1.5 uppercase tracking-wide">
            Tripulación
          </label>
          <select
            id="filter-crew"
            value={filters.crew}
            onChange={(e) => onFilterChange('crew', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9] focus:ring-1 focus:ring-[#22C7C9] cursor-pointer"
          >
            <option value="">Todas las tripulaciones</option>
            {availableCrews.map(crew => (
              <option key={crew} value={crew}>
                {crew}
              </option>
            ))}
          </select>
        </div>

        {/* Status Selector */}
        <div>
          <label htmlFor="filter-status" className="block text-xs font-semibold text-[#E9D8B4] mb-1.5 uppercase tracking-wide">
            Estado de vida
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9] focus:ring-1 focus:ring-[#22C7C9] cursor-pointer capitalize"
          >
            <option value="">Todos los estados</option>
            {availableStatuses.map(status => (
              <option key={status} value={status}>
                {status === 'vivant' || status === 'living' || status === 'alive' ? 'Vivo / En activo' : status === 'mort' || status === 'dead' ? 'Fallecido' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Bounty Range */}
        <div>
          <label htmlFor="filter-bounty" className="block text-xs font-semibold text-[#E9D8B4] mb-1.5 uppercase tracking-wide">
            Rango de Recompensa
          </label>
          <select
            id="filter-bounty"
            value={filters.bountyRange}
            onChange={(e) => onFilterChange('bountyRange', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#071B2B] text-[#F7FAFC] border border-[#D9A441]/40 text-sm focus:outline-none focus:border-[#22C7C9] focus:ring-1 focus:ring-[#22C7C9] cursor-pointer"
          >
            <option value="">Cualquier recompensa</option>
            <option value="yonko">Nivel Yonko (≥ ฿ 1.000.000.000)</option>
            <option value="high">Gran Recompensa (฿ 100M - 1.000M)</option>
            <option value="medium">Pirata Veterano (฿ 30M - 100M)</option>
            <option value="low">Novato (&lt; ฿ 30M)</option>
            <option value="none">Sin recompensa activa</option>
          </select>
        </div>

      </div>
    </div>
  );
};
