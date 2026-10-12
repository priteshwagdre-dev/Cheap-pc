import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { CATEGORIES } from '../data/categories';
import { HeroBanner } from '../components/game/HeroBanner';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const featuredGames = MOCK_GAMES.filter((g) => g.isFeatured);
  const newReleases = MOCK_GAMES.filter((g) => g.isNewRelease || g.releaseDate >= '2026-01-01').slice(0, 4);
  const popularGames = MOCK_GAMES.filter((g) => g.rating >= 4.7).slice(0, 4);
  const upcomingGames = MOCK_GAMES.filter((g) => g.isPreOrder).concat(MOCK_GAMES.slice(0, 2)).slice(0, 4);
  const gameBundles = MOCK_GAMES.filter((g) => g.isBundle);
  const dealsAndDiscounts = MOCK_GAMES.filter((g) => g.discountPercent >= 40).slice(0, 4);
  const recommendedGames = MOCK_GAMES.slice(2, 6);

  return (
    <div className="w-full space-y-14 pb-16">
      {/* 1. HERO / FEATURED GAMES SECTION */}
      <PageContainer className="pt-6 sm:pt-8 pb-0">
        <HeroBanner featuredGames={featuredGames} />
      </PageContainer>

      {/* Quick Category Pills strip */}
      <PageContainer className="py-0">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1.5 pl-1">
            <Zap className="w-4 h-4 text-brand-400" /> Fast Browse:
          </span>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/games?category=${cat.slug}`}
              className="px-3.5 py-1.5 rounded-lg bg-dark-card hover:bg-dark-card-hover border border-dark-border hover:border-brand-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400 bg-dark-surface px-1.5 py-0.5 rounded">
                {cat.itemCount}
              </span>
            </Link>
          ))}
          <Link
            to="/categories"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 shrink-0 px-2"
          >
            All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </PageContainer>

      {/* 2. DEALS & DISCOUNTS SECTION */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Deals & Discounts"
          subtitle="Limited-time price cuts with up to 65% off publisher list prices."
          badge="Up to 65% Off"
          badgeVariant="discount"
          viewAllLink="/deals"
          viewAllText="View All Deals"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsAndDiscounts.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>

      {/* 3. NEW RELEASES SECTION */}
      <PageContainer className="py-0">
        <SectionHeader
          title="New Releases"
          subtitle="Fresh titles launched in the past few weeks, ready for instant play."
          badge="Fresh Arrivals"
          badgeVariant="brand"
          viewAllLink="/new-releases"
          viewAllText="See New Releases"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>

      {/* 4. POPULAR GAMES SECTION */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Popular Games"
          subtitle="Community top-rated masterworks with overwhelmingly positive feedback."
          badge="Top Rated"
          badgeVariant="cyan"
          viewAllLink="/games?sort=popular"
          viewAllText="Explore Top Games"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>

      {/* PROMO BANNER / VALUE CALLOUT */}
      <PageContainer className="py-0">
        <div className="relative rounded-2xl overflow-hidden border border-brand-500/30 bg-gradient-to-r from-brand-950 via-dark-card to-dark-surface p-8 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-3">
            <Badge variant="cyan" dot>Nexus Club VIP</Badge>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Unlock Extra 10% Off Every Game
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Create your free account today to earn loyalty XP, receive instant notifications when your wishlisted games drop in price, and gain access to member-only key drops.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/register">
                <Button variant="primary" size="md">Create Free Gamer Account</Button>
              </Link>
              <Link to="/deals">
                <Button variant="outline" size="md">Browse Weekend Deals</Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-500/10 to-transparent pointer-events-none hidden md:block" />
        </div>
      </PageContainer>

      {/* 5. UPCOMING GAMES / PRE-ORDERS */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Upcoming & Pre-Orders"
          subtitle="Reserve future blockbuster titles with guaranteed launch bonuses."
          badge="Coming Soon"
          badgeVariant="cyan"
          viewAllLink="/pre-orders"
          viewAllText="Explore Pre-Orders"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>

      {/* 6. GAME BUNDLES SECTION */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Game Bundles & Collections"
          subtitle="Multi-game franchises and definitive expansions bundled for massive savings."
          badge="Huge Value"
          badgeVariant="purple"
          viewAllLink="/bundles"
          viewAllText="All Game Bundles"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameBundles.map((game) => (
            <GameCard key={game.id} game={game} variant="horizontal" />
          ))}
        </div>
      </PageContainer>

      {/* 7. RECOMMENDED GAMES SECTION */}
      <PageContainer className="py-0">
        <SectionHeader
          title="Recommended For You"
          subtitle="Hand-picked gaming experiences based on trending community play patterns."
          badge="Curated"
          badgeVariant="success"
          viewAllLink="/games"
          viewAllText="More Recommendations"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};
