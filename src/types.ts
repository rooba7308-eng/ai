export type CakeCategory = 
  | 'All Creations'
  | 'Celebration & Birthday'
  | 'Botanical & Fruit'
  | 'Decadent Chocolate'
  | 'Petite & Tea Cakes'
  | 'Gluten-Friendly / Vegan';

export type CakeSize = '6" Petite' | '8" Classic' | '10" Grand' | '2-Tier Gala';

export interface CakeSizeOption {
  label: CakeSize;
  servings: string;
  price: number;
}

export interface CakeItem {
  id: string;
  name: string;
  frenchSubtitle: string;
  category: CakeCategory;
  price: number;
  sizes: CakeSizeOption[];
  description: string;
  flavorNotes: string[];
  dietaryTags: string[];
  leadTimeHours: number;
  allergens: string[];
  storageServingGuide: string;
  image: string;
  isPopular?: boolean;
  isSignature?: boolean;
}

export interface CartItem {
  cartId: string;
  cakeId?: string;
  name: string;
  size: CakeSize | string;
  price: number;
  quantity: number;
  image: string;
  inscription?: string;
  customDetails?: {
    tier: string;
    sponge: string;
    filling: string;
    finish: string;
    accents: string[];
    candles: string;
  };
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftNote?: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
}
