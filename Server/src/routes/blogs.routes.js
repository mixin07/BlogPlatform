import express from "express";
import * as blogsController from "../controllers/blogs.controller.js";
import { authenticate } from "../middleware/auth.js";
import { ensureMember } from "../middleware/role.js";

const router = express.Router();

// public? (if any public endpoints needed, add here)
// member endpoints (require auth + member role)
router.use(authenticate);
router.post("/", ensureMember, blogsController.createDraft);          // POST /api/blogs
router.patch("/:id", ensureMember, blogsController.editDraft);         // PATCH /api/blogs/:id
router.post("/:id/submit", ensureMember, blogsController.submitForReview); // POST /api/blogs/:id/submit
router.get("/my", ensureMember, blogsController.getMyBlogs);           // GET /api/blogs/my

export default router;
