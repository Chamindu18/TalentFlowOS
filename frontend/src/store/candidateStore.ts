import { create } from 'zustand';
import candidateService from '@/services/candidateService';

interface CandidateStore {
    dashboardData: any;
    fetchDashboardData: () => void;
}

export const useCandidateStore = create((set) => ({
    dashboardData: null,
    fetchDashboardData: async () => {
       
    }
}));