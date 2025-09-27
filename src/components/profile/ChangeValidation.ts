import z from "zod";

export const changeSchema = z
    .object({
        Opassword: z.string().nonempty("Old password is required"),
        Npassword: z.string().min(8, "Password must be at least 8 characters"),
        Cpassword: z.string().nonempty("Confirm password is required"),
    })