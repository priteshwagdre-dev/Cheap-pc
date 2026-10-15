import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Sparkles, Key, ArrowRight } from 'lucide-react';
import { GlowButton } from '../ui/GlowButton';

export const FeaturedSpotlightBanner: React.FC = () => {
  const perks = [
    {
      code: 'PERK // 01',
      title: 'Guaranteed Price Match',
      desc: 'Automatic credit refund if any publisher drops price before launch.',
      icon: <ShieldCheck className="w-4 h-4 text-cyber-cyan" />,
    },
    {
      code: 'PERK // 02',
      title: '10% Extra Digital Cashback',
      desc: 'Earn loyalty gamer XP and wallet credits on every activation code.',
      icon: <Zap className="w-4 h-4 text-cyber-amber" />,
    },
    {
      code: 'PERK // 03',
      title: 'VIP Alpha Beta Access',
      desc: 'Exclusive keys for closed technical tests and early weekend access.',
      icon: <Key className="w-4 h-4 text-[#a855f7]" />,
    },
    {
      code: 'PERK // 04',
      title: 'Zero Revocation Guarantee',
      desc: 'Official direct publisher activation contracts with lifetime warranty.',
      icon: <Sparkles className="w-4 h-4 text-cyber-cyan" />,
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Illuminated HUD Outer Container */}
      <div className="hud-bracket-container relative rounded-3xl overflow-hidden bg-dark-obsidian/90 backdrop-blur-2xl border border-cyber-cyan/35 shadow-hud-strong p-8 sm:p-12 lg:p-16">
        {/* Dynamic Background Gradient Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyber-violet filter blur-[90px] animate-pulse-slow" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyber-cyan filter blur-[90px] animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-amber/10 via-transparent to-transparent" />
        </div>

        {/* Monospace System Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-amber animate-ping" />
            <span className="text-cyber-amber font-bold tracking-widest uppercase">
              SPOTLIGHT PROTOCOL // NEXUS SYNDICATE
            </span>
          </div>
          <span className="text-slate-400 tracking-wider">
            AUTHORIZATION: OPEN ACCESS TIER
          </span>
        </div>

        {/* Core Value Proposition */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-widest2 uppercase leading-tight drop-shadow-[0_0_30px_rgba(255,184,0,0.2)]">
              JOIN THE ELITE GAMER SYNDICATE
            </h2>
            <p className="text-sm sm:text-base text-cyber-silver leading-relaxed font-sans max-w-xl">
              Unlock the premier digital gaming experience. Instant automated key redemptions, stacked publisher discounts, and automated price drop credits across 5,000+ verified titles.
            </p>

            {/* Glowing Magnetic CTA Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register">
                <GlowButton
                  variant="amber"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  CLAIM FREE SYNDICATE ACCESS
                </GlowButton>
              </Link>
              <Link to="/deals">
                <GlowButton variant="hud" size="lg">
                  EXPLORE ACTIVE FLASH SALES
                </GlowButton>
              </Link>
            </div>
          </div>

          {/* Right Bento Perks Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.code}
                className="p-4 rounded-xl bg-dark-void/70 border border-white/5 hover:border-cyber-cyan/30 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyber-cyan/20 group-hover:border-cyber-cyan/40 transition-colors">
                    {perk.icon}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyber-cyan font-bold">
                    {perk.code}
                  </span>
                </div>
                <h4 className="font-syne text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors mb-1">
                  {perk.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Bar Footer */}
        <div className="relative z-10 mt-10 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
          <span>ENCRYPTION: 4096-BIT RSA // ZERO LATENCY</span>
          <span className="text-cyber-cyan">OVER 250,000+ KEYS DISTRIBUTED GLOBALLY</span>
        </div>
      </div>
    </div>
  );
};
