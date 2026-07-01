// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GuestRoute from "./components/GuestRoute.tsx";

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

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/blogs/:source/:id"
          element={
            <Layout>
              <BlogDetails />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Layout>
                <Login />
              </Layout>
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Layout>
                <Register />
              </Layout>
            </GuestRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
