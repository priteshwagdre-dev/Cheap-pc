import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Zap, Tag } from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([MOCK_GAMES[0], MOCK_GAMES[1]]);

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.originalPrice, 0);
  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const savings = subtotal - total;

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="brand">Review & Checkout</Badge>
          <span className="text-xs text-slate-400">• {cartItems.length} Keys Selected</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Your Shopping Cart</h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Digital activation codes will be displayed immediately upon successful payment verification.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="w-8 h-8 text-brand-400" />}
          title="Your Cart is Empty"
          description="You haven't added any games to your cart yet. Check out the latest weekend deals or browse new releases."
          actionLabel="Explore Top Deals"
          actionHref="/deals"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((game) => (
              <div
                key={game.id}
                className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Link to={`/games/${game.id}`} className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                  </Link>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-400">{game.genre[0]}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Instant Delivery
                      </span>
                    </div>
                    <Link to={`/games/${game.id}`} className="text-base font-bold text-white hover:text-brand-300 transition-colors">
                      {game.title}
                    </Link>
                    <div className="text-xs text-slate-400">Platform: {game.platforms[0]} (Digital Key)</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-dark-border/60">
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

                  <button
                    onClick={() => handleRemove(game.id)}
                    aria-label="Remove item"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-dark-surface rounded-lg border border-dark-border transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <Link to="/games" className="text-xs font-semibold text-brand-400 hover:text-brand-300">
                ← Continue Shopping
              </Link>
              <button
                onClick={() => setCartItems([])}
                className="text-xs text-slate-400 hover:text-rose-400"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Order Summary</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Original Price</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Instant Discount</span>
                <span className="font-semibold">-${savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Taxes & Fees</span>
                <span className="font-semibold text-white">$0.00</span>
              </div>
              <div className="pt-3 border-t border-dark-border flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total</span>
                <span className="text-2xl font-black text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code placeholder */}
            <div className="space-y-2">
              <label htmlFor="promo" className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-brand-400" /> Have a Coupon or Voucher?
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  type="text"
                  placeholder="e.g. CYBER10"
                  className="bg-dark-surface border border-dark-border rounded-lg text-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 flex-1 uppercase font-mono"
                />
                <Button variant="secondary" size="sm">Apply</Button>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>

            {/* Security Badges */}
            <div className="pt-2 border-t border-dark-border/60 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-bit encrypted SSL checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant key reveal after payment</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
