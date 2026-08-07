import { Router } from "express";
import {
  enrollInCourse,
  getMyCourses,
  markLectureComplete,
  getCertificate,
} from "../controllers/enrollment.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/my-courses", isLoggedIn, getMyCourses);
router.post("/enroll/:courseId", isLoggedIn, enrollInCourse);
router.put(
  "/progress/:courseId/:lectureId",
  isLoggedIn,
  markLectureComplete
);
router.get("/certificate/:courseId", isLoggedIn, getCertificate);

export default router;
