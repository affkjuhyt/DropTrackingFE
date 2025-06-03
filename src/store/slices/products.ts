import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters, ProductsState, ApiResponse } from '@/types';
import axios from '@/lib/axios';

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFilters) => {
    const response = await axios.get<ApiResponse<Product[]>>('/products', { params: filters });
    return response.data.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await axios.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post<ApiResponse<Product>>('/products', product);
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>> }) => {
    const response = await axios.patch<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await axios.delete<ApiResponse<void>>(`/products/${id}`);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state: ProductsState, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    clearError: (state: ProductsState) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state: ProductsState) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state: ProductsState, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state: ProductsState, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Fetch Single Product
      .addCase(fetchProductById.fulfilled, (state: ProductsState, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state: ProductsState, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state: ProductsState, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((item: Product) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state: ProductsState, action: PayloadAction<string>) => {
        state.items = state.items.filter((item: Product) => item.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      });
  },
});

export const { setSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;