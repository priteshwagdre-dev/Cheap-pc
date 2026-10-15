import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { CATEGORIES } from '../data/categories';
import { ParallaxHero } from '../components/home/ParallaxHero';
import { FeaturedSpotlightBanner } from '../components/home/FeaturedSpotlightBanner';
import { BentoPortalSection } from '../components/home/BentoPortalSection';
import { HorizontalShowcaseSection } from '../components/home/HorizontalShowcaseSection';
import { SpecialOffersSection } from '../components/home/SpecialOffersSection';
import { UpcomingPreordersSection } from '../components/home/UpcomingPreordersSection';
import { BundlesSection } from '../components/home/BundlesSection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { RecentlyViewedSection } from '../components/home/RecentlyViewedSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/common/SectionHeader';

export const HomePage: React.FC = () => {
  const featuredGames = MOCK_GAMES.filter((g) => g.isFeatured);
  const newReleases = MOCK_GAMES.filter((g) => g.isNewRelease || g.releaseDate >= '2026-01-01').slice(0, 4);

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-20 select-none">
      {/* 1. TECHFEST MULTI-LAYERED PARALLAX HERO SECTION */}
      <ParallaxHero featuredGames={featuredGames} />

      {/* Fast Genre Matrix Navigation Strip */}
      <PageContainer className="py-0">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none font-mono">
          <span className="text-xs font-bold uppercase tracking-widest text-cyber-cyan shrink-0 flex items-center gap-1.5 pl-1">
            <Zap className="w-4 h-4 text-cyber-cyan" /> PROTOCOL JUMP:
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/games?category=${cat.slug}`}
              className="px-3.5 py-1.5 rounded-xl bg-dark-obsidian/90 hover:bg-dark-card border border-white/10 hover:border-cyber-cyan/50 text-xs font-semibold text-slate-300 hover:text-white transition-all whitespace-nowrap flex items-center gap-2 shadow-sm"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-cyber-cyan bg-white/5 px-1.5 py-0.5 rounded font-mono">
                {cat.itemCount}
              </span>
            </Link>
          ))}
          <Link
            to="/categories"
            className="text-xs font-bold text-cyber-amber hover:text-amber-300 flex items-center gap-1 shrink-0 px-2"
          >
            All Archives <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </PageContainer>

      {/* 2. FEATURED AMBASSADOR / PRIMARY SPOTLIGHT BANNER */}
      <FeaturedSpotlightBanner />

      {/* 3. INTERACTIVE BENTO / PORTAL CARDS (FOR CATEGORIES & DISCOVERY) */}
      <BentoPortalSection />

      {/* 4. PINNED HORIZONTAL SCROLL SHOWCASE (MASTERPIECES & CURATED COLLECTIONS) */}
      <HorizontalShowcaseSection />

      {/* 5. SPECIAL OFFERS & WEEKEND FLASH DEALS (WITH LIVE COUNTDOWN TIMER) */}
      <PageContainer className="py-0">
        <SpecialOffersSection />
      </PageContainer>

      {/* 6. UPCOMING GAMES & PRE-ORDERS (WITH DAY-ONE LAUNCH COUNTDOWN) */}
      <PageContainer className="py-0">
        <UpcomingPreordersSection />
      </PageContainer>

      {/* 7. CURATED FRANCHISE BUNDLES */}
      <PageContainer className="py-0">
        <BundlesSection />
      </PageContainer>

      {/* 8. BEST SELLERS LEADERBOARD */}
      <PageContainer className="py-0">
        <BestSellersSection />
      </PageContainer>

      {/* 9. NEW RELEASES GRID */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Day-One New Arrivals"
          subtitle="Fresh titles launched across steam, playstation, and xbox networks."
          badge="NEW DEPLOYMENTS"
          badgeVariant="cyan"
          viewAllLink="/new-releases"
          viewAllText="View Full Roster"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>

      {/* 10. RECENTLY VIEWED GAMES */}
      <PageContainer className="py-0">
        <RecentlyViewedSection />
      </PageContainer>

      {/* 11. TRANSMISSION NEWSLETTER */}
      <PageContainer className="py-0">
        <NewsletterSection />
      </PageContainer>
    </div>
  );
};
