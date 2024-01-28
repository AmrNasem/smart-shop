import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});

export default store;
