import axios from "axios"

const BASE_URL = 'https://propfixrealty.com/api/location'

interface Payload {
    location: string,
    des: string,
    createdBy: string
}

interface LocationType {
    location: string,
    des: string,
    createdBy: string,
    _id?: string
}

const locationApi = {
    addLocation: async (formData: Payload) => {
        try {

            const bodyData = {
                location: formData.location,
                des: formData.des,
                createdBy: formData.createdBy
            }
            
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
    },

    // delete location
    deleteLocation: async (id: string) => {
        try {
            const res = await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.log('Delete error location:', error);
        }
    },

    // Edit location
    editLocation: async (locationData: LocationType) => {
        try {
            const res = await axios.put(`${BASE_URL}/${locationData._id}`, locationData,  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            return res.data
        } catch (error) {
            console.error('Edit location error:', error);
        }
    }
}

export default locationApi;