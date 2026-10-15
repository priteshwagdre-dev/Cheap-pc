import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Monitor, 
  Gamepad2, 
  Check, 
  Eye, 
  Layers
} from 'lucide-react';
import type { Game } from '../../types';
import { useStore } from '../../context/StoreContext';

export interface GameCardProps {
  game: Game;
  variant?: 'standard' | 'compact' | 'horizontal';
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'standard',
  className = '',
}) => {
  const { isInCart, addToCart, isInWishlist, toggleWishlist, setQuickViewGame } = useStore();
  const isWishlisted = isInWishlist(game.id);
  const isAddedToCart = isInCart(game.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game, game.platforms[0] || 'PC');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewGame(game);
  };

  const formatPrice = (val: number) => {
    if (val === 0) return 'FREE';
    return `$${val.toFixed(2)}`;
  };

  if (variant === 'horizontal') {
    return (
      <div className={`hud-bracket-container group relative flex flex-col sm:flex-row bg-dark-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyber-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300 ${className}`}>
        {/* Thumbnail link */}
        <Link to={`/games/${game.id}`} className="sm:w-64 h-48 sm:h-auto shrink-0 relative overflow-hidden block bg-dark-void">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-void/80 via-transparent to-transparent sm:hidden" />

          {game.discountPercent > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-md bg-cyber-amber/20 border border-cyber-amber/50 font-mono text-[10px] font-bold text-cyber-amber">
                SAVE {game.discountPercent}%
              </span>
            </div>
          )}

          {/* Quick View overlay button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="absolute bottom-3 left-3 z-10 hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-obsidian/90 text-cyber-cyan hover:text-white border border-cyber-cyan/40 text-xs font-mono font-bold backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </Link>

        {/* Content Details */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2 font-mono">
              <div className="flex flex-wrap items-center gap-1.5">
                {game.genre.slice(0, 2).map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300 uppercase tracking-wider">
                    {g}
                  </span>
                ))}
                {game.isBundle && (
                  <span className="px-2 py-0.5 rounded bg-cyber-violet/20 border border-cyber-violet/40 text-[10px] text-[#a855f7] font-bold uppercase tracking-wider">
                    BUNDLE
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-2 rounded-lg transition-colors border ${
                  isWishlisted
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-400' : ''}`} />
              </button>
            </div>

            <Link to={`/games/${game.id}`}>
              <h3 className="font-syne text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors">
                {game.title}
              </h3>
            </Link>
            <p className="text-xs text-cyber-silver mt-1 line-clamp-2 leading-relaxed">{game.shortDescription}</p>

            {/* Bundle items preview */}
            {game.bundleItems && game.bundleItems.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#a855f7]" /> INCLUDES:
                </span>
                <ul className="text-[11px] font-mono text-slate-300 space-y-0.5 line-clamp-2">
                  {game.bundleItems.slice(0, 2).map((item, i) => (
                    <li key={i} className="truncate">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <div className="flex items-center text-cyber-amber text-xs font-bold gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{game.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-[11px] text-slate-400">{game.platforms[0] || 'PC'}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right font-mono">
                {game.discountPercent > 0 && (
                  <span className="text-xs text-slate-500 line-through block">
                    {formatPrice(game.originalPrice)}
                  </span>
                )}
                <span className="text-base font-black text-white">
                  {formatPrice(game.price)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCartClick}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all clip-hud-btn ${
                  isAddedToCart
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyber-cyan text-black hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                }`}
              >
                {isAddedToCart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                <span>{isAddedToCart ? 'IN CART' : 'ADD'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card Layout
  return (
    <div className={`hud-bracket-container group relative flex flex-col bg-dark-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyber-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:-translate-y-1.5 transition-all duration-300 ${className}`}>
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-void">
        <Link to={`/games/${game.id}`} className="block w-full h-full">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-void/90 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 font-mono">
          {game.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded bg-cyber-amber/20 border border-cyber-amber/50 font-bold text-[10px] text-cyber-amber">
              -{game.discountPercent}%
            </span>
          )}
          {game.isPreOrder && (
            <span className="px-2 py-0.5 rounded bg-cyber-cyan/20 border border-cyber-cyan/50 font-bold text-[10px] text-cyber-cyan flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              PRE-ORDER
            </span>
          )}
          {game.isBundle && (
            <span className="px-2 py-0.5 rounded bg-cyber-violet/20 border border-cyber-violet/50 font-bold text-[10px] text-[#a855f7]">
              BUNDLE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-lg backdrop-blur-md transition-all duration-200 border ${
            isWishlisted
              ? 'bg-rose-600/90 text-white border-rose-500 shadow-lg shadow-rose-950/50 scale-105'
              : 'bg-dark-void/70 text-slate-300 hover:text-white hover:bg-dark-void border-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute inset-x-4 bottom-3 z-10 py-1.5 rounded-lg bg-dark-obsidian/90 hover:bg-dark-surface text-cyber-cyan hover:text-white border border-cyber-cyan/40 text-xs font-mono font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>QUICK VIEW</span>
        </button>

        {/* Platform Icons overlay */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-dark-void/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-slate-300 group-hover:opacity-0 transition-opacity">
          <Monitor className="w-3 h-3 text-cyber-cyan" />
          <Gamepad2 className="w-3 h-3 text-cyber-violet" />
          <span>{game.platforms[0] || 'PC'}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Genre / Tags */}
          <div className="flex items-center justify-between gap-2 mb-2 font-mono">
            <span className="text-[10px] font-bold text-cyber-cyan uppercase tracking-wider truncate">
              {game.genre.slice(0, 2).join(' • ')}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 text-cyber-amber text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/games/${game.id}`}>
            <h3 className="font-syne text-base font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
              {game.title}
            </h3>
          </Link>
          <p className="text-xs text-cyber-silver mt-1 line-clamp-1 font-sans">{game.tagline}</p>
        </div>

        {/* Price & Actions Row */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col font-mono">
            {game.discountPercent > 0 && (
              <span className="text-[11px] text-slate-500 line-through">
                {formatPrice(game.originalPrice)}
              </span>
            )}
            <span className="text-base font-black text-white">
              {formatPrice(game.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCartClick}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all clip-hud-btn ${
              isAddedToCart
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-cyber-cyan to-[#0284c7] text-black hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
            }`}
          >
            {isAddedToCart ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            <span>{isAddedToCart ? 'IN CART' : 'ADD'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
