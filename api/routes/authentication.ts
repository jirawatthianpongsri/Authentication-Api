import { Router } from "express";
import { welcome , login , register , logoutUser , verify } from "../controllers/authentication";

const router = Router();

router.get('/',welcome);
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logoutUser);
router.post('/verify',verify);

export default router;
