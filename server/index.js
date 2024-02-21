import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

//