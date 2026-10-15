import React from 'react';

export interface HUDCardProps {
  code?: string;
  status?: string;
  glow?: 'cyan' | 'violet' | 'amber' | 'none';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const HUDCard: React.FC<HUDCardProps> = ({
  code,
  status = 'ONLINE',
  glow = 'cyan',
  children,
  className = '',
  onClick,
}) => {
  const glowBorder = {
    cyan: 'border-cyber-cyan/30 hover:border-cyber-cyan/70 shadow-[0_0_20px_rgba(0,240,255,0.12)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]',
    violet: 'border-cyber-violet/30 hover:border-cyber-violet/70 shadow-[0_0_20px_rgba(112,0,255,0.12)] hover:shadow-[0_0_30px_rgba(112,0,255,0.3)]',
    amber: 'border-cyber-amber/30 hover:border-cyber-amber/70 shadow-[0_0_20px_rgba(255,184,0,0.12)] hover:shadow-[0_0_30px_rgba(255,184,0,0.3)]',
    none: 'border-dark-border',
  }[glow];

  return (
    <div
      onClick={onClick}
      className={`
        hud-bracket-container relative rounded-lg bg-dark-obsidian/80 backdrop-blur-xl
        border ${glowBorder} p-6 transition-all duration-300
        ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Top Monospace HUD Meta Header */}
      {(code || status) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 font-mono text-[10px] tracking-widest text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-cyber-cyan font-bold">{code || 'NODE // 01'}</span>
          </div>
          <span className="text-slate-500 uppercase">{status}</span>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
