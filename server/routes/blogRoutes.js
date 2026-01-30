import express from 'express';
import Blog from '../models/Blogs.js';
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();


//Create Blogs
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

//Get blogs from db
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "firstName") //get author details
            .sort({createdAt: -1}); // newest first
        // console.log(blogs);
        res.json(blogs);
    }catch(err) {
        console.error("FETCH BLOG ERROR",err);
        res.status(500).send({message: "Failed to fetch blogZZ"});
    }
})

export default router;

