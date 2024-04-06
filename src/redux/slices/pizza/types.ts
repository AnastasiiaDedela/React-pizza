export type TSearchPizzaParams = {
    order: string, 
    sortBy: string, 
    category: string, 
    search: string,
    currentPage: number
  }

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
  
  export enum Status {
    LOADING = 'loading' ,
    SUCCESS = 'success' ,
    ERROR = 'error'
  }
  
export interface IPizzaSliceState {
    items: TPizzaItem[],
    status: Status
  }