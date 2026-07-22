import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useProducts = (params = {}) =>
  useQuery({
    queryKey: ['products', params],
    queryFn: () => api.get('/products', { params }),
  });

export const useProduct = (slug) =>
  useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.get(`/products/${slug}`),
    enabled: !!slug,
  });

export const useFeaturedProducts = () =>
  useQuery({
    queryKey: ['products', { featured: true }],
    queryFn: () => api.get('/products', { params: { featured: true, limit: 8 } }),
  });
