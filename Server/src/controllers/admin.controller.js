import * as adminService from "../services/admin.service.js";

export async function listPendingUsers(req, res, next) {
  try {
    const users = await adminService.getPendingUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function approveUser(req, res, next) {
  try {
    const { id } = req.params;
    await adminService.approveUser(id);
    res.json({ message: "User approved" });
  } catch (err) {
    next(err);
  }
}

export async function listPendingBlogs(req, res, next) {
  try {
    const blogs = await adminService.getPendingBlogs();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
}

export async function approveBlog(req, res, next) {
  try {
    const { id } = req.params;
    await adminService.approveBlog(id);
    res.json({ message: "Blog published" });
  } catch (err) {
    next(err);
  }
}

export async function rejectBlog(req, res, next) {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    await adminService.rejectBlog(id, reason);
    res.json({ message: "Blog rejected" });
  } catch (err) {
    next(err);
  }
}
