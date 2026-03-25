import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api.ts";

const BlogDetails = () => {
  const { id, source } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");

 
    const fetchBlog = async () => {
      // const token = localStorage.getItem("token");
      //
      // if (!token) {
      //     alert("You must be logged in to create a blog");
      //     return;
      // }
      try {
        setLoading(true);
        if (source === "mongo") {
          const res = await api.get(`/blogs/${id}`);
          console.log(res);
          setBlog(res.data);
        } else if (source === "external") {
          const res = await fetch(`https://dev.to/api/articles/${id}`);
          const data = await res.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        setLoading(false);
      }
    };

     useEffect(() => {
    fetchBlog();
  }, [id, source]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (!blog) return <p>Blog not found</p>;

  const handleAddComment = async () => {
    try {
      await api.post(`/blogs/${id}/comments`, {
        text: commentText,
      });

      setCommentText("");
      fetchBlog(); // re-fetch blog to show new comment
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <article className="max-w-4xl mx-auto py-10 space-y-6">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <p className="text-gray-500">
          By {blog.author?.firstName || blog.user?.name} •{" "}
          {new Date(blog.createdAt || blog.publishedAt).toLocaleDateString()}
        </p>
        {blog.image || blog.cover_image ? (
          <img
            src={blog.image || blog.cover_image}
            alt=""
            className="w-full h-[500px] object-cover rounded-xl"
          />
        ) : null}{" "}
        {/* Add dummy image toa null   */}
        <div className="prose max-w-none">
          {blog.content || blog.body_markdown}
        </div>
        <div className="mt-8">
          <h3 className="text-xl front-semibold mb-4">Add a comment</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your comment..."
            className="w-full boarder rounded-lg p-3 mb-3"
          />

          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {blog?.comments?.length === 0 && (
            <p className="text-gray-500">No comments yet</p>
          )}

          {blog?.comments?.map((comment: any) => (
            <div key={comment._id} className="boarder-b py-3">
              <p className="font-medium">{comment.user?.firstName}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
