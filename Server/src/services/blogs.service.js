import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createDraft(authorId, payload) {
  const blog = await prisma.blog.create({
    data: {
      title: payload.title,
      content: payload.content,
      links: payload.links || null,
      author_id: authorId,
      status: "draft"
    }
  });
  return blog;
}

export async function editDraft(authorId, id, payload) {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) throw new Error("Blog not found");
  if (blog.author_id !== authorId) throw new Error("Not authorized");
  if (blog.status !== "draft") throw new Error("Can only edit drafts");
  const updated = await prisma.blog.update({
    where: { id },
    data: { title: payload.title, content: payload.content, links: payload.links || null }
  });
  return updated;
}

export async function submitForReview(authorId, id) {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog || blog.author_id !== authorId) throw new Error("Not authorized or not found");
  await prisma.blog.update({ where: { id }, data: { status: "pending_review" } });
  return true;
}

export async function getByAuthor(authorId) {
  return prisma.blog.findMany({ where: { author_id: authorId } });
}
