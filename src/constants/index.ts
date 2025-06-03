export const ORDER_STATUS = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Beauty & Health',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Stationery',
  'Automotive',
] as const;

export const ANALYTICS_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export const PAGINATION_LIMITS = {
  PRODUCTS: 10,
  ORDERS: 15,
  CUSTOMERS: 20,
} as const;

export const LOW_STOCK_THRESHOLD = 10;

export const DATE_FORMATS = {
  DISPLAY: 'MMMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss',
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  ANALYTICS: '/analytics',
  AUTH: '/auth',
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const CHART_COLORS = {
  PRIMARY: '#4F46E5',
  SECONDARY: '#10B981',
  ACCENT: '#F59E0B',
  DANGER: '#EF4444',
  NEUTRAL: '#6B7280',
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;