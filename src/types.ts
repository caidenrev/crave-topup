export type GameCategory = 
  | 'all'
  | 'topup'
  | 'giftcard'
  | 'key'
  | 'roblox'
  | 'item'
  | 'akun'
  | 'koin';

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  category: GameCategory;
  publisher: string;
  bannerImage: string;
  coverImage: string;
  galleryImages?: string[];
  minPrice: number;
  rating: number;
  reviewsCount?: number | string;
  soldCount: string;
  instantDelivery: boolean;
  isPopular?: boolean;
  isHot?: boolean;
  badge?: string;
  platform?: string;
  region?: string;
  typeLabel?: string;
  activationNote?: string;
  description?: string;
  editionDetail?: string;
  releaseDate?: string;
  developers?: string;
  genres?: string;
  systemRequirements?: {
    min: { os: string; processor: string; memory: string; graphics: string; directX?: string };
    rec: { os: string; processor: string; memory: string; graphics: string; directX?: string };
  };
  sellers?: {
    id: string;
    name: string;
    rating: number;
    reviewCount: string;
    soldCount: number;
    price: number;
    originalPrice?: number;
    isOnline: boolean;
    avatar: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  idFormat: {
    userIdLabel: string;
    userIdPlaceholder: string;
    requiresZoneId: boolean;
    zoneIdLabel?: string;
    zoneIdPlaceholder?: string;
    guideTip?: string;
  };
}

export interface NominalItem {
  id: string;
  gameId: string;
  title: string;
  amount: string;
  price: number;
  originalPrice?: number;
  bonus?: string;
  isPopular?: boolean;
  categoryTag?: string; // 'Diamonds', 'Pass', 'Promo', 'Coins'
}

export interface PaymentMethod {
  id: string;
  name: string;
  category: 'qris' | 'va' | 'ewallet' | 'retail';
  groupName: string;
  logo: string;
  feeFlat: number;
  feePercent: number;
  description: string;
  promoBadge?: string;
  instructions: string[];
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
}

export interface OrderItem {
  invoiceId: string;
  game: GameItem;
  nominal: NominalItem;
  quantity: number;
  userId: string;
  zoneId?: string;
  userEmail: string;
  userWhatsapp: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  promoCode?: string;
  paymentFee: number;
  total: number;
  createdAt: string;
  status: 'pending' | 'processing' | 'success' | 'cancelled';
  vaNumber?: string;
  qrisPayload?: string;
}
