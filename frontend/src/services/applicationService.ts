import axios from 'axios';
import { Application, CreateApplicationRequest, UpdateApplicationStatusRequest } from '../types/job';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5007/api';

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

export const applicationService = {
    // Get all applications
    getAll: async (): Promise<Application[]> => {
        const response = await api.get('/JobApplications');
        return response.data.data;
    },

    // Get application by ID
    getById: async (id: string): Promise<Application> => {
        const response = await api.get(`/JobApplications/${id}`);
        return response.data.data;
    },

    // Get applications by candidate
    getByCandidate: async (candidateId: string): Promise<Application[]> => {
        const response = await api.get(`/JobApplications/candidate/${candidateId}`);
        return response.data.data;
    },

    // Get applications by job
    getByJob: async (jobId: string): Promise<Application[]> => {
        const response = await api.get(`/JobApplications/job/${jobId}`);
        return response.data.data;
    },

    // Get applications by status
    getByStatus: async (status: string): Promise<Application[]> => {
        const response = await api.get(`/JobApplications/status/${status}`);
        return response.data.data;
    },

    // Create application
    create: async (data: CreateApplicationRequest): Promise<Application> => {
        const response = await api.post('/JobApplications', data);
        return response.data.data;
    },

    // Update application status
    updateStatus: async (id: string, data: UpdateApplicationStatusRequest): Promise<Application> => {
        const response = await api.patch(`/JobApplications/${id}/status`, data);
        return response.data.data;
    },

    // Shortlist candidate
    shortlist: async (id: string): Promise<void> => {
        await api.patch(`/JobApplications/${id}/shortlist`);
    },

    // Delete application
    delete: async (id: string): Promise<void> => {
        await api.delete(`/JobApplications/${id}`);
    },

    // Check if candidate already applied
    hasApplied: async (candidateId: string, jobId: string): Promise<boolean> => {
        const response = await api.get('/JobApplications/has-applied', {
            params: { candidateId, jobId },
        });
        return response.data.data;
    },

    // Get application count for job
    getCountForJob: async (jobId: string): Promise<number> => {
        const response = await api.get(`/JobApplications/count/job/${jobId}`);
        return response.data.data;
    },
};