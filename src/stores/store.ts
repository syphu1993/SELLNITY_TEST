import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/features/products/productSlice';
import shopsReducer from '@/features/shops/shopSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    shops: shopsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
