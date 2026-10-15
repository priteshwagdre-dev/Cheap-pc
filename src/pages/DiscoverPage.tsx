import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shuffle, 
  ChevronRight, 
  Eye, 
  ShoppingCart 
} from 'lucide-react';
import { MOCK_GAMES } from '../data/mockGames';
import { GameCard } from '../components/game/GameCard';
import { PageContainer } from '../components/layout/PageContainer';
import { GlowButton } from '../components/ui/GlowButton';
import { useStore } from '../context/StoreContext';

export const DiscoverPage: React.FC = () => {
  const { setQuickViewGame, addToCart } = useStore();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [randomGame, setRandomGame] = useState(MOCK_GAMES[0]);

  const trendingGames = MOCK_GAMES.filter((g) => g.isTrending || g.rating >= 4.8);
  const filteredByGenre = selectedGenre === 'All'
    ? MOCK_GAMES
    : MOCK_GAMES.filter((g) => g.genre.includes(selectedGenre));

  const handleRollRandomGame = () => {
    const pool = MOCK_GAMES.filter((g) => g.id !== randomGame.id);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || MOCK_GAMES[0];
    setRandomGame(chosen);
  };

  return (
    <PageContainer className="space-y-12 pb-20 select-none">
      {/* Header Banner */}
      <div className="hud-bracket-container relative rounded-2xl overflow-hidden border border-cyber-cyan/40 bg-gradient-to-r from-dark-obsidian via-[#0C1224] to-dark-obsidian p-6 sm:p-12 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-cyber-cyan">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>DISCOVERY MATRIX // NEURAL ENGINE</span>
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-widest2 uppercase">
            DISCOVER YOUR NEXT SAGA
          </h1>
          <p className="text-sm text-cyber-silver leading-relaxed font-sans">
            Unearth high-rated masterworks, hidden indie gems, and community-acclaimed releases across all gaming dimensions.
          </p>
        </div>
      </div>

      {/* Interactive Random Game Oracle Generator */}
      <div className="hud-bracket-container bg-dark-obsidian/90 border border-cyber-cyan/30 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-hud backdrop-blur-xl">
        <div className="lg:w-1/2 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyber-amber">
            <Shuffle className="w-4 h-4 animate-spin-slow" /> RANDOM GAME DISCOVERY ORACLE
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
            NOT SURE WHAT TO PLAY TONIGHT?
          </h2>
          <p className="text-xs sm:text-sm text-cyber-silver leading-relaxed font-sans">
            Let our neural matchmaking protocol roll a top-rated masterpiece suited to your tastes based on live community excitement.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <GlowButton
              variant="cyan"
              size="md"
              onClick={handleRollRandomGame}
              leftIcon={<Shuffle className="w-4 h-4" />}
            >
              ROLL ANOTHER GAME
            </GlowButton>
            <GlowButton
              variant="hud"
              size="md"
              onClick={() => setQuickViewGame(randomGame)}
              leftIcon={<Eye className="w-4 h-4" />}
            >
              QUICK PREVIEW
            </GlowButton>
          </div>
        </div>

        {/* Selected Random Game Card Showcase */}
        <div className="lg:w-1/2 w-full">
          <div className="border border-cyber-cyan/40 rounded-xl overflow-hidden bg-dark-card shadow-[0_0_20px_rgba(0,240,255,0.25)] flex flex-col sm:flex-row">
            <img
              src={randomGame.thumbnail}
              alt={randomGame.title}
              className="sm:w-48 h-44 object-cover shrink-0"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1 font-mono text-xs">
                  <span className="text-[10px] font-bold text-cyber-cyan uppercase tracking-wider">
                    {randomGame.genre.slice(0, 2).join(' • ')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyber-amber/20 text-cyber-amber font-bold border border-cyber-amber/40 text-[10px]">
                    SAVE {randomGame.discountPercent}%
                  </span>
                </div>
                <h3 className="font-syne text-base font-bold text-white line-clamp-1">{randomGame.title}</h3>
                <p className="text-xs text-cyber-silver line-clamp-2 mt-1">{randomGame.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xl font-black text-white">
                  ${randomGame.price.toFixed(2)}
                </span>
                <GlowButton
                  variant="amber"
                  size="sm"
                  onClick={() => addToCart(randomGame, randomGame.platforms[0])}
                  leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                >
                  ADD TO CART
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter by Genre Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan block mb-1">
              // TAXONOMY FILTER
            </span>
            <h2 className="font-syne text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              CURATED BY GENRE
            </h2>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono text-xs">
            {['All', 'Action', 'RPG', 'Adventure', 'Cyberpunk', 'Souls-like', 'Horror', 'Strategy'].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? 'bg-cyber-cyan text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredByGenre.slice(0, 8).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Community Masterpieces */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7] block mb-1">
              // 98%+ POSITIVE FEEDBACK
            </span>
            <h2 className="font-syne text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              CRITICALLY ACCLAIMED
            </h2>
          </div>
          <Link to="/games?sort=rating" className="text-xs font-mono text-cyber-cyan hover:underline flex items-center gap-1">
            VIEW ALL <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingGames.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
