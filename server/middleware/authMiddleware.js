const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: no token provided",
      });
    }

    const token = header.split(" ")[1]; // Extract token

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    console.log(decoded)

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
