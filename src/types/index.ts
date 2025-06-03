export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  category: string;
  imageUrl?: string;
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
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
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