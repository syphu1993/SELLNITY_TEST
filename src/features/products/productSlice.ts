import { createSlice } from '@reduxjs/toolkit';
import { fetchListCategories, fetchListProducts } from './productThunks';

interface ProductsState {
    products: any[];
    error?: string;
    loadingProducts: boolean;
    loadingCategories: boolean;
    categories: any[];
    selectedCategory: string;
    openKeys: string;

};

const initialState: ProductsState = {
    products: [],
    error: '',
    loadingProducts: false,
    loadingCategories: false,
    categories: [],
    selectedCategory: 'all',
    openKeys: ''
};

const productsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedOpenKey: (state, action) => {
            state.openKeys = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListProducts.pending, (state) => {
                state.loadingProducts = true;
            })
            .addCase(fetchListProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loadingProducts = false;
            })
            .addCase(fetchListProducts.rejected, (state) => {
                state.loadingProducts = false;
                state.error = 'Something went wrong';
            })
            .addCase(fetchListCategories.pending, (state) => {
                state.loadingCategories = true;
            })
            .addCase(fetchListCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loadingCategories = false;
            })
            .addCase(fetchListCategories.rejected, (state) => {
                state.loadingCategories = false;
                state.error = 'Something went wrong';
            })
    },
});
export const { setSelectedCategory, setSelectedOpenKey } = productsSlice.actions;
export default productsSlice.reducer;
