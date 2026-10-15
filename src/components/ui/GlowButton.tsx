import React from 'react';

export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'violet' | 'amber' | 'ghost' | 'hud';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'cyan',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-mono tracking-wider',
    md: 'px-6 py-2.5 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-mono tracking-widest2 uppercase font-extrabold',
  };

  const variantStyles = {
    cyan: `
      bg-gradient-to-r from-cyber-cyan via-[#22d3ee] to-[#38bdf8] 
      text-black font-black
      shadow-[0_0_25px_rgba(0,240,255,0.45)]
      hover:shadow-[0_0_35px_rgba(0,240,255,0.75)]
      hover:brightness-110 active:scale-[0.98]
    `,
    violet: `
      bg-gradient-to-r from-cyber-violet via-[#8b5cf6] to-[#a855f7] 
      text-white font-black
      shadow-[0_0_25px_rgba(112,0,255,0.5)]
      hover:shadow-[0_0_35px_rgba(112,0,255,0.8)]
      hover:brightness-110 active:scale-[0.98]
    `,
    amber: `
      bg-gradient-to-r from-cyber-amber via-[#fbbf24] to-[#f59e0b] 
      text-black font-black
      shadow-[0_0_25px_rgba(255,184,0,0.5)]
      hover:shadow-[0_0_35px_rgba(255,184,0,0.8)]
      hover:brightness-110 active:scale-[0.98]
    `,
    hud: `
      bg-dark-obsidian/90 text-cyber-cyan
      border border-cyber-cyan/50
      shadow-[0_0_15px_rgba(0,240,255,0.25)]
      hover:bg-cyber-cyan/15 hover:border-cyber-cyan hover:shadow-[0_0_25px_rgba(0,240,255,0.55)]
      hover:text-white active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-slate-300
      border border-dark-border
      hover:border-cyber-cyan/40 hover:text-white hover:bg-white/5
      active:scale-[0.98]
    `,
  };

  return (
    <button
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        clip-hud-btn cyber-shine select-none transition-all duration-300
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
