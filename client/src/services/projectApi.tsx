// services/projectApi.ts
import axios from "axios";

const BASE_URL = "https://propfixrealty.com/api";

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
  },
  // Get single project
  getSingleProject: async (id: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/projects/get-project/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return res.data
    } catch (error) {
      console.error('Get single project error', error)
    }
  },

  // Update project
  updateProject: async (id: string, formData: FormData) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/projects/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Update project error:", error);
      throw error;
    }
  },

};

export default projectApi;
