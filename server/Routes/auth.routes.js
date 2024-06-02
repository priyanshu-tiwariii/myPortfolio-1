import { Router } from "express";
import { verifyJWT } from "../Middleware/verifyJWT.js";
import { signIn,signUp,logout,refreshToken } from "../Controller/admin.controller.js";


const router = Router();

router.post('/signup', signUp);
router.post('/signIn', signIn);
router.post('/logout', verifyJWT, logout);
router.post('/refreshToken', refreshToken);
export default router;