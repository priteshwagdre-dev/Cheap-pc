import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Cpu,
  Check,
  Share2,
  Layers
} from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { GameCard } from '../components/game/GameCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';
import { useStore } from '../context/StoreContext';

export const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, toggleWishlist, isInWishlist, addToRecentlyViewed, addToast } = useStore();

  const game = MOCK_GAMES.find((g) => g.id === id || g.slug === id) || MOCK_GAMES[0];
  const [selectedPlatform, setSelectedPlatform] = useState<string>(game?.platforms[0] || 'PC');
  const [activeMedia, setActiveMedia] = useState<string>(game?.bannerImage || game?.thumbnail || '');

  // Automatically track recently viewed game
  useEffect(() => {
    if (game) {
      addToRecentlyViewed(game);
      setSelectedPlatform(game.platforms[0] || 'PC');
      setActiveMedia(game.bannerImage || game.thumbnail);
    }
  }, [game, addToRecentlyViewed]);

  if (!game) {
    return <NotFoundPage />;
  }

  const isWishlisted = isInWishlist(game.id);
  const isAddedToCart = isInCart(game.id);

  const handleAddToCart = () => {
    addToCart(game, selectedPlatform);
  };

  const handleBuyNow = () => {
    addToCart(game, selectedPlatform);
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist(game);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Game link copied to clipboard!', 'info');
    }
  };

  const allScreenshots = [
    game.bannerImage || game.thumbnail,
    game.thumbnail,
    ...(game.screenshots || [])
  ].filter((img, i, arr) => arr.indexOf(img) === i);

  const similarGames = MOCK_GAMES.filter((g) => g.id !== game.id).slice(0, 4);

  return (
    <div className="w-full pb-16 space-y-8">
      {/* Top Breadcrumb Bar */}
      <PageContainer className="py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Games Catalog
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Game
          </button>
        </div>
      </PageContainer>

      {/* Hero Header Backdrop */}
      <div className="relative w-full overflow-hidden border-b border-dark-border bg-[#070B14]">
        <div className="absolute inset-0 z-0">
          <img
            src={activeMedia || game.bannerImage || game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover filter brightness-[0.25] blur-md scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/80 to-transparent" />
        </div>

        <PageContainer className="relative z-10 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Game Cover Art / Active Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-brand-500/30 shadow-2xl bg-dark-card aspect-[16/10] sm:aspect-[4/3] w-full relative group">
                <img
                  src={activeMedia || game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {game.discountPercent > 0 && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="discount">Save {game.discountPercent}%</Badge>
                  </div>
                )}
              </div>

              {/* Media Thumbnails Switcher */}
              {allScreenshots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {allScreenshots.map((shot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(shot)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeMedia === shot
                          ? 'border-brand-500 shadow-glow-brand scale-102'
                          : 'border-dark-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={shot} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Game Main Meta & Purchasing Box */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {game.discountPercent > 0 && (
                    <Badge variant="discount">Save {game.discountPercent}%</Badge>
                  )}
                  {game.isPreOrder && <Badge variant="cyan" dot>Pre-Order Now</Badge>}
                  {game.isBundle && <Badge variant="purple">Definitive Bundle</Badge>}
                  {game.genre.map((g) => (
                    <Badge key={g} variant="default">{g}</Badge>
                  ))}
                </div>

                <h1 className="font-tech text-3xl sm:text-5xl font-black text-white tracking-wide leading-tight">
                  {game.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">{game.tagline}</p>

                {/* Rating & Metadata Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{game.rating.toFixed(1)} / 5.0</span>
                    <span className="text-slate-400 font-normal">({game.ratingCount.toLocaleString()} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-4 h-4 text-brand-400" />
                    <span>Release: {game.releaseDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <span>Dev: {game.developer}</span>
                  </div>
                </div>
              </div>

              {/* Purchasing Card */}
              <div className="bg-[#0B101D]/90 border border-brand-500/30 p-6 rounded-2xl backdrop-blur-md shadow-2xl space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Choose Target Platform
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((plat) => (
                      <button
                        key={plat}
                        onClick={() => setSelectedPlatform(plat)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          selectedPlatform === plat
                            ? 'bg-brand-600 text-white border-brand-400 shadow-md shadow-brand-600/40'
                            : 'bg-dark-surface border-dark-border text-slate-300 hover:text-white'
                        }`}
                      >
                        {plat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
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

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button
                      size="lg"
                      onClick={handleBuyNow}
                      leftIcon={<Zap className="w-4 h-4 text-amber-300" />}
                      className="bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-glow-brand"
                    >
                      {game.isPreOrder ? 'Preorder Now' : 'Buy Now'}
                    </Button>

                    <Button
                      variant={isAddedToCart ? 'secondary' : 'outline'}
                      size="lg"
                      onClick={handleAddToCart}
                      leftIcon={isAddedToCart ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingCart className="w-4 h-4" />}
                      className={isAddedToCart ? 'border-emerald-500/40 text-emerald-300' : 'border-brand-500/40 text-brand-300 hover:text-white'}
                    >
                      {isAddedToCart ? 'In Cart' : 'Add to Cart'}
                    </Button>

                    <button
                      type="button"
                      onClick={handleWishlist}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isWishlisted
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          : 'bg-dark-surface hover:bg-dark-card border-dark-border text-slate-300 hover:text-white'
                      }`}
                      title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-dark-border text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Instant Digital Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Publisher Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{selectedPlatform} Activation Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Main Details, Overview & System Specs */}
      <PageContainer className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Description & Media */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0B101D] border border-dark-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">About The Game</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {game.description}
              </p>

              {game.bundleItems && (
                <div className="pt-4 border-t border-dark-border space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Bundle Contents Included:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {game.bundleItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Screenshots Gallery */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="bg-[#0B101D] border border-dark-border rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Screenshots & Visuals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {game.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(s)}
                      className="rounded-xl overflow-hidden border border-dark-border hover:border-brand-500/60 aspect-video group text-left transition-all"
                    >
                      <img
                        src={s}
                        alt={`${game.title} preview ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* System Requirements */}
            <div className="bg-[#0B101D] border border-dark-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                System Requirements (PC)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-dark-surface p-4 rounded-xl border border-dark-border space-y-2">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Minimum Hardware</h4>
                  <p><span className="text-slate-400">OS:</span> Windows 10 (64-bit)</p>
                  <p><span className="text-slate-400">Processor:</span> Intel Core i5-8400 or AMD Ryzen 5 2600</p>
                  <p><span className="text-slate-400">Memory:</span> 16 GB RAM</p>
                  <p><span className="text-slate-400">Graphics:</span> GTX 1060 (6 GB) / RX 580 (8 GB)</p>
                  <p><span className="text-slate-400">Storage:</span> 70 GB SSD space</p>
                </div>

                <div className="bg-dark-surface p-4 rounded-xl border border-brand-500/30 space-y-2 shadow-inner">
                  <h4 className="font-bold text-brand-300 uppercase tracking-wider text-[11px]">Recommended Hardware</h4>
                  <p><span className="text-slate-400">OS:</span> {game.systemRequirements?.os || 'Windows 11 (64-bit)'}</p>
                  <p><span className="text-slate-400">Processor:</span> {game.systemRequirements?.processor || 'AMD Ryzen 7 7800X3D / Intel i7-14700K'}</p>
                  <p><span className="text-slate-400">Memory:</span> {game.systemRequirements?.memory || '32 GB RAM'}</p>
                  <p><span className="text-slate-400">Graphics:</span> {game.systemRequirements?.graphics || 'GeForce RTX 4070 12GB / RX 7800 XT'}</p>
                  <p><span className="text-slate-400">Storage:</span> {game.systemRequirements?.storage || '90 GB NVMe SSD space'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B101D] border border-dark-border rounded-2xl p-6 space-y-4">
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
                  <span className="font-semibold text-emerald-400">Instant Digital Vault</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Platforms</span>
                  <span className="font-semibold text-white">{game.platforms.join(', ')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-border/60">
                  <span className="text-slate-400">Refund Policy</span>
                  <span className="font-semibold text-cyan-400">48h Key Shield</span>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300 block mb-1">🎮 Store Notice</span>
              This storefront showcases official publisher digital key activations. Digital codes are simulated securely for paired demo checkout testing.
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Similar Games Section */}
      <PageContainer className="pt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Gamers Also Enjoyed</h2>
          <p className="text-xs text-slate-400 mt-1">Recommended masterworks in related categories</p>
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
