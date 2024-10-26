import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter your email address",
  }),
  password: z.string().min(4, { message: "Password is required" }),
});

export const Registerschema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 6 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});
