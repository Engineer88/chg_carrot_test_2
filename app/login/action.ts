"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "../lib/db";
import getSession from "../lib/session";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
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
  } else {
    // if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    // log the user in
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          username: [],
          email: [],
        },
      };
    }
    // recirect "/profile"
  }

  return { success: true };
}
