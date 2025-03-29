import { type NextRequest, NextResponse } from "next/server"
import { getChangelog, addChangelogEntry } from "@/lib/db-utils"

// GET /api/changelog - Get all changelog entries
export async function GET() {
  try {
    const changelog = await getChangelog()
    return NextResponse.json(changelog)
  } catch (error) {
    console.error("Error fetching changelog:", error)
    return NextResponse.json({ error: "Failed to fetch changelog" }, { status: 500 })
  }
}

// POST /api/changelog - Add a new changelog entry
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.version || !data.date || !data.title || !data.description || !data.changes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await addChangelogEntry(data)

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error adding changelog entry:", error)
    return NextResponse.json({ error: "Failed to add changelog entry" }, { status: 500 })
  }
}

