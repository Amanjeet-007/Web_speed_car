import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const CART_STORAGE_KEY = 'speed_car_wash_cart';

let savedCart = [];

try {
  const rawCart = localStorage.getItem(CART_STORAGE_KEY);
  savedCart = rawCart ? JSON.parse(rawCart) : [];
  if (!Array.isArray(savedCart)) savedCart = [];
} catch (error) {
  console.warn('Unable to restore cart from localStorage:', error);
  savedCart = [];
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: savedCart,
      popupMessage: null,
    },
  },
});

// Keep the temporary cart available across page refreshes/navigation.
store.subscribe(() => {
  try {
    const items = store.getState().cart.items;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn('Unable to save cart to localStorage:', error);
  }
});
