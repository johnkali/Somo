import jwt from 'jsonwebtoken';

//this protect is will allow certain pages to only be accessed when the auth token is available

export  const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach user info to the request
        next();
    }catch(err) {
        return res.status(401).json({message: "This is invalid or expired."});
    }
}