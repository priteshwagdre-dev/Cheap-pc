import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
import { useStore } from '../context/StoreContext';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser, addToast } = useStore();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    updateUser({ name: username.trim(), email: email.trim(), level: 1, loyaltyPoints: 100 });
    addToast(`Account created! Welcome to NEXUSPLAY, ${username}! +100 XP Welcome Bonus!`);
    navigate('/profile');
  };

  return (
    <PageContainer size="narrow" className="py-12 sm:py-16">
      <div className="max-w-md mx-auto bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-black text-white">Join NEXUSPLAY Vault</h1>
          <p className="text-xs text-slate-400">
            Create an account to track orders, save wishlist items, and unlock VIP gamer discounts.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Gamer Tag / Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="NeonShadow99"
                className="w-full bg-dark-surface border border-dark-border rounded-xl text-sm pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-dark-surface border border-dark-border rounded-xl text-sm pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-dark-surface border border-dark-border rounded-xl text-sm pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              defaultChecked
              className="mt-0.5 rounded bg-dark-surface border-dark-border text-brand-500 focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-xs text-slate-400 select-none cursor-pointer leading-tight">
              I agree to the <a href="#terms" className="text-brand-400 underline">Terms of Service</a> and <a href="#privacy" className="text-brand-400 underline">Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Gamer Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-brand-400 font-bold hover:text-brand-300">
            Sign In Here
          </Link>
        </p>
      </div>
    </PageContainer>
  );
};
