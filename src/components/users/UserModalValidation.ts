import { z } from "zod";

export const userModalSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    username: z
        .string()
        .nonempty("Email is required"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),
    passwordconfirm: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),
});
