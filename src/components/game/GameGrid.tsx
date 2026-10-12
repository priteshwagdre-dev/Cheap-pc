import React from 'react';
import type { Game } from '../../types';
import { GameCard } from './GameCard';
import { EmptyState } from '../ui/EmptyState';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  isLoading = false,
  emptyTitle = 'No Games Found',
  emptyDescription = 'There are currently no games matching the selected criteria. Try adjusting your filters.',
  columns = 4,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" label="Loading games catalog..." />
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  const columnClasses = {
    2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    4: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
  };

  return (
    <div className={`${columnClasses[columns]} ${className}`}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
