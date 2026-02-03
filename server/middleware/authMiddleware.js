import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

const JWT_SECRET = "supersecretkey123"; //rem to move to env later


//this protect is will allow certain pages to only be accessed when the auth token is available

export const protect = async (req, res, next) => {
   let token;
   if (
       req.headers.authorization &&
       req.headers.authorization.startsWith("Bearer ")
   ) {
       try {
           token = req.headers.authorization.split(" ")[1];
           const decoded = jwt.verify(token, JWT_SECRET);
           req.user = await Users.findById(decoded.id).select("-password");
           next();
       } catch (error) {
           return res.status(401).json({message: "Not Authorized, token failed"});
       }
   }
}

