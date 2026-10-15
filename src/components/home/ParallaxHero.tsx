import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Sparkles, 
  Clock, 
  Eye, 
  Pause,
  Play
} from 'lucide-react';
import type { Game } from '../../types';
import { GlowButton } from '../ui/GlowButton';
import { useStore } from '../../context/StoreContext';

interface ParallaxHeroProps {
  featuredGames: Game[];
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({ featuredGames }) => {
  const navigate = useNavigate();
  const { addToCart, setQuickViewGame } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const games = featuredGames.length > 0 ? featuredGames : [
    {
      id: 'cyberpunk-2077',
      title: 'Cyberpunk 2077: Phantom Liberty',
      tagline: 'Freedom always comes at a price. Infiltrate Dogtown in an espionage thriller.',
      price: 29.99,
      originalPrice: 59.99,
      discountPercent: 50,
      genre: ['Action RPG', 'Open World', 'Cyberpunk'],
      platforms: ['PC', 'PS5', 'Xbox Series X/S'],
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&auto=format&fit=crop',
      bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop',
    } as Game,
  ];

  const currentGame = games[currentSlide] || games[0];

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Scroll Parallax Tracking
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || games.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % games.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoplay, games.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % games.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + games.length) % games.length);

  const handleBuyNow = () => {
    addToCart(currentGame, currentGame.platforms[0]);
    navigate('/cart');
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] sm:min-h-screen overflow-hidden flex items-center justify-center bg-dark-void select-none"
    >
      {/* =========================================================================
          LAYER 1 (FARSIDE / DEEP BACKGROUND): Moves at 0.1x speed
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${scrollY * 0.1 + mousePos.y * 12}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Subtle deep nebula image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-110 filter blur-[2px]"
          style={{ backgroundImage: `url(${currentGame.bannerImage || currentGame.thumbnail})` }}
        />
        {/* Cyber grid lines */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(112, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 2 (MAIN STRUCTURE + GLOW): Moves at 0.3x speed
          ========================================================================= */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${scrollY * 0.3 + mousePos.y * 24}px, 0)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Animated pulsing radial glow behind central structure */}
        <div className="w-[500px] sm:w-[850px] h-[500px] sm:h-[850px] rounded-full bg-gradient-to-r from-cyber-violet/30 via-cyber-cyan/20 to-cyber-amber/15 filter blur-[100px] animate-glow-bounce opacity-70" />
        
        {/* Sci-Fi Hologram Nexus Rings */}
        <div className="absolute w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full border border-cyber-cyan/15 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full border border-dashed border-cyber-violet/25 animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full border border-cyber-cyan/20" />
      </div>

      {/* =========================================================================
          LAYER 3 (CENTERPIECE TITLE / MARQUEE GAME CAROUSEL): Moves at 0.5x speed
          ========================================================================= */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${scrollY * 0.45 + mousePos.y * 25}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* HUD Status Bar */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-dark-obsidian/90 border border-cyber-cyan/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyber-cyan">
                FEATURED // PREMIERE SHOWCASE 0{currentSlide + 1}
              </span>
              <span className="text-slate-500 font-mono text-[10px]">|</span>
              <span className="text-cyber-amber font-mono text-[11px] font-bold">
                -{currentGame.discountPercent}% OFF
              </span>
            </div>

            {/* Giant Geometric Heading with letter-spacing 0.12em */}
            <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-widest2 uppercase leading-[1.05] drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
              {currentGame.title}
            </h1>

            {/* Synopsis / Tagline */}
            <p className="text-sm sm:text-lg text-cyber-silver max-w-xl leading-relaxed font-sans font-normal">
              {currentGame.tagline}
            </p>

            {/* Metadata Tags & Platforms */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              {currentGame.genre.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 uppercase tracking-wider text-[11px]"
                >
                  {g}
                </span>
              ))}
              <span className="text-slate-600">•</span>
              <span className="text-cyber-cyan font-bold tracking-wider">
                {currentGame.platforms.join(' // ')}
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                ${currentGame.price.toFixed(2)}
              </span>
              {currentGame.originalPrice && currentGame.originalPrice > currentGame.price && (
                <span className="font-mono text-lg sm:text-xl text-slate-500 line-through">
                  ${currentGame.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="px-2.5 py-1 rounded bg-cyber-amber/15 text-cyber-amber border border-cyber-amber/40 font-mono text-xs font-bold uppercase">
                Save ${(currentGame.originalPrice - currentGame.price).toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {currentGame.isPreOrder ? (
                <GlowButton
                  variant="amber"
                  size="lg"
                  onClick={handleBuyNow}
                  leftIcon={<Clock className="w-5 h-5" />}
                >
                  PRE-ORDER NOW
                </GlowButton>
              ) : (
                <GlowButton
                  variant="cyan"
                  size="lg"
                  onClick={handleBuyNow}
                  leftIcon={<ShoppingCart className="w-5 h-5" />}
                >
                  BUY DIGITAL KEY
                </GlowButton>
              )}

              <GlowButton
                variant="hud"
                size="lg"
                onClick={() => setQuickViewGame(currentGame)}
                leftIcon={<Eye className="w-5 h-5" />}
              >
                QUICK VIEW
              </GlowButton>

              <Link to={`/games/${currentGame.id}`}>
                <GlowButton variant="ghost" size="lg">
                  DETAILS
                </GlowButton>
              </Link>
            </div>
          </div>

          {/* Right Showcase Artwork Frame */}
          <div className="lg:col-span-5 relative">
            <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-cyan/40 bg-dark-obsidian/80 backdrop-blur-xl shadow-hud group">
              <img
                src={currentGame.bannerImage || currentGame.thumbnail}
                alt={currentGame.title}
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-void via-transparent to-transparent opacity-90" />
              
              {/* Floating Key badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-dark-obsidian/90 border border-cyber-cyan/50 backdrop-blur-md font-mono text-xs text-cyber-cyan font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                INSTANT KEY DELIVERY
              </div>

              {/* Bottom slide controllers */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  {games.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-8 bg-cyber-cyan shadow-[0_0_10px_#00F0FF]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                    title={isAutoplay ? 'Pause Carousel' : 'Play Carousel'}
                  >
                    {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={prevSlide}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-cyber-cyan hover:text-black transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-cyber-cyan hover:text-black transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 4 (FOREGROUND SILHOUETTES): Moves at 0.8x speed
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-30 will-change-transform flex justify-between"
        style={{
          transform: `translate3d(${mousePos.x * -45}px, ${scrollY * 0.75 + mousePos.y * -30}px, 0)`,
          transition: 'transform 0.18s ease-out',
        }}
      >
        {/* Left Framing Sci-Fi Pillar */}
        <div className="hidden lg:block w-32 h-full bg-gradient-to-r from-[#050508] via-[#0B0C14]/80 to-transparent border-r border-cyber-cyan/10 opacity-70" />
        {/* Right Framing Sci-Fi Pillar */}
        <div className="hidden lg:block w-32 h-full bg-gradient-to-l from-[#050508] via-[#0B0C14]/80 to-transparent border-l border-cyber-violet/10 opacity-70" />
      </div>

      {/* =========================================================================
          LAYER 5 (TRANSITION FOG SYSTEM): 4 Overlapping horizontal drifting mist layers
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none z-40 overflow-hidden">
        {/* Fog Layer 1 (Slow Deep Cyan Drift) */}
        <div 
          className="fog-layer animate-fog-drift-1 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0, 240, 255, 0.45), transparent 70%), linear-gradient(to top, #050508 20%, transparent 100%)`,
          }}
        />
        {/* Fog Layer 2 (Reverse Violet Drift) */}
        <div 
          className="fog-layer animate-fog-drift-2 opacity-35 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(ellipse 70% 60% at 30% 100%, rgba(112, 0, 255, 0.5), transparent 60%)`,
          }}
        />
        {/* Fog Layer 3 (Amber Edge Highlights) */}
        <div 
          className="fog-layer animate-fog-drift-1 opacity-25 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(ellipse 40% 40% at 80% 100%, rgba(255, 184, 0, 0.35), transparent 60%)`,
          }}
        />
        {/* Fog Layer 4 (Pure Black Seamless Bottom Mask dissolving into section below) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/85 to-transparent" />
      </div>

      {/* =========================================================================
          ANIMATED "SCROLL" INDICATOR WITH VERTICAL LASER-LINE ANIMATION
          ========================================================================= */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="font-mono text-[10px] font-bold tracking-widest3 uppercase text-cyber-cyan text-glow">
          SCROLL // DISCOVER
        </span>
        <div className="relative w-[2px] h-12 bg-white/10 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-b from-transparent via-cyber-cyan to-cyber-amber animate-laser-scroll shadow-[0_0_8px_#00F0FF]" />
        </div>
      </div>
    </div>
  );
};
