import React from 'react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const BundlesPage: React.FC = () => {
  const bundleGames = MOCK_GAMES.filter((g) => g.isBundle);

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="purple" dot>Max Savings</Badge>
          <span className="text-xs text-slate-400">• Multi-Game Packs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Curated Game Bundles</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Get complete series, expansive DLC sets, and developer collections in one bundle at a fraction of the cost.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundleGames.map((game) => (
          <GameCard key={game.id} game={game} variant="horizontal" />
        ))}
      </div>
    </PageContainer>
  );
};
