import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" }); // Backend base URL

export const fetchUsers = () => API.get("/users");
export const registerUser = (userData) => API.post("/users", userData);
export const assignTask = (taskData) => API.post("/assign-task", taskData);
