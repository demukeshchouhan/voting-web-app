import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be 3 characters long" }),

    email: z.string({ message: "Email is required" }).email({
      message: "Please provide correct email",
    }),

    password: z
      .string({
        message: "Password is required",
      })
      .min(6, {
        message: "Password must be 6 characters long",
      }),

    confirm_password: z
      .string({
        message: "Confirm Password is required",
      })
      .min(6, {
        message: "Confirm Password must be 6 characters long",
      }),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Confrm password not matched",
      path: ["confirm_password"],
    }
  );

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email must be in correct format" }),
  password: z.string({
    message: "Password is required",
  }),
});
