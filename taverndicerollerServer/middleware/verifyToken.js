const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // splits "Bearer token123" and grabs "token123"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attaches { id, email } to req.user for controllers to use

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
