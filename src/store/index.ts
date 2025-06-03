import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import ordersReducer from './slices/orders';
import { RootState } from '@/types';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;