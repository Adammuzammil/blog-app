import express from 'express';
import { googleAuth, signIn, signUp } from '../controllers/auth.js';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, deletePost, getAll, updatepost } from '../controllers/blog.js';

const router = express.Router();

router.route('/create').post(verifyUser, createPost);
router.get('/getusers', getAll);
router.route('/deletepost/:postId/:userId').delete(verifyUser, deletePost);
router.route('/updatepost/:postId/:userId').put(verifyUser, updatepost);

export default router;