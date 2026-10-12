import React, { useState } from 'react';
import { Timer } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';

export const DealsPage: React.FC = () => {
  const [minDiscount, setMinDiscount] = useState<number>(0);

  const discountGames = MOCK_GAMES.filter((g) => g.discountPercent > 0 && g.discountPercent >= minDiscount);

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="discount">Hot Discounts</Badge>
          <span className="text-xs text-slate-400">• Up to 65% Price Cut</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Deals & Weekend Specials</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Top-tier games at bargain prices. All keys are genuine publisher copies backed by instant digital activation.
        </p>
      </div>

      {/* Weekend Flash Sale Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-dark-card to-dark-surface border border-rose-500/30 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Timer className="w-4 h-4 animate-pulse" /> Flash Weekend Sale Ends In:
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">48 Hours of Cyber Deals</h2>
          <p className="text-xs text-slate-300">Extra publisher coupons automatically applied at checkout.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Minimum Discount:</span>
          {[0, 20, 40, 50].map((d) => (
            <button
              key={d}
              onClick={() => setMinDiscount(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                minDiscount === d
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-dark-surface text-slate-300 hover:bg-dark-card border border-dark-border'
              }`}
            >
              {d === 0 ? 'All Deals' : `${d}%+ Off`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {discountGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </PageContainer>
  );
};
