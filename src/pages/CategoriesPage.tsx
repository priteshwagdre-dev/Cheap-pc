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
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const CategoriesPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sword': return <Sword className="w-6 h-6 text-indigo-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-rose-400" />;
      case 'Crosshair': return <Crosshair className="w-6 h-6 text-pink-400" />;
      case 'Ghost': return <Ghost className="w-6 h-6 text-red-400" />;
      case 'Gauge': return <Gauge className="w-6 h-6 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
      default: return <Layers className="w-6 h-6 text-brand-400" />;
    }
  };

  return (
    <PageContainer>
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">Directory</Badge>
          <span className="text-xs text-slate-400">• {CATEGORIES.length} Core Genres</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Browse Game Categories</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Find your next favorite obsession by genre, combat style, or immersive aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/games?category=${cat.slug}`}
            className="group relative bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-dark-border-light hover:bg-dark-card-hover hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getIcon(cat.iconName)}
                </div>
                {cat.badge && (
                  <Badge variant="brand" size="sm">{cat.badge}</Badge>
                )}
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">{cat.itemCount} Titles Available</span>
              <span className="text-brand-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};
