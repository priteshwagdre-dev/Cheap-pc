import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Send, 
  Lock 
} from 'lucide-react';
import { Logo } from '../common/Logo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070A0F] border-t border-dark-border mt-20 text-slate-400">
      {/* Top Value Propositions Strip */}
      <div className="border-b border-dark-border/60 py-8 bg-dark-base/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-600/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Key Delivery</h4>
              <p className="text-xs text-slate-400">Receive codes immediately upon order completion</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Official & Verified</h4>
              <p className="text-xs text-slate-400">Directly sourced keys from trusted publishers</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Bank-Grade Security</h4>
              <p className="text-xs text-slate-400">256-bit encrypted checkout & fraud shield</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Gamer Support</h4>
              <p className="text-xs text-slate-400">Live ticket assistance for key activations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              NexusPlay is your premier digital video game store and deal aggregator. Discover thousands of official PC, PlayStation, Xbox, and Nintendo game keys, pre-order bonuses, and exclusive bundle savings.
            </p>

            {/* Newsletter input placeholder */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Subscribe to Price Drops & Secret Deals
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your gamer email..."
                  className="bg-dark-card border border-dark-border text-xs rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-brand-600/30 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#discord"
                aria-label="Discord Community"
                className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border hover:border-brand-500/50 hover:text-brand-400 flex items-center justify-center transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
              </a>
              {/* Twitch SVG */}
              <a
                href="#twitch"
                aria-label="Twitch Stream"
                className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border hover:border-purple-500/50 hover:text-purple-400 flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              {/* Twitter / X SVG */}
              <a
                href="#twitter"
                aria-label="Twitter X"
                className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube SVG */}
              <a
                href="#youtube"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-lg bg-dark-card border border-dark-border hover:border-rose-500/50 hover:text-rose-400 flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore Catalog</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/games" className="hover:text-brand-400 transition-colors">
                  All Games Catalog
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-400 transition-colors">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="hover:text-brand-400 transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/pre-orders" className="hover:text-brand-400 transition-colors">
                  Upcoming Pre-Orders
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="hover:text-brand-400 transition-colors">
                  Curated Bundles
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-brand-400 transition-colors">
                  Discounts & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms & Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platforms</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/games" className="hover:text-brand-400 transition-colors">
                  PC (Steam / Epic Games)
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-brand-400 transition-colors">
                  PlayStation 5 / PS4
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-brand-400 transition-colors">
                  Xbox Series X|S
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-brand-400 transition-colors">
                  Nintendo Switch
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-400 transition-colors">
                  VR & Simulation
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-brand-400 transition-colors">
                  Under $10 Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Support & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#help" className="hover:text-brand-400 transition-colors">
                  Help Center & FAQ
                </a>
              </li>
              <li>
                <a href="#activate" className="hover:text-brand-400 transition-colors">
                  How to Activate Keys
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-brand-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-400 transition-colors">
                  Contact Customer Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="border-t border-dark-border py-6 bg-dark-void">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {CURRENT_YEAR} NEXUSPLAY Inc. All rights reserved. Trademarks belong to their respective owners.</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-slate-400">Accepted Gateways:</span>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <span className="px-2 py-0.5 rounded bg-dark-card border border-dark-border">VISA</span>
              <span className="px-2 py-0.5 rounded bg-dark-card border border-dark-border">Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-dark-card border border-dark-border">PayPal</span>
              <span className="px-2 py-0.5 rounded bg-dark-card border border-dark-border">Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
