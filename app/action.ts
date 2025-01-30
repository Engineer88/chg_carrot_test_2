"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string({
    required_error: "Password is required",
  }),
  username: z.string(),
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
