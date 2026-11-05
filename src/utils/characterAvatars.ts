// Curated high quality portraits for key characters in the One Piece universe
// With automatic fallback to high-quality nautical pirate crests

const CHARACTER_PORTRAITS: Record<string, string> = {
  // Straw Hat Pirates
  'monkey d luffy': 'https://images.api-onepiece.com/fruits/5665e89442022d4c0e7684c650dc6d6b.png', // Fallback or official
  'roronoa zoro': 'https://images.api-onepiece.com/fruits/c584ba9045ea7dfd8f4bc11eb231bbda.png',
};

// Known character image URLs from reliable public anime archives
export const getCharacterPortrait = (name: string, id: number): string | null => {
  if (!name) return null;
  const normalized = name.toLowerCase().trim();

  // Direct portrait mapping for prominent characters
  const directMap: Record<number, string> = {
    1: 'https://cdn.myanimelist.net/images/characters/9/310307.jpg', // Monkey D Luffy
    2: 'https://cdn.myanimelist.net/images/characters/3/100534.jpg', // Roronoa Zoro
    3: 'https://cdn.myanimelist.net/images/characters/2/263249.jpg', // Nami
    4: 'https://cdn.myanimelist.net/images/characters/6/264155.jpg', // Usopp
    5: 'https://cdn.myanimelist.net/images/characters/5/136769.jpg', // Sanji
    6: 'https://cdn.myanimelist.net/images/characters//131317.jpg', // Tony Tony Chopper
    7: 'https://cdn.myanimelist.net/images/characters/16/327429.jpg', // Nico Robin
    8: 'https://cdn.myanimelist.net/images/characters/1/136411.jpg', // Franky
    9: 'https://cdn.myanimelist.net/images/characters/15/80249.jpg', // Brook
    10: 'https://cdn.myanimelist.net/images/characters/5/285375.jpg', // Jinbe
    11: 'https://cdn.myanimelist.net/images/characters/12/77028.jpg', // Shanks
    12: 'https://cdn.myanimelist.net/images/characters/13/284123.jpg', // Portgas D. Ace
    13: 'https://cdn.myanimelist.net/images/characters/4/110999.jpg', // Trafalgar Law
    14: 'https://cdn.myanimelist.net/images/characters/14/104037.jpg', // Edward Newgate
    15: 'https://cdn.myanimelist.net/images/characters/11/136413.jpg', // Gol D. Roger
    16: 'https://cdn.myanimelist.net/images/characters/11/48439.jpg', // Dracule Mihawk
    17: 'https://cdn.myanimelist.net/images/characters/15/283921.jpg', // Boa Hancock
    18: 'https://cdn.myanimelist.net/images/characters/2/187785.jpg', // Donquixote Doflamingo
    19: 'https://cdn.myanimelist.net/images/characters/7/283917.jpg', // Marshall D. Teach
    20: 'https://cdn.myanimelist.net/images/characters/7/48443.jpg', // Crocodile
    21: 'https://cdn.myanimelist.net/images/characters/15/283923.jpg', // Buggy
    22: 'https://cdn.myanimelist.net/images/characters/16/331293.jpg', // Sabo
    23: 'https://cdn.myanimelist.net/images/characters/12/385805.jpg', // Kaido
    24: 'https://cdn.myanimelist.net/images/characters/8/443743.jpg', // Charlotte Linlin
    25: 'https://cdn.myanimelist.net/images/characters/7/451486.jpg', // Yamato
  };

  if (directMap[id]) return directMap[id];

  // Name based mapping
  if (normalized.includes('luffy')) return 'https://cdn.myanimelist.net/images/characters/9/310307.jpg';
  if (normalized.includes('zoro')) return 'https://cdn.myanimelist.net/images/characters/3/100534.jpg';
  if (normalized.includes('nami')) return 'https://cdn.myanimelist.net/images/characters/2/263249.jpg';
  if (normalized.includes('usopp')) return 'https://cdn.myanimelist.net/images/characters/6/264155.jpg';
  if (normalized.includes('sanji')) return 'https://cdn.myanimelist.net/images/characters/5/136769.jpg';
  if (normalized.includes('chopper')) return 'https://cdn.myanimelist.net/images/characters/9/131317.jpg';
  if (normalized.includes('robin')) return 'https://cdn.myanimelist.net/images/characters/16/327429.jpg';
  if (normalized.includes('franky')) return 'https://cdn.myanimelist.net/images/characters/13/136411.jpg';
  if (normalized.includes('brook')) return 'https://cdn.myanimelist.net/images/characters/15/80249.jpg';
  if (normalized.includes('jinbe') || normalized.includes('jimbei')) return 'https://cdn.myanimelist.net/images/characters/5/285375.jpg';
  if (normalized.includes('shanks')) return 'https://cdn.myanimelist.net/images/characters/12/77028.jpg';
  if (normalized.includes('ace')) return 'https://cdn.myanimelist.net/images/characters/13/284123.jpg';
  if (normalized.includes('law')) return 'https://cdn.myanimelist.net/images/characters/4/110999.jpg';
  if (normalized.includes('roger')) return 'https://cdn.myanimelist.net/images/characters/11/136413.jpg';
  if (normalized.includes('mihawk')) return 'https://cdn.myanimelist.net/images/characters/11/48439.jpg';
  if (normalized.includes('hancock')) return 'https://cdn.myanimelist.net/images/characters/15/283921.jpg';
  if (normalized.includes('doflamingo')) return 'https://cdn.myanimelist.net/images/characters/2/187785.jpg';
  if (normalized.includes('teach') || normalized.includes('barbanegra')) return 'https://cdn.myanimelist.net/images/characters/7/283917.jpg';
  if (normalized.includes('newgate') || normalized.includes('barbablanca')) return 'https://cdn.myanimelist.net/images/characters/14/104037.jpg';
  if (normalized.includes('crocodile')) return 'https://cdn.myanimelist.net/images/characters/7/48443.jpg';
  if (normalized.includes('buggy')) return 'https://cdn.myanimelist.net/images/characters/15/283923.jpg';
  if (normalized.includes('sabo')) return 'https://cdn.myanimelist.net/images/characters/16/331293.jpg';
  if (normalized.includes('kaido')) return 'https://cdn.myanimelist.net/images/characters/12/385805.jpg';
  if (normalized.includes('linlin') || normalized.includes('big mom')) return 'https://cdn.myanimelist.net/images/characters/8/443743.jpg';
  if (normalized.includes('yamato')) return 'https://cdn.myanimelist.net/images/characters/7/451486.jpg';

  return null;
};

