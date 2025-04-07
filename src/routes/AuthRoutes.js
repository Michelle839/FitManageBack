import { Router } from "express";
import { login } from "../controllers/AuthController.js";
import { forgotPassword } from "../controllers/PasswordController.js";
import { resetPassword } from "../controllers/ResetPasswordController.js";
const router = Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
