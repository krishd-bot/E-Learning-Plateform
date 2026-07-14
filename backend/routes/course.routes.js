import { Router } from "express";

import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import {
  isLoggedIn,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

router.post(
  "/",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  createCourse
);

router.put(
  "/:id",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  updateCourse
);

router.delete(
  "/:id",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  deleteCourse
);

export default router;