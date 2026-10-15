import type { Game } from '../types';

export const MOCK_GAMES: Game[] = [
  {
    id: 'cyber-odyssey-2088',
    slug: 'cyber-odyssey-2088',
    title: 'Cyber Odyssey: Neon Protocol',
    tagline: 'Immerse into a sprawling neon metropolis ruled by rogue AI and syndicates.',
    description: 'Cyber Odyssey: Neon Protocol is a groundbreaking open-world action RPG set in the sprawling megalopolis of Neo-Kowloon. Upgrade your cybernetic implants, master lethal hacking maneuvers, and forge alliances with underground hacker factions in a high-stakes struggle for human consciousness.',
    shortDescription: 'High-octane cyberpunk open-world RPG with customizable cyberware and tactical neon gunplay.',
    price: 39.99,
    originalPrice: 69.99,
    discountPercent: 43,
    rating: 4.9,
    ratingCount: 14200,
    genre: ['Action', 'RPG', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-03-15',
    developer: 'NeuroSync Studios',
    publisher: 'Apex Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop'
    ],
    isFeatured: true,
    isDeal: true,
    isTrending: true,
    isBestSeller: true,
    systemRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'AMD Ryzen 7 7800X3D or Intel i7-14700K',
      memory: '32 GB RAM',
      graphics: 'NVIDIA RTX 4070 12GB / Radeon RX 7800 XT',
      storage: '90 GB NVMe SSD available space'
    }
  },
  {
    id: 'valkyrie-ascendant',
    slug: 'valkyrie-ascendant',
    title: 'Valkyrie: Realm of Asgard',
    tagline: 'Defy ancient deities and reclaim mythical runic weapons.',
    description: 'Step into the frostbitten realms of ancient Norse mythology. Valkyrie: Realm of Asgard combines visceral soulslike combat with breathtaking cinematic set pieces and deep elemental mastery across nine procedural mythical domains.',
    shortDescription: 'Visceral dark fantasy soulslike combat across mythological Norse domains.',
    price: 49.99,
    originalPrice: 59.99,
    discountPercent: 17,
    rating: 4.8,
    ratingCount: 9820,
    genre: ['RPG', 'Action', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-02-10',
    developer: 'FrostByte Realms',
    publisher: 'Nordic Mythic',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop'
    ],
    isFeatured: true,
    isNewRelease: true,
    isTrending: true,
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i5-12600K / AMD Ryzen 5 5600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA RTX 3060 12GB',
      storage: '75 GB SSD'
    }
  },
  {
    id: 'stellar-odyssey-2027',
    slug: 'stellar-odyssey-2027',
    title: 'Stellar Odyssey: Infinite Horizon',
    tagline: 'The most anticipated galaxy exploration simulator of the decade.',
    description: 'Chart uncharted star systems, build colossal orbital space stations, and discover enigmatic alien signals across 1,000 procedural star clusters with seamless atmospheric planetary landings.',
    shortDescription: 'Next-generation space exploration simulator with interstellar colonization.',
    price: 69.99,
    originalPrice: 69.99,
    discountPercent: 0,
    rating: 5.0,
    ratingCount: 4200,
    genre: ['Adventure', 'Strategy', 'RPG'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-11-20',
    developer: 'Quantum Orbit',
    publisher: 'Galactic Horizon',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    ],
    isPreOrder: true,
    isFeatured: true,
    isTrending: true,
    systemRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i7-13700K / AMD Ryzen 7 7700X',
      memory: '32 GB RAM',
      graphics: 'NVIDIA RTX 4080 16GB / Radeon RX 7900 XTX',
      storage: '120 GB NVMe SSD'
    }
  },
  {
    id: 'quarantine-zero-outbreak',
    slug: 'quarantine-zero-outbreak',
    title: 'Quarantine Zero: Outbreak',
    tagline: 'Survive the deep Antarctic subterranean lab biological nightmare.',
    description: 'Survive inside an isolated subterranean laboratory after a biological containment failure turns personnel into horrifying hive mutations. Manage limited ammo, dynamic flares, and terrifying sound physics.',
    shortDescription: 'Terrifying psychological survival horror with hyper-detailed sound propagation.',
    price: 49.99,
    originalPrice: 59.99,
    discountPercent: 17,
    rating: 4.9,
    ratingCount: 3100,
    genre: ['Horror', 'Action', 'Adventure'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-10-31',
    developer: 'Dreadlock Interactive',
    publisher: 'Nocturnal Games',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop'
    ],
    isPreOrder: true,
    isFeatured: true,
    systemRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i5-13400 / AMD Ryzen 5 7600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA RTX 3070 8GB',
      storage: '80 GB SSD'
    }
  },
  {
    id: 'apocalypse-drift-overdrive',
    slug: 'apocalypse-drift-overdrive',
    title: 'Apocalypse Drift: Overdrive',
    tagline: 'Nitro-charged wasteland vehicle warfare where speed equals survival.',
    description: 'Arm your armored muscle car with missile turrets, flame exhausts, and EMP spikes. Race through irradiated canyons against ferocious outlaw warlords in high-stakes elimination leagues.',
    shortDescription: 'Combat racing survival simulator with hyper-customizable armored vehicles.',
    price: 19.99,
    originalPrice: 39.99,
    discountPercent: 50,
    rating: 4.7,
    ratingCount: 6800,
    genre: ['Racing', 'Action', 'Sports'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S', 'Nintendo Switch'],
    releaseDate: '2025-11-15',
    developer: 'Wasteland Dynamics',
    publisher: 'Redline Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1552824796-0e060012bc0b?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1552824796-0e060012bc0b?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1552824796-0e060012bc0b?q=80&w=800&auto=format&fit=crop'
    ],
    isDeal: true,
    isBestSeller: true,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-10400F',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GTX 1660 Super',
      storage: '45 GB'
    }
  },
  {
    id: 'orbital-strike-vanguard',
    slug: 'orbital-strike-vanguard',
    title: 'Orbital Strike: Vanguard',
    tagline: 'Deep space zero-G tactical warfare with squad-based destruction.',
    description: 'Engage in heart-pounding zero-gravity firefights aboard colossal planetary dreadnoughts. Coordinate dynamic breach points and customize orbital drop suits.',
    shortDescription: 'Competitive sci-fi tactical shooter with modular zero-G mechanics.',
    price: 24.99,
    originalPrice: 49.99,
    discountPercent: 50,
    rating: 4.8,
    ratingCount: 21500,
    genre: ['Action', 'Strategy', 'Multiplayer'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-01-20',
    developer: 'Helios Frontier',
    publisher: 'Vanguard Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    ],
    isDeal: true,
    isTrending: true,
    isBestSeller: true,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i5-11400',
      memory: '16 GB RAM',
      graphics: 'GeForce RTX 2060 6GB',
      storage: '65 GB SSD'
    }
  },
  {
    id: 'abyssal-descent-roguelike',
    slug: 'abyssal-descent-roguelike',
    title: 'Abyssal Descent: Roguelike',
    tagline: 'Every run is unique. Defeat eldritch horrors in shifting catacombs.',
    description: 'Fast-paced isometric hack-and-slash roguelike with dynamic procedural dungeon layouts, dozens of weapon synergies, and brutal boss attack patterns.',
    shortDescription: 'Addictive dark fantasy roguelike action with endless synergy builds.',
    price: 15.99,
    originalPrice: 24.99,
    discountPercent: 36,
    rating: 4.9,
    ratingCount: 8900,
    genre: ['Indie', 'Action', 'RPG'],
    platforms: ['PC', 'Nintendo Switch'],
    releaseDate: '2026-02-28',
    developer: 'Pixel Forge',
    publisher: 'Indie Spark',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop'
    ],
    isNewRelease: true,
    isTrending: true,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel Core i3-8100',
      memory: '8 GB RAM',
      graphics: 'GeForce GTX 1050',
      storage: '15 GB'
    }
  },
  {
    id: 'apex-striker-pro',
    slug: 'apex-striker-pro',
    title: 'Apex Striker 2026: Pro League',
    tagline: 'The next evolution of competitive high-stakes arcade sports.',
    description: 'Experience supersonic 3v3 cyber soccer with jet thrusters, magnetic ball gravity, and esports tournament ranking matchmaking.',
    shortDescription: 'High-octane physics-driven cyber arena soccer with online crossplay.',
    price: 29.99,
    originalPrice: 49.99,
    discountPercent: 40,
    rating: 4.6,
    ratingCount: 5400,
    genre: ['Sports', 'Action', 'Multiplayer'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S', 'Nintendo Switch'],
    releaseDate: '2026-01-14',
    developer: 'Velocity Arena',
    publisher: 'Redline Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
    ],
    isDeal: true,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GTX 1660',
      storage: '35 GB'
    }
  },
  {
    id: 'stellar-command-imperium',
    slug: 'stellar-command-imperium',
    title: 'Stellar Command: Imperium 4X',
    tagline: 'Lead fleets, negotiate treaties, and construct dreadnought armadas.',
    description: 'Master galactic grand strategy. Research forbidden singularity tech, dispatch espionage agents, and command hundreds of warships in real-time tactical space skirmishes.',
    shortDescription: 'Grand scale space 4X strategy game with real-time fleet command.',
    price: 34.99,
    originalPrice: 49.99,
    discountPercent: 30,
    rating: 4.7,
    ratingCount: 7600,
    genre: ['Strategy', 'Sci-Fi'],
    platforms: ['PC'],
    releaseDate: '2025-12-05',
    developer: 'Aegis Core',
    publisher: 'Apex Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop'
    ],
    isNewRelease: true,
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel Core i5-12400',
      memory: '16 GB RAM',
      graphics: 'GTX 1660 Ti',
      storage: '40 GB'
    }
  },
  // BUNDLES (RPG Collection, Action Adventure Pack, Indie Games Bundle)
  {
    id: 'elder-rune-mythic-rpg-bundle',
    slug: 'elder-rune-mythic-rpg-bundle',
    title: 'Elder Rune: Mythic RPG Collection',
    tagline: 'The definitive RPG collection with 3 masterworks and soundtrack.',
    description: 'Dive into hundreds of hours of spellbinding role-playing grandeur. Includes Valkyrie: Realm of Asgard, Chronicles of Elysium, and the Dawn of Runes expansion pack.',
    shortDescription: 'Definitive 3-game RPG collection with all expansions, bonus quests, and soundtrack.',
    price: 49.99,
    originalPrice: 139.99,
    discountPercent: 64,
    rating: 4.9,
    ratingCount: 6200,
    genre: ['RPG', 'Adventure', 'Bundle'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-02-01',
    developer: 'FrostByte & Lumina',
    publisher: 'Nordic Mythic',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop'
    ],
    isBundle: true,
    isDeal: true,
    bundleItems: [
      'Valkyrie: Realm of Asgard (Master Edition)',
      'Chronicles of Elysium: Rebirth',
      'Dawn of Runes Expansion + Digital Artbook & OST'
    ]
  },
  {
    id: 'ultimate-action-adventure-pack',
    slug: 'ultimate-action-adventure-pack',
    title: 'Action Adventure Pack: Cyber & Espionage',
    tagline: 'Save 65% on the most acclaimed action adventure games of the year.',
    description: 'Includes Cyber Odyssey: Neon Protocol, Orbital Strike: Vanguard, and Shadow Protocol: Phantom Agent. Complete franchise editions with season passes.',
    shortDescription: 'High-adrenaline action adventure pack combining cyberpunk RPG and tactical warfare.',
    price: 44.99,
    originalPrice: 129.99,
    discountPercent: 65,
    rating: 4.9,
    ratingCount: 4800,
    genre: ['Action', 'Adventure', 'Bundle'],
    platforms: ['PC', 'PS5', 'Xbox Series X/S'],
    releaseDate: '2026-02-15',
    developer: 'NeuroSync & Helios',
    publisher: 'Apex Interactive',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
    ],
    isBundle: true,
    isDeal: true,
    bundleItems: [
      'Cyber Odyssey: Neon Protocol (Digital Deluxe)',
      'Orbital Strike: Vanguard + Zero-G Skin Pack',
      'Shadow Protocol: Phantom Agent + OST'
    ]
  },
  {
    id: 'indie-games-master-bundle',
    slug: 'indie-games-master-bundle',
    title: 'Indie Roguelike & Artisanal Master Bundle',
    tagline: '3 award-winning indie masterworks bundled together for 60% off.',
    description: 'Celebrate indie development with three critically acclaimed masterpieces. Endless replayability, sensational synth soundtracks, and hand-crafted mechanics.',
    shortDescription: 'Award-winning indie bundle packed with high replayability roguelikes and retro art.',
    price: 24.99,
    originalPrice: 59.99,
    discountPercent: 58,
    rating: 4.8,
    ratingCount: 3900,
    genre: ['Indie', 'Action', 'Bundle'],
    platforms: ['PC', 'Nintendo Switch'],
    releaseDate: '2026-03-01',
    developer: 'Indie Collective',
    publisher: 'Indie Spark',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop'
    ],
    isBundle: true,
    isDeal: true,
    bundleItems: [
      'Abyssal Descent: Roguelike (Deluxe)',
      'Neon Shifter: Cyber Speedrunner',
      'Cosmic Echoes: Original Soundtrack Collection'
    ]
  }
];
