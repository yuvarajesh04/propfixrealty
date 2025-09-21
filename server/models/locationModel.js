const mongoose = require('mongoose');

const locationModel = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Location', locationModel);