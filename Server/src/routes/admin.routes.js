import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.js";
import { ensureAdmin } from "../middleware/role.js";

const router = express.Router();

// admin-only routes
router.use(authenticate);
router.use(ensureAdmin);

router.get("/users/pending", adminController.listPendingUsers);       // GET /api/admin/users/pending
router.patch("/users/:id/approve", adminController.approveUser);      // PATCH /api/admin/users/:id/approve

router.get("/blogs", adminController.listPendingBlogs);               // GET /api/admin/blogs
router.patch("/blogs/:id/approve", adminController.approveBlog);      // PATCH /api/admin/blogs/:id/approve
router.patch("/blogs/:id/reject", adminController.rejectBlog);        // PATCH /api/admin/blogs/:id/reject

export default router;
