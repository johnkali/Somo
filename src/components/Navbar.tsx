import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";
import {useContext} from "react";

function Navbar() {
const { user, setUser } = useContext(AuthContext);
const navigate = useNavigate();

const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login", { replace: true }); //force redirect
};
    return (
        <nav>
            <h1>Somo Blogs</h1>
            <div>
                {user ? (
                    <>
                        <Link to="/">Home</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
