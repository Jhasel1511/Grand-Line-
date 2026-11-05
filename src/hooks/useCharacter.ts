import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types/character';
import { api } from '../services/api';

export function useCharacter(id: string | undefined) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = useCallback(async (signal?: AbortSignal) => {
    if (!id || isNaN(Number(id))) {
      setError('Identificador de pirata no válido o extraviado en el mar.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.getCharacterById(id, signal);
      setCharacter(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(
        err instanceof Error
          ? err.message
          : 'No se ha podido localizar a este navegante en los archivos navales.'
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const load = async () => {
      try {
        await fetchCharacter(controller.signal);
      } catch {
        if (!isCancelled) {
          // ignore if cancelled
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [fetchCharacter]);

  return {
    character,
    loading,
    error,
    retry: () => fetchCharacter()
  };
}
