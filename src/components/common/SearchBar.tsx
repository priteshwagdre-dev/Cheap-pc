import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

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
  variant = 'expanded'
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`relative flex items-center w-full group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-400 transition-colors">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-dark-card/90 text-sm text-slate-100 placeholder-slate-400 rounded-xl pl-10 pr-20 py-2.5 border border-dark-border focus:border-brand-500 focus:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 shadow-sm ${
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
    </div>
  );
};
