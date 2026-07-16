import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api'; 


const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const candidateApi = {
    // 1. Resume Upload Infrastructure (Member 2 Exclusive)
    uploadResume: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/Resume/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // 2. Candidate Profile Operations
    getProfile: () => api.get('/CandidateProfile'),
    updateProfile: (data) => api.put('/CandidateProfile', data),
    addEducation: (data) => api.post('/CandidateProfile/education', data),
    addExperience: (data) => api.post('/CandidateProfile/experience', data),
    addSkill: (data) => api.post('/CandidateProfile/skills', data),
    addCertificate: (data) => api.post('/CandidateProfile/certificates', data),

    // 3. Job Applications & Tracking Operations
    getApplicationHistory: () => api.get('/Candidate/applications'),
    withdrawApplication: (id) => api.delete(`/Candidate/applications/${id}`),
    applyJob: (data) => api.post('/Candidate/apply', data),
    getSavedJobs: () => api.get('/Candidate/saved-jobs'),
};