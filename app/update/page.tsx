"use client"

import { ArrowLeft, Clock, FileText, Server, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

// Default changelog data for fallback
const defaultChangelog = [
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
  },
]

export default function UpdatePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [changelog, setChangelog] = useState(defaultChangelog)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        if (data && data.length > 0) {
          setChangelog(data)
        }
      } catch (error) {
        console.error("Error fetching changelog:", error)
        setError("Could not load changelog data. Using default entries.")
        // Keep using the default changelog
      } finally {
        setIsLoading(false)
      }
    }

    fetchChangelog()

    return () => clearTimeout(timer)
  }, [])

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
                  Novanodes
                </span>
              </div>
              <div className="flex gap-3">
                <Link href="/">
                  <Button variant="ghost" className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 shine-effect">
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-16">
          <div
            className={`max-w-4xl mx-auto transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
                Updates & Changelog
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Track our progress and see what's new with Novanodes. We're constantly improving our platform to provide
                you with the best hosting experience.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Changelog Timeline */}
            {!isLoading && (
              <div className="space-y-8 relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-blue-500/20 transform md:translate-x-[-0.5px] hidden md:block"></div>

                {changelog.map((release, index) => (
                  <div
                    key={release.id}
                    className={`relative transition-all duration-700 delay-${index * 200} ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    {/* Version tag */}
                    <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center mb-4 md:mb-0">
                      <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10 pulse-animation">
                        <Tag className="w-3 h-3" /> {release.version}
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} hover-lift elegant-shadow`}
                    >
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{release.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 animated-underline">{release.title}</h3>
                      <p className="text-white/70 mb-4">{release.description}</p>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400" /> Changes
                        </h4>
                        <ul className="space-y-1 text-white/70">
                          {release.changes.map((change, i) => (
                            <li key={i} className="flex items-start gap-2 hover-translate-x-1 transition-transform">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

