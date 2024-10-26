import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Define the protected paths
  const protectedPaths = ["/home", "/fav"];

  // Check if the request path matches a protected path
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If the path is protected, check for the authentication token
  if (isProtectedPath) {
    const token = req.cookies.get("jwt")?.value;

    // If no token is found, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirect", req.nextUrl.pathname); // Preserve the path user tried to access
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated or path is not protected, continue
  return NextResponse.next();
}
