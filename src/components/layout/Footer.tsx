import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Send, 
  Lock,
  Activity
} from 'lucide-react';
import { Logo } from '../common/Logo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#050508] border-t border-white/10 mt-20 text-slate-400 overflow-hidden select-none">
      {/* Giant Techfest Ghost Watermark Typography in Background */}
      <div 
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-syne text-[14vw] font-black uppercase tracking-widest text-white/[0.025] whitespace-nowrap select-none z-0"
        aria-hidden="true"
      >
        NEXUS // PLAY
      </div>

      {/* Top Value Propositions Strip with HUD styling */}
      <div className="relative z-10 border-b border-white/10 py-8 bg-dark-obsidian/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-11 h-11 rounded-lg bg-cyber-amber/15 border border-cyber-amber/30 flex items-center justify-center text-cyber-amber shrink-0 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-syne uppercase tracking-wider">Instant Key Delivery</h4>
              <p className="text-xs text-cyber-silver">Automated sub-second license generation</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-11 h-11 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-syne uppercase tracking-wider">Direct Publisher Keys</h4>
              <p className="text-xs text-cyber-silver">100% verified publisher warranties</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-11 h-11 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-syne uppercase tracking-wider">Encrypted Vault</h4>
              <p className="text-xs text-cyber-silver">4096-bit zero-trace checkout shield</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-11 h-11 rounded-lg bg-cyber-violet/15 border border-cyber-violet/30 flex items-center justify-center text-[#a855f7] shrink-0 shadow-[0_0_15px_rgba(112,0,255,0.2)]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-syne uppercase tracking-wider">24/7 Node Support</h4>
              <p className="text-xs text-cyber-silver">Real-time assistance for key redemptions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-cyber-silver max-w-sm leading-relaxed">
              NexusPlay is an ultra-immersive digital gaming marketplace inspired by the vanguard engineering and sci-fi aesthetic of Techfest. Access thousands of authentic activation keys, day-one pre-orders, and curated franchise bundles.
            </p>

            {/* Newsletter Subscription with cyber input */}
            <div className="pt-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyber-cyan block mb-2">
                // TRANSMISSION LINK: SUBSCRIBE FOR FLASH DROPS
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your terminal address..."
                  className="bg-dark-obsidian border border-white/10 text-xs rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-cyber-cyan to-[#0284c7] hover:brightness-110 text-black rounded-lg text-xs font-mono font-black uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>LINK</span>
                </button>
              </form>
            </div>

            {/* Social Glowing Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#discord"
                aria-label="Discord Community"
                className="w-9 h-9 rounded-lg bg-dark-obsidian border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
              </a>
              <a
                href="#twitch"
                aria-label="Twitch Stream"
                className="w-9 h-9 rounded-lg bg-dark-obsidian border border-white/10 hover:border-cyber-violet hover:text-cyber-violet hover:shadow-[0_0_15px_rgba(112,0,255,0.4)] flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter X"
                className="w-9 h-9 rounded-lg bg-dark-obsidian border border-white/10 hover:border-cyber-amber hover:text-cyber-amber hover:shadow-[0_0_15px_rgba(255,184,0,0.4)] flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Catalog Columns */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-syne text-sm font-bold uppercase tracking-wider text-white">CATALOG // 01</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/discover" className="text-cyber-cyan hover:underline flex items-center gap-1.5">
                  <span className="text-[10px]">▶</span> Discovery Matrix
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-slate-400 hover:text-white transition-colors">
                  All Games Catalog
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-400 hover:text-white transition-colors">
                  Genre Categories
                </Link>
              </li>
              <li>
                <Link to="/pre-orders" className="text-slate-400 hover:text-white transition-colors">
                  Day-One Pre-Orders
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="text-slate-400 hover:text-white transition-colors">
                  Curated Franchise Packs
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-cyber-amber hover:underline flex items-center gap-1.5">
                  <span className="text-[10px]">▶</span> Flash Deals & Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-syne text-sm font-bold uppercase tracking-wider text-white">NODES // PLATFORMS</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/games?platform=PC" className="text-slate-400 hover:text-white transition-colors">
                  Steam / Epic PC Keys
                </Link>
              </li>
              <li>
                <Link to="/games?platform=PS5" className="text-slate-400 hover:text-white transition-colors">
                  PlayStation 5 Keys
                </Link>
              </li>
              <li>
                <Link to="/games?platform=Xbox" className="text-slate-400 hover:text-white transition-colors">
                  Xbox Series X|S
                </Link>
              </li>
              <li>
                <Link to="/games?platform=Switch" className="text-slate-400 hover:text-white transition-colors">
                  Nintendo Switch Codes
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-slate-400 hover:text-white transition-colors">
                  Under $15 Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Protocols & Support */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-syne text-sm font-bold uppercase tracking-wider text-white">SECURITY // LEGAL</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#help" className="text-slate-400 hover:text-white transition-colors">
                  Activation FAQ
                </a>
              </li>
              <li>
                <a href="#refund" className="text-slate-400 hover:text-white transition-colors">
                  Refund Protocols
                </a>
              </li>
              <li>
                <a href="#support" className="text-slate-400 hover:text-white transition-colors">
                  Support Command Desk
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-400 hover:text-white transition-colors">
                  Data Encryption Terms
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Futuristic System-Status Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-5 bg-[#030305]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyber-cyan font-bold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              SYS_STATUS: ALL CORES OPERATIONAL
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">LATENCY: 12ms</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">NEXUS_SECURE_V4.2</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>© {CURRENT_YEAR} NEXUS PLAY CORP.</span>
            <span className="text-white/20">|</span>
            <span>LICENSED PUBLISHER NETWORK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
