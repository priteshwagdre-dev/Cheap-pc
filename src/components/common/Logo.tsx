import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1 ${className}`}
      aria-label="Nexus Play Home"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-card border border-brand-500/40 flex items-center justify-center text-brand-400 group-hover:text-white transition-colors duration-200">
          <Gamepad2 className={`${iconSizes[size]} transition-transform duration-300 group-hover:rotate-[-6deg]`} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-tech font-black tracking-wider leading-none text-white ${textSizes[size]}`}>
          NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-neon-orange">PLAY</span>
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 leading-tight">
          Digital Key Vault
        </span>
      </div>
    </Link>
  );
};
