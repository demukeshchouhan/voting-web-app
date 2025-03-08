import { z } from "zod";

export const clashSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "Title must be 3 characters long" })
    .max(60, { message: "Title must be less than 60 characters" }),

  description: z
    .string({
      message: "Description is required",
    })
    .min(20, {
      message: "Description must be 20 characters long",
    })
    .max(1000, {
      message: "Description must be less than 1000 characters",
    }),

  expire_at: z
    .string({
      message: "Expire at is required",
    })
    .min(5, {
      message: "Please pass correct data",
    }),
  image: z.string().optional(),
});
