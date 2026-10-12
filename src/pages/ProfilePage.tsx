import React, { useState } from 'react';
import { 
  User, 
  Key, 
  ShoppingBag, 
  Settings, 
  ShieldCheck, 
  Copy, 
  Check, 
  Award,
  Wallet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, purchasedKeys, orders, updateUser, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'library' | 'orders' | 'settings'>('library');
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Edit profile form state
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedKey(code);
    addToast('Activation key copied to clipboard!');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const toggleReveal = (keyId: string) => {
    setRevealedKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: editName, email: editEmail });
  };

  const handleAddFunds = (amount: number) => {
    updateUser({ walletBalance: user.walletBalance + amount });
    addToast(`Added $${amount.toFixed(2)} to your Nexus Wallet!`);
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
                LVL {user.level}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <Badge variant="cyan" dot>Elite VIP</Badge>
              </div>
              <p className="text-xs text-slate-400">Member since January 2024 • {user.email}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Award className="w-3.5 h-3.5" /> {user.loyaltyPoints.toLocaleString()} Loyalty XP
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">${user.totalSaved.toFixed(2)} Total Saved</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-brand-300 font-semibold">
                  <Wallet className="w-3.5 h-3.5" /> ${user.walletBalance.toFixed(2)} Wallet
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Settings className="w-3.5 h-3.5" />}
              onClick={() => setActiveTab('settings')}
            >
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
          <Key className="w-4 h-4 text-brand-400" /> My Game Library ({purchasedKeys.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order History ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Settings & Wallet
        </button>
      </div>

      {/* Tab 1: Game Library */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
            <span>
              Click &apos;Reveal Key&apos; to display your digital redemption codes for Steam, Epic Games, or PlayStation Network.
            </span>
            <Link to="/games" className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              Add More Games <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {purchasedKeys.length === 0 ? (
            <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center text-slate-400 text-sm">
              You haven&apos;t purchased any digital keys yet. Complete a checkout in the cart to receive activation codes.
            </div>
          ) : (
            purchasedKeys.map((item, index) => {
              const keyIdentifier = `${item.gameId}-${index}`;
              const isRevealed = Boolean(revealedKeys[keyIdentifier]);

              return (
                <div
                  key={keyIdentifier}
                  className="bg-dark-card border border-dark-border rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-dark-border-light transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Link to={`/games/${item.gameId}`} className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                      <img src={item.gameThumbnail} alt={item.gameTitle} className="w-full h-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <Link to={`/games/${item.gameId}`} className="text-base font-bold text-white hover:text-brand-300 truncate block">
                        {item.gameTitle}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active Key
                        </span>
                        <span>•</span>
                        <span>Platform: <strong className="text-slate-300">{item.platform}</strong></span>
                        <span>•</span>
                        <span>Purchased: {item.purchaseDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-0 pt-3 md:pt-0 border-dark-border/60">
                    <div className="bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 font-mono text-xs text-brand-300 tracking-wider">
                      {isRevealed ? item.licenseKey : '••••-••••-••••-••••'}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={isRevealed ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => toggleReveal(keyIdentifier)}
                        leftIcon={<Key className="w-3.5 h-3.5" />}
                      >
                        {isRevealed ? 'Hide' : 'Reveal Key'}
                      </Button>

                      {isRevealed && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCopy(item.licenseKey)}
                          leftIcon={copiedKey === item.licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        >
                          {copiedKey === item.licenseKey ? 'Copied' : 'Copy'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Order History */}
      {activeTab === 'orders' && (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-dark-border text-xs font-bold uppercase tracking-wider text-slate-400 flex justify-between">
            <span>Recent Invoices & Transactions</span>
            <span>{orders.length} Total Orders</span>
          </div>
          <div className="divide-y divide-dark-border/60 text-xs text-slate-300">
            {orders.map((order) => (
              <div key={order.id} className="p-5 flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{order.id}</span>
                    <Badge variant="success" size="sm">{order.status}</Badge>
                  </div>
                  <div className="text-slate-400">
                    Placed on {order.date} • {order.paymentMethod}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {order.items.map((item, i) => (
                      <span key={i} className="bg-dark-surface px-2 py-0.5 rounded text-[11px] text-slate-300 border border-dark-border">
                        {item.game.title} (x{item.quantity}) - {item.platform}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <span className="text-slate-400 text-[11px]">Total Paid</span>
                  <span className="font-extrabold text-white text-base">${order.total.toFixed(2)}</span>
                  {order.discount > 0 && (
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      Saved ${order.discount.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Settings & Wallet */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edit Profile Form */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-400" /> Gamer Identity Settings
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Gamer Tag / Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Account Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </form>
          </div>

          {/* Wallet & Top Up */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" /> Nexus Store Wallet
            </h3>
            <p className="text-xs text-slate-400">
              Current balance: <strong className="text-emerald-400 text-sm font-bold">${user.walletBalance.toFixed(2)}</strong>
            </p>
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Top Up Balance
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAddFunds(10)}>
                  +$10
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddFunds(25)}>
                  +$25
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddFunds(50)}>
                  +$50
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-dark-border text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Two-Factor Authentication is currently active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
