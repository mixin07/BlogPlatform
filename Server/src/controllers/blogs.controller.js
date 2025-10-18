import * as blogsService from "../services/blogs.service.js";

export async function createDraft(req, res, next) {
  try {
    const authorId = req.user.id;
    const payload = req.body;
    const blog = await blogsService.createDraft(authorId, payload);
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
}

export async function editDraft(req, res, next) {
  try {
    const authorId = req.user.id;
    const { id } = req.params;
    const payload = req.body;
    const updated = await blogsService.editDraft(authorId, id, payload);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function submitForReview(req, res, next) {
  try {
    const authorId = req.user.id;
    const { id } = req.params;
    await blogsService.submitForReview(authorId, id);
    res.json({ message: "Submitted for review" });
  } catch (err) {
    next(err);
  }
}

export async function getMyBlogs(req, res, next) {
  try {
    const authorId = req.user.id;
    const blogs = await blogsService.getByAuthor(authorId);
    res.json(blogs);
  } catch (err) {
    next(err);
  }
}
