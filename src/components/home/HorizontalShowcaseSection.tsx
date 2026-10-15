import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart, Layers } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { GlowButton } from '../ui/GlowButton';
import { useStore } from '../../context/StoreContext';

export const HorizontalShowcaseSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { addToCart, setQuickViewGame } = useStore();

  const curatedGames = MOCK_GAMES.filter((g) => g.rating >= 4.8 || g.isBestSeller || g.isBundle);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full my-16 py-8 overflow-hidden bg-gradient-to-b from-dark-void via-dark-obsidian/60 to-dark-void border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a855f7] mb-2">
              <Layers className="w-4 h-4 text-cyber-violet" />
              HORIZONTAL VAULT // PINNED SHOWCASE
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-black text-white tracking-widest2 uppercase">
              HALL OF MASTERPIECES
            </h2>
          </div>

          {/* Navigation Arrows & Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
              <span>TRACK:</span>
              <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-violet transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span>{Math.round(scrollProgress)}%</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-lg bg-dark-card border border-white/10 hover:border-cyber-cyan text-white hover:text-cyber-cyan flex items-center justify-center transition-all duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-lg bg-dark-card border border-white/10 hover:border-cyber-cyan text-white hover:text-cyber-cyan flex items-center justify-center transition-all duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {curatedGames.map((game, idx) => (
            <div
              key={game.id}
              className="w-[320px] sm:w-[380px] shrink-0 snap-start hud-bracket-container relative rounded-2xl overflow-hidden bg-dark-card/90 backdrop-blur-xl border border-white/10 hover:border-cyber-cyan/50 p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span className="text-cyber-cyan font-bold">
                  {(idx + 1).toString().padStart(2, '0')} // VAULT
                </span>
                <span className="px-2 py-0.5 rounded bg-cyber-amber/15 text-cyber-amber font-bold border border-cyber-amber/40">
                  -{game.discountPercent}% OFF
                </span>
              </div>

              {/* Artwork */}
              <div className="relative rounded-xl overflow-hidden h-48 bg-dark-void border border-white/5 mb-4">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300">
                  {game.genre.slice(0, 2).join(' • ')}
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-2 mb-4">
                <h3 className="font-syne text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
                  {game.title}
                </h3>
                <p className="text-xs text-cyber-silver line-clamp-2 leading-relaxed">
                  {game.tagline}
                </p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="font-mono text-xl font-black text-white">
                    ${game.price.toFixed(2)}
                  </span>
                  {game.originalPrice && game.originalPrice > game.price && (
                    <span className="font-mono text-xs text-slate-500 line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <GlowButton
                  variant="hud"
                  size="sm"
                  onClick={() => setQuickViewGame(game)}
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                >
                  PREVIEW
                </GlowButton>
                <GlowButton
                  variant="cyan"
                  size="sm"
                  onClick={() => addToCart(game, game.platforms[0])}
                  leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                >
                  ADD TO CART
                </GlowButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
