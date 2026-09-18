import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  popupMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      state.items.push(newItem);
      state.popupMessage = `${newItem.title} (${newItem.category}) added to cart!`;
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },

    // Clear complete cart after successful payment
    clearCart: (state) => {
      state.items = [];
    },

    clearPopupMessage: (state) => {
      state.popupMessage = null;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, clearPopupMessage } = cartSlice.actions;

export default cartSlice.reducer;
