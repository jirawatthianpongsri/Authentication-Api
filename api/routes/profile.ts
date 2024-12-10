import { Router } from "express";
import { ResetPassword } from "../controllers/profile";
const router = Router();

router.post('/reset-password',ResetPassword);

export default router;