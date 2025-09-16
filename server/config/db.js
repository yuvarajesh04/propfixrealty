// const mongoose = require('mongoose');
// require('dotenv').config();

// async function connectDB() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/propfixrealty')
//             .then(()=> console.log('Mongoo db connected with propfixrealty database'))
//     } catch (error) {
//         console.log("Mongo DB connection error:", error.message)
//     }
// }

// module.exports = connectDB

const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://yuvarajesh:Yuva.V@04@cluster0.vitdzng.mongodb.net/propfixrealty?retryWrites=true&w=majority&appName=Cluster0')
            .then(()=> console.log('Mongoo db connected with propfixrealty database'))
    } catch (error) {
        console.log("Mongo DB connection error:", error.message)
    }
}

module.exports = connectDB