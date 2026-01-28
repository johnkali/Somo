import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import SavedBlogs from "./pages/SavedBlogs";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import PublicRoute from "./components/PublicRoute";

function App() {
    return (
        <BrowserRouter>
            {/* Navbar will be visible on all pages */}
            <Navbar />

            <Routes>
                {/* Protected routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <Home />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoutes>
                            <Blogs />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/blogs/create"
                    element={
                        <ProtectedRoutes>
                            <CreateBlog />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/saved"
                    element={
                        <ProtectedRoutes>
                            <SavedBlogs />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoutes>
                            <Profile />
                        </ProtectedRoutes>
                    }
                />

                {/* Public routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
