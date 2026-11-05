import { useState, useEffect, useCallback, useMemo } from 'react';
import { Crew } from '../types/crew';
import { api } from '../services/api';
import { useDebounce } from './useDebounce';

export function useCrews() {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const [onlyYonko, setOnlyYonko] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 300);

  const fetchCrews = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCrews(signal);
      setCrews(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error al cartografiar las tripulaciones.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCrews(controller.signal);
    return () => controller.abort();
  }, [fetchCrews]);

  const filteredCrews = useMemo(() => {
    return crews.filter(crew => {
      if (onlyYonko && !crew.is_yonko) return false;
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase().trim();
        const nameMatches = crew.name?.toLowerCase().includes(query);
        const romanMatches = crew.roman_name?.toLowerCase().includes(query);
        if (!nameMatches && !romanMatches) return false;
      }
      return true;
    });
  }, [crews, debouncedSearch, onlyYonko]);

  return {
    crews: filteredCrews,
    totalCount: filteredCrews.length,
    rawCount: crews.length,
    loading,
    error,
    search,
    setSearch,
    onlyYonko,
    setOnlyYonko,
    retry: () => fetchCrews()
  };
}
