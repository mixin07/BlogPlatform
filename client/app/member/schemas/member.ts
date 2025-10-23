import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  dateJoined: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
  status: z.enum(["active", "inactive", "pending"]),
});

export type MemberFormValues = z.infer<typeof memberSchema>;
