import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por nombre, tripulación o fruta...'
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 w-full max-w-xl">
      <div className="relative flex items-center">
        <label htmlFor="pirate-search-input" className="sr-only">
          Buscar pirata
        </label>
        <div className="absolute left-4 pointer-events-none text-[#D9A441]">
          <Search className="w-5 h-5" />
        </div>
        <input
          id="pirate-search-input"
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3 rounded-xl bg-[#071B2B] text-[#F7FAFC] border-2 border-[#D9A441]/40 placeholder-[#E9D8B4]/50 focus:outline-none focus:border-[#22C7C9] focus:ring-2 focus:ring-[#22C7C9]/30 transition-all text-sm sm:text-base font-sans shadow-inner"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 text-stone-400 hover:text-white p-1"
            aria-label="Borrar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 px-4 py-2 rounded-lg bg-[#22C7C9] hover:bg-[#1bb2b4] text-[#071B2B] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
