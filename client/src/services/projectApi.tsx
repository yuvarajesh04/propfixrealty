// services/projectApi.ts
import axios from "axios";

const BASE_URL = "http://13.201.38.254/api";

const projectApi = {
  createProject: async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/projects/create-project`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("create project error:", error);
      throw error;
    }
  },
  getProjects: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return response.data.projects
    } catch (error) {
      console.log('Get all projects:', error)
    }
  },

  // delete project by id
  deleteProject: async (id: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/projects/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return res.data;
    } catch (error) {
      console.log('Project delete error:', error)
    }
  }
};

export default projectApi;
