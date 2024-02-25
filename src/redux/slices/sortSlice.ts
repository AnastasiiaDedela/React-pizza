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
    setSortFilter(state, action){
      console.log('sort action: ', action)
      state.sortType = action.payload.sortType;
    }
  },
});

export const { setSortType, setSortState, setSortFilter } = sortSlice.actions;

export default sortSlice.reducer;
