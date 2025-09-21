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
    }
}

module.exports = locationController