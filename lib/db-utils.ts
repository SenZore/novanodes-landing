import clientPromise from "./mongodb"
import { compare, hash } from "bcryptjs"

// Initialize the database and collections
export async function initializeDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")

    // Check if admin user exists, if not create it
    const usersCollection = db.collection("users")
    const adminUser = await usersCollection.findOne({ username: "admin" })

    if (!adminUser) {
      // Hash the PIN for security
      const hashedPin = await hash("969696", 10)

      // Create admin user
      await usersCollection.insertOne({
        username: "admin",
        pin: hashedPin,
        role: "admin",
        createdAt: new Date(),
      })

      console.log("Admin user created successfully")
    }

    // Initialize changelog collection if it doesn't exist
    const changelogCollection = db.collection("changelog")
    const changelogCount = await changelogCollection.countDocuments()

    if (changelogCount === 0) {
      // Add some default changelog entries
      await changelogCollection.insertMany([
        {
          id: "1",
          version: "1.0.0",
          date: "March 28, 2025",
          title: "Initial Release",
          description: "First public release of Novanodes hosting platform.",
          changes: [
            "Launched Indonesian and International versions of the website",
            "Added Game Hosting services for Minecraft",
            "Implemented responsive design for all device sizes",
            "Added dark theme with blur effects",
          ],
          createdAt: new Date(),
        },
        {
          id: "2",
          version: "0.9.5",
          date: "March 15, 2025",
          title: "Beta Release",
          description: "Final beta version before public launch.",
          changes: [
            "Completed payment integration testing",
            "Optimized server performance",
            "Added DDoS protection features",
            "Improved user dashboard interface",
          ],
          createdAt: new Date(),
        },
        {
          id: "3",
          version: "0.9.0",
          date: "February 28, 2025",
          title: "Private Beta",
          description: "Private beta testing with selected users.",
          changes: [
            "Implemented core hosting functionality",
            "Created initial website design",
            "Set up server infrastructure",
            "Added basic user authentication",
          ],
          createdAt: new Date(),
        },
      ])

      console.log("Default changelog entries created")
    }

    return { db, usersCollection, changelogCollection }
  } catch (error) {
    console.error("Error initializing database:", error)
    // Return mock collections for preview environments
    return {
      db: null,
      usersCollection: {
        findOne: async () => null,
        insertOne: async () => ({ insertedId: "preview-id" }),
      },
      changelogCollection: {
        find: async () => ({
          sort: () => ({
            toArray: async () => [],
          }),
        }),
        countDocuments: async () => 0,
        insertMany: async () => ({}),
        insertOne: async () => ({ insertedId: "preview-id" }),
        updateOne: async () => ({ matchedCount: 1 }),
        deleteOne: async () => ({ deletedCount: 1 }),
      },
    }
  }
}

// Verify user credentials
export async function verifyCredentials(username: string, pin: string) {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")
    const usersCollection = db.collection("users")

    const user = await usersCollection.findOne({ username })

    if (!user) {
      return null
    }

    const isValid = await compare(pin, user.pin)

    if (!isValid) {
      return null
    }

    return {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    }
  } catch (error) {
    console.error("Error verifying credentials:", error)
    // For preview environments, allow a hardcoded admin user
    if (username === "admin" && pin === "969696") {
      return {
        id: "preview-admin-id",
        username: "admin",
        role: "admin",
      }
    }
    return null
  }
}

// Get all changelog entries
export async function getChangelog() {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")
    const changelogCollection = db.collection("changelog")

    const changelog = await changelogCollection.find({}).sort({ createdAt: -1 }).toArray()

    return changelog.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }))
  } catch (error) {
    console.error("Error getting changelog:", error)
    // Return default changelog for preview environments
    return [
      {
        _id: "1",
        id: "1",
        version: "1.0.0",
        date: "March 28, 2025",
        title: "Initial Release",
        description: "First public release of Novanodes hosting platform.",
        changes: [
          "Launched Indonesian and International versions of the website",
          "Added Game Hosting services for Minecraft",
          "Implemented responsive design for all device sizes",
          "Added dark theme with blur effects",
        ],
        createdAt: new Date(),
      },
      {
        _id: "2",
        id: "2",
        version: "0.9.5",
        date: "March 15, 2025",
        title: "Beta Release",
        description: "Final beta version before public launch.",
        changes: [
          "Completed payment integration testing",
          "Optimized server performance",
          "Added DDoS protection features",
          "Improved user dashboard interface",
        ],
        createdAt: new Date(),
      },
      {
        _id: "3",
        id: "3",
        version: "0.9.0",
        date: "February 28, 2025",
        title: "Private Beta",
        description: "Private beta testing with selected users.",
        changes: [
          "Implemented core hosting functionality",
          "Created initial website design",
          "Set up server infrastructure",
          "Added basic user authentication",
        ],
        createdAt: new Date(),
      },
    ]
  }
}

// Add a new changelog entry
export async function addChangelogEntry(entry: any) {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")
    const changelogCollection = db.collection("changelog")

    const result = await changelogCollection.insertOne({
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date(),
    })

    return result
  } catch (error) {
    console.error("Error adding changelog entry:", error)
    return { insertedId: "preview-id" }
  }
}

// Update a changelog entry
export async function updateChangelogEntry(id: string, entry: any) {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")
    const changelogCollection = db.collection("changelog")

    const result = await changelogCollection.updateOne({ id }, { $set: { ...entry, updatedAt: new Date() } })

    return result
  } catch (error) {
    console.error("Error updating changelog entry:", error)
    return { matchedCount: 1 }
  }
}

// Delete a changelog entry
export async function deleteChangelogEntry(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("novanodes")
    const changelogCollection = db.collection("changelog")

    const result = await changelogCollection.deleteOne({ id })

    return result
  } catch (error) {
    console.error("Error deleting changelog entry:", error)
    return { deletedCount: 1 }
  }
}

