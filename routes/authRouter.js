import express from "express";
import { signInController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", signInController);

export default router;
