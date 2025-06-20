import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { queryClient, queryKeys } from '@/lib/react-query';
import apiClient from '@/lib/axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  sku: string;
  category_id: string;
  status: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  status?: 'available' | 'discontinued' | '' | 'out_of_stock';
}

export interface ProductFilters {
  status?: 'available' | 'discontinued' | 'out_of_stock' | null;
  search?: string;
  category?: string;
}

const PRODUCTS_ENDPOINT = '/products';

// API functions
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  const { data } = await apiClient.get<{ items: Product[] }>(PRODUCTS_ENDPOINT, { params: filters });
  return data.items;
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<{ data: Product }>(`${PRODUCTS_ENDPOINT}/${id}`);
  return data.data;
};

export const createProduct = async (product: CreateProductDTO): Promise<Product> => {
  const { data } = await apiClient.post<{ data: Product }>(PRODUCTS_ENDPOINT, product);
  return data.data;
};

export const updateProduct = async (id: string, product: UpdateProductDTO): Promise<Product> => {
  const { data } = await apiClient.patch<{ data: Product }>(`${PRODUCTS_ENDPOINT}/${id}`, product);
  return data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiClient.delete(`${PRODUCTS_ENDPOINT}/${id}`);
};

// React Query hooks
export const useProducts = (filters?: ProductFilters) => {
  return useQuery<Product[]>({
    queryKey: ['products', 'list', filters],
    queryFn: () => getProducts(filters)
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['products', 'detail', id],
    queryFn: () => getProduct(id)
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
    }
  });
};

export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationFn: (data: UpdateProductDTO) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
    }
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
    }
  });
};