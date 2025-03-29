import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken, getTokenFromRequest } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Get the token from the request
    const token = await getTokenFromRequest(request)

    // If there's no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Verify the token
    const payload = await verifyToken(token)

    // If the token is invalid, redirect to login
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }

    // Token is valid, allow access to the dashboard
    return NextResponse.next()
  }

  // For all other routes, continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

