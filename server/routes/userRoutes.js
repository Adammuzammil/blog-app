import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser, getUser, signOut, updateUser } from '../controllers/user.js';

const router = express.Router();

router.route('/update/:userId').put(verifyUser, updateUser);
router.route('/delete/:userId').delete(verifyUser, deleteUser);
router.post('/signout', signOut);
router.get('/:userId', getUser);


export default router;