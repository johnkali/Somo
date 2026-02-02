import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
// import {getExternalBlogs} from "../services/BlogServices.ts";
import type {UnifiedBlog} from '../types/UnifiedBlog.ts';
import api from "../services/api.ts";


function Home() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [blogs, setBlogs] = useState<UnifiedBlog[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchBlogs = async ()=>{
           try{
                // 1. Fetch Mongo Blogs
                    const mongoRes = await api.get("/blogs");
                const mongoBlogs: UnifiedBlog[] = mongoRes.data.map((blog: any)=>({
                    id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    image: blog.image || "https://picsum.photos/seed/picsum/200/300",
                    author: blog.author?.firstName,
                    date: blog.createdAt,
                    source: "mongo",
                }));

                // 2. Fetch External Blogs
                const externalRes = await fetch(
                    "https://dev.to/api/articles?per_page=7"
                ); //from e blog services
                const externalData = await externalRes.json();
                console.log(externalData);

                const externalBlogs: UnifiedBlog[] = externalData.map((blog: any)=>({
                    id: blog.id.toString(),
                    title: blog.title,
                    content: blog.description,
                    image: blog.cover_image,
                    author: blog.user.name,
                    date: blog.published_at,
                    source: "external",
                }));

                //Merge
                setBlogs([...mongoBlogs, ...externalBlogs]);
            }catch (error){
                console.error("Failed to load blogs", error);
            }finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);


        return (
            <>
                {/* HERO SECTION */}
                <header className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Read. Learn. Build.
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Discover articles on web development, programming, and modern
                            software engineering practices.
                        </p>

                        {/* Search Bar (UI only) */}
                        <div className="max-w-md mx-auto relative">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}


                <main className="bg-gray-50 min-h-screen">
                    <section className="max-w-7xl mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold  mb-4">Welcome, {user.firstName}</h1>
                        <p className="text-gray-700">
                            Explore amazing blogs, create your own, and save your favorites.
                        </p>
                    </section>
                    <section className="max-w-7xl mx-auto px-4 py-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8">
                            Latest Articles
                        </h2>

                        {/* BLOG GRID */}
                        {loading ? (<p>Loading blogs...</p>):(

                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {blogs.map((blog) => (
                                    <article
                                        key={`${blog.source}-${blog.id}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                                    >
                                        {/* Blogs Image */}
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="h-48 w-full object-cover"
                                        />

                                        {/* Blogs Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <p className="text-sm text-gray-500 mb-2">
                                                By {user.author} • {" "}
                                                {new Date(blog.date).toLocaleDateString()}
                                            </p>

                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                {blog.title}
                                            </h3>

                                            <p className="text-sm font-normal text-gray-700 mb-4 ">{blog.content}</p>

                                            {/* Push button to bottom */}
                                            <div className="mt-auto">
                                                <Link
                                                    to={`/blogs/${blog.source}/${blog.id}`}
                                                    className="inline-block text-blue-600 font-medium hover:underline"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                    </section>
                </main>
            </>
        );
    };

    export default Home;
