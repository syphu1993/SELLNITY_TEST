
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/libs/store';


export const selectLoadingProducts = (state: RootState) => state.products.loadingProducts;
export const selectLoadingCategories = (state: RootState) => state.products.loadingCategories;

export const selectIsLoading = createSelector(
    [selectLoadingProducts, selectLoadingCategories],
    (loadingProducts, loadingCategories) => loadingProducts || loadingCategories
);

