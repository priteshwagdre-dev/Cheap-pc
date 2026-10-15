import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { SearchBar } from '../common/SearchBar';
import { GlowButton } from '../ui/GlowButton';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist, user } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'DISCOVER', path: '/discover', badge: 'PORTAL' },
    { label: 'GAMES', path: '/games' },
    { label: 'CATEGORIES', path: '/categories' },
    { label: 'BUNDLES', path: '/bundles', badge: '-65%' },
    { label: 'PRE-ORDERS', path: '/pre-orders' },
    { label: 'DEALS', path: '/deals', badge: 'HOT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none">
      {/* Top Transmission Status Bar */}
      <div className="bg-[#050508]/95 border-b border-white/5 py-1 px-4 text-center font-mono text-[10px] text-slate-400 hidden lg:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-cyber-cyan font-bold">NEXUS PROTOCOL v4.2</span>
            <span className="text-white/20">|</span>
            <span>INSTANT AUTOMATED KEY DELIVERY SYSTEM // 24/7 ONLINE</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/deals" className="hover:text-cyber-amber text-slate-300 transition-colors flex items-center gap-1">
              <Flame className="w-3 h-3 text-cyber-amber" />
              WEEKEND FLASH CLEARANCE: UP TO 80% OFF
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-slate-500">SYS_ENCRYPTION: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Floating HUD Main Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-1 sm:mt-2">
        <div className="relative rounded-2xl bg-dark-obsidian/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Subtle Glowing Bottom Accent Line */}
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent pointer-events-none" />

          {/* LEFT: Brand Logo */}
          <div className="shrink-0 flex items-center gap-3">
            <Logo size="md" />
          </div>

          {/* CENTER: Primary Navigation Links with Animated Glowing Underlines */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`group relative px-3 py-1.5 font-mono text-xs font-bold tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cyber-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-black uppercase bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                      {item.badge}
                    </span>
                  )}
                  {/* Glowing Animated Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-cyber-cyan shadow-[0_0_8px_#00F0FF] transition-transform duration-300 origin-center ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Action CTAs, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Toggle */}
            <div className="hidden xl:block w-48">
              <SearchBar variant="compact" placeholder="Search keys..." />
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyber-cyan/40 text-slate-300 hover:text-white transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 hover:text-rose-400 transition-colors" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 font-mono text-[9px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_#f43f5e]">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyber-cyan/40 text-slate-300 hover:text-white transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 hover:text-cyber-cyan transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-cyber-cyan font-mono text-[9px] font-bold text-black flex items-center justify-center shadow-[0_0_8px_#00F0FF]">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* High-Contrast Sign-In / User Profile CTA Button */}
            <Link to="/profile" className="hidden sm:inline-block">
              <GlowButton variant="cyan" size="sm" leftIcon={<User className="w-3.5 h-3.5" />}>
                {user.name.split(' ')[0]} // ID
              </GlowButton>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Row if screen < xl */}
      <div className="xl:hidden px-4 pt-1 pb-1 max-w-md mx-auto">
        <SearchBar variant="compact" placeholder="Search 5,000+ digital keys..." />
      </div>

      {/* Full-Screen Techfest Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-dark-void/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
          {/* Header row in mobile overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Logo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-cyber-cyan hover:text-black transition-all"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Giant Sci-Fi Nav Links */}
          <div className="py-8 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-cyber-cyan mb-3">
              // SELECT DESTINATION PORTAL
            </div>
            {navLinks.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between font-syne text-2xl sm:text-3xl font-black uppercase tracking-widest text-white hover:text-cyber-cyan transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500 group-hover:text-cyber-cyan">
                    0{idx + 1} //
                  </span>
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyber-cyan" />
              </Link>
            ))}
          </div>

          {/* Quick Account Actions */}
          <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-dark-obsidian border border-cyber-cyan/30 text-center font-bold text-cyber-cyan"
              >
                CART ({totalCartCount})
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-dark-obsidian border border-rose-500/30 text-center font-bold text-rose-400"
              >
                WISHLIST ({totalWishlistCount})
              </Link>
            </div>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-violet font-black text-black uppercase tracking-wider"
            >
              ACCESS PILOT PROFILE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
