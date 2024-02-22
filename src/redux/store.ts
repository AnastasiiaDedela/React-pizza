import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import sort from './slices/sortSlice'

const store = configureStore({
  reducer: { filter, sort },
});

export default store;
