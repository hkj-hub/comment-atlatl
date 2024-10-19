import { useAppSelector } from '@/store/hooks';
import { graphSelector } from '@/store/slices/graphSlice';

export const useGraph = () => {
  const elements = useAppSelector(graphSelector);

  return { elements };
};
