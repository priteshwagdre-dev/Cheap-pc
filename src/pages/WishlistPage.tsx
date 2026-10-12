import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Trash2 } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

export const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState(MOCK_GAMES.slice(0, 3));

  const handleRemove = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <PageContainer>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="discount">
              <Heart className="w-3 h-3 fill-current inline mr-1" />
              Saved Titles
            </Badge>
            <span className="text-xs text-slate-400">• {wishlistItems.length} Games in Wishlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">My Game Wishlist</h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Keep tabs on releases and price drops. We'll notify you whenever titles on your wishlist go on sale.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
              Share Wishlist
            </Button>
            <Button variant="primary" size="sm" leftIcon={<ShoppingCart className="w-4 h-4" />}>
              Move All to Cart
            </Button>
          </div>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-rose-400" />}
          title="Your Wishlist is Empty"
          description="Explore our vault and click the heart icon on any game to save it for later or receive instant price drop notifications."
          actionLabel="Browse Featured Games"
          actionHref="/games"
        />
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((game) => (
            <div
              key={game.id}
              className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-dark-border-light transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <Link to={`/games/${game.id}`} className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                  <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                </Link>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">{game.genre[0]}</span>
                    {game.discountPercent > 0 && <Badge variant="discount" size="sm">-{game.discountPercent}%</Badge>}
                  </div>
                  <Link to={`/games/${game.id}`} className="text-base font-bold text-white hover:text-brand-300 transition-colors">
                    {game.title}
                  </Link>
                  <div className="text-xs text-slate-400">{game.platforms.join(', ')}</div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-dark-border/60">
                <div className="text-right">
                  {game.discountPercent > 0 && (
                    <span className="text-xs text-slate-400 line-through block">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg font-black text-white">
                    ${game.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}>
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => handleRemove(game.id)}
                    aria-label="Remove from wishlist"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-dark-surface rounded-lg border border-dark-border transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};
