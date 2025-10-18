import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signJwt } from "../utils/jwt.js";
import { sendMail } from "../utils/mail.js";
const prisma = new PrismaClient();

function generateRefCode() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export async function register(payload) {
  // payload: { name, email, reg_no, year, domain }
  const ref_code = generateRefCode();
  const user = await prisma.user.create({
    data: { ...payload, ref_code, status: "pending" }
  });
  // TODO: notify admin by email (sendMail)
  return { id: user.id, email: user.email, ref_code: user.ref_code, status: user.status };
}

export async function setPassword(ref_code, password) {
  const user = await prisma.user.findUnique({ where: { ref_code } });
  if (!user) throw new Error("Invalid reference code");
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password_hash: hash }
  });
  return true;
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "approved") throw new Error("Invalid credentials or not approved");
  const ok = user.password_hash ? await bcrypt.compare(password, user.password_hash) : false;
  if (!ok) throw new Error("Invalid credentials");
  const token = signJwt({ id: user.id, role: user.role, email: user.email });
  return token;
}
