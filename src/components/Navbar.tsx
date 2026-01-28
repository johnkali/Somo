import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const linkClass =
        "text-gray-600 hover:text-gray-900 transition-colors";

    const activeClass =
        "text-blue-600 font-semibold";

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-blue-600">
                    SomoBlog
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/blogs"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Blogs
                            </NavLink>

                            <NavLink
                                to="/blogs/create"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Write
                            </NavLink>

                            <NavLink
                                to="/saved"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Saved
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Profile
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? activeClass : linkClass
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
