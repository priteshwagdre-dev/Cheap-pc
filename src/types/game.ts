export type Platform = 'PC' | 'PS5' | 'PS4' | 'Xbox Series X/S' | 'Xbox One' | 'Nintendo Switch';

export interface Game {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number; // e.g. 4.8
  ratingCount: number;
  genre: string[];
  platforms: Platform[];
  releaseDate: string;
  developer: string;
  publisher: string;
  thumbnail: string;
  bannerImage: string;
  screenshots: string[];
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isPreOrder?: boolean;
  isDeal?: boolean;
  isBundle?: boolean;
  bundleItems?: string[];
  systemRequirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCount: number;
  gradient: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  path: string;
  badge?: string;
  icon?: string;
}
