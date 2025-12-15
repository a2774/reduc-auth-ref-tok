import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsAPI } from "./productApi";

export const GetProduct = createAsyncThunk("product/getProduct", async () => {
  const res = await getProductsAPI();
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(GetProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProduct.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(GetProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
