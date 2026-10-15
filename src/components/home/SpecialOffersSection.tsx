import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import { GameCard } from '../game/GameCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const SpecialOffersSection: React.FC = () => {
  // Weekend flash sale countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 19,
    minutes: 42,
    seconds: 58
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = MOCK_GAMES.filter((g) => g.isDeal || g.discountPercent >= 40).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Header bar with live flash sale timer */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-dark-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-orange-500/15 text-neon-orange border border-orange-500/30">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Limited-Time Deals
            </span>
            <Badge variant="discount">Up to 65% Off</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Special Offers & Weekend Flash Cuts
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Exclusive publisher markdowns on verified digital activations. Resetting weekly.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-3 bg-[#0B101D] border border-orange-500/30 px-4 py-2.5 rounded-xl shadow-glow-orange shrink-0">
          <Clock className="w-4 h-4 text-neon-orange animate-pulse" />
          <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
            <span className="text-slate-400">Ends in:</span>
            <span className="font-mono text-white bg-dark-base px-2 py-0.5 rounded border border-dark-border text-sm">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="font-mono text-white bg-dark-base px-2 py-0.5 rounded border border-dark-border text-sm">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="font-mono text-neon-orange bg-dark-base px-2 py-0.5 rounded border border-dark-border text-sm">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Deal GameCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Link to="/deals">
          <Button variant="outline" size="md" rightIcon={<ChevronRight className="w-4 h-4" />}>
            Browse All 40+ Discounted Games
          </Button>
        </Link>
      </div>
    </section>
  );
};
