import axios from "axios";

//url to get external blog posts to our home

const BLOG_API_URL =  "https://jsonplaceholder.typicode.com/";

export const  getExternalBlogs = async () => {
    const response = await axios.get(`${BLOG_API_URL}/posts`);
    return response.data;
}