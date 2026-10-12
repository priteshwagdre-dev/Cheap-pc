import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Gamepad, 
  Calendar, 
  Building, 
  ChevronLeft,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { GameCard } from '../components/game/GameCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';

export const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const game = MOCK_GAMES.find((g) => g.id === id || g.slug === id) || MOCK_GAMES[0];

  if (!game) {
    return <NotFoundPage />;
  }

  const similarGames = MOCK_GAMES.filter((g) => g.id !== game.id).slice(0, 4);

  return (
    <div className="w-full pb-16">
      {/* Top Breadcrumb Bar */}
      <PageContainer className="py-4">
        <Link
          to="/games"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Games Catalog
        </Link>
      </PageContainer>

      {/* Hero Header Backdrop */}
      <div className="relative w-full overflow-hidden border-b border-dark-border bg-dark-card">
        <div className="absolute inset-0">
          <img
            src={game.bannerImage || game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover filter brightness-[0.3] blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/80 to-transparent" />
        </div>

        <PageContainer className="relative z-10 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Game Cover Art */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-dark-border shadow-2xl bg-dark-card aspect-[4/5] max-w-sm mx-auto lg:mx-0 w-full">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Game Main Meta & Purchasing Box */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {game.discountPercent > 0 && (
                    <Badge variant="discount">Save {game.discountPercent}%</Badge>
                  )}
                  {game.isPreOrder && <Badge variant="cyan" dot>Pre-Order</Badge>}
                  {game.isBundle && <Badge variant="purple">Bundle Collection</Badge>}
                  {game.genre.map((g) => (
                    <Badge key={g} variant="default">{g}</Badge>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {game.title}
                </h1>
                <p className="text-base text-slate-300 max-w-2xl">{game.tagline}</p>

                {/* Rating & Metadata Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{game.rating.toFixed(1)} / 5.0</span>
                    <span className="text-slate-400 font-normal">({game.ratingCount.toLocaleString()} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-4 h-4 text-brand-400" />
                    <span>Released: {game.releaseDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <span>Dev: {game.developer}</span>
                  </div>
                </div>
              </div>

              {/* Purchase Card */}
              <div className="bg-dark-card/90 border border-dark-border p-6 rounded-2xl backdrop-blur-md shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block">
                      Digital Key Price
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        ${game.price.toFixed(2)}
                      </span>
                      {game.discountPercent > 0 && (
                        <span className="text-base text-slate-400 line-through">
                          ${game.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant={isAddedToCart ? 'secondary' : 'primary'}
                      size="lg"
                      onClick={() => setIsAddedToCart(!isAddedToCart)}
                      leftIcon={<ShoppingCart className="w-5 h-5" />}
                    >
                      {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                    </Button>

                    <Button
                      variant={isWishlisted ? 'danger' : 'outline'}
                      size="lg"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      leftIcon={<Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />}
                    >
                      {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                    </Button>
                  </div>
                </div>

                {/* Trust Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-dark-border text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>Instant Digital Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Publisher Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Play on {game.platforms.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Main Details, Overview & System Specs */}
      <PageContainer className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Description & Media */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">About The Game</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {game.description}
              </p>

              {game.bundleItems && (
                <div className="pt-4 border-t border-dark-border space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Bundle Contents Included:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {game.bundleItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* System Requirements */}
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-400" />
                System Requirements (PC)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-dark-surface p-4 rounded-lg border border-dark-border space-y-2">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Minimum Specs</h4>
                  <p><span className="text-slate-400">OS:</span> Windows 10 (64-bit)</p>
                  <p><span className="text-slate-400">Processor:</span> Intel Core i5-8400 or AMD Ryzen 5 2600</p>
                  <p><span className="text-slate-400">Memory:</span> 16 GB RAM</p>
                  <p><span className="text-slate-400">Graphics:</span> GTX 1060 (6 GB) / RX 580 (8 GB)</p>
                  <p><span className="text-slate-400">Storage:</span> 70 GB SSD space</p>
                </div>

                <div className="bg-dark-surface p-4 rounded-lg border border-brand-500/30 space-y-2">
                  <h4 className="font-bold text-brand-300 uppercase tracking-wider text-[11px]">Recommended Specs</h4>
                  <p><span className="text-slate-400">OS:</span> {game.systemRequirements?.os || 'Windows 11 (64-bit)'}</p>
                  <p><span className="text-slate-400">Processor:</span> {game.systemRequirements?.processor || 'AMD Ryzen 7 5800X / Intel i7-12700K'}</p>
                  <p><span className="text-slate-400">Memory:</span> {game.systemRequirements?.memory || '32 GB RAM'}</p>
                  <p><span className="text-slate-400">Graphics:</span> {game.systemRequirements?.graphics || 'GeForce RTX 3070 8GB / RX 6800 XT'}</p>
                  <p><span className="text-slate-400">Storage:</span> {game.systemRequirements?.storage || '85 GB NVMe SSD space'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Specifications</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Developer</span>
                  <span className="font-semibold text-white">{game.developer}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Publisher</span>
                  <span className="font-semibold text-white">{game.publisher}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Release Date</span>
                  <span className="font-semibold text-white">{game.releaseDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Delivery</span>
                  <span className="font-semibold text-emerald-400">Instant Digital</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Platforms</span>
                  <span className="font-semibold text-white">{game.platforms.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Similar Games Section */}
      <PageContainer className="pt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Gamers Also Enjoyed</h2>
          <p className="text-xs text-slate-400 mt-1">Similar high-rated games in related genres</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarGames.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};
