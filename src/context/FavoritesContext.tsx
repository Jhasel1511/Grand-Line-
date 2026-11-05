import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character } from '../types/character';
import { useToast } from './ToastContext';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'grand_line_favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error al recuperar favoritos del cofre local:', e);
      return [];
    }
  });

  const { success, info } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Error al almacenar tesoros en localStorage:', e);
    }
  }, [favorites]);

  const addFavorite = (character: Character) => {
    setFavorites(prev => {
      // Prevent duplicates
      if (prev.some(item => item.id === character.id)) {
        return prev;
      }
      success(`¡${character.name} ha sido añadido a tu botín pirata! ฿`);
      return [...prev, character];
    });
  };

  const removeFavorite = (characterId: number) => {
    setFavorites(prev => {
      const target = prev.find(item => item.id === characterId);
      if (target) {
        info(`Has liberado a ${target.name} de tu botín.`);
      }
      return prev.filter(item => item.id !== characterId);
    });
  };

  const isFavorite = (characterId: number): boolean => {
    return favorites.some(item => item.id === characterId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        favoritesCount: favorites.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};
