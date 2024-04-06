import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterSliceState } from './types';



const initialState: IFilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: ''
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>){
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setCurrentPage,setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;