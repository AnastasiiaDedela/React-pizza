import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISortSliceState, TSortType } from './types';

const initialState: ISortSliceState = {
  sortType: '-price',
  sortState: false,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<TSortType>) {
      state.sortType = action.payload;
    },
    setSortState(state, action: PayloadAction<boolean>) {
      state.sortState = action.payload;
    },
    setSortFilter(state, action: PayloadAction<ISortSliceState>){
      state.sortType = action.payload.sortType;
    }
  },
});

export const { setSortType, setSortState, setSortFilter } = sortSlice.actions;

export default sortSlice.reducer;
