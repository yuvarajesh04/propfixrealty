const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const locationRoutes = require('./routes/locationRoutes')
const path = require('path');

// Create an instance of Express
const app = express();

// Middleware
app.use(cors({
  origin: ['https://propfixrealty.com', 'https://www.propfixrealty.com', '*']
}));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/location', locationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

function startServer() {
    // Connect to the database
    connectDB();

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Start the server
startServer();

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");

// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const projectRoutes = require("./routes/projectRoutes");

// // Create an instance of Express
// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://propfixrealty.com",
//       "https://www.propfixrealty.com",
//     ],
//   })
// );
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // ✅ Connect to DB (cached)
// let isConnected = false;
// async function connectOnce() {
//   if (!isConnected) {
//     await connectDB();
//     isConnected = true;
//     console.log("✅ MongoDB connected (cached)");
//   }
// }

// // ✅ Wrap Express in Vercel handler
// app.use(async (req, res, next) => {
//   await connectOnce();
//   next();
// });

// // ❌ Don't use app.listen()
// // ✅ Export for Vercel
// module.exports = app;
