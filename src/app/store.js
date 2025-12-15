import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice.js";
import productReducer from "../features/product/productSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    GetProduct: productReducer,
  },
});