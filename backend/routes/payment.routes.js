import { Router } from "express";

import {
    buyCourse,
    getPaymentHistory
} from "../controllers/payment.controller.js";

import {
    isLoggedIn
} from "../middleware/auth.middleware.js";

const router = Router();

// Buy a course
router.post(
    "/buy",
    isLoggedIn,
    buyCourse
);

// Get logged-in user's payment history
router.get(
    "/history",
    isLoggedIn,
    getPaymentHistory
);

export default router;