import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No token → continue as guest
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
    };
  } catch (err) {
    console.log("Invalid token. Continuing as guest.");
  }

  next();
};

export default optionalAuth;
