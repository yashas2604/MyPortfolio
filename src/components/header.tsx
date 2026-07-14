"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#home" className="text-2xl font-bold">
            <span className="font-serif">Yashas</span>
          </Link>

          <nav className="flex items-center gap-4">

            <AnimatedThemeToggler />
          </nav>
        </div>
      </div>
    </header>
  )
}
