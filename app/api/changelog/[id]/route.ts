import { type NextRequest, NextResponse } from "next/server"
import { updateChangelogEntry, deleteChangelogEntry } from "@/lib/db-utils"

// PUT /api/changelog/[id] - Update a changelog entry
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Validate required fields
    if (!data.version || !data.date || !data.title || !data.description || !data.changes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await updateChangelogEntry(id, data)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Changelog entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating changelog entry:", error)
    return NextResponse.json({ error: "Failed to update changelog entry" }, { status: 500 })
  }
}

// DELETE /api/changelog/[id] - Delete a changelog entry
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await deleteChangelogEntry(id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Changelog entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting changelog entry:", error)
    return NextResponse.json({ error: "Failed to delete changelog entry" }, { status: 500 })
  }
}

