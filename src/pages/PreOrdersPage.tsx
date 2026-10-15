import { Gift, Clock, ShieldCheck } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { UpcomingPreordersSection } from '../components/home/UpcomingPreordersSection';

export const PreOrdersPage: React.FC = () => {
  const preOrderGames = MOCK_GAMES.filter((g) => g.isPreOrder || g.releaseDate >= '2026-06-01');

  return (
    <PageContainer className="space-y-12 pb-20 select-none">
      {/* Header Banner */}
      <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-cyan/40 bg-gradient-to-r from-dark-obsidian via-[#071324] to-dark-obsidian p-6 sm:p-12 shadow-[0_0_35px_rgba(0,240,255,0.2)]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-cyan">
            <Clock className="w-3.5 h-3.5" />
            <span>DAY-ONE LAUNCH VAULT // AUTOMATED PRICE REFUND GUARANTEE</span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-widest2 uppercase">
            UPCOMING GAMES & PRE-ORDERS
          </h1>
          <p className="text-sm text-cyber-silver leading-relaxed font-sans">
            Reserve future gaming masterworks ahead of time. Receive immediate closed alpha/beta keys, pre-load downloads, and guaranteed digital code delivery on launch minute.
          </p>
        </div>
      </div>

      {/* Featured Upcoming Section with Countdown */}
      <UpcomingPreordersSection />

      {/* Pre-Order Guarantee Banner */}
      <div className="hud-bracket-container bg-dark-obsidian/90 border border-cyber-cyan/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-hud backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyber-cyan/15 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Gift className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-syne text-lg font-bold text-white uppercase tracking-wider">Lowest Price Pre-Order Guarantee</h3>
            <p className="text-xs sm:text-sm text-cyber-silver max-w-xl font-sans">
              If publisher prices decrease at any time before launch day, the price difference will be credited automatically to your gamer wallet without any manual intervention.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyber-cyan bg-cyber-cyan/15 border border-cyber-cyan/40 px-4 py-2 rounded-xl shrink-0">
          <ShieldCheck className="w-4 h-4 text-cyber-cyan" /> ZERO RISK POLICY
        </div>
      </div>

      {/* All upcoming game cards */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan block mb-1">
            // CALENDAR MANIFEST
          </span>
          <h3 className="font-syne text-2xl font-black text-white uppercase tracking-wider">FULL PRE-ORDER ROSTER</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {preOrderGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
