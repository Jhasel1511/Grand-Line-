import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 border border-[#D9A441]/40 hover:border-[#D9A441] bg-[#071B2B]/60 hover:bg-[#102E46] text-[#D9A441] shadow-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22C7C9]"
      aria-label={isDark ? 'Cambiar a modo Pergamino / Claro' : 'Cambiar a modo Océano Profundo / Oscuro'}
      title={isDark ? 'Modo Pergamino (Claro)' : 'Modo Océano Profundo (Oscuro)'}
    >
      <span className="sr-only">Cambiar tema visual</span>
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 text-[#e8b959]" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 text-[#754C24]" />
      )}
    </button>
  );
};
