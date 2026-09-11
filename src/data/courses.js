// Array de datos para los cursos de React Academy con temática dorada / premium
export const coursesData = [
  {
    id: 1,
    title: "React Básico",
    description: "Componentes, props, estado y eventos. Todo lo que necesitas para empezar.",
    level: "Principiante",
    badgeColor: "#c59b27", // Elegant gold accent badge
    iconType: "atom",
    goldenIcon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="gold-svg">
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE082" />
            <stop offset="30%" stop-color="#FFB300" />
            <stop offset="70%" stop-color="#FF8F00" />
            <stop offset="100%" stop-color="#FF6F00" />
          </linearGradient>
          <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#goldGrad1)" opacity="0.15"/>
        <circle cx="32" cy="32" r="6" fill="url(#goldGrad1)" filter="url(#glow1)"/>
        <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="url(#goldGrad1)" stroke-width="2.5" transform="rotate(30 32 32)"/>
        <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="url(#goldGrad1)" stroke-width="2.5" transform="rotate(90 32 32)"/>
        <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="url(#goldGrad1)" stroke-width="2.5" transform="rotate(150 32 32)"/>
      </svg>
    `
  },
  {
    id: 2,
    title: "React Hooks",
    description: "Profundiza en useState, useEffect y crea tus propios custom hooks.",
    level: "Intermedio",
    badgeColor: "#c59b27",
    iconType: "sync",
    goldenIcon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="gold-svg">
        <defs>
          <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF176" />
            <stop offset="40%" stop-color="#FBC02D" />
            <stop offset="80%" stop-color="#F57F17" />
            <stop offset="100%" stop-color="#BF360C" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#goldGrad2)" opacity="0.15"/>
        <path d="M44 26 C41 20, 33 16, 25 19 C18 22, 14 29, 16 37 C18 43, 24 48, 32 48 C39 48, 45 44, 47 38" fill="none" stroke="url(#goldGrad2)" stroke-width="3.5" stroke-linecap="round"/>
        <polygon points="44,18 46,27 38,25" fill="url(#goldGrad2)"/>
        <path d="M20 38 C23 44, 31 48, 39 45 C46 42, 50 35, 48 27 C46 21, 40 16, 32 16" fill="none" stroke="url(#goldGrad2)" stroke-width="3.5" stroke-linecap="round" opacity="0.5"/>
        <polygon points="20,46 18,37 26,39" fill="url(#goldGrad2)"/>
      </svg>
    `
  },
  {
    id: 3,
    title: "Estado Global",
    description: "Gestiona el estado con Context API y aprende cuándo usarlo.",
    level: "Intermedio",
    badgeColor: "#c59b27",
    iconType: "folder",
    goldenIcon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="gold-svg">
        <defs>
          <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE57F" />
            <stop offset="50%" stop-color="#FFC107" />
            <stop offset="100%" stop-color="#FF8F00" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#goldGrad3)" opacity="0.15"/>
        <path d="M16 20 C16 18, 18 16, 20 16 L28 16 C30 16, 31 17, 32 19 L34 22 L44 22 C46 22, 48 24, 48 26 L48 44 C48 46, 46 48, 44 48 L20 48 C18 48, 16 46, 16 44 Z" fill="url(#goldGrad3)"/>
        <rect x="20" y="24" width="24" height="6" rx="2" fill="#FFF8E1" opacity="0.8"/>
      </svg>
    `
  },
  {
    id: 4,
    title: "React Avanzado",
    description: "Rendimiento, patrones avanzados y arquitectura para proyectos grandes.",
    level: "Avanzado",
    badgeColor: "#b8860b", // Rich dark gold for advanced
    iconType: "rocket",
    goldenIcon: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="gold-svg">
        <defs>
          <linearGradient id="goldGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF59D" />
            <stop offset="35%" stop-color="#FBC02D" />
            <stop offset="70%" stop-color="#F57F17" />
            <stop offset="100%" stop-color="#E65100" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#goldGrad4)" opacity="0.15"/>
        <path d="M42 16 C42 16, 46 24, 42 32 C38 40, 26 44, 20 44 C20 38, 24 26, 32 22 C40 18, 42 16, 42 16 Z" fill="url(#goldGrad4)"/>
        <circle cx="34" cy="26" r="3" fill="#FFF9C4"/>
        <path d="M20 44 L16 48 L22 40 Z" fill="url(#goldGrad4)"/>
        <path d="M42 16 L48 20 L40 26 Z" fill="url(#goldGrad4)"/>
        <path d="M20 44 Q14 46, 14 50 Q18 50, 20 44 Z" fill="#FFAB00"/>
      </svg>
    `
  }
];
