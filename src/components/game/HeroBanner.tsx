import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Sparkles, Play } from 'lucide-react';
import type { Game } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface HeroBannerProps {
  featuredGames: Game[];
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredGames,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentGame = featuredGames[currentIndex] || featuredGames[0];

  if (!currentGame) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-dark-border bg-dark-card shadow-2xl ${className}`}>
      {/* Background Cinematic Art with Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentGame.bannerImage || currentGame.thumbnail}
          alt={currentGame.title}
          className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-dark-card/80 to-transparent" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 min-h-[440px] sm:min-h-[500px] flex flex-col justify-between">
        {/* Top Badges & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Featured Spotlight
            </span>
            {currentGame.discountPercent > 0 && (
              <Badge variant="discount">Save {currentGame.discountPercent}%</Badge>
            )}
            {currentGame.isPreOrder && (
              <Badge variant="cyan">Pre-Order Now</Badge>
            )}
          </div>

          {/* Banner Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-2 rounded-lg bg-dark-base/80 hover:bg-dark-surface text-slate-300 hover:text-white border border-dark-border transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium text-slate-400 px-1">
              0{currentIndex + 1} / 0{featuredGames.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-2 rounded-lg bg-dark-base/80 hover:bg-dark-surface text-slate-300 hover:text-white border border-dark-border transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center / Game Info */}
        <div className="max-w-2xl my-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {currentGame.genre.map((g) => (
              <span key={g} className="text-xs font-medium text-brand-400 tracking-wide uppercase">
                {g}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {currentGame.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
            {currentGame.description}
          </p>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">
              ${currentGame.price.toFixed(2)}
            </span>
            {currentGame.discountPercent > 0 && (
              <span className="text-base text-slate-400 line-through">
                ${currentGame.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Instant Digital Key
            </span>
          </div>
        </div>

        {/* Bottom Actions and Slider Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/games/${currentGame.id}`}>
              <Button size="lg" leftIcon={<ShoppingCart className="w-4 h-4" />}>
                {currentGame.isPreOrder ? 'Pre-Order Now' : 'Buy Game Now'}
              </Button>
            </Link>

            <Link to={`/games/${currentGame.id}`}>
              <Button variant="outline" size="lg" leftIcon={<Play className="w-4 h-4" />}>
                View Details
              </Button>
            </Link>

            <button
              aria-label="Add to wishlist"
              className="p-3.5 rounded-lg bg-dark-base/80 hover:bg-dark-surface text-slate-300 hover:text-rose-400 border border-dark-border transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicator Bars */}
          <div className="flex items-center gap-2">
            {featuredGames.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-brand-500 shadow-glow-brand'
                    : 'w-3 bg-dark-border hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
