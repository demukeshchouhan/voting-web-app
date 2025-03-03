import { Router } from "express";
import authRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import passwordRoutes from "./passwordRoutes.js";
import { authLimiter } from "../config/rateLimit.js";

const router = Router();

router.use("/api/auth", authLimiter, authRoutes);
router.use("/api/auth", authLimiter, passwordRoutes);
router.use("/", authLimiter, verifyRoutes);

export default router;
