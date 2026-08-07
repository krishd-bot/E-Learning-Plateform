import { Router } from "express";
import {
  getCourseLectures,
  addLectureToCourse,
  updateCourseLecture,
  deleteCourseLecture,
} from "../controllers/lecture.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:id", isLoggedIn, getCourseLectures);
router.post("/:id", isLoggedIn, authorizeRoles("ADMIN"), addLectureToCourse);
router.put(
  "/:id/:lectureId",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  updateCourseLecture
);
router.delete(
  "/:id/:lectureId",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  deleteCourseLecture
);

export default router;
