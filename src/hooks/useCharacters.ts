import { useState, useEffect, useMemo, useCallback } from 'react';
import { Character, CharacterFilterOptions } from '../types/character';
import { api, parseBountyNumeric } from '../services/api';
import { useDebounce } from './useDebounce';
import { normalizeCrewName, normalizeStatus } from '../utils/normalize';

const ITEMS_PER_PAGE = 12;

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<CharacterFilterOptions>({
    search: '',
    crew: '',
    status: '',
    bountyRange: ''
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const debouncedSearch = useDebounce(filters.search, 300);

  const fetchCharacters = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCharacters(signal);
      setCharacters(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Error inesperado al consultar los piratas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCharacters(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchCharacters]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.crew, filters.status, filters.bountyRange]);

  // Derived filter options from real API data — use normalized names for display
  const availableCrews = useMemo(() => {
    const crewsMap = new Map<string, string>(); // normalized → raw (for filtering)
    characters.forEach(c => {
      if (c.crew && c.crew.name) {
        const raw = c.crew.name.trim();
        const normalized = normalizeCrewName(raw);
        crewsMap.set(normalized, raw);
      }
    });
    return Array.from(crewsMap.keys()).sort((a, b) => a.localeCompare(b));
  }, [characters]);

  // Build a lookup: normalized crew display name → raw API value for filtering
  const crewNormalizedToRaw = useMemo(() => {
    const map = new Map<string, string>();
    characters.forEach(c => {
      if (c.crew?.name) {
        const raw = c.crew.name.trim();
        map.set(normalizeCrewName(raw), raw);
      }
    });
    return map;
  }, [characters]);

  const availableStatuses = useMemo(() => {
    const statusSet = new Set<string>();
    characters.forEach(c => {
      if (c.status) {
        statusSet.add(normalizeStatus(c.status));
      }
    });
    return Array.from(statusSet).sort();
  }, [characters]);

  // Filtered characters
  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      // Search by name
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase().trim();
        const nameMatches = character.name.toLowerCase().includes(query);
        const fruitMatches = character.fruit?.name.toLowerCase().includes(query);
        const crewMatches = character.crew?.name.toLowerCase().includes(query);
        if (!nameMatches && !fruitMatches && !crewMatches) {
          return false;
        }
      }

      // Filter by crew: compare against the raw API name, since filter was selected from normalized display
      if (filters.crew) {
        const rawCrewName = crewNormalizedToRaw.get(filters.crew) ?? filters.crew;
        if (!character.crew || character.crew.name !== rawCrewName) {
          return false;
        }
      }

      // Filter by status: compare normalized values
      if (filters.status) {
        if (!character.status || normalizeStatus(character.status) !== filters.status) {
          return false;
        }
      }

      // Filter by bounty range
      if (filters.bountyRange) {
        const bountyNum = parseBountyNumeric(character.bounty);
        if (filters.bountyRange === 'yonko' && bountyNum < 1000000000) return false;
        if (filters.bountyRange === 'high' && (bountyNum < 100000000 || bountyNum >= 1000000000)) return false;
        if (filters.bountyRange === 'medium' && (bountyNum < 30000000 || bountyNum >= 100000000)) return false;
        if (filters.bountyRange === 'low' && (bountyNum <= 0 || bountyNum >= 30000000)) return false;
        if (filters.bountyRange === 'none' && bountyNum > 0) return false;
      }

      return true;
    });
  }, [characters, debouncedSearch, filters.crew, filters.status, filters.bountyRange]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE));
  const paginatedCharacters = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCharacters, currentPage]);

  const updateSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const updateFilter = (key: keyof CharacterFilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      crew: '',
      status: '',
      bountyRange: ''
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    filters.search || filters.crew || filters.status || filters.bountyRange
  );

  return {
    characters: paginatedCharacters,
    totalCount: filteredCharacters.length,
    rawCount: characters.length,
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
    retry: () => fetchCharacters()
  };
}
