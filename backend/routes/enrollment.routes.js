import { Router } from "express";

import {
  enrollCourse,
} from "../controllers/enrollment.controller.js";

import {
  isLoggedIn,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/:courseId",
  isLoggedIn,
  enrollCourse
);

export default router;