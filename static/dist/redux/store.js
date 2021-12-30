import {configureStore} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import categoriesReducer from "./categoriesSlice.js";
import todosReducer from "./todosSlice.js";
const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer
  }
});
export default store;
