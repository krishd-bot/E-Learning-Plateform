import { Router } from "express";
import { checkout, verifyPayment } from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/checkout", isLoggedIn, checkout);
router.post("/verify", isLoggedIn, verifyPayment);

export default router;
