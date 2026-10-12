import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  label = 'Loading...'
}) => {
  const sizeMap: Record<SpinnerSize, string> = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <div
        className={`rounded-full border-dark-border border-t-brand-500 border-r-cyan-400 animate-spin ${sizeMap[size]}`}
      />
      {label && <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">{label}</span>}
    </div>
  );
};
