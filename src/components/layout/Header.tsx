import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Skull, Menu, X, Star, Anchor, Sparkles, Ship } from 'lucide-react';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const navLinks = [
    { to: '/', label: 'Inicio', icon: Compass },
    { to: '/explorar', label: 'Explorar', icon: Skull },
    { to: '/tripulaciones', label: 'Tripulaciones', icon: Anchor },
    { to: '/frutas', label: 'Frutas del Diablo', icon: Sparkles },
    { to: '/barcos', label: 'Barcos', icon: Ship },
    { to: '/favoritos', label: 'Favoritos', icon: Star, badge: favoritesCount },
    { to: '/contacto', label: 'Contacto' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#071B2B]/90 border-b border-[#D9A441]/30 text-[#F7FAFC] shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#22C7C9] rounded-lg p-1"
            aria-label="GRAND LINE — Inicio"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#102E46] border border-[#D9A441] shadow-md group-hover:border-[#22C7C9] transition-colors">
              <Skull className="w-6 h-6 text-[#D9A441] group-hover:text-[#22C7C9] transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#B83A3A] animate-ping opacity-75" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-black tracking-widest text-[#D9A441] group-hover:text-[#22C7C9] transition-colors">
                GRAND LINE
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider text-[#E9D8B4]/80 font-sans uppercase">
                One Piece World Explorer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Navegación principal">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'text-[#22C7C9] bg-[#102E46]/80 border-b-2 border-[#22C7C9] shadow-sm font-bold'
                        : 'text-[#E9D8B4] hover:text-[#22C7C9] hover:bg-[#102E46]/40'
                    }`
                  }
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-[#071B2B] bg-[#D9A441] rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-[#E9D8B4] hover:text-[#22C7C9] hover:bg-[#102E46] focus:outline-none focus:ring-2 focus:ring-[#22C7C9]"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071B2B]/98 border-b border-[#D9A441]/40 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-slide-in">
          <nav className="flex flex-col space-y-1.5" aria-label="Menú móvil">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#102E46] text-[#22C7C9] border-l-4 border-[#22C7C9]'
                        : 'text-[#E9D8B4] hover:bg-[#102E46]/60 hover:text-[#22C7C9]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-[#D9A441]" />}
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-[#071B2B] bg-[#D9A441] rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
