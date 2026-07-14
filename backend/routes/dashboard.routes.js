import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  getDashboardStats
);

export default router;