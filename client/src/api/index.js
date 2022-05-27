/* This is a file that contains all the API calls that are used in the project. */
import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use(async (req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const signin = (data) => API.post("/user/signin", data);
export const signup = (data) => API.post("/user/signup", data);
export const getme = (user) => API.post("/user/me", user);
export const createPost = (data) => API.post("/post", data);
export const getPost = (data) => API.get("/post", data);
export const comments = (value, id) =>
  API.post(`/post/${id}/comment`, { value });
export const getCurrentePost = (id) => API.get(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const editPost = (data, id) => API.patch(`/post/${id}`, data);
export const userscores = (data, id) => API.patch(`/post/score/${id}`, data);
export const changePassword = (data) => API.patch("/user/change", data);
export const createCode = (data) => API.post("/code/savecode", data);
export const currentCodes = (id) => API.get(`/code/current/${id}`);
export const editCodes = (data, id) => API.patch(`/code/${id}`, data);
export const myCodes = (data) => API.post("/code/mycode", data);
export const deleteCode = (id) => API.post(`/code/codedelete`, id);

export const createquest = (data) => API.post("/quest", data);
export const getquest = (data) => API.get("/quest", data);
export const commentsQuest = (value, id) =>
  API.post(`/quest/${id}/comment`, { value });
export const getCurrentequest = (id) => API.get(`/quest/${id}`);
export const deletequest = (id) => API.delete(`/quest/${id}`);
export const editquest = (data, id) => API.patch(`/quest/${id}`, data);
