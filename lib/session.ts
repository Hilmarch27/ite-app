import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/validations/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error("SESSION_SECRET is not set in environment variables.");
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  console.log("Encrypting with payload:", payload);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 3 * 60 * 1000); 
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    console.log("Session or payload is missing");
    return null;
  }

  const userId = payload.userId as string;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set new expiration

  console.log("Updating session, new expiresAt:", expiresAt);

  const newSession = await encrypt({ userId, expiresAt });
  const res = NextResponse.next();
  // Set the updated session cookie
  res.cookies.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  console.log("Updated session successfully:", newSession);
  return res;
}


export function deleteSession() {
  cookies().delete("session");
  console.log("logout sucessfully");
  redirect("/signin");
}
