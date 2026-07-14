import { Router } from "express";
import {
  register,
  login,
  getMyCourses,
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/my-courses", isLoggedIn, getMyCourses);

export default router;