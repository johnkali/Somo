import express from 'express';
import Blogs from '../models/Blogs.js';
import {protect} from '../middleware/authMiddleware.js'
import Users from "../models/Users.js";

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
        const blog = await Blogs.create({
            title,
            content,
            image,
            author: req.user._id, //comes from token that we received from FE via the authMiddleware
        });

        //attach blog to user
        await Users.findByIdAndUpdate(req.user.id,{
            $push: {blogs: blog._id},
        })

        res.status(200).json(blog); //will use later to display this returned blog to users/homepage
    }catch(err) {
        console.error("CREATE BLOG ERROR",err);
        res.status(500).json({message: "Internal Server Error"});
    }
})

//Get blogs from db
router.get("/", protect,async (req, res) => {
    try {
        const blogs = await Blogs.find()
            .populate("author", "firstName") //get author details
            .sort({createdAt: -1}); // newest first
        // console.log(blogs);
        res.json(blogs);
    }catch(err) {
        console.error("FETCH BLOG ERROR",err);
        res.status(500).send({message: "Failed to fetch blogZZ"});
    }
})

router.get("/:id", protect, async (req, res) => {
    try {
        const blog = await  Blogs.findById(req.params.id);
        if (!blog) {
            return res.status(404).json("No blog found!");
        }
        res.status(200).json(blog);

    }catch (error){
        console.error("FETCH BLOG ERROR",error);
        res.status(500).json({message: "Server Error"});
    }

})


export default router;

