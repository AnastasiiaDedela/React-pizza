export type TSortType = 'rating'|'-rating'|'price'|'-price'|'title'|'-title';
export interface ISortSliceState {
  sortType: TSortType,
  sortState?: boolean,
}