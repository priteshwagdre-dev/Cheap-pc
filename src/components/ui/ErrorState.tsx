import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Connection Disrupted',
  message = 'An unexpected glitch occurred while loading data from the gaming mainframe. Please try again.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-rose-950/20 border border-rose-900/40 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-rose-900/30 border border-rose-800/50 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-950/50">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-rose-200 tracking-wide">{title}</h3>
      <p className="mt-2 text-sm text-slate-300 max-w-md leading-relaxed">{message}</p>
      
      {onRetry && (
        <div className="mt-6">
          <Button variant="danger" leftIcon={<RotateCcw className="w-4 h-4" />} onClick={onRetry}>
            Retry Connection
          </Button>
        </div>
      )}
    </div>
  );
};
