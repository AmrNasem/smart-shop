import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  appliedCoupons: [],
  loading: true,
  error: null,
};

const calcPrice = (item) =>
  item.amount * item.price * (1 - (item.discount || 0));

const applyCoupons = (appliedCoupons, price) =>
  appliedCoupons.reduce((p, c) => p * (1 - c.discount), price);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const res = await fetch("http://localhost:8000/cart");
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeAmount(state, action) {
      const { id, newAmount } = action.payload;
      const targettedItem = state.items.find((item) => item.id === id);
      state.totalPrice -= state.appliedCoupons.length
        ? applyCoupons(state.appliedCoupons, calcPrice(targettedItem))
        : calcPrice(targettedItem);
      targettedItem.amount = newAmount;
      state.totalPrice += state.appliedCoupons.length
        ? applyCoupons(state.appliedCoupons, calcPrice(targettedItem))
        : calcPrice(targettedItem);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => {
        if (item.id === action.payload) {
          const price = calcPrice(item);
          state.totalPrice -= state.appliedCoupons.length
            ? applyCoupons(state.appliedCoupons, price)
            : price;
        }
        return item.id !== action.payload;
      });
    },
    addItem(state, action) {
      const newItem = action.payload;
      state.items.unshift(newItem);
      const price = calcPrice(newItem);
      state.totalPrice += state.appliedCoupons.length
        ? applyCoupons(state.appliedCoupons, price)
        : price;
    },
    wipeCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    applyCoupon(state, action) {
      const coupon = action.payload;
      state.appliedCoupons.push(coupon);
      state.totalPrice *= 1 - coupon.discount;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        const newItems = action.payload;
        state.loading = false;
        if (newItems.length) {
          state.items = newItems.reverse();
          const totalPrice = newItems.reduce((p, c) => p + calcPrice(c), 0);
          state.totalPrice = state.appliedCoupons.length
            ? applyCoupons(state.appliedCoupons, totalPrice)
            : totalPrice;
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
