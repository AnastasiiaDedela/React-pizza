import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import sort from './slices/sort/slice'
import cart from './slices/cart/slice'
import pizza from './slices/pizza/slice'
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { filter, sort, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
