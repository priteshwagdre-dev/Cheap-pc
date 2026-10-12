import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'action-rpg',
    name: 'Action RPG',
    slug: 'action-rpg',
    description: 'Immersive worlds, deep character skill trees, and real-time combat systems.',
    iconName: 'Sword',
    itemCount: 142,
    gradient: 'from-indigo-600 to-purple-600',
    badge: 'Popular'
  },
  {
    id: 'cyberpunk-scifi',
    name: 'Cyberpunk & Sci-Fi',
    slug: 'cyberpunk-scifi',
    description: 'High-tech neon dystopias, interstellar starships, and advanced combat AI.',
    iconName: 'Cpu',
    itemCount: 98,
    gradient: 'from-cyan-600 to-blue-600',
    badge: 'Trending'
  },
  {
    id: 'open-world',
    name: 'Open World',
    slug: 'open-world',
    description: 'Boundless landscapes, exploratory secrets, and complete player freedom.',
    iconName: 'Compass',
    itemCount: 115,
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'souls-like-dark-fantasy',
    name: 'Souls-like & Dark Fantasy',
    slug: 'souls-like',
    description: 'Demanding boss mechanics, gothic ruins, and punishing combat encounters.',
    iconName: 'Flame',
    itemCount: 64,
    gradient: 'from-rose-600 to-amber-600',
    badge: 'Hardcore'
  },
  {
    id: 'tactical-shooters',
    name: 'Shooters & Multiplayer',
    slug: 'shooters',
    description: 'Competitive squads, tactical gunplay, and zero-gravity arenas.',
    iconName: 'Crosshair',
    itemCount: 180,
    gradient: 'from-violet-600 to-pink-600'
  },
  {
    id: 'survival-horror',
    name: 'Survival Horror',
    slug: 'survival-horror',
    description: 'Psychological tension, resource scarcity, and spine-chilling mutations.',
    iconName: 'Ghost',
    itemCount: 52,
    gradient: 'from-red-600 to-rose-700'
  },
  {
    id: 'racing-simulation',
    name: 'Racing & Vehicles',
    slug: 'racing',
    description: 'Nitro drift chases, armored muscle cars, and precision physics.',
    iconName: 'Gauge',
    itemCount: 43,
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'indie-roguelike',
    name: 'Indie & Roguelike',
    slug: 'indie-roguelike',
    description: 'Procedurally generated runs, endless weapon synergies, and pixel artistry.',
    iconName: 'Sparkles',
    itemCount: 210,
    gradient: 'from-purple-600 to-cyan-600',
    badge: 'Community Favorite'
  }
];
