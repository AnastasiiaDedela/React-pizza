import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import sort from './slices/sortSlice'
import cart from './slices/cartSlice'

const store = configureStore({
  reducer: { filter, sort, cart },
});

export default store;
