"use server";
import prisma from "@/lib/prisma";
import { createSession, deleteSession, updateSession } from "@/lib/session";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/validations/auth";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
    select: {
      id: true, // returns the userId as the primary key
    },
  });

  const user = data;
  console.log("auth user", user);
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // TODO:
  // 4. Create user session
  const userId = user.id.toString();
  await createSession(userId);
  // 5. Redirect user
  redirect("/profile");
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const errorMessage = { message: "Invalid login credentials." };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await prisma.user.findFirst({
    where: {
      email: validatedFields.data.email,
    },
  });

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }
  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = user.id.toString();
  await createSession(userId);
}

export async function refresh(req: NextRequest) {
  updateSession(req);
}

export async function logout() {
  deleteSession();
  redirect("/signin");
}
