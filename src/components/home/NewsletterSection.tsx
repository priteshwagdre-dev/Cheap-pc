import React, { useState } from 'react';
import { Send, CheckCircle2, Gift, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../context/StoreContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useStore();

  const couponCode = 'TECHFEST15';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid gamer email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to the Nexus VIP Club! 15% discount promo code unlocked!', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setIsCopied(true);
    addToast('Coupon code "TECHFEST15" copied to clipboard!', 'info');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-brand-500/40 bg-gradient-to-r from-[#0E1528] via-[#16122C] to-[#0A1020] p-8 sm:p-12 shadow-2xl shadow-purple-950/40">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-cyan-400" />
          Nexus VIP Insider Pass
        </div>

        <h2 className="font-tech text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Never Miss a Secret Key Drop or 80% Flash Sale
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Join 85,000+ PC and console gamers. Receive immediate price alert notifications whenever games on your wishlist hit historic lows.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your gaming email..."
              className="w-full px-4 py-3 rounded-xl bg-dark-base/90 border border-dark-border focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm text-white placeholder-slate-400 transition-all shadow-inner"
              required
            />
            <Button
              type="submit"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto shrink-0 bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-glow-brand py-3"
            >
              Claim 15% Off
            </Button>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-dark-base/90 border border-emerald-500/40 max-w-md mx-auto space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>You&apos;re in! Use this promo code at checkout:</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-card border border-emerald-500/30">
              <span className="font-mono text-lg font-black text-white tracking-widest">{couponCode}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">Valid for 15% off any game or bundle order.</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
          <span>🛡️ Zero spam, guaranteed</span>
          <span>⚡ Instant key drop notifications</span>
          <span>🎮 Unsubscribe anytime with 1-click</span>
        </div>
      </div>
    </div>
  );
};
