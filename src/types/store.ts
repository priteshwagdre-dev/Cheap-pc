import type { Game } from './game';

export interface CartItem {
  game: Game;
  quantity: number;
  platform: string;
}

export interface PurchasedKey {
  gameId: string;
  gameTitle: string;
  gameThumbnail: string;
  platform: string;
  licenseKey: string;
  purchaseDate: string;
  orderId: string;
  pricePaid: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'Completed' | 'Processing';
  keys: PurchasedKey[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  level: number;
  loyaltyPoints: number;
  totalSaved: number;
  walletBalance: number;
}
