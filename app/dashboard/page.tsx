"use client"

import { ArrowLeft, Calendar, Edit, FileText, Plus, Save, Server, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ChangelogItem {
  id: string
  version: string
  date: string
  title: string
  description: string
  changes: string[]
}

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [changelog, setChangelog] = useState<ChangelogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [editingItem, setEditingItem] = useState<ChangelogItem | null>(null)
  const [newItem, setNewItem] = useState<Partial<ChangelogItem>>({
    version: "",
    date: new Date().toISOString().split("T")[0],
    title: "",
    description: "",
    changes: [""],
  })
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Fetch changelog data from API
    const fetchChangelog = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/changelog")
        if (!response.ok) {
          throw new Error("Failed to fetch changelog")
        }
        const data = await response.json()
        setChangelog(data)
      } catch (error) {
        console.error("Error fetching changelog:", error)
        setError("Could not load changelog data. You can still add new entries.")
        // Set empty changelog so user can add new entries
        setChangelog([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchChangelog()

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleEdit = (item: ChangelogItem) => {
    setEditingItem(item)
  }

  const handleSaveEdit = async () => {
    if (editingItem) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/changelog/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        })

        if (!response.ok) {
          throw new Error("Failed to update changelog entry")
        }

        // Update local state
        setChangelog((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))
        setEditingItem(null)
      } catch (error) {
        console.error("Error updating changelog:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/changelog/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete changelog entry")
      }

      // Update local state
      setChangelog((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting changelog:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddChange = () => {
    if (isAdding) {
      setNewItem({
        ...newItem,
        changes: [...(newItem.changes || []), ""],
      })
    } else if (editingItem) {
      setEditingItem({
        ...editingItem,
        changes: [...editingItem.changes, ""],
      })
    }
  }

  const handleChangeUpdate = (index: number, value: string) => {
    if (isAdding) {
      const updatedChanges = [...(newItem.changes || [])]
      updatedChanges[index] = value
      setNewItem({
        ...newItem,
        changes: updatedChanges,
      })
    } else if (editingItem) {
      const updatedChanges = [...editingItem.changes]
      updatedChanges[index] = value
      setEditingItem({
        ...editingItem,
        changes: updatedChanges,
      })
    }
  }

  const handleRemoveChange = (index: number) => {
    if (isAdding) {
      const updatedChanges = [...(newItem.changes || [])]
      updatedChanges.splice(index, 1)
      setNewItem({
        ...newItem,
        changes: updatedChanges,
      })
    } else if (editingItem) {
      const updatedChanges = [...editingItem.changes]
      updatedChanges.splice(index, 1)
      setEditingItem({
        ...editingItem,
        changes: updatedChanges,
      })
    }
  }

  const handleAddItem = async () => {
    if (
      newItem.version &&
      newItem.date &&
      newItem.title &&
      newItem.description &&
      newItem.changes &&
      newItem.changes.length > 0 &&
      newItem.changes[0] !== ""
    ) {
      setIsLoading(true)
      try {
        const response = await fetch("/api/changelog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })

        if (!response.ok) {
          throw new Error("Failed to add changelog entry")
        }

        const result = await response.json()

        // Create new item with generated ID
        const newItemComplete = {
          id: result.id || Date.now().toString(),
          version: newItem.version,
          date: newItem.date,
          title: newItem.title,
          description: newItem.description,
          changes: newItem.changes as string[],
        }

        // Update local state
        setChangelog((prev) => [newItemComplete, ...prev])

        // Reset form
        setNewItem({
          version: "",
          date: new Date().toISOString().split("T")[0],
          title: "",
          description: "",
          changes: [""],
        })
        setIsAdding(false)
      } catch (error) {
        console.error("Error adding changelog:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Blurry Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-900/20" />
        <div
          className={`absolute top-[20%] left-[15%] w-[40rem] h-[30rem] bg-blue-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 ${isLoaded ? "opacity-30" : ""}`}
        />
        <div
          className={`absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 delay-500 ${isLoaded ? "opacity-30" : ""}`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`border-b border-white/10 py-4 backdrop-blur-md bg-black/30 sticky top-0 z-50 transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-2xl font-bold relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Server className="w-6 h-6 text-blue-400 relative z-10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-400 relative z-10">
                  Novanodes Admin
                </span>
              </div>
              <div className="flex gap-3">
                <Link href="/update">
                  <Button variant="outline" className="gap-2 shine-effect">
                    <FileText className="w-4 h-4" /> View Public Changelog
                  </Button>
                </Link>
                <Button variant="ghost" className="gap-2" onClick={handleLogout}>
                  <ArrowLeft className="w-4 h-4" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div
            className={`max-w-5xl mx-auto transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
                Changelog Management
              </h1>
              <Button
                className="bg-blue-600 hover:bg-blue-500 gap-2 shine-effect attention-grabber"
                onClick={() => setIsAdding(!isAdding)}
              >
                {isAdding ? "Cancel" : "Add New Version"} {!isAdding && <Plus className="w-4 h-4" />}
              </Button>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Add New Version Form */}
            {isAdding && (
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8 hover-shadow elegant-shadow">
                <h2 className="text-xl font-bold mb-4">Add New Version</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 block">Version</label>
                    <Input
                      id="version"
                      value={newItem.version}
                      onChange={(e) => setNewItem({ ...newItem, version: e.target.value })}
                      placeholder="e.g. 1.1.0"
                      className="bg-black/30 border-white/10 hover-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 block">Date</label>
                    <Input
                      type="date"
                      value={newItem.date}
                      onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                      className="bg-black/30 border-white/10 hover-border"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium text-white/70 block">Title</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="e.g. Feature Update"
                    className="bg-black/30 border-white/10 hover-border"
                  />
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium text-white/70 block">Description</label>
                  <Textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Brief description of this version"
                    className="bg-black/30 border-white/10 min-h-[80px] hover-border"
                  />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/70">Changes</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 p-1 h-auto hover-scale"
                      onClick={handleAddChange}
                    >
                      <Plus className="w-4 h-4" /> Add Change
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newItem.changes?.map((change, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={change}
                          onChange={(e) => handleChangeUpdate(index, e.target.value)}
                          placeholder="e.g. Added new feature"
                          className="bg-black/30 border-white/10 flex-1 hover-border"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover-scale"
                          onClick={() => handleRemoveChange(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-500 shine-effect" onClick={handleAddItem}>
                    Save New Version
                  </Button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Changelog List */}
            {!isLoading && (
              <div className="space-y-6">
                {changelog.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover-lift elegant-shadow"
                  >
                    {editingItem && editingItem.id === item.id ? (
                      // Edit Mode
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Version</label>
                            <Input
                              value={editingItem.version}
                              onChange={(e) => setEditingItem({ ...editingItem, version: e.target.value })}
                              className="bg-black/30 border-white/10 hover-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Date</label>
                            <Input
                              type="date"
                              value={editingItem.date.split("T")[0]}
                              onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                              className="bg-black/30 border-white/10 hover-border"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <label className="text-sm font-medium text-white/70">Title</label>
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            className="bg-black/30 border-white/10 hover-border"
                          />
                        </div>
                        <div className="space-y-2 mb-4">
                          <label className="text-sm font-medium text-white/70">Description</label>
                          <Textarea
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                            className="bg-black/30 border-white/10 min-h-[80px] hover-border"
                          />
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-white/70">Changes</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 p-1 h-auto hover-scale"
                              onClick={handleAddChange}
                            >
                              <Plus className="w-4 h-4" /> Add Change
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {editingItem.changes.map((change, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={change}
                                  onChange={(e) => handleChangeUpdate(index, e.target.value)}
                                  className="bg-black/30 border-white/10 flex-1 hover-border"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-400 hover:text-red-300 hover-scale"
                                  onClick={() => handleRemoveChange(index)}
                                  disabled={editingItem.changes.length <= 1}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setEditingItem(null)} className="hover-scale">
                            Cancel
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-500 shine-effect" onClick={handleSaveEdit}>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-sm font-medium pulse-animation">
                                v{item.version}
                              </span>
                              <span className="text-white/50 text-sm flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {item.date}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold animated-underline">{item.title}</h3>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-400 hover:text-blue-300 hover-scale"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-400 hover:text-red-300 hover-scale"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-white/70 mb-4">{item.description}</p>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" /> Changes
                          </h4>
                          <ul className="space-y-1 text-white/70">
                            {item.changes.map((change, i) => (
                              <li key={i} className="flex items-start gap-2 hover-translate-x-1 transition-transform">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
                <Server className="w-5 h-5 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-400">
                  Novanodes
                </span>
              </div>
              <div className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} Novanodes by senzdev.xyz. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

