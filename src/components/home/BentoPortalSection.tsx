import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BentoPortalCard } from '../ui/BentoPortalCard';

export const BentoPortalSection: React.FC = () => {
  const navigate = useNavigate();

  const portals = [
    {
      index: '01 //',
      title: 'Action RPGs & Cyberpunk',
      subtitle: 'Fast-paced combat, deep narrative choices, and sprawling neon metropolises.',
      badge: 'POPULAR // HOT',
      badgeColor: 'cyan' as const,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
      route: '/games?category=action-rpg',
    },
    {
      index: '02 //',
      title: 'Open World & Soullike Sagas',
      subtitle: 'Vast treacherous realms, legendary bosses, and endless atmospheric exploration.',
      badge: 'TOP RATED // 98%',
      badgeColor: 'violet' as const,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
      route: '/games?category=rpg',
    },
    {
      index: '03 //',
      title: 'Day-One Pre-Orders & Betas',
      subtitle: 'Lock in unreleased masterpieces with automatic price drop refunds & closed alpha keys.',
      badge: 'UPCOMING // 2026',
      badgeColor: 'amber' as const,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
      route: '/pre-orders',
    },
    {
      index: '04 //',
      title: 'Curated Franchise Bundles',
      subtitle: 'Complete collections with all DLC expansions. Save up to 65% with individual keys.',
      badge: 'SAVE 65% // PACK',
      badgeColor: 'cyan' as const,
      image: 'https://images.unsplash.com/photo-1612287233207-6819b1b68194?q=80&w=600&auto=format&fit=crop',
      route: '/bundles',
    },
    {
      index: '05 //',
      title: 'Weekend Flash Price Cuts',
      subtitle: 'Limited-time digital license clearances reaching up to 80% below retail MSRP.',
      badge: 'LIMITED // -80%',
      badgeColor: 'amber' as const,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
      route: '/deals',
    },
    {
      index: '06 //',
      title: 'Discovery Oracle Matchmaker',
      subtitle: 'Unsure what to play next? Roll our neural matchmaking engine for instant curation.',
      badge: 'DISCOVERY // NEW',
      badgeColor: 'violet' as const,
      image: 'https://images.unsplash.com/photo-1552824796-0158a1f73663?q=80&w=600&auto=format&fit=crop',
      route: '/discover',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyber-cyan mb-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            CATEGORY MATRIX // ARCHIVE PROTOCOLS
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-widest2 uppercase">
            EXPLORE THE PORTALS
          </h2>
        </div>
        <div className="font-mono text-xs text-slate-400">
          SELECT A DIMENSION // 06 PORTALS ONLINE
        </div>
      </div>

      {/* 6-Card Interactive Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((portal) => (
          <BentoPortalCard
            key={portal.index}
            index={portal.index}
            title={portal.title}
            subtitle={portal.subtitle}
            badge={portal.badge}
            badgeColor={portal.badgeColor}
            image={portal.image}
            onClick={() => navigate(portal.route)}
          />
        ))}
      </div>
    </div>
  );
};
