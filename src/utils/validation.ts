import { z } from "zod";

export const userValidationSchema = z.object({
    // name validation
    name: z
        .string({ message: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .trim(),

    // email validation
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim()
        .toLowerCase(),

    // password validation
    password: z
        .string({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password is too long" })
        .trim()
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});


