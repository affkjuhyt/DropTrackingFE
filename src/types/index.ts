export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Redux Action Types
export type ActionStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState {
  status: ActionStatus;
  error: string | null;
}

// Redux State Types
export interface ProductsState extends AsyncState {
  items: Product[];
  selectedProduct: Product | null;
}

export interface OrdersState extends AsyncState {
  items: Order[];
  selectedOrder: Order | null;
}

export interface RootState {
  products: ProductsState;
  orders: OrdersState;
}

export interface Order {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
}

export interface AnalyticsData {
  revenueGrowth: number;
  topProducts: Array<{
    name: string;
    unitsSold: number;
    revenue: number;
  }>;
  demographics: Array<{
    ageRange: string;
    percentage: number;
  }>;
  salesOverview: {
    totalRevenue: number;
    averageOrderValue: number;
    conversionRate: number;
    monthlyGrowth: {
      revenue: number;
      orderValue: number;
      conversion: number;
    };
  };
}