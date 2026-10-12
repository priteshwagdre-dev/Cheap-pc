import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Monitor, Gamepad } from 'lucide-react';
import type { Game } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface GameCardProps {
  game: Game;
  variant?: 'standard' | 'compact' | 'horizontal';
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'standard',
  className = ''
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(!isAddedToCart);
  };

  const formatPrice = (val: number) => {
    if (val === 0) return 'FREE';
    return `$${val.toFixed(2)}`;
  };

  if (variant === 'horizontal') {
    return (
      <div className={`group relative flex flex-col sm:flex-row bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-dark-border-light hover:shadow-card-hover transition-all duration-300 ${className}`}>
        <Link to={`/games/${game.id}`} className="sm:w-64 h-48 sm:h-auto shrink-0 relative overflow-hidden block">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {game.discountPercent > 0 && (
            <div className="absolute top-3 left-3">
              <Badge variant="discount">-{game.discountPercent}%</Badge>
            </div>
          )}
        </Link>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {game.genre.slice(0, 2).map((g) => (
                  <Badge key={g} variant="default" size="sm">
                    {g}
                  </Badge>
                ))}
              </div>
              <button
                type="button"
                onClick={handleWishlistClick}
                aria-label="Wishlist game"
                className={`p-2 rounded-lg transition-colors border ${
                  isWishlisted
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-dark-surface text-slate-400 hover:text-white border-dark-border'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link to={`/games/${game.id}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {game.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{game.shortDescription}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400 text-xs font-semibold gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{game.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                {game.discountPercent > 0 && (
                  <span className="text-xs text-slate-400 line-through block">
                    {formatPrice(game.originalPrice)}
                  </span>
                )}
                <span className="text-base font-extrabold text-white">
                  {formatPrice(game.price)}
                </span>
              </div>
              <Button
                variant={isAddedToCart ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleCartClick}
                leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              >
                {isAddedToCart ? 'In Cart' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative flex flex-col bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-dark-border-light hover:bg-dark-card-hover hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className}`}>
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-surface">
        <Link to={`/games/${game.id}`} className="block w-full h-full">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {game.discountPercent > 0 && (
            <Badge variant="discount">-{game.discountPercent}%</Badge>
          )}
          {game.isPreOrder && (
            <Badge variant="cyan" dot>Pre-Order</Badge>
          )}
          {game.isBundle && (
            <Badge variant="purple">Bundle</Badge>
          )}
          {game.isNewRelease && !game.discountPercent && (
            <Badge variant="brand" dot>New</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-lg backdrop-blur-md transition-all duration-200 border ${
            isWishlisted
              ? 'bg-rose-600/90 text-white border-rose-500 shadow-lg shadow-rose-900/50 scale-105'
              : 'bg-dark-base/70 text-slate-300 hover:text-white hover:bg-dark-base border-white/10'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Platform Icons subtle overlay */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-dark-base/80 backdrop-blur-sm border border-white/5 text-[10px] text-slate-300">
          <Monitor className="w-3 h-3 text-cyan-400" />
          <Gamepad className="w-3 h-3 text-brand-400" />
          <span className="font-semibold text-slate-300">
            {game.platforms[0] || 'PC'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Genre / Tags */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider truncate">
              {game.genre.slice(0, 2).join(' • ')}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/games/${game.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
              {game.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">{game.tagline}</p>
        </div>

        {/* Price & Actions Row */}
        <div className="mt-4 pt-3 border-t border-dark-border/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {game.discountPercent > 0 && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatPrice(game.originalPrice)}
              </span>
            )}
            <span className="text-base font-extrabold text-white tracking-tight">
              {formatPrice(game.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isAddedToCart ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleCartClick}
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              className={isAddedToCart ? 'border-emerald-500/40 text-emerald-300' : ''}
            >
              {isAddedToCart ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
