import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const res = await axios.get(
      `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return res.data
  },
)

const initialState = {
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
          console.log()
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success";
          console.log("success")
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error";
          state.items = []
          console.log("error")
       })
 }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
