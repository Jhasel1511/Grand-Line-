import { useState, useEffect, useCallback, useMemo } from 'react';
import { Fruit } from '../types/fruit';
import { api } from '../services/api';
import { useDebounce } from './useDebounce';

export function useFruits() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const debouncedSearch = useDebounce(search, 300);

  const fetchFruits = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getFruits(signal);
      setFruits(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error al desvelar las Frutas del Diablo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFruits(controller.signal);
    return () => controller.abort();
  }, [fetchFruits]);

  // Derived types
  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    fruits.forEach(f => {
      if (f.type) set.add(f.type.trim());
    });
    return Array.from(set).sort();
  }, [fruits]);

  const filteredFruits = useMemo(() => {
    return fruits.filter(fruit => {
      if (selectedType !== 'all') {
        if (!fruit.type || !fruit.type.toLowerCase().includes(selectedType.toLowerCase())) {
          return false;
        }
      }
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase().trim();
        const nameMatch = fruit.name?.toLowerCase().includes(query);
        const romanMatch = fruit.roman_name?.toLowerCase().includes(query);
        const descMatch = fruit.description?.toLowerCase().includes(query);
        if (!nameMatch && !romanMatch && !descMatch) return false;
      }
      return true;
    });
  }, [fruits, debouncedSearch, selectedType]);

  return {
    fruits: filteredFruits,
    totalCount: filteredFruits.length,
    rawCount: fruits.length,
    loading,
    error,
    search,
    setSearch,
    selectedType,
    setSelectedType,
    availableTypes,
    retry: () => fetchFruits()
  };
}
