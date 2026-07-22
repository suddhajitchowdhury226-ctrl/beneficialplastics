import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories'),
    staleTime: 10 * 60 * 1000,
  });
