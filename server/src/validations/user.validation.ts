import { Role } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .min(1, { message: "Password is required" })
    .max(20, { message: "Password must be atmost 20 characters long" }),
  role: z.enum([Role.EMPLOYEE], {
    message: "Role must be EMPLOYEE",
  }),
});