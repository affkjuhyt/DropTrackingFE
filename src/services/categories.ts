import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import apiClient from "@/lib/axios";
import { queryClient } from "@/lib/react-query";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug?: string | null;
  description?: string | null;
  parent_id?: number | null;
  tax_class_id?: number | null;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
  
}

export interface CategoryFilters {
  search?: string;
}

const CATEGORIES_ENDPOINT = "/categories";

// API functions
export const getCategories = async (filters?: CategoryFilters): Promise<Category[]> => {
  const { data } = await apiClient.get<{ items: Category[] }>(CATEGORIES_ENDPOINT, { params: filters });
  return data.items;
}

export const getCategory = async (id: string): Promise<Category> => {
  const { data } = await apiClient.get<{ data: Category }>(`${CATEGORIES_ENDPOINT}/${id}`);
  return data.data;
}

export const createCategory = async (category: CreateCategoryDTO): Promise<Category> => {
  const { data } = await apiClient.post<{ data: Category }>(CATEGORIES_ENDPOINT, category);
  return data.data;
}

export const updateCategory = async (id: string, category: UpdateCategoryDTO): Promise<Category> => {
  const { data } = await apiClient.patch<{ data: Category }>(`${CATEGORIES_ENDPOINT}/${id}`, category);
  return data.data;
}

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`${CATEGORIES_ENDPOINT}/${id}`);
}

// React Query hooks
export const useCategories = (filters?: CategoryFilters) => {
  return useQuery<Category[]>({
    queryKey: ['categories', 'list', filters],
    queryFn: () => getCategories(filters)
  })
}

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ['categories', 'detail', id],
    queryFn: () => getCategory(id)
  })
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
    }
  })
}

export const useUpdateCategory = (id: string) => {
  return useMutation({
    mutationFn: (data: UpdateCategoryDTO) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
    }
  })
}

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'list'] });
    }
  })
}
