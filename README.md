# Full-Stack Blogs Platform (React + Express)

A modern full-stack blog application built using **React** on the frontend and **Express.js** on the backend.  
The platform supports authentication, blog management, user interactions, and content from external APIs.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes (only logged-in users can create, comment, save, or star blogs)

### 📝 Blogs Management
- Create, edit, and delete blogs
- Fetch blogs from external public blog APIs
- Store user-created blogs in the database
- View single blog details page

### 💬 Interactions
- Comment on blogs
- Star (like) blogs
- Save blogs to user profile

### 👤 User Profile
- View saved blogs
- View authored blogs
- Display basic contact/user information

### 🔍 Discoverability
- Search blogs by title or keyword
- Pagination for blog listings

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios / Fetch API
- Context API or Redux (for auth state)
- CSS / Tailwind / Styled Components (optional)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose) or PostgreSQL
- JWT for authentication
- bcrypt for password hashing

---

## 🗂 Project Structure

Somo/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── services/
│ │ └── App.jsx
│
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
│
└── README.md