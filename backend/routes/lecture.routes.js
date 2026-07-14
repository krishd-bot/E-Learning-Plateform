import { Router } from "express";
import {
  addLecture,
  getLectures,
  deleteLecture,
} from "../controllers/lecture.controller.js";

import {
  isLoggedIn,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/:courseId",
  isLoggedIn,
  getLectures
);

router.post(
  "/:courseId",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  addLecture
);

router.delete(
  "/:courseId/:lectureId",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  deleteLecture
);

export default router;