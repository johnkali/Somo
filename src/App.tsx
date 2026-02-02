// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import SavedBlogs from "./pages/SavedBlogs";
import Profile from "./pages/Profile";
import BlogDetails from "./pages/BlogDetails.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Protected Routes */}
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
                <Route
                path="/blogs/:source/:id"
                element={
                    <ProtectedRoutes>
                        <Layout>
                            <BlogDetails/>
                        </Layout>
                    </ProtectedRoutes>
                }/>

                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Layout>
                                <Login />
                            </Layout>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Layout>
                                <Register />
                            </Layout>
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
