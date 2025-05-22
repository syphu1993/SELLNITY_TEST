import { createSlice } from '@reduxjs/toolkit';
import { fetchListCategories, fetchListProducts } from './productThunks';

interface ProductsState {
    products: any[];
    error?: string;
    loading: boolean;
    categories: any[];
    selectedCategory: string;

};

const initialState: ProductsState = {
    products: [],
    error: '',
    loading: false,
    categories: [],
    selectedCategory: 'all'
};

const productsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchListProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchListProducts.rejected, (state) => {
                state.loading = false;
                state.error = 'Something went wrong';
            })
            .addCase(fetchListCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchListCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchListCategories.rejected, (state) => {
                state.loading = false;
                state.error = 'Something went wrong';
            })
    },
});
export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
