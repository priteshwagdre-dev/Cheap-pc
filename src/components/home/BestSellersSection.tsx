import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { GameCard } from '../game/GameCard';
import { Badge } from '../ui/Badge';

export const BestSellersSection: React.FC = () => {
  const bestSellers = MOCK_GAMES.filter((g) => g.isBestSeller || g.ratingCount > 6000).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5 fill-current" />
              Store Champions
            </span>
            <Badge variant="warning">Global Top 10</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Best Sellers & Player Favorites
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The most downloaded and overwhelmingly reviewed games across PC, PlayStation, and Xbox.
          </p>
        </div>

        <Link
          to="/games?sort=rating"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
        >
          View Hall of Fame <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((game, idx) => (
          <div key={game.id} className="relative">
            {/* Ranking Number Badge */}
            <div className="absolute -top-3 -left-2 z-20 w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-950/50 border border-white/20 select-none">
              #{idx + 1}
            </div>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
};
