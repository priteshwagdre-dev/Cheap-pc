import React from 'react';
import { Gift } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const PreOrdersPage: React.FC = () => {
  const preOrderGames = MOCK_GAMES.filter((g) => g.isPreOrder || g.releaseDate >= '2026-06-01');

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" dot>Anticipated Hits</Badge>
          <span className="text-xs text-slate-400">• Guaranteed Day-One Key Delivery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Upcoming Pre-Orders</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Reserve future gaming masterpieces ahead of time. Receive immediate beta keys and exclusive digital collector perks.
        </p>
      </div>

      {/* Pre-Order Guarantee Banner */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Pre-Order Price Guarantee</h3>
            <p className="text-xs text-slate-400">If the price drops before release day, you are automatically refunded the difference.</p>
          </div>
        </div>
        <Badge variant="cyan">Zero Risk Guarantee</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {preOrderGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </PageContainer>
  );
};
