import { PrismaClient } from "@prisma/client";
import { sendMail } from "../utils/mail.js";
const prisma = new PrismaClient();

export async function getPendingUsers() {
  return prisma.user.findMany({ where: { status: "pending" }, select: { id: true, name: true, email: true, ref_code: true } });
}

export async function approveUser(id) {
  const user = await prisma.user.update({ where: { id }, data: { status: "approved" } });
  // TODO: send activation email (link to set-password)
  await sendMail(user.email, "Account Approved", `Your account is approved. Use ref code ${user.ref_code} to set password.`);
  return true;
}

export async function getPendingBlogs() {
  return prisma.blog.findMany({ where: { status: "pending_review" }, include: { author: true } });
}

export async function approveBlog(id) {
  await prisma.blog.update({ where: { id }, data: { status: "published" } });
  return true;
}

export async function rejectBlog(id, reason) {
  await prisma.blog.update({ where: { id }, data: { status: "rejected" } });
  // optionally store reason in a separate table or notify author
  return true;
}
