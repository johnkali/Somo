import express from 'express';
import Blogs from '../models/Blogs.js';
import {protect} from '../middleware/authMiddleware.js'
import Users from "../models/Users.js";

const router = express.Router();


//Create Blogs
router.post("/", protect, async (req, res) => {
    try {
        const {title, content, image, visibility} = req.body;

        //validate
        if (!title || !content || !image) {
            return res.status(401).send("All fields are required!");
        }
        // create blog -> DB
        const blog = await Blogs.create({
            title,
            content,
            image,
            visibility: visibility || "public",
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
            .populate("comments.user", "firstName")  //add comments to users
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


router.post("/:id/comments", protect, async(req, res)=> {
    try{
        const {text} = req.body;
    

        if(!text){
            return res.status(400).json({message: "Comment text us required"})
        }
        //check is comment is empty

        const blog =  await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message: "Blog not found!"});
        }
        //check is blog exists

        //save blog
        blog.comments.push({
            user: req.user.id,
            text
        });

        await blog.save();
        res.status(201).json({
            message: "Comment added successfully",
            comment: blog.comments,
        });

    }catch(error){
        console.error("ADD COMMENT ERROR: ", error);
        res.status(500).json({message: "Failed to add comment" });
    }
})

router.delete("/blogId/comments/:commentId", protect, async(req, res)=>{
    try{
        const {blogId, commentId} = req.params;

        const blog  =  await Blogs.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found!"})
        }

        const comment =  blog.comments.id(commentId);
        if(!comment){
            return res.status(404).json({message: "Comment not found!"})
        }

        //ownership check
        if(comment.user.toString() !== req.user.id){
            return res.status(403).json({message: "Now Allowed!"})
        }

        //Remove comment
        comment.deleteOne();

        await blog.save();

        res.json({message: "Comment deleted!", comments: blog.comments })
    }catch(error){
        console.error("DELETE COMMENT ERROR", error);
        res.status(500).json({message: "Server error"})
    }
})


export default router;

