import axios from "axios"

const BASE_URL = 'https://propfixrealty.com/api/location'

interface Payload {
    location: string,
    des: string,
    price: string,
    createdBy: string
}

const locationApi = {
    addLocation: async (formData: Payload) => {
        try {

            const bodyData = {
                location: formData.location,
                price: formData.price,
                des: formData.des,
                createdBy: formData.createdBy
            }

            alert(JSON.stringify(bodyData))
            
            const res = await axios.post(`${BASE_URL}/new`, bodyData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.log("Add location error:", error)
        }
    },

    // get locations
    getLocations: async () => {
        try {
            const res = await axios.get(`${BASE_URL}/get-locations`);

            return res.data
        } catch (error) {
            console.log('Get location error:', error)
        }
    }
}

export default locationApi;