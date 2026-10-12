import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const GamesPage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const genres = ['All', 'Action RPG', 'Cyberpunk', 'Sci-Fi', 'Open World', 'Souls-like', 'Multiplayer', 'Survival'];
  const platforms = ['All', 'PC', 'PS5', 'Xbox Series X/S', 'Nintendo Switch'];

  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter((game) => {
      const matchGenre = selectedGenre === 'All' || game.genre.includes(selectedGenre);
      const matchPlatform = selectedPlatform === 'All' || game.platforms.some((p) => p.includes(selectedPlatform));
      return matchGenre && matchPlatform;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0;
    });
  }, [selectedGenre, selectedPlatform, sortBy]);

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="brand">Full Catalog</Badge>
          <span className="text-xs text-slate-400">• {filteredGames.length} Games Available</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">All Digital Games</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Explore our expansive library of PC and console digital keys. Filter by category, platform, or price drop.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 mb-8 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Genre Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Genre:
            </span>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedGenre === g
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'bg-dark-surface text-slate-400 hover:text-slate-200 hover:bg-dark-card-hover border border-dark-border'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
            <label htmlFor="sort-select" className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-surface border border-dark-border rounded-lg text-xs font-semibold text-slate-200 px-3 py-1.5 focus:outline-none focus:border-brand-500"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Platform Strip */}
        <div className="flex items-center gap-2 pt-3 border-t border-dark-border/60 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Platform:
          </span>
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                selectedPlatform === p
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </PageContainer>
  );
};
