"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine((email) => email.endsWith("@zod.com"), {
      message: "Email must be in '@zod.com' format",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, { message: "Password must be at least 10 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  if (data.password !== "12345") {
    return {
      fieldErrors: {
        password: ["Invalid password. Please try again."], // 사용자에게 보여줄 메시지
      },
    };
  }

  return { success: true };
}
