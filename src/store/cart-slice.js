import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  appliedCoupons: [],
  loading: true,
  error: null,
};

const calcTotalPrice = (items) =>
  items.reduce((current, prev) => current + prev);

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
      state.totalPrice -=
        targettedItem.amount *
        targettedItem.price *
        (1 - (targettedItem.discount || 0));
      targettedItem.amount = newAmount;
      state.totalPrice +=
        targettedItem.amount *
        targettedItem.price *
        (1 - (targettedItem.discount || 0));
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => {
        if (item.id === action.payload)
          state.totalPrice -=
            item.amount * item.price * (1 - (item.discount || 0));
        return item.id !== action.payload;
      });
    },
    addItem(state, action) {
      const newItem = action.payload;
      state.items.unshift(newItem);
      state.totalPrice +=
        newItem.amount * newItem.price * (1 - (newItem.discount || 0));
    },
    wipeCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    applyCoupon(state, action) {
      state.appliedCoupons.push(action.payload);
      state.totalPrice -= (state.totalPrice * action.payload.percent) / 100;
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
        state.items = newItems;
        if (newItems.length)
          state.totalPrice = calcTotalPrice(
            newItems.map(
              (item) => item.amount * item.price * (1 - (item.discount || 0))
            )
          );
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
