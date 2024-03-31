import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import sort from './slices/sortSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'

const store = configureStore({
  reducer: { filter, sort, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>
export default store
