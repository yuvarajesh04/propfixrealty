const Location = require('../models/locationModel')

const locationController = {
    addLocation: async (req, res) => {
        try {
            const {
                location,
                price,
                des,
                createdBy
            } = req.body;

            if (!location || !price || !des || !createdBy) {
                res.status(400).json({
                    success: false,
                    message: 'Give all required fields'
                })
            }

            const isExist = await Location.findOne({ location })

            if (isExist)
                res.status(400).json({
                    success: false,
                    message: 'Location already exist!'
                })

            const newproj = new Location({
                location,
                price,
                des,
                createdBy
            })

            await newproj.save()

            res.status(201).json({
                success: true,
                message: 'Location added success!!'
            })

        } catch (error) {
            console.log('Add location error: ', error.message)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    },

    // Get locations
    getLocations: async (req, res) => {
        const locations = await Location.find();

        res.status(200).json({
            success: true,
            message: 'Location retrive sucess!',
            locations
        })
    },

    // Edit location
    editLocation: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id)
                res.status(400).json({
                    success: false,
                    message: "Id not found!"
                })

            const { location, price } = req.body;

            if (!location || !price)
                res.status(400).json({
                    success: false,
                    message: 'Could not find location and price'
                })

            const editData = {
                location,
                price
            }

            const edit = await Location.findByIdAndUpdate(id, editData)

            if (!edit)
                res.status(400).json({
                    success: false,
                    message: 'Something went wrong! please try again later'
                })

            const locations = await Location.find({}).sort({ _id: -1 });

            res.status(200).json({
                success: true,
                message: 'Locaiton edited success!!',
                locations
            })

        } catch (error) {
            console.error('Edit error:', error.message)
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
        }
    },

    deleteLocation: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id)
                res.status(400).json({
                    success: false,
                    message: 'Id not found'
                })

            const deleteLocation = await Location.findByIdAndDelete(id);

            if (!deleteLocation)
                res.status(500).json({
                    success: false,
                    message: 'Invalid Id',
                })

            res.status({
                success: true,
                message: 'Location deleted success!'
            })
        } catch (error) {
            console.error('Location delete error:', error.message)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    }
}

module.exports = locationController