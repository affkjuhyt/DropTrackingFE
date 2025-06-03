import { Order, Product } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculateGrowthPercentage = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getOrderStatusColor = (status: Order['status']): string => {
  const colors = {
    processing: 'yellow',
    shipped: 'blue',
    delivered: 'green',
    cancelled: 'red',
  };
  return colors[status as keyof typeof colors] || 'gray';
};

export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
  return products.reduce((acc, product) => {
    const category = product.category as string;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

export const calculateTotalRevenue = (orders: Order[]): number => {
  return orders.reduce((total, order) => total + order.total, 0);
};

export const calculateAverageOrderValue = (orders: Order[]): number => {
  if (orders.length === 0) return 0;
  const total = calculateTotalRevenue(orders);
  return total / orders.length;
};

export const isLowStock = (product: Product, threshold: number = 10): boolean => {
  return product.stock <= threshold;
};

export const generateOrderId = (): string => {
  return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const calculateProductRevenue = (product: Product, orders: Order[]): number => {
  return orders.reduce((total, order) => {
    const productInOrder = order.products.find(p => p.id === product.id);
    if (productInOrder) {
      return total + (productInOrder.price * productInOrder.quantity);
    }
    return total;
  }, 0);
};

export const sortOrdersByDate = (orders: Order[], ascending: boolean = false): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};
