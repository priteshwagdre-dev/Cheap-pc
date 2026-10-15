import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ShieldCheck, ChevronRight, ShoppingCart, Check, Eye } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useStore } from '../../context/StoreContext';

export const UpcomingPreordersSection: React.FC = () => {
  const { addToCart, isInCart, setQuickViewGame } = useStore();
  const preorders = MOCK_GAMES.filter((g) => g.isPreOrder);

  // Dynamic countdown for the flagship upcoming release
  const daysRemaining = 36;
  const hoursRemaining = 14;
  const [minsRemaining, setMinsRemaining] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinsRemaining((m) => (m > 0 ? m - 1 : 59));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              <Clock className="w-3.5 h-3.5" />
              Upcoming Blockbusters
            </span>
            <Badge variant="cyan" dot>Day-One Key Guaranteed</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Upcoming Games & Exclusive Pre-Orders
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Reserve tomorrow&apos;s most anticipated games with guaranteed digital keys, beta access, and bonus skins.
          </p>
        </div>

        <Link
          to="/pre-orders"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
        >
          View All Pre-Orders <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Featured Large Upcoming Release Card */}
      {preorders[0] && (
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#090E1A] shadow-2xl shadow-cyan-950/40 flex flex-col lg:flex-row">
          {/* Large Game Artwork */}
          <div className="lg:w-3/5 relative min-h-[300px] lg:min-h-[380px] overflow-hidden group">
            <img
              src={preorders[0].bannerImage || preorders[0].thumbnail}
              alt={preorders[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A] via-[#090E1A]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090E1A]" />

            {/* Floating Upcoming Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-glow-cyan">
                Pre-Order Spotlight
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-dark-base/80 border border-white/20 backdrop-blur-md flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Releases: {preorders[0].releaseDate}
              </span>
            </div>
          </div>

          {/* Details & Interactive Preorder Box */}
          <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-[#090E1A]">
            <div className="space-y-3">
              {/* Genre and Platform */}
              <div className="flex flex-wrap items-center gap-2">
                {preorders[0].platforms.map((p) => (
                  <span key={p} className="text-[10px] font-bold text-slate-300 bg-dark-surface px-2 py-0.5 rounded border border-dark-border">
                    {p}
                  </span>
                ))}
                {preorders[0].genre.map((g) => (
                  <span key={g} className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    {g}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {preorders[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {preorders[0].description}
              </p>

              {/* Countdown to launch */}
              <div className="p-3.5 rounded-xl bg-dark-surface/90 border border-cyan-500/20 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Launch Countdown
                </span>
                <div className="flex items-center gap-2">
                  <div className="text-center px-2.5 py-1 rounded bg-dark-base border border-dark-border min-w-[50px]">
                    <span className="font-mono text-base font-black text-cyan-400">{daysRemaining}</span>
                    <span className="text-[9px] uppercase block text-slate-400">Days</span>
                  </div>
                  <div className="text-center px-2.5 py-1 rounded bg-dark-base border border-dark-border min-w-[50px]">
                    <span className="font-mono text-base font-black text-white">{hoursRemaining}</span>
                    <span className="text-[9px] uppercase block text-slate-400">Hours</span>
                  </div>
                  <div className="text-center px-2.5 py-1 rounded bg-dark-base border border-dark-border min-w-[50px]">
                    <span className="font-mono text-base font-black text-white">{minsRemaining}</span>
                    <span className="text-[9px] uppercase block text-slate-400">Mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preorder Actions */}
            <div className="pt-4 border-t border-dark-border/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pre-Order Price</span>
                  <span className="text-3xl font-black text-white">${preorders[0].price.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    <ShieldCheck className="w-3 h-3" /> Price Guarantee
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="md"
                  fullWidth
                  onClick={() => addToCart(preorders[0], preorders[0].platforms[0] || 'PC')}
                  leftIcon={isInCart(preorders[0].id) ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingCart className="w-4 h-4" />}
                  className="bg-cyan-600 hover:bg-cyan-500 border-cyan-400 shadow-glow-cyan text-white font-bold"
                >
                  {isInCart(preorders[0].id) ? 'Pre-Order in Cart' : 'Pre-Order Now'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setQuickViewGame(preorders[0])}
                  leftIcon={<Eye className="w-4 h-4" />}
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Upcoming Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {preorders.slice(1).map((game) => (
          <div
            key={game.id}
            className="group relative rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 bg-[#0B101D] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-glow-cyan"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-dark-surface">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="cyan" dot>Releases {game.releaseDate}</Badge>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {game.genre.join(' • ')}
                </span>
                <Link to={`/games/${game.id}`}>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-0.5">
                    {game.title}
                  </h4>
                </Link>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {game.tagline}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-dark-border/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Pre-Order</span>
                <span className="text-lg font-black text-white">${game.price.toFixed(2)}</span>
              </div>
              <Button
                variant={isInCart(game.id) ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => addToCart(game, game.platforms[0] || 'PC')}
                className="bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white font-bold"
              >
                {isInCart(game.id) ? 'Reserved' : 'Preorder'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
