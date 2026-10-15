import React from 'react';
import { History } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GameCard } from '../game/GameCard';
import { Badge } from '../ui/Badge';
import { MOCK_GAMES } from '../../data/mockGames';

export const RecentlyViewedSection: React.FC = () => {
  const { recentlyViewed } = useStore();
  const displayGames = recentlyViewed.length > 0 ? recentlyViewed.slice(0, 4) : MOCK_GAMES.slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-500/15 text-brand-300 border border-brand-500/30">
              <History className="w-3.5 h-3.5" />
              Browsing History
            </span>
            <Badge variant="brand">Your Vault History</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Recently Viewed Games
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick up right where you left off. Saved automatically to your local browser storage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};
