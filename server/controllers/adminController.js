const Admin = require('../models/adminModel');
const Users = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/helper');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller function to create a new admin
const adminController = {
    loginAdmin: async (req, res) => {
        try {
            console.log("Login request body:", req.body);

            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message: "Email and password are required",
                    success: false
                })
            }

            const admin = await Admin.findOne({ email });

            if (!admin) {
                return res.status(400).json({
                    message: "Admin not found",
                    success: false
                });
            }

            const decryptedPassword = await comparePassword(password, admin.password);

            if (!decryptedPassword) {
                return res.status(401).json({
                    message: "Invalid password",
                    success: false
                });
            }

            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            return res.status(200).json({
                token,
                success: true,
                message: "Admin logged in successfully",
                name: admin.name
            })
        } catch (error) {
            console.error("Error logging in admin:", error);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    registerAdmin: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Name, email, and password are required",
                    success: false
                });
            }

            const existingAdmin = await Admin.findOne({ email });

            if (existingAdmin) {
                return res.status(400).json({
                    message: "Admin with this email already exists",
                    success: false
                });
            }

            const hashedPassword = await hashPassword(password);

            const newAdmin = new Admin({ name, email, password: hashedPassword });
            await newAdmin.save();

            return res.status(201).json({
                message: "Admin registered successfully",
                success: true,
                newAdmin
            });

        } catch (error) {
            console.error("Error registering admin:", error.message);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    },

    getAllClients: async (req, res) => {
        try {
            const users = await Users.find()

            res.status(200).json({
                users,
                success: true
            })
        } catch (error) {
            console.log('get all clients:', error.message)
            res.status(500).josn({
                success: false,
                message: 'Internal server errror'
            })
        }
    }
};

module.exports = adminController;