export const GAME_GUIDE_SLUGS = [
  'cyberpunk-2077',
  'forza-horizon-5',
  'apex-legends',
  'counter-strike-2',
  'fortnite',
  'elden-ring',
] as const;

export type GameGuideSlug = (typeof GAME_GUIDE_SLUGS)[number];

export type RequirementValues = {
  target: string;
  os: string;
  cpu: string;
  gpu: string;
  vram: string;
  ram: string;
  storage: string;
};

export type GameGuideDefinition = {
  slug: GameGuideSlug;
  gameId: string;
  name: string;
  category: string;
  publisher: string;
  sourceUrl: string;
  minimum: RequirementValues;
  recommended: RequirementValues | null;
};

export const GAME_GUIDES: Record<GameGuideSlug, GameGuideDefinition> = {
  'cyberpunk-2077': {
    slug: 'cyberpunk-2077', gameId: 'cyberpunk-2077', name: 'Cyberpunk 2077', category: 'Action RPG', publisher: 'CD Projekt RED',
    sourceUrl: 'https://support.cdprojektred.com/en/cyberpunk/pc/sp-technical/issue/1556/cyberpunk-2077-system-requirements',
    minimum: { target: '1080p · Low · 30 FPS', os: '64-bit Windows 10', cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600', gpu: 'GeForce GTX 1060 6GB / Radeon RX 580 8GB / Intel Arc A380', vram: '6 GB', ram: '12 GB', storage: '70 GB SSD' },
    recommended: { target: '1080p · High · 60 FPS', os: '64-bit Windows 10', cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X3D', gpu: 'GeForce RTX 2060 Super / Radeon RX 5700 XT / Intel Arc A770', vram: '8 GB', ram: '16 GB', storage: '70 GB SSD' },
  },
  'forza-horizon-5': {
    slug: 'forza-horizon-5', gameId: 'forza-horizon-5', name: 'Forza Horizon 5', category: 'Racing', publisher: 'Xbox Game Studios',
    sourceUrl: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/?l=english',
    minimum: { target: 'Official minimum tier', os: 'Windows 10 version 18362.0 or higher', cpu: 'Intel Core i5-4460 / AMD Ryzen 3 1200', gpu: 'GeForce GTX 970 / Radeon RX 470 / Intel Arc A380', vram: 'Not stated', ram: '8 GB', storage: '110 GB available space' },
    recommended: { target: 'Official recommended tier', os: 'Windows 10 version 18362.0 or higher', cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1500X', gpu: 'GeForce GTX 1070 / Radeon RX 590 / Intel Arc A750', vram: 'Not stated', ram: '16 GB', storage: '110 GB available space' },
  },
  'apex-legends': {
    slug: 'apex-legends', gameId: 'apex-legends', name: 'Apex Legends', category: 'Battle royale', publisher: 'Electronic Arts',
    sourceUrl: 'https://www.ea.com/games/apex-legends/apex-legends/system-requirements',
    minimum: { target: 'Official minimum tier', os: '64-bit Windows 10', cpu: 'Intel Core i3-6300 / AMD FX-4350 or equivalent', gpu: 'GeForce GTX 950 / Radeon HD 7790 2GB', vram: '2 GB listed for Radeon minimum', ram: '6 GB DDR3 @ 1333', storage: '75 GB' },
    recommended: { target: 'Smooth 60 FPS target stated by EA', os: '64-bit Windows 10', cpu: 'Intel Core i5-3570K / AMD Ryzen 5 or equivalent', gpu: 'GeForce GTX 970 / Radeon R9 290', vram: '8 GB on EA’s detailed requirements page', ram: '8 GB DDR3 @ 1333', storage: '75 GB' },
  },
  'counter-strike-2': {
    slug: 'counter-strike-2', gameId: 'counter-strike-2', name: 'Counter-Strike 2', category: 'Competitive FPS', publisher: 'Valve',
    sourceUrl: 'https://store.steampowered.com/app/730/CounterStrike_2/?l=english',
    minimum: { target: 'Official Windows minimum tier', os: 'Windows 10', cpu: '4 hardware CPU threads · Intel Core i5-750 or higher', gpu: '1 GB+ · DirectX 11 compatible · Shader Model 5.0', vram: '1 GB or more', ram: '8 GB', storage: '85 GB available space' },
    recommended: null,
  },
  fortnite: {
    slug: 'fortnite', gameId: 'fortnite', name: 'Fortnite', category: 'Battle royale', publisher: 'Epic Games',
    sourceUrl: 'https://www.epicgames.com/help/c-202300000001636/c-202300000001690/a202300000012731?lang=en-US',
    minimum: { target: 'Official minimum tier', os: 'Windows 10 22H2 64-bit / Enterprise 21H2 64-bit', cpu: 'Intel Core i3-3225 3.3 GHz', gpu: 'Intel HD 4000 / AMD Radeon Vega 8', vram: 'Not stated', ram: '8 GB', storage: 'Capacity not stated' },
    recommended: { target: 'Official recommended tier', os: 'Windows 10/11 64-bit', cpu: 'Intel Core i5-7300U 3.5 GHz / AMD Ryzen 3 3300U or equivalent', gpu: 'GeForce GTX 960 / Radeon R9 280 or equivalent DX11 GPU', vram: '2 GB', ram: '16 GB or higher', storage: 'NVMe SSD; capacity not stated' },
  },
  'elden-ring': {
    slug: 'elden-ring', gameId: 'elden-ring', name: 'Elden Ring', category: 'Action RPG', publisher: 'Bandai Namco Entertainment / FromSoftware',
    sourceUrl: 'https://store.steampowered.com/app/1245620/ELDEN_RING/?l=english',
    minimum: { target: 'Official minimum tier', os: 'Windows 10', cpu: 'Intel Core i5-8400 / AMD Ryzen 3 3300X', gpu: 'GeForce GTX 1060 3GB / Radeon RX 580 4GB', vram: '3 GB NVIDIA / 4 GB AMD', ram: '12 GB', storage: '60 GB available space' },
    recommended: { target: 'Official recommended tier', os: 'Windows 10/11', cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600X', gpu: 'GeForce GTX 1070 8GB / Radeon RX Vega 56 8GB', vram: '8 GB', ram: '16 GB', storage: '60 GB available space' },
  },
};

export function isGameGuideSlug(value: string): value is GameGuideSlug {
  return (GAME_GUIDE_SLUGS as readonly string[]).includes(value);
}

export function getGameGuideDefinition(slug: GameGuideSlug): GameGuideDefinition {
  return GAME_GUIDES[slug];
}
