import express from 'express';
import User from '../models/Users.js';
import  bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';


const router = express.Router();

//Register user
router.post('/register', async (req, res) => {

    try {
        console.log("REQ BODY:", req.body);

        const { firstName, secondName, email, password } = req.body;

        //Basic validation | Prevent empty submission
        if(!firstName || !secondName || !email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        //Check if user already exists
        const userExists = await User.findOne({ email: email });
        if(userExists) {
            return res.status(400).json({message: 'Email already registered!'});
        }

        //Hash password
        const hashedPassword =  await bcrypt.hash(password, 10);

        //create user | save data to db
        const user =  await User.create({
            firstName: firstName,
            secondName: secondName,
            email,
            password: hashedPassword,
        });

        //respond to FE
        res.status(200).json({
            message: 'User successfully registered!',
            userId: user.id,
        });
    }catch(err) {
    res.status(500).json({message: err.message});
    }
})


//Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        // validate
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required!'});
        }

        //find user
        const userExist =  await User.findOne({email});
        if(!userExist) {
            return res.status(400).json({message: 'Invalid email or password-E!'});
        }

        //compre passwords
        const isMatch = await  bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid email or password-P!'});
        }
        const JWT_SECRET="supersecretkey123"

        //generate jtw
        const token = jwt.sign(
            {id: user._id},
            JWT_SECRET,
            {expiresIn: "1d"},
    )

        //return token + user info
        res.status(200).json({
            message: 'User successfully logged in successfully!',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                secondName: user.secondName,
                email: user.email
            }
        });
    }catch(err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({message: "Internal server error!"});
    }
})

export default router;
