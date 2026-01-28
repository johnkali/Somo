// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)!;

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/">Somo Blog</Link>
                </div>

                <div className="flex space-x-4">

                    {user ? (
                        <>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                            <Link to="/blogs" className="hover:underline">
                                Blogs
                            </Link>

                            <Link to="/blogs/create" className="hover:underline">
                                Create Blog
                            </Link>
                            <Link to="/saved" className="hover:underline">
                                Saved Blogs
                            </Link>
                            <Link to="/profile" className="hover:underline">
                                Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ): (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
