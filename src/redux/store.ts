import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import todosReducer from './todosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
