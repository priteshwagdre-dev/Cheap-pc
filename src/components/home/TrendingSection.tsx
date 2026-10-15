import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { GameCard } from '../game/GameCard';
import { Badge } from '../ui/Badge';

export const TrendingSection: React.FC = () => {
  const trendingGames = MOCK_GAMES.filter((g) => g.isTrending || g.rating >= 4.8).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30">
              <TrendingUp className="w-3.5 h-3.5" />
              Community Momentum
            </span>
            <Badge variant="discount">High Demand</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Trending Games Right Now
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top player activity, viral stream broadcasts, and fastest-selling digital keys this week.
          </p>
        </div>

        <Link
          to="/games?sort=popular"
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 shrink-0"
        >
          View Trending Chart <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};
