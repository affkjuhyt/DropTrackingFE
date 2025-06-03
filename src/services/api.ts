import { Product, Order, Customer, AnalyticsData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },
};

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  updateOrderStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },
};

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
  },

  getCustomer: async (id: string): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch customer');
    return response.json();
  },
};

export const analyticsService = {
  getDashboardData: async (): Promise<AnalyticsData> => {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
    if (!response.ok) throw new Error('Failed to fetch analytics data');
    return response.json();
  },
};