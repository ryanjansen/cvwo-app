import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Todo } from '../config/types';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { addTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;
