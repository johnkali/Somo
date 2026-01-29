import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";


dotenv.config()
connectDB();

const app = express();

//CORS middleware - must always come before routes
//Express set up
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, //needed later for cookies and JWT
}));
// app.options("*", cors());

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





