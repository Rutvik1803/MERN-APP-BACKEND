import express from "express";

import { verifyToken } from "../middleware/verifyUser.js";
import {
  getPostsController,
  getUserPostsController,
  likePostController,
} from "../controllers/post.controller.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getPostsController);
router.get("/:userId", verifyToken, getUserPostsController);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePostController);

export default router;
