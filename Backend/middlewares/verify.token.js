require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.cookies?.token; // Assuming you named the cookie "token"

  if (!token) {
    return res.status(401).json({ error: "No token provided in cookies" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
