import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createComment, getComment } from '../controllers/comment.js';

const router = express.Router();

router.route('/create').post(verifyUser, createComment);
router.get('/getcomment/:postId', getComment);

export default router;