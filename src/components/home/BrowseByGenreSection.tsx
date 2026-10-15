import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Compass, 
  Sword, 
  Gauge, 
  Trophy, 
  Ghost, 
  Crosshair, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { Badge } from '../ui/Badge';

// Map icon names to Lucide icons
const genreIcons: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Sword: <Sword className="w-6 h-6" />,
  Gauge: <Gauge className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  Ghost: <Ghost className="w-6 h-6" />,
  Crosshair: <Crosshair className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

export const BrowseByGenreSection: React.FC = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Compass className="w-3.5 h-3.5" />
              Genre Taxonomy
            </span>
            <Badge variant="cyan">8 Epic Categories</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Browse Games by Genre
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dive into carefully organized universes tailored to your playstyle, mechanics, and intensity preferences.
          </p>
        </div>

        <Link
          to="/categories"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
        >
          All Categories <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 8 Genre Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/games?category=${cat.slug}`}
            className="group relative rounded-2xl overflow-hidden border border-dark-border hover:border-brand-500/50 bg-[#0B101D] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
          >
            {/* Top gradient glow corner */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cat.gradient} opacity-10 group-hover:opacity-25 blur-2xl transition-opacity pointer-events-none`} />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} p-0.5 shadow-md flex items-center justify-center text-white`}>
                  <div className="w-full h-full bg-[#0B101D]/80 rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors">
                    {genreIcons[cat.iconName] || <Zap className="w-6 h-6" />}
                  </div>
                </div>

                {cat.badge && (
                  <Badge variant="cyan" size="sm">
                    {cat.badge}
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-400 relative z-10">
              <span className="font-semibold text-slate-300">{cat.itemCount} Games</span>
              <span className="text-brand-400 font-bold group-hover:underline">Explore &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
