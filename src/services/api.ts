import { Character } from '../types/character';
import { Crew } from '../types/crew';
import { Fruit } from '../types/fruit';
import { Ship } from '../types/ship';

const BASE_URL = 'https://api.api-onepiece.com/v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();

class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}, signal?: AbortSignal, timeoutMs = 20000): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const cacheKey = endpoint;

  // Check in-memory cache first
  const cached = memoryCache.get(cacheKey) as CacheEntry<T> | undefined;
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `Error naval en la respuesta de la API (${response.status}: ${response.statusText})`,
        response.status
      );
    }

    const data: T = await response.json();

    // Cache successful responses
    memoryCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('La llamada a alta mar ha tardado demasiado o ha sido interrumpida.');
    }
    throw new ApiError('No se pudo establecer conexión con el Grand Line. Comprueba tu red náutica.');
  }
}

export const api = {
  // Characters
  async getCharacters(signal?: AbortSignal): Promise<Character[]> {
    return request<Character[]>('/characters/en', {}, signal);
  },

  async getCharacterById(id: number | string, signal?: AbortSignal): Promise<Character> {
    const cleanId = String(id).trim();
    const numId = Number(cleanId);
    if (!cleanId || isNaN(numId)) {
      throw new ApiError('Identificador de pirata inválido.', 400);
    }

    // Optimization: Check if characters collection is already cached in memory
    const cachedCharacters = memoryCache.get('/characters/en') as CacheEntry<Character[]> | undefined;
    if (cachedCharacters && Array.isArray(cachedCharacters.data)) {
      const match = cachedCharacters.data.find(c => c.id === numId);
      if (match) {
        return match;
      }
    }

    // Try single character endpoint
    try {
      const character = await request<Character>(`/characters/en/${cleanId}`, {}, signal, 12000);
      return character;
    } catch (err) {
      // Resilient fallback: If individual endpoint is congested, query via characters cache/list
      try {
        const all = await this.getCharacters(signal);
        const match = all.find(c => c.id === numId);
        if (match) return match;
      } catch {
        // rethrow initial error
      }
      throw err;
    }
  },

  // Crews
  async getCrews(signal?: AbortSignal): Promise<Crew[]> {
    return request<Crew[]>('/crews/en', {}, signal);
  },

  async getCrewById(id: number | string, signal?: AbortSignal): Promise<Crew> {
    const cleanId = String(id).trim();
    const numId = Number(cleanId);
    // Check crews cache first
    const cachedCrews = memoryCache.get('/crews/en') as CacheEntry<Crew[]> | undefined;
    if (cachedCrews && Array.isArray(cachedCrews.data)) {
      const match = cachedCrews.data.find(c => c.id === numId);
      if (match) return match;
    }
    return request<Crew>(`/crews/en/${cleanId}`, {}, signal);
  },

  // Fruits
  async getFruits(signal?: AbortSignal): Promise<Fruit[]> {
    return request<Fruit[]>('/fruits/en', {}, signal);
  },

  async getFruitById(id: number | string, signal?: AbortSignal): Promise<Fruit> {
    const cleanId = String(id).trim();
    const numId = Number(cleanId);
    const cachedFruits = memoryCache.get('/fruits/en') as CacheEntry<Fruit[]> | undefined;
    if (cachedFruits && Array.isArray(cachedFruits.data)) {
      const match = cachedFruits.data.find(f => f.id === numId);
      if (match) return match;
    }
    return request<Fruit>(`/fruits/en/${cleanId}`, {}, signal);
  },

  // Boats / Ships
  async getShips(signal?: AbortSignal): Promise<Ship[]> {
    return request<Ship[]>('/boats/en', {}, signal);
  },

  async getShipById(id: number | string, signal?: AbortSignal): Promise<Ship> {
    const cleanId = String(id).trim();
    const numId = Number(cleanId);
    const cachedShips = memoryCache.get('/boats/en') as CacheEntry<Ship[]> | undefined;
    if (cachedShips && Array.isArray(cachedShips.data)) {
      const match = cachedShips.data.find(s => s.id === numId);
      if (match) return match;
    }
    return request<Ship>(`/boats/en/${cleanId}`, {}, signal);
  },

  // Cache utilities
  clearCache(): void {
    memoryCache.clear();
  }
};

// Utilities for formatting bounty and names
export function formatBounty(bounty: string | null | undefined): string {
  if (!bounty || bounty === '0' || bounty === 'null' || bounty.trim() === '') {
    return 'SIN RECOMPENSA';
  }
  const cleaned = bounty.replace(/[^0-9]/g, '');
  if (!cleaned || cleaned === '0') {
    return 'SIN RECOMPENSA';
  }
  const numeric = parseInt(cleaned, 10);
  return `฿ ${numeric.toLocaleString('es-ES')}`;
}

export function parseBountyNumeric(bounty: string | null | undefined): number {
  if (!bounty) return 0;
  const cleaned = bounty.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}
