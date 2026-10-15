import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Sparkles, 
  Play, 
  Zap, 
  Monitor, 
  Clock 
} from 'lucide-react';
import type { Game } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useStore } from '../../context/StoreContext';

export interface HeroBannerProps {
  featuredGames: Game[];
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredGames,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const slides = featuredGames.length > 0 ? featuredGames : [];
  const currentGame = slides[currentIndex] || slides[0];

  // Auto-slide every 6 seconds if not hovered/paused
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  if (!currentGame) return null;

  const isWishlisted = isInWishlist(currentGame.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleBuyNow = () => {
    addToCart(currentGame, currentGame.platforms[0] || 'PC');
    navigate('/cart');
  };

  const handleAddToCart = () => {
    addToCart(currentGame, currentGame.platforms[0] || 'PC');
  };

  const handleWishlistClick = () => {
    toggleWishlist(currentGame);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full rounded-2xl overflow-hidden border border-brand-500/30 bg-[#090D18] shadow-2xl hud-frame group ${className}`}
    >
      {/* Background Cinematic Artwork with Neon Atmospheric Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={currentGame.id}
          src={currentGame.bannerImage || currentGame.thumbnail}
          alt={currentGame.title}
          className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-all duration-1000 ease-out group-hover:scale-110"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/85 to-transparent md:w-3/4" />
        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
        {/* Top Badges & Carousel Arrows */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 backdrop-blur-md shadow-glow-purple">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Featured Spotlight
            </span>
            {currentGame.discountPercent > 0 && (
              <Badge variant="discount">Save {currentGame.discountPercent}%</Badge>
            )}
            {currentGame.isPreOrder && (
              <Badge variant="cyan" dot>Pre-Order Now</Badge>
            )}
            {currentGame.isBundle && (
              <Badge variant="purple">Definitive Bundle</Badge>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-2.5 rounded-xl bg-dark-base/80 hover:bg-dark-card text-slate-300 hover:text-white border border-dark-border hover:border-brand-500/50 transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 px-2 select-none">
              <span className="text-white">0{currentIndex + 1}</span> / 0{slides.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-2.5 rounded-xl bg-dark-base/80 hover:bg-dark-card text-slate-300 hover:text-white border border-dark-border hover:border-brand-500/50 transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center / Game Presentation */}
        <div className="max-w-2xl my-6 space-y-3.5">
          {/* Platforms & Genre */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-dark-card/90 px-2.5 py-1 rounded-md border border-dark-border text-slate-300 font-semibold">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentGame.platforms.join(' • ')}</span>
            </div>
            {currentGame.genre.map((g) => (
              <span key={g} className="font-semibold text-brand-300 tracking-wide uppercase px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20 text-[11px]">
                {g}
              </span>
            ))}
          </div>

          {/* Bold Futuristic Heading */}
          <h1 className="font-tech text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide leading-tight drop-shadow-md">
            {currentGame.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
            {currentGame.description}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ${currentGame.price.toFixed(2)}
            </span>
            {currentGame.discountPercent > 0 && (
              <span className="text-base text-slate-400 line-through">
                ${currentGame.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
              Verified Digital Key
            </span>
          </div>
        </div>

        {/* Bottom Actions and Progress Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Action Button */}
            {currentGame.isPreOrder ? (
              <Button
                size="lg"
                onClick={handleAddToCart}
                leftIcon={<Clock className="w-4 h-4 text-cyan-300" />}
                className="bg-cyan-600 hover:bg-cyan-500 border-cyan-400 shadow-glow-cyan font-bold"
              >
                Preorder Now
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleBuyNow}
                leftIcon={<Zap className="w-4 h-4 text-amber-300" />}
                className="bg-brand-600 hover:bg-brand-500 shadow-glow-brand font-bold"
              >
                Buy Now
              </Button>
            )}

            {/* Explore Game Details Button */}
            <Link to={`/games/${currentGame.id}`}>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Play className="w-4 h-4" />}
                className="border-brand-500/40 text-brand-300 hover:text-white hover:border-brand-400"
              >
                Explore Game
              </Button>
            </Link>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              className={`p-3.5 rounded-xl border transition-all ${
                isWishlisted
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950/50'
                  : 'bg-dark-base/80 hover:bg-dark-card text-slate-300 hover:text-rose-400 border-dark-border'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Slide Indicator Bars */}
          <div className="flex items-center gap-2">
            {slides.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-10 bg-gradient-to-r from-brand-500 to-cyan-400 shadow-glow-cyan'
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
