import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, updateSession } from "./lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/signin", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 4. If session is expired, redirect to signin
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  // 5. If session exists, check its expiration
  const expiresAt =
    session?.expiresAt &&
    (typeof session.expiresAt === "string" ||
      typeof session.expiresAt === "number" ||
      session.expiresAt instanceof Date)
      ? new Date(session.expiresAt)
      : null;

  const now = new Date();

  // If session is about to expire in the next minute, refresh the session
  if (session && expiresAt && expiresAt.getTime() - now.getTime() < 60 * 1000) {
     console.log("Session is about to expire, updating session.");
    return await updateSession(req);
  }

  // 6. Redirect authenticated users away from public routes
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
