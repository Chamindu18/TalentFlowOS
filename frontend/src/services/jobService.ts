import axios from "axios";
import type { Job } from "../types/job";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5007/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get("/Jobs");
    return response.data.data;
  },
};