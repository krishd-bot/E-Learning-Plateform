import { Router } from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlist.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", isLoggedIn, getWishlist);
router.put("/:courseId", isLoggedIn, toggleWishlist);

export default router;
