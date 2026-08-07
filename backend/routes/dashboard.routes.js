import { Router } from "express";
import { getAdminStats } from "../controllers/dashboard.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/stats", isLoggedIn, authorizeRoles("ADMIN"), getAdminStats);

export default router;
