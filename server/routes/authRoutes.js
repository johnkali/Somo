import express from 'express';
import User from '../models/Users.js';
import  bcrypt from 'bcryptjs';
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

export default router;
