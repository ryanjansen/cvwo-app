import axios from "../../_snowpack/pkg/axios.js";
export const login = async (username, password) => {
  const response = await axios.post("/api/login", {username, password}, {withCredentials: true});
  return response.data.username;
};
export const logout = async () => {
  const response = await axios.delete("/api/logout");
  return response.data;
};
export const signup = async (username, password, password_confirmation) => {
  const response = await axios.post("/api/signup", {
    user: {username, password, password_confirmation}
  }, {withCredentials: true});
  return response.data.username;
};
export const getUser = async () => {
  const response = await axios.get("/api/user");
  return response.data.username;
};
