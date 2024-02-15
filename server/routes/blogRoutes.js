import express from 'express';
import { googleAuth, signIn, signUp } from '../controllers/auth.js';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost } from '../controllers/blog.js';

const router = express.Router();

router.route('/create').post(verifyUser, createPost);

export default router;