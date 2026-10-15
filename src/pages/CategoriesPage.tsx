import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sword, 
  Cpu, 
  Compass, 
  Flame, 
  Crosshair, 
  Ghost, 
  Gauge, 
  Sparkles,
  ChevronRight,
  Layers,
  Zap,
  Trophy
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PageContainer } from '../components/layout/PageContainer';

export const CategoriesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-6 h-6 text-cyber-cyan" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-cyber-amber" />;
      case 'Sword': return <Sword className="w-6 h-6 text-cyber-cyan" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyber-cyan" />;
      case 'Compass': return <Compass className="w-6 h-6 text-cyber-cyan" />;
      case 'Flame': return <Flame className="w-6 h-6 text-cyber-amber" />;
      case 'Crosshair': return <Crosshair className="w-6 h-6 text-[#a855f7]" />;
      case 'Ghost': return <Ghost className="w-6 h-6 text-rose-400" />;
      case 'Gauge': return <Gauge className="w-6 h-6 text-cyber-amber" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#a855f7]" />;
      default: return <Layers className="w-6 h-6 text-cyber-cyan" />;
    }
  };

  return (
    <PageContainer className="space-y-12 pb-20 select-none">
      {/* Header Banner */}
      <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-cyan/40 bg-gradient-to-r from-dark-obsidian via-[#071324] to-dark-obsidian p-6 sm:p-12 shadow-[0_0_35px_rgba(0,240,255,0.2)]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-cyan">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>TAXONOMY ARCHIVE // {CATEGORIES.length} CORE GENRES</span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-widest2 uppercase">
            EXPLORE GENRE MATRICES
          </h1>
          <p className="text-sm text-cyber-silver leading-relaxed font-sans">
            Find your next obsession by combat style, narrative depth, or visual aesthetic. All titles certified for instant key generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={cat.id}
            to={`/games?category=${cat.slug}`}
            className="hud-bracket-container group relative bg-dark-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyber-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyber-cyan/50 transition-all duration-300">
                  {getIcon(cat.iconName)}
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  {(idx + 1).toString().padStart(2, '0')} // NODE
                </span>
              </div>

              <h3 className="font-syne text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-cyber-silver mt-2 line-clamp-2 leading-relaxed font-sans">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 font-semibold">{cat.itemCount} TITLES</span>
              <span className="text-cyber-cyan font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                ENTER PORTAL <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};
