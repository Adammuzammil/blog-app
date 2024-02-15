import express from 'express';
import { googleAuth, signIn, signUp } from '../controllers/auth.js';

const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google_auth", googleAuth)

export default router;