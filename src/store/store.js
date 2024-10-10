// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
