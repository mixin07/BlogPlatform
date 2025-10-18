import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

// note: mounted at /api/auth
router.post("/register", authController.register);
router.post("/set-password", authController.setPassword);
router.post("/login", authController.login);

export default router;
