import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Flame
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { SearchBar } from '../common/SearchBar';
import { IconButton } from '../ui/IconButton';
import { Badge } from '../ui/Badge';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist, user } = useStore();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/games' },
    { label: 'Categories', path: '/categories' },
    { label: 'New Releases', path: '/new-releases', badge: 'New' },
    { label: 'Pre-Orders', path: '/pre-orders' },
    { label: 'Bundles', path: '/bundles' },
    { label: 'Deals', path: '/deals', badge: 'Hot', badgeVariant: 'discount' as const },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-base/90 backdrop-blur-xl border-b border-dark-border/80 transition-all duration-200">
      {/* Top Banner Notice (Deals / Free Shipping / Digital keys) */}
      <div className="bg-gradient-to-r from-brand-900/50 via-dark-surface to-brand-900/50 border-b border-white/5 py-1 px-4 text-center text-xs text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Instant Digital Key Delivery & 24/7 Automated Redemptions
          </span>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/deals" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Weekend Flash Sale: Up to 80% Off
            </Link>
            <span className="text-dark-border">|</span>
            <Link to="/profile" className="hover:text-white transition-colors">
              Support Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3 gap-4">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo size="md" />
          </div>

          {/* Search Bar (Center / Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <SearchBar placeholder="Search 5,000+ PC & console games, keys..." />
          </div>

          {/* Desktop Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link to="/wishlist" aria-label="View Wishlist">
              <IconButton label="Wishlist" badge={totalWishlistCount > 0 ? String(totalWishlistCount) : undefined}>
                <Heart className="w-4 h-4 text-slate-300 hover:text-rose-400 transition-colors" />
              </IconButton>
            </Link>

            {/* Cart Link */}
            <Link to="/cart" aria-label="View Cart">
              <IconButton label="Cart" badge={totalCartCount > 0 ? String(totalCartCount) : undefined}>
                <ShoppingCart className="w-4 h-4 text-slate-300 hover:text-brand-400 transition-colors" />
              </IconButton>
            </Link>

            {/* User Profile / Auth */}
            <div className="hidden sm:flex items-center pl-2 border-l border-dark-border">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-card-hover border border-dark-border hover:border-dark-border-light text-slate-200 transition-all text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-300">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="truncate max-w-[100px]">{user.name}</span>
              </Link>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-dark-card border border-dark-border transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Strip */}
        <nav className="hidden lg:flex items-center space-x-1 border-t border-dark-border/50 py-2.5">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-brand-600/20 text-brand-300 border border-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || 'brand'}
                    size="sm"
                    className="ml-1 scale-90"
                  >
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Mobile Search Bar Row (shown on small devices) */}
      <div className="lg:hidden px-4 pb-3 pt-1 border-t border-dark-border/40">
        <SearchBar variant="compact" placeholder="Search games, keys, bundles..." />
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-dark-border bg-dark-base/98 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="text-center py-2 px-3 rounded-lg bg-dark-card border border-dark-border text-xs font-semibold text-slate-200"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={closeMobileMenu}
              className="text-center py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-md shadow-brand-600/30"
            >
              Register
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-dark-card'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || 'brand'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-dark-border flex items-center justify-around text-xs text-slate-400">
            <Link to="/wishlist" onClick={closeMobileMenu} className="hover:text-white flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-400" /> Wishlist ({totalWishlistCount})
            </Link>
            <Link to="/cart" onClick={closeMobileMenu} className="hover:text-white flex items-center gap-1">
              <ShoppingCart className="w-4 h-4 text-brand-400" /> Cart ({totalCartCount})
            </Link>
            <Link to="/profile" onClick={closeMobileMenu} className="hover:text-white flex items-center gap-1">
              <User className="w-4 h-4 text-cyan-400" /> Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
