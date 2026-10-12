import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Synchronizing Vault Data...',
  description = 'Fetching the latest digital gaming deals and catalog updates.',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-dark-card/40 border border-dark-border/60 ${className}`}>
      <LoadingSpinner size="lg" />
      <h3 className="mt-5 text-lg font-semibold text-white tracking-wide">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 max-w-md">{description}</p>
    </div>
  );
};
