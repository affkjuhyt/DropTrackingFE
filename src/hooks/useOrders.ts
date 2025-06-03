import { useState, useEffect } from 'react';
import { Order } from '../types';
import { orderService } from '../services/api';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id: string) => {
    try {
      return await orderService.getOrder(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      throw err;
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? updatedOrder : order
        )
      );
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      throw err;
    }
  };

  const filterOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const getOrdersByDateRange = (startDate: Date, endDate: Date) => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrder,
    updateOrderStatus,
    filterOrdersByStatus,
    getOrdersByDateRange,
    getTotalRevenue,
  };
}
