import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'action',
    name: 'Action',
    slug: 'action',
    description: 'High-octane combat, tactical shooters, and pulse-pounding encounters.',
    iconName: 'Zap',
    itemCount: 184,
    gradient: 'from-purple-600 via-indigo-600 to-cyan-500',
    badge: 'Popular'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Expansive open worlds, cinematic story campaigns, and hidden realms.',
    iconName: 'Compass',
    itemCount: 142,
    gradient: 'from-cyan-600 via-teal-600 to-emerald-500',
    badge: 'Immersive'
  },
  {
    id: 'rpg',
    name: 'RPG',
    slug: 'rpg',
    description: 'Deep progression trees, character customization, and mythical sagas.',
    iconName: 'Sword',
    itemCount: 156,
    gradient: 'from-violet-600 via-purple-600 to-rose-500',
    badge: 'Epic'
  },
  {
    id: 'racing',
    name: 'Racing',
    slug: 'racing',
    description: 'Hyper-tuned supercars, nitro drifts, and high-speed wasteland combat.',
    iconName: 'Gauge',
    itemCount: 48,
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    badge: 'High Speed'
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Next-gen athletic simulations, competitive leagues, and championship glory.',
    iconName: 'Trophy',
    itemCount: 62,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    badge: 'Competitive'
  },
  {
    id: 'horror',
    name: 'Horror',
    slug: 'horror',
    description: 'Subterranean anomalies, psychological dread, and visceral survival.',
    iconName: 'Ghost',
    itemCount: 55,
    gradient: 'from-rose-600 via-red-700 to-purple-900',
    badge: 'Hardcore'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    slug: 'strategy',
    description: 'Planetary conquest, 4X grand tactics, and resource-war dominance.',
    iconName: 'Crosshair',
    itemCount: 89,
    gradient: 'from-blue-600 via-indigo-700 to-purple-800',
    badge: 'Tactical'
  },
  {
    id: 'indie',
    name: 'Indie',
    slug: 'indie',
    description: 'Breakthrough artisanal gems, roguelike loops, and creative masterworks.',
    iconName: 'Sparkles',
    itemCount: 210,
    gradient: 'from-fuchsia-600 via-pink-600 to-orange-500',
    badge: 'Community Choice'
  }
];
