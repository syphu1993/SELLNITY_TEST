import { createSlice } from "@reduxjs/toolkit";
import { fetchListShops } from "./shopThunks";

interface ShopsState {
  shops: any[];
  error?: string;
  loading: boolean;
}

const initialState: ShopsState = {
  shops: [],
  error: "",
  loading: false,
};

const shopsSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListShops.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListShops.fulfilled, (state, action) => {
        state.shops = action.payload;
        state.loading = false;
      })
      .addCase(fetchListShops.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
  },
});
export default shopsSlice.reducer;
