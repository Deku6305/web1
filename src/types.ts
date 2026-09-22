export type ShoeBrand = 'Nike' | 'Adidas' | 'Jordan' | 'New Balance' | 'Puma' | 'Converse' | 'Vans';

export type ShoeCategory = 'Lifestyle' | 'Running' | 'Basketball' | 'Skateboarding' | 'Training';

export interface Shoe {
  id: string;
  name: string;
  brand: ShoeBrand | string;
  category: ShoeCategory | string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  sizes: number[];
  colors: string[];
  badge?: 'HOT' | 'SALE' | 'NEW' | 'BESTSELLER';
  inStock: boolean;
  stockQuantity: number;
  createdAt?: string;
}

export interface CartItem {
  id: string; // unique key combining shoe.id + size + color
  shoe: Shoe;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  status?: 'active' | 'blocked';
  createdAt?: string;
}

export type PaymentMethod = 'cod' | 'banking';
export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface OrderItem {
  shoeId: string;
  shoeName: string;
  shoeImage: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  note?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
}
