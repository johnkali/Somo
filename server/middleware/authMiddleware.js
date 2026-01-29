import jwt from 'jsonwebtoken';
import User from './models/User';

const JWT_SECRET = "supersecretkey123"; //rem to move to env later


//this protect is will allow certain pages to only be accessed when the auth token is available

export  const protect = async (req, res, next) => {
   try{
       const token = req.headers.authorization?.split(' ')[1];

       if (!token) {
           return res.status(401).json({message: 'Not authorized'});
       }

       const decoded = jwt.verify(token, JWT_SECRET);

       req.user = await User.findById(decoded.id).select("-password");
       next();
   } catch (error){
    res.status(401).json({message: 'Invalid token'});
   }
}