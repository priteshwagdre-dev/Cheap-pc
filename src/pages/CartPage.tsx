import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Tag, 
  Plus, 
  Minus, 
  Check, 
  CreditCard, 
  Key, 
  Copy, 
  ExternalLink,
  X
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useStore } from '../context/StoreContext';
import type { Order } from '../types';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, completeCheckout, addToast } = useStore();
  const navigate = useNavigate();

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; fixed: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const subtotalOriginal = cart.reduce((acc, curr) => acc + curr.game.originalPrice * curr.quantity, 0);
  const subtotalCurrent = cart.reduce((acc, curr) => acc + curr.game.price * curr.quantity, 0);
  const catalogDiscount = subtotalOriginal - subtotalCurrent;

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.percent > 0) {
      promoDiscount = (subtotalCurrent * appliedPromo.percent) / 100;
    } else if (appliedPromo.fixed > 0) {
      promoDiscount = Math.min(appliedPromo.fixed, subtotalCurrent);
    }
  }

  const finalTotal = Math.max(0, subtotalCurrent - promoDiscount);
  const totalSavings = catalogDiscount + promoDiscount;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'CHEAP10' || code === 'SAVE10') {
      setAppliedPromo({ code, percent: 10, fixed: 0 });
      addToast('Promo code applied: 10% Extra Discount!');
      setPromoInput('');
    } else if (code === 'TECHFEST15' || code === 'TECHFEST') {
      setAppliedPromo({ code, percent: 15, fixed: 0 });
      addToast('Techfest VIP Promo applied: 15% Extra Discount!');
      setPromoInput('');
    } else if (code === 'NEXUS20') {
      setAppliedPromo({ code, percent: 20, fixed: 0 });
      addToast('VIP Promo code applied: 20% Extra Discount!');
      setPromoInput('');
    } else if (code === 'STEAM5') {
      setAppliedPromo({ code, percent: 0, fixed: 5 });
      addToast('Coupon applied: $5 Off your order!');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try "TECHFEST15", "CHEAP10", or "NEXUS20".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
    addToast('Coupon removed', 'info');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = completeCheckout(
        paymentMethod === 'card'
          ? 'Credit Card (**** 4242)'
          : paymentMethod === 'paypal'
          ? 'PayPal Digital Wallet'
          : 'Crypto (USDT / Web3)',
        promoDiscount
      );
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  const handleCopyKey = (keyString: string) => {
    navigator.clipboard?.writeText(keyString);
    setCopiedKey(keyString);
    addToast('License key copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="brand">Review & Checkout</Badge>
          <span className="text-xs text-slate-400">• {cart.reduce((a, b) => a + b.quantity, 0)} Keys Selected</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Your Shopping Cart</h1>
        <p className="text-sm text-slate-400 max-w-xl">
          Digital activation codes will be displayed immediately upon successful payment verification.
        </p>
      </div>

      {cart.length === 0 && !completedOrder ? (
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
            {cart.map((item) => (
              <div
                key={item.game.id}
                className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-dark-border-light transition-all duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <Link to={`/games/${item.game.id}`} className="w-24 h-18 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                    <img src={item.game.thumbnail} alt={item.game.title} className="w-full h-full object-cover" />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-400">{item.game.genre[0]}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        Instant Delivery
                      </span>
                    </div>
                    <Link to={`/games/${item.game.id}`} className="text-base font-bold text-white hover:text-brand-300 transition-colors truncate block">
                      {item.game.title}
                    </Link>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span>Platform: <strong className="text-slate-200">{item.platform}</strong></span>
                      {item.game.discountPercent > 0 && (
                        <span className="text-rose-400 font-bold">-{item.game.discountPercent}%</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-dark-border/60">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-dark-border rounded-lg bg-dark-surface p-0.5">
                    <button
                      onClick={() => updateQuantity(item.game.id, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-dark-card transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.game.id, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-dark-card transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right shrink-0">
                    {item.game.discountPercent > 0 && (
                      <span className="text-xs text-slate-400 line-through block">
                        ${(item.game.originalPrice * item.quantity).toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-black text-white">
                      ${(item.game.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.game.id)}
                    aria-label="Remove item"
                    title="Remove item"
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
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-xl p-6 space-y-6 shadow-xl sticky top-24">
            <h3 className="text-lg font-bold text-white">Order Summary</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Catalog Price</span>
                <span className="font-semibold text-white">${subtotalOriginal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Publisher Discount</span>
                <span className="font-semibold">-${catalogDiscount.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-brand-300 bg-brand-500/10 p-2 rounded-lg border border-brand-500/20">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Coupon ({appliedPromo.code})
                  </span>
                  <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Estimated Digital Taxes</span>
                <span className="font-semibold text-white">$0.00</span>
              </div>
              <div className="pt-3 border-t border-dark-border flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-white block">Total Amount</span>
                  <span className="text-[11px] text-emerald-400">You save ${totalSavings.toFixed(2)}</span>
                </div>
                <span className="text-2xl font-black text-white">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label htmlFor="promo" className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-brand-400" /> Coupon / Voucher
                </span>
                {appliedPromo && (
                  <button onClick={handleRemovePromo} className="text-rose-400 hover:underline text-[10px]">
                    Remove
                  </button>
                )}
              </label>

              {!appliedPromo ? (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      id="promo"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. CHEAP10 or NEXUS20"
                      className="bg-dark-surface border border-dark-border rounded-lg text-xs px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 flex-1 uppercase font-mono"
                    />
                    <Button variant="secondary" size="sm" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-dark-surface border border-emerald-500/30 rounded-lg p-2 text-xs text-emerald-300">
                  <span>Code <strong>{appliedPromo.code}</strong> applied!</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Secure Checkout
            </Button>

            {/* Security Badges */}
            <div className="pt-2 border-t border-dark-border/60 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-bit encrypted checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant key reveal after payment</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && !completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-50">
          <div className="bg-dark-card border border-dark-border rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-surface"
              aria-label="Close checkout modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan" dot>Secure Payment Gateway</Badge>
              </div>
              <h3 className="text-2xl font-black text-white">Complete Your Order</h3>
              <p className="text-xs text-slate-400">
                Choose your preferred payment method. Digital keys are issued instantly.
              </p>
            </div>

            {/* Payment method selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-500 bg-brand-500/10 text-white shadow-glow-brand'
                    : 'border-dark-border bg-dark-surface text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-brand-400" />
                <span className="text-xs font-bold block">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-brand-500 bg-brand-500/10 text-white shadow-glow-brand'
                    : 'border-dark-border bg-dark-surface text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-cyan-400 font-extrabold text-base mb-1">PP</div>
                <span className="text-xs font-bold block">PayPal</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-brand-500 bg-brand-500/10 text-white shadow-glow-brand'
                    : 'border-dark-border bg-dark-surface text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-amber-400 font-extrabold text-base mb-1">₿</div>
                <span className="text-xs font-bold block">Crypto / USDT</span>
              </button>
            </div>

            {/* Mock payment form */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-dark-surface p-4 rounded-xl border border-dark-border">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-dark-card border border-dark-border rounded-lg text-xs p-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full bg-dark-card border border-dark-border rounded-lg text-xs p-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">CVC / CVV</label>
                    <input
                      type="text"
                      defaultValue="884"
                      className="w-full bg-dark-card border border-dark-border rounded-lg text-xs p-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="bg-dark-surface p-4 rounded-xl border border-dark-border text-center text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">PayPal One-Touch Checkout</p>
                <p className="text-slate-400">You will authorize payment securely with PayPal.</p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="bg-dark-surface p-4 rounded-xl border border-dark-border text-center text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-amber-400">Web3 Multi-Chain Pay</p>
                <p className="text-slate-400">Direct instant settlement via USDT, ETH, or Polygon.</p>
              </div>
            )}

            {/* Total breakdown */}
            <div className="flex items-center justify-between pt-2 border-t border-dark-border">
              <div>
                <span className="text-xs text-slate-400 block">Total Due</span>
                <span className="text-2xl font-black text-white">${finalTotal.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                disabled={isProcessing}
                onClick={handleProcessPayment}
              >
                {isProcessing ? 'Verifying Payment...' : `Authorize & Pay $${finalTotal.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER CONFIRMATION MODAL WITH DIGITAL KEYS */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95">
          <div className="bg-dark-card border border-emerald-500/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-950/40 relative">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-2">
                <Check className="w-8 h-8" />
              </div>
              <Badge variant="success">Payment Successful</Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Thank You for Your Order!
              </h2>
              <p className="text-xs text-slate-300">
                Order ID: <strong className="text-white">{completedOrder.id}</strong> • Total Paid: <strong className="text-emerald-400">${completedOrder.total.toFixed(2)}</strong>
              </p>
            </div>

            {/* Generated Keys Display */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4 text-brand-400" /> Your Digital Activation Keys:
              </h4>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {completedOrder.keys.map((k, idx) => (
                  <div
                    key={idx}
                    className="bg-dark-surface border border-dark-border rounded-xl p-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={k.gameThumbnail}
                        alt={k.gameTitle}
                        className="w-10 h-10 rounded-lg object-cover border border-dark-border shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{k.gameTitle}</h5>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span className="text-brand-400 font-semibold">{k.platform}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-300 font-bold">{k.licenseKey}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyKey(k.licenseKey)}
                      className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-colors ${
                        copiedKey === k.licenseKey
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-dark-card hover:bg-dark-card-hover text-slate-200 border border-dark-border'
                      }`}
                    >
                      {copiedKey === k.licenseKey ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Key
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-dark-border flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setCompletedOrder(null);
                  navigate('/profile');
                }}
                leftIcon={<ExternalLink className="w-4 h-4" />}
              >
                View in Gamer Vault / Profile
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setCompletedOrder(null);
                  navigate('/games');
                }}
              >
                Browse More Games
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
