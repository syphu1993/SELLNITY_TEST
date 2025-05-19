import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/libs/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
