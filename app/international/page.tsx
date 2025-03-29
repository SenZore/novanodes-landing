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

export default function InternationalPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const featuresRef = useRef(null)
  const [currency, setCurrency] = useState("gbp") // Default to GBP

  // Ubah fungsi formatPrice untuk menggunakan harga yang benar
  const formatPrice = (price) => {
    if (currency === "gbp") {
      return `£${price}`
    } else {
      return `€${price}`
    }
  }

  // Ganti dengan fungsi ini yang menggunakan harga yang benar
  const getPrice = (plan) => {
    const prices = {
      starter: { eur: 1.45, gbp: 1.21 },
      basic: { eur: 2.57, gbp: 2.15 },
      standard: { eur: 5.81, gbp: 4.85 },
      premium: { eur: 11.63, gbp: 9.71 },
      ultimate: { eur: 23.25, gbp: 19.41 },
      enterprise: { eur: 46.51, gbp: 38.83 },
    }

    return currency === "gbp" ? prices[plan].gbp : prices[plan].eur
  }

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
        const particleCount = 50

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
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
          canvas.width = featuresRef.current.offsetWidth
          canvas.height = featuresRef.current.offsetHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }

    setTimeout(initParticles, 1000)

    // Tambahkan efek lampu pada kotak-kotak paket
    const addLightEffect = () => {
      const planCards = document.querySelectorAll(".plan-card")

      planCards.forEach((card) => {
        // Tambahkan efek hover untuk lampu
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const light = card.querySelector(".light-effect")
          if (light) {
            light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`
          }
        })

        // Reset efek saat mouse keluar
        card.addEventListener("mouseleave", () => {
          const light = card.querySelector(".light-effect")
          if (light) {
            light.style.background = "none"
          }
        })
      })
    }

    setTimeout(addLightEffect, 1000)

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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-blue-900/20" />
        <div
          className={`absolute top-[20%] left-[15%] w-[40rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 ${isLoaded ? "opacity-30" : ""}`}
        />
        <div
          className={`absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem] opacity-0 transition-opacity duration-1000 delay-500 ${isLoaded ? "opacity-30" : ""}`}
        />

        {/* Animated gradient background */}
        <div className="absolute inset-0"></div>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Server className="w-6 h-6 text-blue-400 relative z-10" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 relative z-10">
                  Novanodes
                </span>
              </div>
              <nav className="hidden md:flex gap-8 font-medium">
                <Link href="/international" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/international/hosting"
                  className="hover:text-blue-400 transition relative group overflow-hidden"
                >
                  Game Hosting
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/update" className="hover:text-blue-400 transition relative group overflow-hidden">
                  Updates
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <div className="flex items-center gap-1 text-gray-500 cursor-not-allowed relative group">
                  <span>VPS Hosting</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-700/50"
                  >
                    Coming Soon
                  </Badge>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-700/50 transition-all duration-300 group-hover:w-full"></span>
                </div>
              </nav>
              <div className="flex gap-3">
                <div className="hidden md:flex items-center mr-4">
                  <button
                    onClick={() => setCurrency("gbp")}
                    className={`px-2 py-1 rounded-l-md ${currency === "gbp" ? "bg-indigo-600 text-white" : "bg-gray-800/50 text-gray-400"}`}
                  >
                    GBP (£)
                  </button>
                  <button
                    onClick={() => setCurrency("eur")}
                    className={`px-2 py-1 rounded-r-md ${currency === "eur" ? "bg-indigo-600 text-white" : "bg-gray-800/50 text-gray-400"}`}
                  >
                    EUR (€)
                  </button>
                </div>
                <Link href="/international/temporary">
                  <Button
                    variant="ghost"
                    className="hidden md:inline-flex hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Login</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="hidden md:inline-flex border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 bg-indigo-500/10 transition-all duration-300 group-hover:w-full"></span>
                  <DiscordIcon className="w-4 h-4 mr-2 group-hover:animate-pulse relative z-10" />
                  <span className="relative z-10">JOIN Discord</span>
                </Button>
                <Link href="/international/temporary">
                  <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 relative overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28 text-center container mx-auto px-4">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Introducing Novanodes
          </h1>
          <p
            className={`text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Powered by senzdev.xyz, providing ultra-fast cloud hosting solutions with unmatched reliability and
            performance.
          </p>
          <div
            className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button
              size="lg"
              className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Get Started Now <ChevronRight className="w-4 h-4" />
            </Button>
            <Link href="/international/hosting">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                View Game Hosting
              </Button>
            </Link>
          </div>

          {/* Mouse scroll animation */}
          <div className={`mt-16 transition-all duration-700 delay-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            <button onClick={scrollToFeatures} className="inline-flex flex-col items-center group">
              <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-mouse"></div>
              </div>
              <span className="mt-2 text-white/50 text-sm group-hover:text-white/80 transition-colors">
                Scroll to see more
              </span>
            </button>
          </div>
        </section>

        {/* Best EU/NA Hosting */}
        <section id="hosting-section" className="py-16 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                Premium EU/NA Hosting
              </span>
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Experience premium hosting infrastructure located in Europe and North America, ensuring exceptional speed
              for users worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Low Latency</h3>
              <p className="text-white/70">
                Strategically located servers in Europe and North America ensure minimal latency for users across these
                regions.
              </p>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all duration-700 delay-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="bg-indigo-500/20 p-3 rounded-full w-fit mb-6">
                <Cloud className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">99.9% Uptime</h3>
              <p className="text-white/70">
                Our infrastructure ensures your websites and applications stay online with a 99.9% uptime guarantee.
              </p>
            </div>

            <div
              className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-700 delay-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 ${shouldAnimate("hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-white/70">
                Advanced security measures to protect your data and applications from threats.
              </p>
            </div>
          </div>
        </section>

        {/* Combined Features & Security Section */}
        <section id="features-section" ref={featuresRef} className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black opacity-80"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${shouldAnimate("features-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                  Premium Features & Security
                </span>
              </h2>
              <p
                className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${shouldAnimate("features-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                Novanodes offers advanced features and enterprise-grade protection for the best hosting experience.
              </p>
            </div>

            {/* Main Features Card */}
            <div
              className={`max-w-5xl mx-auto bg-gradient-to-br from-black/80 to-indigo-950/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-indigo-500/30 transition-all duration-700 hover:shadow-lg hover:shadow-indigo-500/10 ${shouldAnimate("features-section") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left Column - Features */}
                <div>
                  <div className="inline-block rounded-lg bg-indigo-500/20 px-3 py-1 text-sm text-indigo-400 mb-4">
                    Premium Features
                  </div>

                  <div className="space-y-6">
                    {/* DDoS Protection */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-red-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-red-400 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-red-400 transition-colors">
                          DDoS Protection
                        </h3>
                        <p className="text-white/70 text-sm">
                          Advanced DDoS protection that shields your servers from harmful attacks up to 1Tbps with
                          automatic mitigation.
                        </p>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-green-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-green-400 transition-colors">
                          Multiple Payment Options
                        </h3>
                        <p className="text-white/70 text-sm">
                          Enjoy easy payments with credit cards, PayPal, and various other payment methods for your
                          convenience.
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4 group">
                      <div className="bg-blue-500/20 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-blue-400 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">
                          Strategic Locations
                        </h3>
                        <p className="text-white/70 text-sm">
                          Our servers are located in top data centers across Europe and North America for fast
                          connections with &lt;10ms ping.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Security */}
                <div>
                  <div className="inline-block rounded-lg bg-indigo-500/20 px-3 py-1 text-sm text-indigo-400 mb-4">
                    Advanced Security
                  </div>

                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                    Enterprise-Grade Protection
                  </h3>

                  <p className="text-white/70 mb-6 text-sm">
                    Novanodes uses cutting-edge security technology to protect your data and applications from various
                    cyber threats.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                      <div className="bg-indigo-500/20 p-2 rounded-full mt-0.5">
                        <Lock className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">End-to-End Encryption</h4>
                        <p className="text-white/70 text-xs">Data protected with military-grade encryption.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                      <div className="bg-indigo-500/20 p-2 rounded-full mt-0.5">
                        <Shield className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Advanced Firewall</h4>
                        <p className="text-white/70 text-xs">Adaptive firewall that protects against attacks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                      <div className="bg-indigo-500/20 p-2 rounded-full mt-0.5">
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
                          className="text-indigo-400"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">24/7 Monitoring</h4>
                        <p className="text-white/70 text-xs">Security team monitors systems in real-time.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-black/50 rounded-lg p-4 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-indigo-400 opacity-20" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <div className="w-20 h-20 rounded-full border-4 border-indigo-500/30 border-t-indigo-500"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold">100%</div>
                          <div className="text-xs text-white/70">Protection</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Hosting Preview */}
        <section id="game-hosting-section" className="py-16 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${shouldAnimate("game-hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                Game Hosting Plans
              </span>
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${shouldAnimate("game-hosting-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              High-performance game servers with low latency and premium support for the best gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Package */}
            <div className="plan-card bg-black/30 rounded-lg transition-all duration-300 border-2 border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden relative">
              <div className="light-effect absolute inset-0 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-60"></div>
              <div className="p-6 relative z-10">
                <h4 className="text-lg font-bold">Starter</h4>
                <p className="text-white/70 text-sm">Small server for casual players</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">1 GB RAM</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">2 vCPU</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">20 GB SSD</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">5-10 Players</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    {formatPrice(getPrice("starter"))}
                    <span className="text-sm font-normal text-white/70">/month</span>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500">
                    Select Plan
                  </Button>
                </div>
              </div>
            </div>

            {/* Standard Package */}
            <div className="plan-card bg-indigo-950/20 rounded-lg transition-all duration-300 border-2 border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden relative">
              <div className="light-effect absolute inset-0 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg z-10">
                POPULAR
              </div>
              <div className="p-6 relative z-10">
                <h4 className="text-lg font-bold">Standard</h4>
                <p className="text-white/70 text-sm">Medium server for communities</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">4 GB RAM</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">2 vCPU</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">30 GB SSD</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">15-25 Players</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    {formatPrice(getPrice("standard"))}
                    <span className="text-sm font-normal text-white/70">/month</span>
                  </div>
                  <Button className="w-full mt-3 bg-indigo-500 hover:bg-indigo-600">Select Plan</Button>
                </div>
              </div>
            </div>

            {/* Premium Package */}
            <div className="plan-card bg-blue-950/20 rounded-lg transition-all duration-300 border-2 border-blue-500/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden relative">
              <div className="light-effect absolute inset-0 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-60"></div>
              <div className="p-6 relative z-10">
                <h4 className="text-lg font-bold">Premium</h4>
                <p className="text-white/70 text-sm">Large server for public servers</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">8 GB RAM</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">3 vCPU</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">40 GB SSD</span>
                  <span className="bg-white/10 text-xs px-2 py-1 rounded">30-40 Players</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    {formatPrice(getPrice("premium"))}
                    <span className="text-sm font-normal text-white/70">/month</span>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                    Select Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/international/hosting">
              <Button
                variant="outline"
                className="border-white/20 hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                View All Game Hosting Plans
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="py-16 bg-gradient-to-r from-indigo-900/30 to-blue-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Ready to get started with Novanodes?
            </h2>
            <p
              className={`text-lg text-white/70 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Join thousands of satisfied customers who trust Novanodes with their hosting needs.
            </p>
            <div
              className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-400 ${shouldAnimate("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Button
                size="lg"
                className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Get Started Now <ChevronRight className="w-4 h-4" />
              </Button>
              <Link href="/international/hosting">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  View Game Hosting
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Indonesian Server Option */}
        <section className="py-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Looking for Indonesian Server?
              </h2>
              <p className="text-lg text-white/70 mb-6">
                We also provide high-performance servers in Indonesia with low latency and premium support for users in
                Southeast Asia.
              </p>
              <Link href="/">
                <Button
                  size="lg"
                  className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20"
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

