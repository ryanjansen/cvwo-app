import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Category, status } from '../types';
import axios from 'axios';

interface initialState {
  data: Category[];
  status: status;
  error: string | null;
}

const initialState: initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      });
  },
});

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get<Category[]>('/api/categories', {
      withCredentials: true,
    });

    return response.data;
  },
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (title: string) => {
    const response = await axios.post(
      '/api/categories',
      {
        title,
      },
      { withCredentials: true },
    );
    return response.data;
  },
);

export const categoriesStatus = (state: RootState) => state.categories.status;

export const selectCategories = (state: RootState) => state.categories.data;

export default categoriesSlice.reducer;
