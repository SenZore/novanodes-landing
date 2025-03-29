import { type NextRequest, NextResponse } from "next/server"
import { verifyCredentials } from "@/lib/db-utils"
import { createToken } from "@/lib/auth"
import { initializeDatabase } from "@/lib/db-utils"

export async function POST(request: NextRequest) {
  try {
    // Initialize database (creates admin user if it doesn't exist)
    await initializeDatabase()

    // Get credentials from request body
    const { username, pin } = await request.json()

    // Validate input
    if (!username || !pin) {
      return NextResponse.json({ error: "Username and PIN are required" }, { status: 400 })
    }

    // Verify credentials
    const user = await verifyCredentials(username, pin)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })

    // Set token in cookie
    const response = NextResponse.json(
      { success: true, user: { username: user.username, role: user.role } },
      { status: 200 },
    )

    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

