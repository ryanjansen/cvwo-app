import {createSlice, createAsyncThunk} from "../../_snowpack/pkg/@reduxjs/toolkit.js";
import axios from "../../_snowpack/pkg/axios.js";
const initialState = {
  data: [],
  status: "idle",
  error: null
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = "loading";
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = state.data.concat(action.payload);
    }).addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "error";
    }).addCase(addCategory.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  }
});
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await axios.get("/api/categories", {
    withCredentials: true
  });
  return response.data;
});
export const addCategory = createAsyncThunk("categories/addCategory", async (categoryArgs) => {
  const response = await axios.post("/api/categories", {category: categoryArgs}, {
    withCredentials: true
  });
  return response.data;
});
export const categoriesStatus = (state) => state.categories.status;
export const selectCategories = (state) => state.categories.data;
export default categoriesSlice.reducer;
