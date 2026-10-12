import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { MOCK_GAMES } from '../../data/mockGames';
import type { Game } from '../../types';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  variant?: 'compact' | 'expanded';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search 10,000+ digital games, bundles & DLCs...',
  onSearch,
  className = '',
  variant = 'expanded',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ctrl+K or Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length > 0);
    if (onSearch) {
      onSearch(val);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    navigate(`/games?search=${encodeURIComponent(query.trim())}`);
  };

  const matchingGames: Game[] = query.trim()
    ? MOCK_GAMES.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.genre.some((cat) => cat.toLowerCase().includes(query.toLowerCase())) ||
          g.tagline.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div ref={containerRef} className={`relative flex items-center w-full group ${className}`}>
      <form onSubmit={handleSubmit} className="w-full relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-400 transition-colors">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-dark-card/90 text-slate-100 placeholder-slate-400 rounded-xl pl-10 pr-20 border border-dark-border focus:border-brand-500 focus:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 shadow-sm ${
            variant === 'compact' ? 'py-2 text-xs' : 'py-2.5 text-sm'
          }`}
        />

        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
              title="Clear search"
              type="button"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-dark-base/80 border border-dark-border rounded select-none">
              Ctrl K
            </span>
          )}
        </div>
      </form>

      {/* Live Search Popup Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-in fade-in-50 zoom-in-95">
          <div className="p-2 border-b border-dark-border/60 flex items-center justify-between text-xs text-slate-400 px-3">
            <span>
              Search results for &ldquo;<span className="text-white font-medium">{query}</span>&rdquo;
            </span>
            <button
              onClick={handleSubmit}
              className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
            >
              View all ({matchingGames.length}) <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {matchingGames.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No games found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="divide-y divide-dark-border/40 max-h-80 overflow-y-auto">
              {matchingGames.map((game) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-dark-card-hover transition-colors group/item"
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-12 h-14 object-cover rounded-lg border border-dark-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white group-hover/item:text-brand-300 truncate">
                        {game.title}
                      </h4>
                      {game.discountPercent > 0 && (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20 shrink-0">
                          -{game.discountPercent}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {game.genre.slice(0, 2).join(' • ')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-emerald-400">
                      ${game.price.toFixed(2)}
                    </div>
                    {game.discountPercent > 0 && (
                      <div className="text-[10px] text-slate-400 line-through">
                        ${game.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="p-2 bg-dark-surface/60 border-t border-dark-border/60 text-center">
            <button
              onClick={handleSubmit}
              className="text-xs font-bold text-brand-400 hover:text-brand-300 py-1"
            >
              Press Enter to see all results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
