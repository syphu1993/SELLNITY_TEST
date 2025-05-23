import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListShops = createAsyncThunk(
  "data/fetchListCategories",
  async () => {
    const response = await fetch("/resources/shops_data.json");
    if (!response.ok) {
      throw new Error("Error file JSON");
    }
    const shops = await response.json();
    return shops;
  }
);
