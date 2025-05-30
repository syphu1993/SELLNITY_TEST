import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

