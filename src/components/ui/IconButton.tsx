import React from 'react';

export type IconButtonVariant = 'default' | 'primary' | 'ghost' | 'active';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badge?: number | string;
  label: string; // Accessible label
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  badge,
  label,
  className = '',
  ...props
}) => {
  const sizeStyles: Record<IconButtonSize, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const variantStyles: Record<IconButtonVariant, string> = {
    default: 'bg-dark-card/90 text-slate-300 hover:text-white hover:bg-dark-card-hover border border-dark-border hover:border-dark-border-light',
    primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/30 border border-brand-400/30',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
    active: 'bg-brand-600/20 text-brand-400 border border-brand-500/40'
  };

  return (
    <button
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {badge !== undefined && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full flex items-center justify-center border-2 border-dark-base shadow-sm animate-pulse">
          {badge}
        </span>
      )}
    </button>
  );
};
