import axios from 'axios';


const API_BASE_URL = 'https://localhost:7001/api'; 

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
}

export const candidateService = {

  updateProfile: async (candidateId: string, profileData: CandidateProfile) => {
    const response = await axios.put(`${API_BASE_URL}/candidate/${candidateId}`, profileData);
    return response.data;
  },

 
  uploadResume: async (candidateId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${API_BASE_URL}/resume/upload?candidateId=${candidateId}`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
};