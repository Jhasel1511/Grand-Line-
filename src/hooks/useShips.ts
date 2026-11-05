import { useState, useEffect, useCallback, useMemo } from 'react';
import { Ship } from '../types/ship';
import { api } from '../services/api';
import { useDebounce } from './useDebounce';

export function useShips() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

  const fetchShips = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getShips(signal);
      setShips(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error al inspeccionar la flota naval.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchShips(controller.signal);
    return () => controller.abort();
  }, [fetchShips]);

  const filteredShips = useMemo(() => {
    return ships.filter(ship => {
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase().trim();
        const nameMatches = ship.name?.toLowerCase().includes(query);
        const romanMatches = ship.roman_name?.toLowerCase().includes(query);
        const crewMatches = ship.crew?.name?.toLowerCase().includes(query);
        const captainMatches = ship.character_captain?.name?.toLowerCase().includes(query);
        if (!nameMatches && !romanMatches && !crewMatches && !captainMatches) return false;
      }
      return true;
    });
  }, [ships, debouncedSearch]);

  return {
    ships: filteredShips,
    totalCount: filteredShips.length,
    rawCount: ships.length,
    loading,
    error,
    search,
    setSearch,
    retry: () => fetchShips()
  };
}
