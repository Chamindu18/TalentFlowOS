import axios from 'axios';
import type { Company, Department } from '../types/job';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5007/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const companyService = {
    getAll: async (): Promise<Company[]> => {
        const response = await api.get('/Companies');
        return response.data.data;
    },

    getMyCompany: async (): Promise<Company | null> => {
        try {
            const response = await api.get('/Companies/my-company');
            return response.data.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    },
    
    getDepartments: async (companyId: string): Promise<Department[]> => {
        const response = await api.get(`/Departments/company/${companyId}`);
        return response.data.data;
    },
};