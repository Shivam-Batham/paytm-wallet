import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
export function authMiddleware(req, res, next) {
  const authHeader = req.header.authorization;
  // check for authorization Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      success: false,
      message: 'Token missing' 
    });
  }
  try {

    const token = authHeader.split(" ")[1]; //get the token
    const decoded = jwt.verify(token, JWT_SECRET); // verify it
    console.log("decoded jwt : ", decoded);
    req.userId = decoded.userId;  // Attach userId to request object
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "unauthrized user",
    });
  }
}
