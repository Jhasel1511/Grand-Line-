/**
 * Normaliza los nombres de tripulaciones y valores del API de One Piece.
 * 
 * La API original es francesa. El endpoint /en tiene nombres mezclados.
 * Este módulo mapea los valores de la API a nombres canónicos en inglés/español.
 */

// Mapa de nombres de tripulaciones: API → nombre canónico
const CREW_NAME_MAP: Record<string, string> = {
  // Straw Hat Pirates
  'The Chapeau de Paille crew': 'Straw Hat Pirates',
  "L'équipage du Chapeau de Paille": 'Straw Hat Pirates',

  // Red-Haired Pirates
  'Le Roux crew': 'Red-Haired Pirates',
  "L'équipage Le Roux": 'Red-Haired Pirates',
  "L'équipage de Shanks le Roux": 'Red-Haired Pirates',

  // Alvida Pirates
  'The Alvida crew': 'Alvida Pirates',

  // Buggy Pirates
  'The Clown Crew': 'Buggy Pirates',
  "L'équipage du Clown": 'Buggy Pirates',

  // Roger Pirates
  'The Pirates Roger crew': 'Roger Pirates',
  "L'équipage Roger": 'Roger Pirates',

  // Usopp Pirates
  "Captain Usopp's crew": "Usopp's Pirates",

  // Black Cat Pirates
  'The Black Cat crew': 'Black Cat Pirates',

  // Krieg Pirates
  "Don Krieg's Pirate Armada": 'Krieg Pirates',

  // Cook Pirates / Baratie
  'Les Cuisiniers crew': 'Cook Pirates (Baratie)',
  "L'équipage des Cuisiniers": 'Cook Pirates (Baratie)',

  // Arlong Pirates
  'The Arlong crew': 'Arlong Pirates',

  // Rumbar Pirates
  'The Rumbar crew': 'Rumbar Pirates',

  // Giant Crew
  'The Giant Crew': 'Giant Pirates',

  // Heart Pirates (Law)
  'Heart Pirates': 'Heart Pirates',
  'Les Pirates du Coeur': 'Heart Pirates',

  // Whitebeard Pirates
  'Whitebeard Pirates': 'Whitebeard Pirates',
  "L'équipage de Barbe Blanche": 'Whitebeard Pirates',

  // Big Mom Pirates
  'Big Mom Pirates': 'Big Mom Pirates',
  "L'équipage de Big Mom": 'Big Mom Pirates',

  // Blackbeard Pirates
  'Blackbeard Pirates': 'Blackbeard Pirates',
  "L'équipage de Barbe Noire": 'Blackbeard Pirates',

  // Kaido / Beast Pirates
  'Beast Pirates': 'Beast Pirates',
  "L'équipage des Cent Bêtes": 'Beast Pirates',

  // Marines
  'Marine': 'Marines',
  'Marines': 'Marines',

  // Revolutionary Army
  "Armée Révolutionnaire": 'Revolutionary Army',
  'Revolutionary Army': 'Revolutionary Army',

  // Baroque Works
  'Baroque Works': 'Baroque Works',
  'Baroque Works (Disbandé)': 'Baroque Works (Disbanded)',

  // Seven Warlords
  'Seven Warlords of the Sea': 'Seven Warlords of the Sea',
  "Sept Grand Corsaires": 'Seven Warlords of the Sea',

  // Donquixote Pirates
  'Donquixote Pirates': 'Donquixote Pirates',
  "L'équipage Donquichotte": 'Donquixote Pirates',

  // Germa 66
  'Germa 66': 'Germa 66',

  // Kid Pirates
  'Kid Pirates': 'Kid Pirates',
  "L'équipage de Kid": 'Kid Pirates',

  // Sun Pirates
  'Sun Pirates': 'Sun Pirates',
  "L'équipage du Soleil": 'Sun Pirates',

  // Cross Guild
  'Cross Guild': 'Cross Guild',
};

// Mapa de estados de vida: API → etiqueta limpia
const STATUS_MAP: Record<string, string> = {
  // Francés
  'vivant': 'Alive',
  'mort': 'Deceased',
  'inconnu': 'Unknown',
  'disparu': 'Missing',

  // Inglés mal escrito o variantes
  'alive': 'Alive',
  'living': 'Alive',
  'dead': 'Deceased',
  'unknown': 'Unknown',
  'deceased': 'Deceased',
};

// Mapa de tipos de fruta
const FRUIT_TYPE_MAP: Record<string, string> = {
  'Zoan Mythique': 'Mythical Zoan',
  'Zoan Ancien': 'Ancient Zoan',
  'Paramecia': 'Paramecia',
  'Logia': 'Logia',
  'Zoan': 'Zoan',
  'Clone': 'Clone Fruit',
};

/**
 * Devuelve el nombre canónico de una tripulación.
 * Si no existe mapeo, devuelve el nombre original limpio.
 */
export function normalizeCrewName(rawName: string | null | undefined): string {
  if (!rawName) return 'Unknown crew';
  return CREW_NAME_MAP[rawName.trim()] ?? rawName;
}

/**
 * Devuelve el estado de vida normalizado en inglés.
 */
export function normalizeStatus(rawStatus: string | null | undefined): string {
  if (!rawStatus) return 'Unknown';
  const lower = rawStatus.trim().toLowerCase();
  return STATUS_MAP[lower] ?? rawStatus;
}

/**
 * Devuelve el tipo de fruta del diablo normalizado en inglés.
 */
export function normalizeFruitType(rawType: string | null | undefined): string {
  if (!rawType) return 'Devil Fruit';
  return FRUIT_TYPE_MAP[rawType.trim()] ?? rawType;
}

/**
 * Color badge según tipo de fruta normalizado.
 */
export function getFruitTypeBadgeClass(normalizedType: string): string {
  const t = normalizedType.toLowerCase();
  if (t.includes('logia')) return 'bg-purple-950/80 border-purple-500 text-purple-300';
  if (t.includes('zoan')) return 'bg-amber-950/80 border-amber-500 text-amber-300';
  if (t.includes('paramecia')) return 'bg-teal-950/80 border-[#22C7C9] text-[#22C7C9]';
  return 'bg-[#102E46] border-[#D9A441] text-[#D9A441]';
}
