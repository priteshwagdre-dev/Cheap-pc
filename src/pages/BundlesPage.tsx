import React from 'react';
import { Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { BundlesSection } from '../components/home/BundlesSection';
import { GameCard } from '../components/game/GameCard';

export const BundlesPage: React.FC = () => {
  const bundleGames = MOCK_GAMES.filter((g) => g.isBundle);

  return (
    <PageContainer className="space-y-12 pb-20 select-none">
      {/* Header Banner */}
      <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-violet/40 bg-gradient-to-r from-dark-obsidian via-[#140D2B] to-dark-obsidian p-6 sm:p-12 shadow-[0_0_35px_rgba(112,0,255,0.2)]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-[#a855f7]">
            <Layers className="w-3.5 h-3.5" />
            <span>BUNDLE VAULT // UP TO 65% EXTRA SAVINGS</span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-widest2 uppercase">
            FRANCHISE SAGA PACKS
          </h1>
          <p className="text-sm text-cyber-silver leading-relaxed font-sans">
            Acquire complete sagas, expansions, and bonus digital artbooks in bundled packs. Every bundle yields individual steam/console activation keys upon checkout.
          </p>
        </div>
      </div>

      {/* Main Bundles Showcase */}
      <BundlesSection />

      {/* Value guarantee HUD */}
      <div className="hud-bracket-container p-6 rounded-2xl bg-dark-obsidian/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyber-violet/15 border border-cyber-violet/30 flex items-center justify-center text-[#a855f7] shrink-0 shadow-[0_0_15px_rgba(112,0,255,0.3)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-syne text-base font-bold text-white uppercase tracking-wider">Separate Individual Digital Keys</h3>
            <p className="text-xs text-cyber-silver font-sans">
              Purchasing a bundle delivers separate activation licenses for each included game so you can gift duplicate games to friends.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shrink-0">
          <ShieldCheck className="w-4 h-4" /> 100% VERIFIED PUBLISHERS
        </div>
      </div>

      {/* All bundle titles horizontal view */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan block mb-1">
            // FULL REPERTORY
          </span>
          <h3 className="font-syne text-2xl font-black text-white uppercase tracking-wider">ALL FRANCHISE BUNDLE ARCHIVES</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundleGames.map((game) => (
            <GameCard key={game.id} game={game} variant="horizontal" />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
