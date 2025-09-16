const User = require('../models/userModel');
const connectDB = require("../config/db");

// Cached DB connection for serverless
let isConnected = false;
async function connectOnce() {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
        console.log("✅ MongoDB connected (cached)");
    }
}

const userController = {

    // Register a new client
    registerClient: async (req, res) => {
        try {
            await connectOnce(); // ensure DB connected

            const { name, email, mobile, message } = req.body;

            if (!name || !email || !mobile) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, Email, Mobile fields are mandatory'
                });
            }

            const newUser = new User({ name, email, mobile, message });

            const savedUser = await newUser.save();

            res.status(201).json({
                success: true,
                message: 'Client registered successfully',
                user: savedUser
            });

        } catch (error) {
            console.error("Error registering client:", error.message);
            res.status(500).json({
                success: false,
                message: 'Failed to register client',
                error: error.message
            });
        }
    }
}

module.exports = userController;
