import type { Game, Category } from '../types';
import { MOCK_GAMES } from '../data/mockGames';
import { CATEGORIES } from '../data/categories';

/**
 * Game Service (Mock Layer for Stage 1)
 * Designed to seamlessly connect to backend APIs in future stages.
 */
export const gameService = {
  getAllGames: async (): Promise<Game[]> => {
    return Promise.resolve([...MOCK_GAMES]);
  },

  getGameById: async (id: string): Promise<Game | undefined> => {
    const game = MOCK_GAMES.find((g) => g.id === id || g.slug === id);
    return Promise.resolve(game);
  },

  getFeaturedGames: async (): Promise<Game[]> => {
    return Promise.resolve(MOCK_GAMES.filter((g) => g.isFeatured));
  },

  getDeals: async (): Promise<Game[]> => {
    return Promise.resolve(MOCK_GAMES.filter((g) => g.discountPercent > 0));
  },

  getNewReleases: async (): Promise<Game[]> => {
    return Promise.resolve(MOCK_GAMES.filter((g) => g.isNewRelease));
  },

  getPreOrders: async (): Promise<Game[]> => {
    return Promise.resolve(MOCK_GAMES.filter((g) => g.isPreOrder));
  },

  getBundles: async (): Promise<Game[]> => {
    return Promise.resolve(MOCK_GAMES.filter((g) => g.isBundle));
  },

  getCategories: async (): Promise<Category[]> => {
    return Promise.resolve([...CATEGORIES]);
  }
};
