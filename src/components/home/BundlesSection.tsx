import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShoppingCart, Check, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useStore } from '../../context/StoreContext';

export const BundlesSection: React.FC = () => {
  const { addToCart, isInCart, setQuickViewGame } = useStore();
  const bundleGames = MOCK_GAMES.filter((g) => g.isBundle);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Layers className="w-3.5 h-3.5" />
              Massive Value Packs
            </span>
            <Badge variant="purple">Save up to 65%</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Curated Franchise & Game Bundles
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Get multiple critically acclaimed titles, complete DLC expansions, and master soundtracks bundled in one checkout.
          </p>
        </div>

        <Link
          to="/bundles"
          className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 shrink-0"
        >
          View All Bundles <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Dedicated Bundles Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bundleGames.map((bundle) => {
          const isAdded = isInCart(bundle.id);
          const savingsAmount = (bundle.originalPrice - bundle.price).toFixed(2);

          return (
            <div
              key={bundle.id}
              className="group relative rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/70 bg-[#0B0F1C] flex flex-col justify-between transition-all duration-300 hover:shadow-glow-purple"
            >
              {/* Top Artwork */}
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-surface">
                  <img
                    src={bundle.bannerImage || bundle.thumbnail}
                    alt={bundle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1C] via-transparent to-transparent" />

                  {/* Savings percentage tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-purple-600 text-white shadow-glow-purple">
                      Save {bundle.discountPercent}%
                    </span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewGame(bundle)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-dark-base/80 hover:bg-dark-card text-slate-300 hover:text-white border border-dark-border transition-colors backdrop-blur-md"
                    title="Quick Preview"
                    type="button"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                      Franchise Collection
                    </span>
                    <Link to={`/games/${bundle.id}`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mt-0.5">
                        {bundle.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {bundle.shortDescription}
                    </p>
                  </div>

                  {/* Included Games List */}
                  <div className="p-3.5 rounded-xl bg-dark-surface/90 border border-dark-border/80 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      What&apos;s Included in this Bundle:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      {bundle.bundleItems?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing & Dual Action Buttons */}
              <div className="p-5 pt-0 space-y-3">
                <div className="pt-3 border-t border-dark-border/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Bundle Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">${bundle.price.toFixed(2)}</span>
                      <span className="text-xs text-slate-400 line-through">${bundle.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Save ${savingsAmount}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/games/${bundle.id}`} className="w-full">
                    <Button variant="secondary" size="sm" fullWidth>
                      View Bundle
                    </Button>
                  </Link>

                  <Button
                    variant={isAdded ? 'secondary' : 'primary'}
                    size="sm"
                    fullWidth
                    onClick={() => addToCart(bundle, bundle.platforms[0] || 'PC')}
                    leftIcon={isAdded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                    className={isAdded ? 'border-emerald-500/40 text-emerald-300' : 'bg-purple-600 hover:bg-purple-500 shadow-glow-purple text-white font-bold'}
                  >
                    {isAdded ? 'In Cart' : 'Add Bundle'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
