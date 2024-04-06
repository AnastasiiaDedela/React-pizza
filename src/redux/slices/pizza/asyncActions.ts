import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPizzaItem, TSearchPizzaParams } from "./types";
import axios from "axios";

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