import { createSlice } from "@reduxjs/toolkit";
import { fetchListCategories, fetchListProducts } from "./productThunks";
import { Category } from "@/types/category";
import { ALL } from "@/constants/constantRoute";

interface ProductsState {
  products: any[];
  error?: string;
  loadingProducts: boolean;
  loadingCategories: boolean;
  categories: Category[];
  selectedCategory: string;
  openKeys: string;
  listSynchronous: string[];
  isSync: boolean;
}

const initialState: ProductsState = {
  products: [],
  error: "",
  loadingProducts: false,
  loadingCategories: false,
  categories: [],
  selectedCategory: ALL,
  openKeys: "",
  listSynchronous: [],
  isSync: false,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedOpenKey: (state, action) => {
      state.openKeys = action.payload;
    },
    setListSynchronous: (state, action) => {
      state.listSynchronous = [...state.listSynchronous, action.payload];
    },
    setIsSync: (state, action) => {
      state.isSync = action.payload;
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
        state.error = "Something went wrong";
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
        state.error = "Something went wrong";
      });
  },
});
export const { setSelectedCategory, setSelectedOpenKey, setListSynchronous, setIsSync } =
  productsSlice.actions;
export default productsSlice.reducer;
