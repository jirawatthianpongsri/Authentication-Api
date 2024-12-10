import express from 'express';
import { getUser , getMe } from '../controllers/user';

import profile from './profile';

const router = express.Router();

router.post("/get/:id",getUser);
router.post("/me",getMe);
router.use("/profile/",profile);

export default router;