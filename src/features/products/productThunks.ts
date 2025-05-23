import { Category } from "@/types/category";
import { RequestSearch } from "@/types/requestSearch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListProducts = createAsyncThunk(
  "data/fetchListProducts",
  async (params?: RequestSearch) => {
    const response = await fetch("/resources/test_data.json");
    if (!response.ok) {
      throw new Error("Error file JSON");
    }

    const products = await response.json();

    if (!params) {
      return products;
    }

    const { categoryId, name, startDate, endDate } = params;
    const filteredProducts = products.filter((item: any) => {
      const matchCategory = !categoryId || item.categoryId === categoryId;

      const matchName =
        !name ||
        item.productNameEn.toLowerCase().includes(name.toLowerCase()) ||
        item.productsku?.toLowerCase().includes(name.toLowerCase());

      let matchDate = true;

      if (startDate && endDate && item.createdAt.$date) {
        const created = new Date(item.createdAt.$date);
        matchDate =
          created >= new Date(startDate) && created <= new Date(endDate);
      }
      return matchCategory && matchName && matchDate;
    });

    return filteredProducts;
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
    return categories as Category[];
  }
);
