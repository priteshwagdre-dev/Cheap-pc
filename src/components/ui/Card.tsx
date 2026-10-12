import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  glow = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-dark-card border border-dark-border rounded-xl transition-all duration-300 overflow-hidden
        ${interactive ? 'hover:border-dark-border-light hover:bg-dark-card-hover hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' : ''}
        ${glow ? 'shadow-glow-brand border-indigo-500/40' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
