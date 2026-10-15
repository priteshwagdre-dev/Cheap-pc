import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  ExternalLink, 
  Check, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const QuickViewModal: React.FC = () => {
  const { quickViewGame, setQuickViewGame, addToCart, isInCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('PC');
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (quickViewGame) {
      setSelectedPlatform(quickViewGame.platforms[0] || 'PC');
      setActiveImage(quickViewGame.bannerImage || quickViewGame.thumbnail);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewGame]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewGame(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewGame]);

  if (!quickViewGame) return null;

  const isWishlisted = isInWishlist(quickViewGame.id);
  const isAddedToCart = isInCart(quickViewGame.id);

  const allImages = [
    quickViewGame.bannerImage || quickViewGame.thumbnail,
    quickViewGame.thumbnail,
    ...(quickViewGame.screenshots || [])
  ].filter((img, idx, arr) => arr.indexOf(img) === idx);

  const handleClose = () => {
    setQuickViewGame(null);
  };

  const handleCart = () => {
    addToCart(quickViewGame, selectedPlatform);
  };

  const handleWishlist = () => {
    toggleWishlist(quickViewGame);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Blur Backdrop */}
      <div 
        className="fixed inset-0 bg-[#04060A]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0B101D] border border-brand-500/30 rounded-2xl shadow-2xl shadow-purple-950/50 overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200">
        {/* Glow Header Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-brand-500 to-neon-orange" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-dark-base/80 hover:bg-dark-card border border-dark-border text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Visual Media Preview */}
          <div className="md:col-span-6 space-y-3">
            {/* Main Preview Image */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-dark-border bg-dark-card shadow-inner group">
              <img
                src={activeImage || quickViewGame.thumbnail}
                alt={quickViewGame.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {quickViewGame.discountPercent > 0 && (
                  <Badge variant="discount">Save {quickViewGame.discountPercent}%</Badge>
                )}
                {quickViewGame.isPreOrder && (
                  <Badge variant="cyan" dot>Pre-Order</Badge>
                )}
                {quickViewGame.isBundle && (
                  <Badge variant="purple">Bundle</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails list */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img
                        ? 'border-brand-500 shadow-glow-brand scale-102'
                        : 'border-dark-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick System Requirements Pill */}
            {quickViewGame.systemRequirements && (
              <div className="p-3 rounded-xl bg-dark-surface/80 border border-dark-border text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Recommended Spec
                </div>
                <div className="text-slate-400 text-[11px] grid grid-cols-2 gap-1 pt-1">
                  <div>GPU: <span className="text-slate-200">{quickViewGame.systemRequirements.graphics}</span></div>
                  <div>RAM: <span className="text-slate-200">{quickViewGame.systemRequirements.memory}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Game Details & Purchasing */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              {/* Genre Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {quickViewGame.genre.map((g) => (
                  <span
                    key={g}
                    className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {quickViewGame.title}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{quickViewGame.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{quickViewGame.ratingCount.toLocaleString()} Verified Reviews</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Key
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {quickViewGame.description}
              </p>

              {/* Platform Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Select Edition / Platform:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewGame.platforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        selectedPlatform === plat
                          ? 'bg-brand-600 text-white border-brand-400 shadow-md shadow-brand-600/40'
                          : 'bg-dark-surface text-slate-300 border-dark-border hover:border-slate-500'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing and Action Buttons */}
            <div className="pt-4 border-t border-dark-border/80 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Digital Key Price</span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-black text-white tracking-tight">
                      ${quickViewGame.price.toFixed(2)}
                    </span>
                    {quickViewGame.discountPercent > 0 && (
                      <span className="text-sm text-slate-400 line-through">
                        ${quickViewGame.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                    Instant Delivery
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Button
                  variant={isAddedToCart ? 'secondary' : 'primary'}
                  size="md"
                  fullWidth
                  onClick={handleCart}
                  leftIcon={isAddedToCart ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingCart className="w-4 h-4" />}
                  className={isAddedToCart ? 'border-emerald-500/40 text-emerald-300' : 'shadow-glow-brand'}
                >
                  {isAddedToCart ? 'In Shopping Cart' : quickViewGame.isPreOrder ? 'Pre-Order Now' : 'Add to Cart'}
                </Button>

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-3 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-lg shadow-rose-950/40'
                      : 'bg-dark-surface hover:bg-dark-card border-dark-border text-slate-400 hover:text-white'
                  }`}
                  title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-400' : ''}`} />
                </button>
              </div>

              {/* View Full Product Page link */}
              <div className="text-center pt-1">
                <Link
                  to={`/games/${quickViewGame.id}`}
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>Open Full Game Details Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
