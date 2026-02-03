import express from 'express';
import Users from '../models/Users.js';
import Blogs from '../models/Blogs.js';
import  bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import {protect} from '../middleware/authMiddleware.js'


const router = express.Router();

//Register user controller
router.post('/register', async (req, res) => {

    try {
        console.log("REQ BODY:", req.body);

        const { firstName, secondName, email, password } = req.body;

        //Basic validation | Prevent empty submission
        if(!firstName || !secondName || !email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        //Check if user already exists
        const userExists = await Users.findOne({ email: email });
        if(userExists) {
            return res.status(400).json({message: 'Email already exists!'});
        }

        //Hash password
        const hashedPassword =  await bcrypt.hash(password, 10);

        //create user | save data to db
        const user =  await Users.create({
            firstName: firstName,
            secondName: secondName,
            email,
            password: hashedPassword,
        });



        //return jws along with created user
        const JWT_SECRET="supersecretkey123"

        const token = jwt.sign({id: user._id}, JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(201).json({
            message: 'User successfully registered!',
            user: {
                _id: user._id,
                firstName: user.firstName,
                secondName: user.secondName,
                email: user.email,
            },
            token,
        });


    }catch(err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
})


//Login user controller
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        //find user
        const foundUser =  await Users.findOne({ email });
        if(!foundUser) {
            return res.status(400).json({message: 'Invalid email or password-E!'});
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid email or password-P!'});
        }

        const JWT_SECRET="supersecretkey123"

        //generate jtw
        const token = jwt.sign(
            {id: foundUser._id},
            JWT_SECRET,
            {expiresIn: "1d"},
    )

        //return token + user info
        res.status(201).json({
            user: {
                _id: foundUser._id,
                firstName: foundUser.firstName,
                secondName: foundUser.secondName,
                email: foundUser.email
            },token,
        });
    }catch(err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({message: "Internal server error!"});
    }
})

//GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
    try {
        //get user info
        const user =  await Users.findById(req.user.id)
            .select("-password")
                .populate("favorites");

        //get blogs created by user
        const blogs = await Blogs.find({author: req.user.id}).sort({ createdAt: -1 });
        res.json({
            user,
            blogs,
            blogCount: blogs.length,
        });
    }catch(err) {
        console.error("PROFILE ERROR:", err);
        res.status(500).json({message: "Internal server error!"});
    }
})

export default router;
