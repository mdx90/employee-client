// src/services/api.js
import axios from "axios";

// If REACT_APP_API_URL is set, use it; otherwise default to window.location.origin + "/api"
const API_URL = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// Request interceptor to attach JWT if present
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

// Response interceptor to catch network/server errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("Cannot communicate with the server. Please ensure the API is running.");
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
