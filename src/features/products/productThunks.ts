import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListProducts = createAsyncThunk(
  "data/fetchListProducts",
  async (categoryId?: string) => {
    const response = await fetch("/resources/test_data.json");
    if (!response.ok) {
      throw new Error("Error file JSON");
    }

    const products = await response.json();
    if (!categoryId || categoryId === 'all') {
     return products;
    } else {
      const filteredProducts = products.filter(
        (item: any) => item.categoryId === categoryId
      );
      return filteredProducts;
    }
  }
);

export const fetchListCategories = createAsyncThunk(
  "data/fetchListCategories",
  async () => {
    const response = await fetch("/resources/categories.json");
    if (!response.ok) {
      throw new Error("Error file JSON");
    }
    const categories = await response.json();
    return categories;
  }
);
