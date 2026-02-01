import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // 1️⃣ Get token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user ID to request
    req.user = decoded;

    next(); // pass control to next middleware/route
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
