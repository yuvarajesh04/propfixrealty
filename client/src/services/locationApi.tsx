import axios from "axios"

const BASE_URL = 'https://propfixrealty.com/api/location'

const locationApi = {
    addLocation: async (formData: FormData) => {
        try {
            const res = await axios.post(`${BASE_URL}/new`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.log("Add location error:", error)
        }
    }
}

export default locationApi;