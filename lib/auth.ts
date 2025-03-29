import type { NextRequest } from "next/server"
import { jwtVerify, SignJWT } from "jose"

// Use a default secret for preview environments if not provided
const JWT_SECRET = process.env.JWT_SECRET || "novanodes-super-secret-jwt-key-change-in-production"

export async function createToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token expires in 24 hours
    .sign(new TextEncoder().encode(JWT_SECRET))
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

export async function getTokenFromRequest(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null

  return token
}

