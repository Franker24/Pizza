export type MenuCategoryId = 
  | 'todos'
  | 'must-try'
  | 'pizzas'
  | 'empanadas'
  | 'tartas'
  | 'starters'
  | 'entradas'
  | 'wings'
  | 'ensaladas'
  | 'calzones'
  | 'hoagys'
  | 'pastas'
  | 'kids'
  | 'combos'
  | 'postres'
  | 'bebidas'
  | 'especiales';

export type OrderMode = 'salon' | 'takeaway' | 'delivery';

export type PaymentMethod = 'efectivo' | 'mercadopago' | 'transferencia';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export type PizzaSize = 'grande' | 'mediana' | 'chica' | 'individual' | 'porcion';

export interface PizzaSizePrices {
  grande?: number;
  mediana?: number;
  chica?: number;
  individual?: number;
  porcion?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay?: string;
  category: MenuCategoryId;
  subCategory?: string;
  sizePrices?: PizzaSizePrices;
  image: string;
  tags?: string[];
  isSpecial?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  servesCount?: string;
  badge?: string;
  availableExtras?: ExtraOption[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: PizzaSize;
  selectedExtras: ExtraOption[];
  notes?: string;
  unitPriceWithExtras: number;
  totalPrice: number;
}

export interface OrderDetails {
  id: string;
  code: string;
  mode: OrderMode;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  tableNumber?: string;
  pickupTime?: string;
  paymentMethod: PaymentMethod;
  cashAmountNeeded?: string;
  specialNotes?: string;
  status: 'recibido' | 'horno' | 'empaquetando' | 'listo' | 'entregado';
  createdAt: string;
}

export interface TableReservation {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'salon-interior' | 'patio-fuego' | 'barra-horno';
  notes?: string;
  createdAt: string;
}

export interface RecommendationAnswer {
  guests: string;
  flavor: string;
  drink: string;
}
