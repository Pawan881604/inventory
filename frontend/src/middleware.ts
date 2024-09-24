import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of routes that are protected
const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth"];

// Middleware function
export function middleware(req: NextRequest) {
  console.log("Middleware triggered!"); // Log to check if it's running

  // Extract token from cookies
  const token = req.cookies.get("auth_token"); // Change "auth_token" to your actual cookie name

  // Check if the user is trying to access a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If the token is missing, redirect to the login page
    if (!token) {
      console.log("No token found, redirecting to sign-in");
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Check if the user is trying to access authentication routes
  if (authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If the token exists, redirect to the dashboard
    if (token) {
      console.log("Token found, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Continue to the requested page if token exists
  return NextResponse.next();
}

// Config to define which routes to run the middleware on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"], // Include auth routes for matching
};
