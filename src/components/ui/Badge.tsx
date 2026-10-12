import React from 'react';

export type BadgeVariant = 'default' | 'brand' | 'discount' | 'success' | 'warning' | 'cyan' | 'purple' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md tracking-wide';

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-dark-card text-slate-300 border border-dark-border',
    brand: 'bg-brand-500/15 text-indigo-300 border border-brand-500/30',
    discount: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold tracking-tight',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    outline: 'bg-transparent text-slate-400 border border-dark-border'
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-slate-400',
    brand: 'bg-indigo-400',
    discount: 'bg-rose-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400',
    outline: 'bg-slate-500'
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
