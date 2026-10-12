import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Lock, Mail, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
import { useStore } from '../context/StoreContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('gamer@cyberghost.io');
  const [password, setPassword] = useState('password123');
  const { updateUser, addToast } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = email.split('@')[0] || 'CyberGhost_X';
    updateUser({ name: username, email });
    addToast(`Welcome back, ${username}!`);
    navigate('/profile');
  };

  return (
    <PageContainer size="narrow" className="py-12 sm:py-16">
      <div className="max-w-md mx-auto bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-black text-white">Sign In to Your Vault</h1>
          <p className="text-xs text-slate-400">
            Access your purchased keys, synchronized wishlist, and member discounts.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Gamer Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="commander@nexusplay.com"
                className="w-full bg-dark-surface border border-dark-border rounded-xl text-sm pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <a href="#forgot" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-dark-surface border border-dark-border rounded-xl text-sm pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="rounded bg-dark-surface border-dark-border text-brand-500 focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="remember" className="text-xs text-slate-400 select-none cursor-pointer">
              Remember my session on this gaming rig
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Profile
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-dark-border" />
          <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
            Or quick login via
          </span>
          <div className="flex-grow border-t border-dark-border" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              updateUser({ name: 'SteamPilot', email: 'steampilot@valve.net' });
              addToast('Signed in via Steam Authenticator!');
              navigate('/profile');
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-dark-surface hover:bg-dark-card-hover border border-dark-border text-xs font-semibold text-slate-200 transition-colors"
          >
            <Gamepad2 className="w-4 h-4 text-cyan-400" /> Steam
          </button>
          <button
            type="button"
            onClick={() => {
              updateUser({ name: 'DiscordGamer', email: 'gamer@discord.gg' });
              addToast('Signed in via Discord OAuth!');
              navigate('/profile');
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-dark-surface hover:bg-dark-card-hover border border-dark-border text-xs font-semibold text-slate-200 transition-colors"
          >
            <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">D</span> Discord
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link to="/register" className="text-brand-400 font-bold hover:text-brand-300">
            Create Free Account
          </Link>
        </p>
      </div>
    </PageContainer>
  );
};
