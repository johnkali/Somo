import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from '../services/api.ts'



const BlogDetails = () => {
        const {id, source} =  useParams();
        const [blog, setBlog] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBlog =  async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You must be logged in to create a blog");
                return;
            }
            try{


                setLoading(true);
                if (source === "mongo"){
                    const res =  await api.get(`/blogs/${id}`)
                    console.log(res);
                    setBlog(res.data);
                }else if (source === "external"){
                    const res =  await fetch(`https://dev.to/api/articles/${id}`);
                    const data  =  await res.json();
                    setBlog(data);
                }
            }catch (error) {
                console.error("Failed to fetch blog",error);
            }finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id, source]);

    if(loading){return <p className="text-center mt-10">Loading...</p>}
    if(!blog) return <p>Blog not found</p>

    return (
        <article className="max-w-4xl mx-auto py-10 space-y-6">
            <h1 className="text-4xl font-bold">{blog.title}</h1>

            <p className="text-gray-500">
                By {blog.author?.firstName || blog.user?.name} • {" "}
                {new Date(blog.createdAt || blog.publishedAt
                ).toLocaleDateString()}
            </p>

                {blog.image || blog.cover_image ? (
                    <img src={blog.image || blog.cover_image} alt="" className="w-full h-[500px] object-cover rounded-xl"/>
                ): null}  {/* Add dummy image toa null   */}

           <div className="prose max-w-none">
               {blog.content || blog.body_markdown}
           </div>
        </article>
    );
};

export default BlogDetails;