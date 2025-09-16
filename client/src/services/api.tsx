import axios from 'axios';

interface registrationData {
    name: string;
    email: string;
    mobile: string;
    message?: string;
}

const API_BASE_URL = 'https://propfixrealty-server.vercel.app/api';

const userApi = {
    async registerClient(data: registrationData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register-client`, data);

            return response.data;
        } catch (error) {
            console.error('Error registering client:', error);
        }
    }
}

export default userApi;