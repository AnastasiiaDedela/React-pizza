import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: Record<string, string>) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<TPizzaItem[]>(
      `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data as TPizzaItem[];
  },
)

export type TPizzaItem = {
  id: string,
  category: number,
  imageUrl: string,
  price: number,
  rating: number,
  sizes: number[],
  title: string,
  types: number[],
}

interface IPizzaSliceState {
  items: TPizzaItem[],
  status: 'loading' | 'success' | 'error'
}

const initialState:IPizzaSliceState = {
  items: [],
  status: 'loading'
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading";
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success";
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error";
          state.items = []
       })
 }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
