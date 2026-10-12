import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-dark-card/50 border border-dark-border/80 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-dark-surface border border-dark-border-light flex items-center justify-center text-brand-400 mb-4 shadow-inner">
        {icon || <Gamepad2 className="w-8 h-8 opacity-80" />}
      </div>
      <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 max-w-md leading-relaxed">{description}</p>
      
      {actionLabel && (
        <div className="mt-6">
          {actionHref ? (
            <a href={actionHref}>
              <Button variant="primary">{actionLabel}</Button>
            </a>
          ) : (
            <Button variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
