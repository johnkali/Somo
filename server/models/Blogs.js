import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: '',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' //link to users collection
        },
    },
    { timestamps: true } //add createdAt & UpdatedAt
);
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;