import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

const BASE_URL = "http://13.201.38.254/api";

const AdminApi = {
  adminLogin: async (data: LoginData) => {
    try {

      const response = await axios.post(`${BASE_URL}/admin/login`, data);

      return response.data;

    } catch (error: any) {

      console.log("Login error:", error.response?.data || error.message);

      return {
        success: false,
        message: error.response?.data?.message || "Login request failed",
      };
    }
  },

  fetchAllUsers: async ()=> {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-all-clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return response.data
    } catch (error) {
      console.error('Get all clients', error)
    }
  }
};

export default AdminApi;
