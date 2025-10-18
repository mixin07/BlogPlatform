import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendMail(to, subject, text) {
  // Basic stub — configure properly before use
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });

  return info;
}
