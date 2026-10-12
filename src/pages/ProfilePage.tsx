import React, { useState } from 'react';
import { 
  User, 
  Key, 
  ShoppingBag, 
  Settings, 
  ShieldCheck, 
  Copy, 
  Check, 
  Award
} from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'orders' | 'settings'>('library');
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const purchasedGames = MOCK_GAMES.slice(0, 3);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <PageContainer>
      {/* Profile Header Card */}
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 p-0.5 shadow-glow-brand">
                <div className="w-full h-full bg-dark-base rounded-[14px] flex items-center justify-center text-brand-300">
                  <User className="w-9 h-9" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-dark-base">
                LVL 42
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">CyberGhost_X</h1>
                <Badge variant="cyan" dot>Elite VIP</Badge>
              </div>
              <p className="text-xs text-slate-400">Member since January 2024 • gamer@cyberghost.io</p>
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Award className="w-3.5 h-3.5" /> 2,450 Loyalty XP
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">$348 Total Saved</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" leftIcon={<Settings className="w-3.5 h-3.5" />}>
              Account Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-dark-border mb-6">
        <button
          onClick={() => setActiveTab('library')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'library'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-4 h-4 text-brand-400" /> My Game Library ({purchasedGames.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order History
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & 2FA
        </button>
      </div>

      {/* Tab 1: Game Library */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 mb-2">
            Click 'Reveal Key' to display your digital redemption codes for Steam, Epic Games, or PlayStation Network.
          </div>

          {purchasedGames.map((game, index) => {
            const mockKey = `NX7P-89FA-44K${index}-99ZX`;
            const isRevealed = revealedKey === game.id;

            return (
              <div
                key={game.id}
                className="bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{game.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-emerald-400 font-semibold">Active License</span>
                      <span>•</span>
                      <span>Platform: Steam Digital</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-0 pt-3 md:pt-0 border-dark-border/60">
                  <div className="bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 font-mono text-xs text-brand-300">
                    {isRevealed ? mockKey : '••••-••••-••••-••••'}
                  </div>

                  {isRevealed ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopy(mockKey)}
                      leftIcon={copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedKey ? 'Copied' : 'Copy'}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setRevealedKey(game.id)}
                      leftIcon={<Key className="w-3.5 h-3.5" />}
                    >
                      Reveal Key
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Order History */}
      {activeTab === 'orders' && (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-dark-border text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Invoices & Transactions
          </div>
          <div className="divide-y divide-dark-border/60 text-xs text-slate-300">
            <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <span className="font-bold text-white">Order #NX-882190</span>
                <span className="text-slate-500 block">October 02, 2026 • Paid via PayPal</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Completed</span>
                <span className="font-bold text-white text-sm">$39.99</span>
              </div>
            </div>
            <div className="p-4 flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <span className="font-bold text-white">Order #NX-771944</span>
                <span className="text-slate-500 block">September 14, 2026 • Paid via Credit Card</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Completed</span>
                <span className="font-bold text-white text-sm">$49.99</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-white">Security & Two-Factor Authentication</h3>
          <p className="text-xs text-slate-400">
            Keep your account safe from unauthorized key extractions. We recommend enabling App Authenticator (TOTP).
          </p>
          <div className="pt-2">
            <Button variant="outline" size="sm">Enable Two-Factor Authentication</Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
