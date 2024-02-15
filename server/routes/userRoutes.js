import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser, updateUser } from '../controllers/user.js';

const router = express.Router();

router.route('/update/:userId').put(verifyUser, updateUser);
router.route('/delete/:userId').delete(verifyUser, deleteUser);

export default router;