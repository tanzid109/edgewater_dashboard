import { z } from "zod";

export const userModalSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    username: z
        .string()
        .nonempty("Email is required"),
});
