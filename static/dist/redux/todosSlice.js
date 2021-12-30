import {createSlice} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
const initialState = [];
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      return state;
    }
  }
});
export const {addTodo} = todosSlice.actions;
export const selectTodos = (state) => state.todos;
export default todosSlice.reducer;
