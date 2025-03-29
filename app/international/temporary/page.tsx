"use client"

import { ArrowLeft, Construction, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function InternationalTemporaryPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Blurry Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-blue-900/20" />
        <div
          className={`absolute top-[20%] left-[15%] w-[40rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 ${isLoaded ? "opacity-30" : ""}`}
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
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Server className="w-6 h-6 text-blue-400 relative z-10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 relative z-10">
                  Novanodes
                </span>
              </div>
              <Link href="/international">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div
            className={`max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/10 transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-500/20 p-4 rounded-full">
                <Construction className="w-12 h-12 text-indigo-400" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Sorry, Our Project is Currently Work in Progress
            </h1>

            <div className="space-y-4 text-white/70 mb-8">
              <p className="text-lg">
                We are currently developing the purchasing and service management system for Novanodes.
              </p>
              <p>
                The billing and payment system will be managed on a separate website for user security and convenience.
                We will notify you as soon as the system is ready to use.
              </p>
              <p>
                Thank you for your patience and support. We are working hard to provide you with the best hosting
                service.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/international">
                <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>
              </Link>
              <Link href="/update">
                <Button variant="outline" className="border-white/20 hover:bg-white/10 hover:border-white/30">
                  View Updates & Changelog
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
                <Server className="w-5 h-5 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
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

