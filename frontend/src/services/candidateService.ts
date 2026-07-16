import axios from "axios";

const API_BASE_URL = "http://localhost:5007/api";

const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("accessToken");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  return { headers };
};

/* ============================
   Dashboard Types
============================ */

export interface RecentApplication {
  jobTitle: string;
  companyName: string;
  status: string;
}

export interface CandidateDashboardData {
  profileCompletion: number;
  totalApplications: number;
  recentApplications: RecentApplication[];
}

/* ============================
   Candidate Service
============================ */

const candidateService = {
  // Dashboard
  getDashboard: async (): Promise<CandidateDashboardData> => {
    const response = await axios.get(
      `${API_BASE_URL}/Candidate/dashboard`,
      getAuthHeaders()
    );

    return response.data;
  },

  // Logged-in Candidate
  getMe: async () => {
    return await axios.get(
      `${API_BASE_URL}/Candidate/me`,
      getAuthHeaders()
    );
  },

  // Update Profile
  updateProfile: async (formData: FormData) => {
    return await axios.put(
      `${API_BASE_URL}/Candidate/profile`,
      formData,
      getAuthHeaders(true)
    );
  },

  // Change Password
  changePassword: async (
    oldPassword: string,
    newPassword: string
  ) => {
    return await axios.post(
      `${API_BASE_URL}/Candidate/settings/change-password`,
      {
        oldPassword,
        newPassword,
      },
      getAuthHeaders()
    );
  },

  // Update Notification Settings
  updateNotifications: async (
    isEnabled: boolean
  ) => {
    return await axios.put(
      `${API_BASE_URL}/Candidate/settings/notifications`,
      {
        receiveNotifications: isEnabled,
      },
      getAuthHeaders()
    );
  },
};

export default candidateService;