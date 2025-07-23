// src/utils/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL:"http://localhost:8080", // bạn có thể thay đổi
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token nếu có
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
