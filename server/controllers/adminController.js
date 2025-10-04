// server/controllers/adminController.js
import Admin from '../models/adminModel.js';
import Users from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/helper.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import connectDB from '../config/db.js';

// Cached DB connection for serverless
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log('✅ MongoDB connected (cached)');
  }
}

const adminController = {
  loginAdmin: async (req, res) => {
    try {
      await connectOnce();

      console.log('Login request body:', req.body);
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email and password are required',
          success: false,
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({
          message: 'Admin not found',
          success: false,
        });
      }

      const decryptedPassword = await comparePassword(password, admin.password);

      if (!decryptedPassword) {
        return res.status(401).json({
          message: 'Invalid password',
          success: false,
        });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      return res.status(200).json({
        token,
        success: true,
        message: 'Admin logged in successfully',
        name: admin.name,
      });
    } catch (error) {
      console.error('Error logging in admin:', error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: error.message,
      });
    }
  },

  registerAdmin: async (req, res) => {
    try {
      await connectOnce();

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Name, email, and password are required',
          success: false,
        });
      }

      const existingAdmin = await Admin.findOne({ email });

      if (existingAdmin) {
        return res.status(400).json({
          message: 'Admin with this email already exists',
          success: false,
        });
      }

      const hashedPassword = await hashPassword(password);

      const newAdmin = new Admin({ name, email, password: hashedPassword });
      await newAdmin.save();

      return res.status(201).json({
        message: 'Admin registered successfully',
        success: true,
        newAdmin,
      });
    } catch (error) {
      console.error('Error registering admin:', error.message);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },

  getAllClients: async (req, res) => {
    try {
      await connectOnce();

      const users = await Users.find();

      res.status(200).json({
        users,
        success: true,
      });
    } catch (error) {
      console.log('get all clients:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
};

export default adminController;
