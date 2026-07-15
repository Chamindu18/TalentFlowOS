import axios from 'axios';

const API_BASE_URL = 'http://localhost:5007/api';

const getAuthHeaders = (isMultipart = false) => {
    const token = localStorage.getItem('accessToken');
    
    const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`
    };

    // Explicitly do not define Content-Type when isMultipart is true.
    // This allows the browser/Axios to automatically format multi-part boundaries for file uploads.
    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }

    return { headers };
};

export const candidateService = {
    // 1. Get Logged In User Data
    getMe: async () => {
        return await axios.get(`${API_BASE_URL}/Candidate/me`, getAuthHeaders());
    },

    // 2. Update Profile 
    updateProfile: async (formData: FormData) => {
        return await axios.put(`${API_BASE_URL}/Candidate/profile`, formData, getAuthHeaders(true));
    },

    // 3. Change Password
    changePassword: async (oldPassword: string, newPassword: string) => {
        return await axios.post(`${API_BASE_URL}/Candidate/settings/change-password`, 
            { oldPassword, newPassword }, 
            getAuthHeaders()
        );
    },

    // 4. Notification Settings Update 
    updateNotifications: async (isEnabled: boolean) => {
        return await axios.put(`${API_BASE_URL}/Candidate/settings/notifications`, 
            { receiveNotifications: isEnabled }, 
            getAuthHeaders()
        );
    }
};

export default candidateService;