// Generates nautical SVG data URL for characters without remote portrait
export const getNauticalAvatarSvg = (name: string, bounty?: string | null): string => {
  const initials = name
    ? name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
    : 'OP';

  const isHighBounty = bounty && !bounty.startsWith('0') && bounty !== 'null' && bounty !== '';
  const accentColor = isHighBounty ? '#D9A441' : '#22C7C9';
  const bgColor = isHighBounty ? '#102E46' : '#071B2B';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="${bgColor}"/>
    <circle cx="100" cy="100" r="85" fill="none" stroke="${accentColor}" stroke-width="4" stroke-dasharray="4,8"/>
    <circle cx="100" cy="100" r="75" fill="#040e17" stroke="#754C24" stroke-width="2"/>
    <!-- Compass / Helm spokes -->
    <line x1="100" y1="20" x2="100" y2="180" stroke="${accentColor}" stroke-width="1.5" opacity="0.4"/>
    <line x1="20" y1="100" x2="180" y2="100" stroke="${accentColor}" stroke-width="1.5" opacity="0.4"/>
    <line x1="43" y1="43" x2="157" y2="157" stroke="${accentColor}" stroke-width="1" opacity="0.25"/>
    <line x1="157" y1="43" x2="43" y2="157" stroke="${accentColor}" stroke-width="1" opacity="0.25"/>
    <!-- Center Skull Silhouette -->
    <path d="M70,80 Q100,55 130,80 Q135,115 120,125 L120,135 Q100,140 80,135 L80,125 Q65,115 70,80 Z" fill="#F3E8CE" opacity="0.9"/>
    <ellipse cx="88" cy="95" rx="7" ry="9" fill="${bgColor}"/>
    <ellipse cx="112" cy="95" rx="7" ry="9" fill="${bgColor}"/>
    <polygon points="100,105 96,114 104,114" fill="${bgColor}"/>
    <!-- Initials -->
    <text x="100" y="172" font-family="'Cinzel', serif" font-weight="bold" font-size="20" fill="${accentColor}" text-anchor="middle" letter-spacing="2">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
