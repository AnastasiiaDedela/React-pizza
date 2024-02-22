import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: 'rating',
  sortState: false,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSortState(state, action) {
      state.sortState = action.payload;
    }
  },
});

export const { setSortType, setSortState } = sortSlice.actions;

export default sortSlice.reducer;
