import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You must be logged in to create a blog");
                return;
            }

            await api.post(
                "/blogs",
                { title, content, image },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // redirect to home after success
            navigate("/");
        } catch (error: any) {
            console.error("CREATE BLOG ERROR:", error.response?.data || error);
            alert("Failed to create blog");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Create New Blog
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter blog title"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://picsum.photos/seed/picsum/200/300"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={6}
                            placeholder="Write your blog content here..."
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
                    >
                        Publish Blog
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreateBlog;
