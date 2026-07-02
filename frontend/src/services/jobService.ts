import axios from 'axios';
import { Job, CreateJobRequest, UpdateJobRequest } from '../types/job';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:5007/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const jobService = {
    // Get all jobs
    getAll: async (): Promise<Job[]> => {
        const response = await api.get('/Jobs');
        return response.data.data;
    },

    // Get active jobs
    getActive: async (): Promise<Job[]> => {
        const response = await api.get('/Jobs/active');
        return response.data.data;
    },

    // Get job by ID
    getById: async (id: string): Promise<Job> => {
        const response = await api.get(`/Jobs/${id}`);
        return response.data.data;
    },

    // Get jobs by company
    getByCompany: async (companyId: string): Promise<Job[]> => {
        const response = await api.get(`/Jobs/company/${companyId}`);
        return response.data.data;
    },

    // Get jobs by department
    getByDepartment: async (departmentId: string): Promise<Job[]> => {
        const response = await api.get(`/Jobs/department/${departmentId}`);
        return response.data.data;
    },

    // Search jobs
    search: async (params: {
        searchTerm?: string;
        location?: string;
        employmentType?: string;
    }): Promise<Job[]> => {
        const response = await api.get('/Jobs/search', { params });
        return response.data.data;
    },

    // Create job
    create: async (data: CreateJobRequest): Promise<Job> => {
        const response = await api.post('/Jobs', data);
        return response.data.data;
    },

    // Update job
    update: async (id: string, data: UpdateJobRequest): Promise<Job> => {
        const response = await api.put(`/Jobs/${id}`, data);
        return response.data.data;
    },

    // Delete job
    delete: async (id: string): Promise<void> => {
        await api.delete(`/Jobs/${id}`);
    },

    // Close job
    close: async (id: string): Promise<void> => {
        await api.patch(`/Jobs/${id}/close`);
    },
};