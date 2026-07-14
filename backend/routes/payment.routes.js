import { Router } from "express";
import {
  buyCourse,
  getPaymentHistory,
} from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/buy", isLoggedIn, buyCourse);

router.get("/history", isLoggedIn, getPaymentHistory);

export default router;