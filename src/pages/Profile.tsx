import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

interface Blog {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
    source: string;
}

const Profile = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    const [favorites, setFavorites] = useState<Blog[]>([]);
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) return;
            try {
                // Fetch user profile info including blogs and favorites
                const res = await api.get("/users/profile");
                const profileData = res.data;

                // Normalize blogs and favorites to ensure IDs and sources
                const normalizeBlog = (blog: any): Blog => ({
                    id: blog._id?.toString() || blog.id?.toString() || new Date().getTime().toString(),
                    title: blog.title || "Untitled",
                    content: blog.content || "",
                    image: blog.image || "https://picsum.photos/seed/picsum/200/300",
                    author: blog.author?.firstName || blog.author || "Unknown",
                    date: blog.createdAt || blog.date || new Date().toISOString(),
                    source: blog.source || "mongo",
                });

                setFavorites((profileData.favorites || []).map(normalizeBlog));
                setUserBlogs((profileData.blogs || []).map(normalizeBlog));
            } catch (err) {
                console.error("Failed to fetch profile data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700">You must be logged in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gray-900 text-white py-8">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-2">Profile</h1>
                    <p className="text-gray-300">
                        Welcome, {user.firstName} {user.secondName}
                    </p>
                </div>
            </header>

            {/* User Info */}
            <section className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                <ul className="text-gray-700 space-y-2">
                    <li>
                        <strong>Email:</strong> {user.email}
                    </li>
                    <li>
                        <strong>First Name:</strong> {user.firstName}
                    </li>
                    <li>
                        <strong>Second Name:</strong> {user.secondName}
                    </li>
                    <li>
                        <strong>Number of Blogs:</strong> {userBlogs.length}
                    </li>
                    <li>
                        <strong>Last Login:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                    </li>
                </ul>
            </section>

            {/* Favorites */}
            <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Saved Blogs</h2>
                {loading ? (
                    <p>Loading favorites...</p>
                ) : favorites.length === 0 ? (
                    <p className="text-gray-500">You have no saved blogs yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((blog) => (
                            <article
                                key={`${blog.source}-${blog.id}`}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                            >
                                <img src={blog.image} alt={blog.title} className="h-40 w-full object-cover" />
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        By {blog.author} • {new Date(blog.date).toLocaleDateString()}
                                    </p>
                                    <Link
                                        to={`/blogs/${blog.source}/${blog.id}`}
                                        className="mt-auto text-blue-600 hover:underline font-medium"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* User Blogs */}
            <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Your Blogs</h2>
                {loading ? (
                    <p>Loading your blogs...</p>
                ) : userBlogs.length === 0 ? (
                    <p className="text-gray-500">You haven't created any blogs yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {userBlogs.map((blog) => (
                            <article
                                key={`${blog.source}-${blog.id}`}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                            >
                                <img src={blog.image} alt={blog.title} className="h-40 w-full object-cover" />
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        By {blog.author} • {new Date(blog.date).toLocaleDateString()}
                                    </p>
                                    <Link
                                        to={`/blogs/${blog.source}/${blog.id}`}
                                        className="mt-auto text-blue-600 hover:underline font-medium"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Profile;
