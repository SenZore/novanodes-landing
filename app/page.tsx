"use client"

import { ChevronRight, Cloud, Globe, Server, Shield, CreditCard, MapPin, Lock, ArrowDown } from "lucide-react"
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

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const featuresRef = useRef(null)

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

    // Initialize particles for features section
    const initParticles = () => {
      if (featuresRef.current) {
        const canvas = document.createElement("canvas")
        canvas.className = "absolute inset-0 z-0"
        featuresRef.current.appendChild(canvas)

        const ctx = canvas.getContext("2d")
        canvas.width = featuresRef.current.offsetWidth
        canvas.height = featuresRef.current.offsetHeight

        const particles = []
        const particleCount = 20 // Reduced particle count

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 0.5, // Smaller particles
            color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, 0.2)`, // More transparent
            speedX: Math.random() * 0.3 - 0.15, // Slower movement
            speedY: Math.random() * 0.3 - 0.15, // Slower movement
          })
        }

        const animate = () => {
          requestAnimationFrame(animate)
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          particles.forEach((particle) => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.fill()

            particle.x += particle.speedX
            particle.y += particle.speedY

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
          })
        }

        animate()

        const handleResize = () => {
          if (featuresRef.current) {
            canvas.width = featuresRef.current.offsetWidth
            canvas.height = featuresRef.current.offsetHeight
          }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }

    setTimeout(initParticles, 1000)

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

  // Scroll to features section
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Blurry Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

        {/* Animated blobs */}
        <div
          className={`absolute top-[20%] left-[15%] w-[40rem] h-[30rem] bg-purple-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 ${isLoaded ? "opacity-20" : ""}`}
        />
        <div
          className={`absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 delay-500 ${isLoaded ? "opacity-20" : ""}`}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Subtle stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3 + 0.1,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-700 ${showScrollIndicator ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-white/70 text-sm mb-2 animate-bounce">Scroll Down</div>
        <ArrowDown className="w-5 h-5 text-white/70 animate-bounce" />
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
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Server className="w-6 h-6 text-blue-400 relative z-10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 relative z-10">
                  Novanodes
                </span>
              </div>
              <nav className="hidden md:flex gap-8 font-medium">
                <Link href="/" className="text-blue-400 transition relative group overflow-hidden">
                  Home
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
                </Link>
                <Link href="/hosting" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Game Hosting
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/update" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Updates
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
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
                    className="hidden md:inline-flex hover:bg-white/10 transition-all duration-300 relative overflow-hidden group shine-effect"
                  >
                    <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Masuk</span>
                  </Button>
                </Link>
                <Link href="https://discord.gg/TFFnDqrEet" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 group relative overflow-hidden shine-effect"
                  >
                    <span className="absolute inset-0 w-0 bg-purple-500/10 transition-all duration-300 group-hover:w-full"></span>
                    <DiscordIcon className="w-4 h-4 mr-2 group-hover:animate-pulse relative z-10" />
                    <span className="relative z-10">JOIN Discord</span>
                  </Button>
                </Link>
                <Link href="/temporary">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden group shine-effect">
                    <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Mulai</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28 text-center container mx-auto px-4">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Memperkenalkan Novanodes
          </h1>
          <p
            className={`text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Didukung oleh senzdev.xyz, menyediakan solusi hosting cloud super cepat dengan keandalan dan performa yang
            tak tertandingi.
          </p>
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Link href="/temporary">
              <Button
                size="lg"
                className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/20 shine-effect"
              >
                Mulai Sekarang <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/hosting">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30 shine-effect"
              >
                Lihat Game Hosting
              </Button>
            </Link>
          </div>

          {/* Mouse scroll animation */}
          <div className={`mt-16 transition-all duration-700 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            <button onClick={scrollToFeatures} className="inline-flex flex-col items-center group">
              <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-1 hover-border">
                <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-mouse"></div>
              </div>
              <span className="mt-2 text-white/50 text-sm group-hover:text-white/80 transition-colors">
                Scroll untuk melihat lebih
              </span>
            </button>
          </div>
        </section>

        {/* Best Indonesian Hosting */}
        <section id="hosting-section" className="py-16 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Hosting Indonesia Terbaik
              </span>
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Rasakan infrastruktur hosting premium yang berlokasi di Indonesia, menjamin kecepatan luar biasa untuk
              pengguna di seluruh Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} elegant-hover elegant-border`}
            >
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform subtle-float">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Latensi Rendah</h3>
              <p className="text-white/70">
                Server yang berlokasi strategis di Indonesia memastikan latensi minimal untuk pengguna di seluruh
                Indonesia.
              </p>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-700 delay-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} elegant-hover elegant-border`}
            >
              <div className="bg-purple-500/20 p-3 rounded-full w-fit mb-6 subtle-float">
                <Cloud className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Uptime 99.9%</h3>
              <p className="text-white/70">
                Infrastruktur kami memastikan website dan aplikasi Anda tetap online dengan jaminan uptime 99.9%.
              </p>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-700 delay-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} elegant-hover elegant-border`}
            >
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-6 subtle-float">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Keamanan Enterprise</h3>
              <p className="text-white/70">
                Langkah-langkah keamanan canggih untuk melindungi data dan aplikasi Anda dari ancaman.
              </p>
            </div>
          </div>
        </section>

        {/* Combined Features & Security Section */}
        <section id="features-section" ref={featuresRef} className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black opacity-80"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${shouldAnimate("features-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Fitur Unggulan & Keamanan
                </span>
              </h2>
              <p
                className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${shouldAnimate("features-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                Novanodes menawarkan berbagai fitur canggih dan perlindungan tingkat enterprise untuk pengalaman hosting
                terbaik.
              </p>
            </div>

            {/* Main Features Card */}
            <div
              className={`max-w-5xl mx-auto bg-gradient-to-br from-black/80 to-blue-950/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-700 hover:shadow-lg hover:shadow-blue-500/10 ${shouldAnimate("features-section") ? "opacity-100 scale-100" : "opacity-0 scale-95"} elegant-shadow`}
            >
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left Column - Features */}
                <div>
                  <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-400 mb-4">
                    Fitur Premium
                  </div>

                  <div className="space-y-6">
                    {/* DDoS Protection */}
                    <div className="flex items-start gap-4 group elegant-hover">
                      <div className="bg-red-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-red-400 transition-colors">
                          DDoS Protection
                        </h3>
                        <p className="text-white/70 text-sm">
                          Perlindungan DDoS tingkat lanjut yang melindungi server Anda dari serangan berbahaya hingga
                          1Tbps dengan mitigasi otomatis.
                        </p>
                      </div>
                    </div>

                    {/* QRIS Payment */}
                    <div className="flex items-start gap-4 group elegant-hover">
                      <div className="bg-green-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-green-400 transition-colors">
                          Pembayaran QRIS
                        </h3>
                        <p className="text-white/70 text-sm">
                          Nikmati kemudahan pembayaran dengan QRIS yang terintegrasi dengan semua e-wallet seperti
                          GoPay, OVO, dan DANA.
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4 group elegant-hover">
                      <div className="bg-blue-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">
                          Lokasi Strategis
                        </h3>
                        <p className="text-white/70 text-sm">
                          Server kami berlokasi di pusat data terbaik di Indonesia (Jakarta, Surabaya, Bandung) untuk
                          koneksi cepat dengan ping &lt;10ms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Security */}
                <div>
                  <div className="inline-block rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-400 mb-4">
                    Keamanan Terdepan
                  </div>

                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Perlindungan Tingkat Enterprise
                  </h3>

                  <p className="text-white/70 mb-6 text-sm">
                    Novanodes menggunakan teknologi keamanan terdepan untuk melindungi data dan aplikasi Anda dari
                    berbagai ancaman cyber.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 hover-translate-x-1 transition-transform">
                      <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                        <Lock className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Enkripsi End-to-End</h4>
                        <p className="text-white/70 text-xs">Data dilindungi dengan enkripsi tingkat militer.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover-translate-x-1 transition-transform">
                      <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                        <Shield className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Firewall Canggih</h4>
                        <p className="text-white/70 text-xs">Firewall adaptif yang melindungi dari serangan.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover-translate-x-1 transition-transform">
                      <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-400"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Pemantauan 24/7</h4>
                        <p className="text-white/70 text-xs">Tim keamanan memantau sistem secara real-time.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-black/50 rounded-lg p-4 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-purple-400 opacity-20" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold">100%</div>
                          <div className="text-xs text-white/70">Perlindungan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Siap untuk memulai dengan Novanodes?
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Bergabunglah dengan ribuan pelanggan yang puas yang mempercayakan kebutuhan hosting mereka pada Novanodes.
            </p>
            <div
              className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Link href="/temporary">
                <Button
                  size="lg"
                  className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/20 shine-effect"
                >
                  Mulai Sekarang <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/hosting">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30 shine-effect"
                >
                  Lihat Game Hosting
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* International Server Option */}
        <section className="py-12 bg-gradient-to-r from-indigo-900/30 to-blue-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/10 elegant-hover elegant-shadow">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                Looking for EU/NA Server?
              </h2>
              <p className="text-lg text-white/70 mb-6">
                We also provide high-performance servers in Europe and North America regions with low latency and
                premium support.
              </p>
              <Link href="/international">
                <Button
                  size="lg"
                  className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/20 shine-effect"
                >
                  Yes, Show Me <Globe className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-xl font-bold mb-4 md:mb-0">
                <Server className="w-5 h-5 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
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

