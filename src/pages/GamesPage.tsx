import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, X, RotateCcw } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { CATEGORIES } from '../data/categories';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { EmptyState } from '../components/ui/EmptyState';

// Module-level mappings and lists
const CATEGORY_MAPPING: Record<string, string> = {
  'action': 'Action',
  'adventure': 'Adventure',
  'rpg': 'RPG',
  'racing': 'Racing',
  'sports': 'Sports',
  'horror': 'Horror',
  'strategy': 'Strategy',
  'indie': 'Indie',
  'action-rpg': 'Action',
  'cyberpunk-scifi': 'Action',
  'open-world': 'Adventure',
  'souls-like': 'RPG',
  'shooters': 'Action',
  'survival-horror': 'Horror',
  'indie-roguelike': 'Indie'
};

const PLATFORMS = ['all', 'PC', 'PS5', 'Xbox Series X/S', 'Nintendo Switch'];

export const GamesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || 'all';
  const selectedPlatform = searchParams.get('platform') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : 100;

  // Helper to update individual URL query params
  const updateParam = (key: string, val: string) => {
    const next = new URLSearchParams(searchParams);
    if (!val || val === 'all' || (key === 'maxPrice' && val === '100')) {
      next.delete(key);
    } else {
      next.set(key, val);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter((game) => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesTagline = game.tagline.toLowerCase().includes(q);
        const matchesGenre = game.genre.some((g) => g.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesGenre) return false;
      }

      // 2. Category / Genre
      if (categorySlug !== 'all') {
        const mappedGenre = CATEGORY_MAPPING[categorySlug] || categorySlug;
        const matchesGenre = game.genre.some(
          (g) => g.toLowerCase().includes(mappedGenre.toLowerCase()) || g.toLowerCase() === categorySlug.toLowerCase()
        );
        if (!matchesGenre) return false;
      }

      // 3. Platform
      if (selectedPlatform !== 'all') {
        const matchesPlatform = game.platforms.some((p) =>
          p.toLowerCase().includes(selectedPlatform.toLowerCase())
        );
        if (!matchesPlatform) return false;
      }

      // 4. Max Price
      if (game.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.releaseDate.localeCompare(a.releaseDate);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.ratingCount - a.ratingCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0;
    });
  }, [searchQuery, categorySlug, selectedPlatform, sortBy, maxPrice]);

  const activeFiltersCount = 
    (searchQuery ? 1 : 0) + 
    (categorySlug !== 'all' ? 1 : 0) + 
    (selectedPlatform !== 'all' ? 1 : 0) + 
    (maxPrice < 100 ? 1 : 0);

  return (
    <PageContainer className="space-y-8 pb-20 select-none">
      {/* Header Banner */}
      <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-cyan/40 bg-gradient-to-r from-dark-obsidian via-[#071324] to-dark-obsidian p-6 sm:p-10 shadow-[0_0_35px_rgba(0,240,255,0.2)]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-cyan">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>GLOBAL ARCHIVE // {filteredGames.length} GAMES ONLINE</span>
            {searchQuery && (
              <span className="text-cyber-amber">• QUERY: &ldquo;{searchQuery}&rdquo;</span>
            )}
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-widest2 uppercase">
            DIGITAL GAMES VAULT
          </h1>
          <p className="text-sm text-cyber-silver leading-relaxed font-sans">
            Explore genuine PC and console digital activation codes. Filter by category, platform, budget, or discounts.
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="hud-bracket-container bg-dark-obsidian/90 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-hud backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Genre / Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            <button
              onClick={() => updateParam('category', 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categorySlug === 'all'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'bg-dark-surface text-slate-400 hover:text-slate-200 hover:bg-dark-card-hover border border-dark-border'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'bg-dark-surface text-slate-400 hover:text-slate-200 hover:bg-dark-card-hover border border-dark-border'
                }`}
              >
                {cat.name}
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
              onChange={(e) => updateParam('sort', e.target.value)}
              className="bg-dark-surface border border-dark-border rounded-lg text-xs font-semibold text-slate-200 px-3 py-1.5 focus:outline-none focus:border-brand-500"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Platform & Budget Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-dark-border/60">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Platform:
            </span>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => updateParam('platform', p)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedPlatform === p
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white bg-transparent'
                }`}
              >
                {p === 'all' ? 'All Platforms' : p}
              </button>
            ))}
          </div>

          {/* Budget filter buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold mr-1">Max Price:</span>
            {[20, 40, 60, 100].map((pr) => (
              <button
                key={pr}
                onClick={() => updateParam('maxPrice', pr === 100 ? '100' : String(pr))}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  maxPrice === pr
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-dark-surface text-slate-400 hover:text-white border border-dark-border'
                }`}
              >
                {pr === 100 ? 'Any' : `< $${pr}`}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Row */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dark-border/40 text-xs">
            <span className="text-slate-400">Active filters:</span>
            {searchQuery && (
              <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                Query: {searchQuery}
                <button onClick={() => updateParam('search', '')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {categorySlug !== 'all' && (
              <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                Category: {categorySlug}
                <button onClick={() => updateParam('category', 'all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedPlatform !== 'all' && (
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                Platform: {selectedPlatform}
                <button onClick={() => updateParam('platform', 'all')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {maxPrice < 100 && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                Max: ${maxPrice}
                <button onClick={() => updateParam('maxPrice', '100')}><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        )}
      </div>

      {/* Games Grid or Empty State */}
      {filteredGames.length === 0 ? (
        <EmptyState
          icon={<Search className="w-8 h-8 text-brand-400" />}
          title="No Games Found"
          description="We couldn't find any games matching your current filter combination. Try clearing your filters or searching for something else."
          actionLabel="Reset All Filters"
          actionHref="/games"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};
