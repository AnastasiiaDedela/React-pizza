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
    },
    setFilters(state, action){
      state.sortType = action.payload.sortType;
    }
  },
});

export const { setSortType, setSortState, setFilters } = sortSlice.actions;

export default sortSlice.reducer;
