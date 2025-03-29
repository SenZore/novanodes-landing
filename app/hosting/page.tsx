"use client"

import { ChevronRight, Gamepad2, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useRef } from "react"

// Custom Discord Logo component
const DiscordIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 11.5c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2Z" />
    <path d="M15 11.5c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2Z" />
    <path d="M5.5 15.5c0 1 .813 2 1.813 2h9.375c1 0 1.812-1 1.812-2l.5-7c0-1-.813-2-1.813-2H7.313c-1 0-1.813 1-1.813 2l.5 7Z" />
    <path d="M8 19v3c0 .552.895 1 2 1h4c1.105 0 2-.448 2-1v-3" />
  </svg>
)

export default function HostingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const meteorsRef = useRef(null)

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"

    // Track scroll position for animations
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Hide scroll indicator after scrolling down a bit
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initialize meteors animation
    const initMeteors = () => {
      if (meteorsRef.current) {
        const container = meteorsRef.current
        const width = container.offsetWidth
        const height = container.offsetHeight

        // Create meteors
        for (let i = 0; i < 4; i++) {
          createMeteor(container, width, height, i)
        }
      }
    }

    const createMeteor = (container, width, height, index) => {
      const meteor = document.createElement("div")
      meteor.className = "absolute w-1 h-20 bg-gradient-to-b from-transparent via-white to-transparent"

      // Set random position and rotation
      const startX = Math.random() * width
      const startY = -100
      const angle = 30 + Math.random() * 30 // 30-60 degrees

      meteor.style.top = `${startY}px`
      meteor.style.left = `${startX}px`
      meteor.style.transform = `rotate(${angle}deg)`
      meteor.style.opacity = "0"

      container.appendChild(meteor)

      // Animate the meteor
      const animateMeteor = () => {
        const duration = 1000 + Math.random() * 1000
        const delay = index * 500 + Math.random() * 2000

        setTimeout(() => {
          meteor.style.transition = `transform ${duration}ms linear, opacity 0.3s ease-in, opacity 0.3s ease-out ${duration - 300}ms`
          meteor.style.opacity = "1"
          meteor.style.transform = `translateX(${width}px) translateY(${height}px) rotate(${angle}deg)`

          setTimeout(() => {
            meteor.style.opacity = "0"

            // Reset meteor for next animation
            setTimeout(() => {
              meteor.style.transition = "none"
              meteor.style.transform = `rotate(${angle}deg)`
              meteor.style.top = `${startY}px`
              meteor.style.left = `${Math.random() * width}px`

              // Repeat animation
              animateMeteor()
            }, 300)
          }, duration)
        }, delay)
      }

      animateMeteor()
    }

    setTimeout(initMeteors, 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // Helper function to check if element should be animated
  const shouldAnimate = (elementId) => {
    if (!isLoaded) return false

    const element = document.getElementById(elementId)
    if (!element) return false

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // Element is in viewport
    return rect.top <= windowHeight * 0.8
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Blurry Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20" />
        <div
          className={`absolute top-[20%] left-[15%] w-[40rem] h-[30rem] bg-green-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 ${isLoaded ? "opacity-30" : ""}`}
        />
        <div
          className={`absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 delay-500 ${isLoaded ? "opacity-30" : ""}`}
        />

        {/* Removed background grid */}
        <div className="absolute inset-0"></div>
      </div>

      {/* Meteors Container */}
      <div ref={meteorsRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none"></div>

      {/* Scroll Indicator */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-700 ${showScrollIndicator ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-white/70 text-sm mb-2 animate-bounce">Scroll Down</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/70 animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Server className="w-6 h-6 text-blue-400 relative z-10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 relative z-10">
                  Novanodes
                </span>
              </div>
              <nav className="hidden md:flex gap-8 font-medium">
                <Link href="/" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/hosting" className="text-blue-400 transition relative group overflow-hidden">
                  Game Hosting
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400"></span>
                </Link>
                <Link href="/update" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Updates
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <div className="flex items-center gap-1 text-gray-500 cursor-not-allowed relative group">
                  <span>VPS Hosting</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-700/50"
                  >
                    Segera
                  </Badge>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-700/50 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </nav>
              <div className="flex gap-3">
                <Link href="/temporary">
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Masuk</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="hidden md:inline-flex border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 bg-green-500/10 transition-all duration-300 group-hover:w-full"></span>
                  <DiscordIcon className="w-4 h-4 mr-2 group-hover:animate-pulse relative z-10" />
                  <span className="relative z-10">JOIN Discord</span>
                </Button>
                <Link href="/temporary">
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Mulai</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-20 text-center container mx-auto px-4">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Game Hosting
          </h1>
          <p
            className={`text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Hosting game premium untuk pengalaman bermain yang lancar dan tanpa lag.
          </p>
        </section>

        {/* Game Hosting Section */}
        <section id="minecraft-section" className="py-8 container mx-auto px-4">
          <div className="mb-10">
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${shouldAnimate("minecraft-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Gamepad2 className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                Minecraft
              </h3>
            </div>

            {/* Pricing Cards - Grid Layout */}
            <div
              className={`relative bg-gradient-to-br from-black/80 to-blue-950/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-700 hover:shadow-lg hover:shadow-green-500/10 overflow-hidden ${shouldAnimate("minecraft-section") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="stars absolute inset-0"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                  Pilih Paket Sesuai Kebutuhan Anda
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Starter Package */}
                  <div className="bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-300 border border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-lg font-bold">Starter</h4>
                      <p className="text-white/70 text-sm">Server kecil untuk pemain casual</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">1 GB RAM</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">2 vCPU</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">20 GB SSD</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">5-10 Pemain</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">
                          Rp 6.500<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500">
                          Pilih Paket
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Basic Package (New) */}
                  <div className="bg-teal-950/20 rounded-lg hover:bg-teal-950/30 transition-all duration-300 border border-teal-500/20 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:scale-105 overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                      BARU
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold">Basic</h4>
                      <p className="text-white/70 text-sm">Server pemula untuk grup kecil</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">2 GB RAM</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">2 vCPU</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">25 GB SSD</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">10-15 Pemain</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">
                          Rp 11.500<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500">
                          Pilih Paket
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Standard Package */}
                  <div className="bg-green-950/20 rounded-lg hover:bg-green-950/30 transition-all duration-300 border border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 overflow-hidden relative">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                      POPULER
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold">Standard</h4>
                      <p className="text-white/70 text-sm">Server menengah untuk komunitas</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">4 GB RAM</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">2 vCPU</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">30 GB SSD</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">15-25 Pemain</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">
                          Rp 26.000<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="w-full mt-3 bg-green-500 hover:bg-green-600">Pilih Paket</Button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Package */}
                  <div className="bg-blue-950/20 rounded-lg hover:bg-blue-950/30 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-lg font-bold">Premium</h4>
                      <p className="text-white/70 text-sm">Server besar untuk server publik</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">8 GB RAM</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">3 vCPU</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">40 GB SSD</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">30-40 Pemain</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">
                          Rp 52.000<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500">
                          Pilih Paket
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Ultimate Package */}
                  <div className="bg-blue-950/20 rounded-lg hover:bg-blue-950/30 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-lg font-bold">Ultimate</h4>
                      <p className="text-white/70 text-sm">Server komunitas besar</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">16 GB RAM</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">4 vCPU</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">50 GB SSD</span>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded">50+ Pemain</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-2xl font-bold">
                          Rp 104.000<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500">
                          Pilih Paket
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Package */}
                  <div className="bg-purple-950/20 rounded-lg hover:bg-purple-950/30 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105 overflow-hidden col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="p-6">
                      <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Enterprise
                      </h4>
                      <p className="text-white/70 text-sm mb-3">Server khusus untuk kebutuhan besar</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-semibold mb-2">Spesifikasi:</h5>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>32 GB RAM</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>4 vCPU</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>100 GB SSD</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>100+ Pemain</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold mb-2">Fitur tambahan:</h5>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>Backup otomatis harian</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>DDoS protection</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>Dukungan prioritas 24/7</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <ChevronRight className="w-3 h-3 text-purple-400" />
                              <span>Panel admin khusus</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          Rp 208.000<span className="text-sm font-normal text-white/70">/bulan</span>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                          Hubungi Kami
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="py-16 bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                Siap untuk memulai dengan Novanodes?
              </span>
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Bergabunglah dengan ribuan pemain yang menikmati server game tanpa lag dengan Novanodes.
            </p>
            <Button
              size="lg"
              className={`gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-700 delay-400 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Mulai Sekarang <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
                <Server className="w-5 h-5 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                  Novanodes
                </span>
              </div>
              <div className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} Novanodes by senzdev.xyz. Seluruh hak cipta dilindungi.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

