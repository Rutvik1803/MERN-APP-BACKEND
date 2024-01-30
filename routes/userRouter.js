import express from "express";
import {
  addRemoveUserFriendsController,
  getUserDetailsController,
  getUserFriendsController,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUserDetailsController);
router.get("/:id/friends", verifyToken, getUserFriendsController);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveUserFriendsController);

export default router;
