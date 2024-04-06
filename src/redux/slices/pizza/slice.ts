import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaSliceState, Status, TPizzaItem, TSearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: TSearchPizzaParams) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<TPizzaItem[]>(
      `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
)

const initialState:IPizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = Status.LOADING;
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizzaItem[]>) => {
          state.items = action.payload
          state.status = Status.SUCCESS;
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = Status.ERROR;
          state.items = []
       })
 }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
