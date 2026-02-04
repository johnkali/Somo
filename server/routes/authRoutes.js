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
// GET /users/profile
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
            .populate("favorites") // <-- populates the full blog objects
            .populate("blogs");    // optional: blogs created by user

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            firstName: user.firstName,
            secondName: user.secondName,
            email: user.email,
            favorites: user.favorites, // now full blog objects
            blogs: user.blogs || [],
            lastLogin: user.lastLogin,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


//Toggle save/unsave blog
router.post("/favorites/:blogId", protect, async (req, res) => {
    try {
        const userId = req.user.id;
        let {blogId} = req.params;
        if(!blogId) {
            return res.status(400).json({message: 'Blog ID is required!'});
        }

        blogId = blogId.toString();

        const user  =  await Users.findById(userId);

        if (!user) {
            return res.status(404).send("No user found!");
        }

        if (!Array.isArray(user.favorites)) user.favorites = [];

        const isSaved = user.favorites.includes(blogId);

        if (isSaved) {
            // unsave
            user.favorites = user.favorites.filter((fav) => fav !== blogId);
            await user.save();
            return res.status(200).json({ message: "Blog Unsaved!", favorites: user.favorites });
        } else {
            // save
            user.favorites.push(blogId);
            await user.save();
            return res.status(200).json({ message: "Blog Saved!", favorites: user.favorites });
        }

    }catch (error) {
        console.error("SAVE BLOG ERROR",error);
        res.status(500).json({message: "Server Error"});
    }
})

export default router;
