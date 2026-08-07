import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  removeCourse,
  addReview,
  deleteReview,
} from "../controllers/course.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post(
  "/",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);
router.put(
  "/:id",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  upload.single("thumbnail"),
  updateCourse
);
router.delete("/:id", isLoggedIn, authorizeRoles("ADMIN"), removeCourse);

router.post("/:id/reviews", isLoggedIn, addReview);
router.delete("/:id/reviews", isLoggedIn, deleteReview);

export default router;
