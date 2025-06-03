import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrdersState, ApiResponse } from '@/types';
import axios from '@/lib/axios';

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await axios.get<ApiResponse<Order[]>>('/orders');
    return response.data.data;
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string) => {
    const response = await axios.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post<ApiResponse<Order>>('/orders', order);
    return response.data.data;
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }: { id: string; data: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>> }) => {
    const response = await axios.patch<ApiResponse<Order>>(`/orders/${id}`, data);
    return response.data.data;
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string) => {
    await axios.delete<ApiResponse<void>>(`/orders/${id}`);
    return id;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state: OrdersState, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearError: (state: OrdersState) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state: OrdersState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state: OrdersState, action: PayloadAction<Order[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state: OrdersState, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Fetch Single Order
      .addCase(fetchOrderById.fulfilled, (state: OrdersState, action: PayloadAction<Order>) => {
        state.selectedOrder = action.payload;
      })
      // Create Order
      .addCase(createOrder.fulfilled, (state: OrdersState, action: PayloadAction<Order>) => {
        state.items.push(action.payload);
      })
      // Update Order
      .addCase(updateOrder.fulfilled, (state: OrdersState, action: PayloadAction<Order>) => {
        const index = state.items.findIndex((item: Order) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = action.payload;
        }
      })
      // Delete Order
      .addCase(deleteOrder.fulfilled, (state: OrdersState, action: PayloadAction<string>) => {
        state.items = state.items.filter((item: Order) => item.id !== action.payload);
        if (state.selectedOrder?.id === action.payload) {
          state.selectedOrder = null;
        }
      });
  },
});

export const { setSelectedOrder, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;