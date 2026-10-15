import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Game, CartItem, Order, PurchasedKey, UserProfile } from '../types';
import { MOCK_GAMES } from '../data/mockGames';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (game: Game, platform?: string) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (gameId: string) => boolean;

  wishlist: Game[];
  toggleWishlist: (game: Game) => void;
  isInWishlist: (gameId: string) => boolean;
  clearWishlist: () => void;

  orders: Order[];
  purchasedKeys: PurchasedKey[];
  completeCheckout: (paymentMethod: string, discountAmount: number) => Order;

  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;

  recentlyViewed: Game[];
  addToRecentlyViewed: (game: Game) => void;

  quickViewGame: Game | null;
  setQuickViewGame: (game: Game | null) => void;

  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'cheap_games_cart_v1',
  WISHLIST: 'cheap_games_wishlist_v1',
  ORDERS: 'cheap_games_orders_v1',
  KEYS: 'cheap_games_keys_v1',
  USER: 'cheap_games_user_v1',
  RECENT: 'cheap_games_recent_v1',
};

// Key generation helper
const generateLicenseKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
};

const DEFAULT_USER: UserProfile = {
  name: 'CyberGhost_X',
  email: 'gamer@cyberghost.io',
  level: 42,
  loyaltyPoints: 2450,
  totalSaved: 348.50,
  walletBalance: 25.00,
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { game: MOCK_GAMES[0], quantity: 1, platform: 'PC' },
      { game: MOCK_GAMES[1], quantity: 1, platform: 'PC' }
    ];
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return MOCK_GAMES.slice(0, 3);
  });

  // 3. User State
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  // 4. Orders and Keys
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'ORD-98412-2026',
        date: '2026-03-28',
        items: [{ game: MOCK_GAMES[2], quantity: 1, platform: 'PC' }],
        subtotal: 59.99,
        discount: 20.00,
        total: 39.99,
        paymentMethod: 'Credit Card (**** 4242)',
        status: 'Completed',
        keys: [
          {
            gameId: MOCK_GAMES[2].id,
            gameTitle: MOCK_GAMES[2].title,
            gameThumbnail: MOCK_GAMES[2].thumbnail,
            platform: 'PC',
            licenseKey: 'NEOX-774A-98KL-34ZZ',
            purchaseDate: '2026-03-28',
            orderId: 'ORD-98412-2026',
            pricePaid: 39.99,
          }
        ]
      }
    ];
  });

  const [purchasedKeys, setPurchasedKeys] = useState<PurchasedKey[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KEYS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        gameId: MOCK_GAMES[0].id,
        gameTitle: MOCK_GAMES[0].title,
        gameThumbnail: MOCK_GAMES[0].thumbnail,
        platform: 'PC',
        licenseKey: 'CYBR-8942-XLM9-4402',
        purchaseDate: '2026-02-14',
        orderId: 'ORD-1094-PREV',
        pricePaid: 39.99,
      },
      {
        gameId: MOCK_GAMES[1].id,
        gameTitle: MOCK_GAMES[1].title,
        gameThumbnail: MOCK_GAMES[1].thumbnail,
        platform: 'PS5',
        licenseKey: 'VALK-3301-ASGD-8819',
        purchaseDate: '2026-03-01',
        orderId: 'ORD-2041-PREV',
        pricePaid: 49.99,
      },
      {
        gameId: MOCK_GAMES[2].id,
        gameTitle: MOCK_GAMES[2].title,
        gameThumbnail: MOCK_GAMES[2].thumbnail,
        platform: 'PC',
        licenseKey: 'NEOX-774A-98KL-34ZZ',
        purchaseDate: '2026-03-28',
        orderId: 'ORD-98412-2026',
        pricePaid: 39.99,
      }
    ];
  });

  // 5. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.floor(Date.now() * 0.1) % 100000}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 6. Recently Viewed Games
  const [recentlyViewed, setRecentlyViewed] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [MOCK_GAMES[0], MOCK_GAMES[1], MOCK_GAMES[2]];
  });

  const addToRecentlyViewed = (game: Game) => {
    setRecentlyViewed((prev) => {
      const next = [game, ...prev.filter((g) => g.id !== game.id)].slice(0, 8);
      try {
        localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 7. Quick View Modal Game
  const [quickViewGame, setQuickViewGame] = useState<Game | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.KEYS, JSON.stringify(purchasedKeys));
    } catch {
      // ignore
    }
  }, [purchasedKeys]);

  // Cart Helpers
  const addToCart = (game: Game, platform = 'PC') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.game.id === game.id);
      if (existing) {
        addToast(`Added another copy of "${game.title}" to cart!`);
        return prev.map((item) =>
          item.game.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      addToast(`"${game.title}" added to shopping cart!`);
      return [...prev, { game, quantity: 1, platform }];
    });
  };

  const removeFromCart = (gameId: string) => {
    const item = cart.find((i) => i.game.id === gameId);
    setCart((prev) => prev.filter((i) => i.game.id !== gameId));
    if (item) {
      addToast(`Removed "${item.game.title}" from cart`, 'info');
    }
  };

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.game.id === gameId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (gameId: string) => {
    return cart.some((item) => item.game.id === gameId);
  };

  // Wishlist Helpers
  const toggleWishlist = (game: Game) => {
    setWishlist((prev) => {
      const exists = prev.some((g) => g.id === game.id);
      if (exists) {
        addToast(`Removed "${game.title}" from your wishlist`, 'info');
        return prev.filter((g) => g.id !== game.id);
      }
      addToast(`Added "${game.title}" to your wishlist!`);
      return [...prev, game];
    });
  };

  const isInWishlist = (gameId: string) => {
    return wishlist.some((g) => g.id === gameId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // User Profile
  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    addToast('Profile updated successfully!');
  };

  // Complete Checkout
  const completeCheckout = (paymentMethod: string, discountAmount: number): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.game.price * item.quantity, 0);
    const total = Math.max(0, subtotal - discountAmount);
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const today = new Date().toISOString().split('T')[0];

    const newKeys: PurchasedKey[] = [];
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        newKeys.push({
          gameId: item.game.id,
          gameTitle: item.game.title,
          gameThumbnail: item.game.thumbnail,
          platform: item.platform,
          licenseKey: generateLicenseKey(),
          purchaseDate: today,
          orderId,
          pricePaid: item.game.price,
        });
      }
    });

    const newOrder: Order = {
      id: orderId,
      date: today,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      total,
      paymentMethod,
      status: 'Completed',
      keys: newKeys,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setPurchasedKeys((prev) => [...newKeys, ...prev]);
    
    // Add points & total savings to user profile
    const earnedPoints = Math.round(total * 10);
    setUser((prev) => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + earnedPoints,
      totalSaved: prev.totalSaved + (cart.reduce((acc, item) => acc + (item.game.originalPrice - item.game.price) * item.quantity, 0) + discountAmount),
    }));

    clearCart();
    addToast(`Order ${orderId} confirmed! Digital keys are now available in your Vault!`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        orders,
        purchasedKeys,
        completeCheckout,
        user,
        updateUser,
        toasts,
        addToast,
        removeToast,
        recentlyViewed,
        addToRecentlyViewed,
        quickViewGame,
        setQuickViewGame,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
