import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface BentoPortalCardProps {
  index: string; // e.g. "01 //"
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'cyan' | 'violet' | 'amber';
  image?: string;
  accentGlow?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const BentoPortalCard: React.FC<BentoPortalCardProps> = ({
  index,
  title,
  subtitle,
  badge,
  badgeColor = 'cyan',
  image,
  onClick,
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const badgeStyles = {
    cyan: 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40',
    violet: 'bg-cyber-violet/15 text-[#a855f7] border-cyber-violet/40',
    amber: 'bg-cyber-amber/15 text-cyber-amber border-cyber-amber/40',
  }[badgeColor];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`
        bento-portal-card group relative rounded-2xl overflow-hidden
        bg-dark-obsidian/90 backdrop-blur-xl border border-white/10
        p-6 sm:p-7 flex flex-col justify-between
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Dynamic Cursor Spotlight Border Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.18), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(112, 0, 255, 0.22), transparent 70%)`,
        }}
      />

      {/* Top Header: Monospace Index + Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
        <span className="font-mono text-xs font-bold tracking-widest text-slate-500 group-hover:text-cyber-cyan transition-colors">
          {index}
        </span>
        {badge && (
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeStyles}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Visual Preview / Artwork if provided */}
      {image && (
        <div className="relative z-10 my-3 rounded-xl overflow-hidden h-40 bg-dark-surface border border-white/5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-obsidian via-transparent to-transparent opacity-80" />
        </div>
      )}

      {/* Content Area */}
      <div className="relative z-10 space-y-2">
        <h3 className="font-syne text-xl sm:text-2xl font-black text-white group-hover:text-cyber-cyan transition-colors tracking-tight flex items-center justify-between">
          <span>{title}</span>
          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyber-cyan group-hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 shrink-0">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-cyber-silver leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Bottom Corner Accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/0 group-hover:via-cyber-cyan/70 to-transparent transition-all duration-500" />
    </div>
  );
};
