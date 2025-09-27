import { z } from "zod";

export const userSchema = z.object({
    username: z
        .string()
        .nonempty("Name is required"),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
});
