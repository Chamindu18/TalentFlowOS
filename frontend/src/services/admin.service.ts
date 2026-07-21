import axios from "axios";

const API_URL = "http://localhost:5007/api";

export const adminService = {
  async getUsers() {
    const response = await axios.get(
      `${API_URL}/admin/users`
    );

    return response.data.data;
  },
  async getDashboardStats() {
  const response = await axios.get(
    `${API_URL}/admin/dashboard`
  );

  return response.data.data;
},
};