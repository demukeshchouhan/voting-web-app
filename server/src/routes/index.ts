import { Router } from "express";
import authRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import passwordRoutes from "./passwordRoutes.js";
import clashRoutes from "./clashRoutes.js";
import { authLimiter } from "../config/rateLimit.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/auth", passwordRoutes);
router.use("/", verifyRoutes);
router.use("/api/clash", authMiddleware, clashRoutes);

export default router;
