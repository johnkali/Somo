import express from 'express';
import Blog from '../models/Blogs.js';
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();


//Create Blog
router.post("/", protect, async (req, res) => {
    try {
        const {title, content, image} = req.body;

        //validate
        if (!title || !content || !image) {
            return res.status(401).send("All fields are required!");
        }
        // create blog -> DB
        const blog = await Blog.create({
            title,
            content,
            image,
            author: req.user._id, //comes from token that we received from FE via the authMiddleware
        });

        res.status(200).send(blog); //will use later to display this returned blog to users/homepage
    }catch(err) {
        console.error("CREATE BLOG ERROR",err);
        res.status(500).send({message: "Internal Server Error"});
    }
})

export default router;

