import React from 'react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const NewReleasesPage: React.FC = () => {
  const newGames = MOCK_GAMES.filter((g) => g.isNewRelease || g.releaseDate >= '2026-01-01');

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="brand" dot>Latest Drops</Badge>
          <span className="text-xs text-slate-400">• Updated daily</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">New Game Releases</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Discover recently launched blockbusters, indie gems, and expanded editions freshly added to the vault.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </PageContainer>
  );
};
