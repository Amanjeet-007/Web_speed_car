import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, category, time, image }
  popupMessage: null, // Toast notification message ke liye
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // Check kar sakte hain agar same service + category already hai ya nahi
      state.items.push(newItem);
      state.popupMessage = `${newItem.title} (${newItem.category}) added to cart!`;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addToCart, clearPopupMessage, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;