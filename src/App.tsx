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
import Layout from "./components/Layout.tsx";

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
                            <Layout>
                                <Home />
                            </Layout>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoutes>
                            <Layout>
                            <Blogs />
                            </Layout>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/blogs/create"
                    element={
                        <ProtectedRoutes>
                            <Layout>
                            <CreateBlog />
                            </Layout>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/saved"
                    element={
                        <ProtectedRoutes>
                            <Layout>
                            <SavedBlogs />
                            </Layout>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoutes>
                            <Layout>
                            <Profile />
                            </Layout>
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
