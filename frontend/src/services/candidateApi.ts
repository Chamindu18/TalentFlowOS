import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5007/api';

interface UpdateCandidateProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bio: string;
    resumeData: string;
    resumeFileName: string;
}

interface CertificateDto {
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
}

interface EducationDto {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
}

interface ExperienceDto {
    companyName: string;
    role: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
}

interface SkillDto {
    name: string;
    proficiencyLevel: string;
}

interface ApplyJobDto {
    jobId: string;
    resumeFileName?: string;
    coverLetter?: string;
}

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
    uploadResume: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/Resume/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // 2. Candidate Profile Operations
    getProfile: () => api.get('/CandidateProfile'),
    updateProfile: (data: UpdateCandidateProfileDto) => api.put('/CandidateProfile', data),
    addEducation: (data: EducationDto) => api.post('/CandidateProfile/education', data),
    addExperience: (data: ExperienceDto) => api.post('/CandidateProfile/experience', data),
    addSkill: (data: SkillDto) => api.post('/CandidateProfile/skills', data),
    addCertificate: (data: CertificateDto) => api.post('/CandidateProfile/certificates', data),

    // 3. Job Applications & Tracking Operations
    getApplicationHistory: () => api.get('/Candidate/applications'),
    withdrawApplication: (id: string) => api.delete(`/Candidate/applications/${id}`),
    applyJob: (data: ApplyJobDto) => api.post('/Candidate/apply', data),
    getSavedJobs: () => api.get('/Candidate/saved-jobs'),
};