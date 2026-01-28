import { useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";
import {useContext} from "react";

function Navbar() {
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/login", {replace: true}); //force redirect
}
    return (
        <nav>
            <h1>Somo Blogs</h1>
            <div>
                {user ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
