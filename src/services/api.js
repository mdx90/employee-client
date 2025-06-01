// src/services/api.js
import axios from "axios";

// Hard‐coded API base URL
const API_URL = "http://192.168.1.143/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// Attach JWT if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Alert if server is unreachable
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("Cannot communicate with the server. Please ensure the API at http://192.168.1.143 is running.");
    }
    return Promise.reject(error);
  }
);

export default api;

// Authentication endpoints
export const registerUser = (email, password, confirmPassword) =>
  api.post("/Account/register", { email, password, confirmPassword });

export const loginUser = (email, password) =>
  api.post("/Account/login", { email, password });

// Employee CRUD endpoints
export const fetchEmployees    = () => api.get("/Employee");
export const fetchEmployeeById = (id) => api.get(`/Employee/${id}`);
export const createEmployee    = (data) => api.post("/Employee", data);
export const updateEmployee    = (id, data) => api.put(`/Employee/${id}`, data);
export const deleteEmployee    = (id) => api.delete(`/Employee/${id}`);
