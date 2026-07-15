"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { FluidBg } from "@/components/fluid-bg"

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const progressRef = useRef(0)
  const phaseRef = useRef(0)
  const pathRef = useRef<SVGPathElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    let startTimestamp: number | null = null
    const duration = 2800 // 2.8 seconds loading time
    let animationFrameId: number

    const tick = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp

      // Update wave phase (smooth ripple motion)
      phaseRef.current = (phaseRef.current + 0.08) % (Math.PI * 2)

      // Calculate progress (non-linear to feel like a real assets load)
      let newProgress = 0
      if (elapsed >= duration) {
        newProgress = 100
      } else {
        const t = elapsed / duration
        if (t < 0.3) {
          newProgress = (t / 0.3) * 35
        } else if (t < 0.6) {
          newProgress = 35 + ((t - 0.3) / 0.3) * 20
        } else if (t < 0.85) {
          newProgress = 55 + ((t - 0.6) / 0.25) * 35
        } else {
          newProgress = 90 + ((t - 0.85) / 0.15) * 10
        }
      }

      const roundedProgress = Math.min(Math.round(newProgress), 100)
      progressRef.current = roundedProgress
      setProgress(roundedProgress)

      // SVG Coordinate Space Math for Wave
      // viewBox is 1500 x 350
      const W = 1500
      const H = 350
      const startX = -60
      const endX = W + 60
      const X_0 = startX + (roundedProgress / 100) * (endX - startX)
      
      // Amplitude rises to 25px in the middle of progress and damps to 0px at start and end
      const maxAmp = 25
      const amp = maxAmp * Math.sin((roundedProgress / 100) * Math.PI)
      const freq = 2.2 // number of full wave cycles over height

      let pathD = `M ${startX} 0`
      const steps = 60
      for (let i = 0; i <= steps; i++) {
        const y = (i / steps) * H
        const angle = (y / H) * Math.PI * 2 * freq + phaseRef.current
        const x = X_0 + amp * Math.sin(angle)
        pathD += ` L ${x} ${y}`
      }
      pathD += ` L ${startX} ${H} L ${startX} 0 Z`

      if (pathRef.current) {
        pathRef.current.setAttribute("d", pathD)
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick)
      } else {
        // Halt at 100% loaded and wait for user click to enter portfolio
        setIsLoaded(true)
      }
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Format progress as 3-digit string (e.g. 000, 040, 100)
  const formatProgress = (val: number) => {
    return val.toString().padStart(3, "0")
  }

  const handleEnter = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExiting(true)
    // Wait for the exit fade-out transition, then navigate to /portfolio
    setTimeout(() => {
      router.push("/portfolio")
    }, 850)
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden bg-[#08080a]"
        >
          {/* Always Dark Gold WebGL Fluid Background (Absolute to fill full parent) */}
          <FluidBg forceDark={true} />

          {/* Interactive Text/Layout Overlay (Absolute to layer on top of background, pointer-events-none to let drags pass to WebGL) */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 select-none bg-transparent text-[#f5f5f3] pointer-events-none font-mono text-xs uppercase tracking-[0.2em] w-full h-full">
            {/* Top Header Row */}
            <div className="flex justify-between w-full opacity-80 pointer-events-none">
              <div></div>
              <div>DEVELOPER</div>
            </div>

            {/* Center Name Layer */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-center py-12 pointer-events-none">
              <svg
                viewBox="0 0 1500 350"
                className="w-full h-auto"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <clipPath id="fluid-clip">
                    <path ref={pathRef} d="M -60 0 L -60 0 L -60 350 L -60 350 Z" />
                  </clipPath>
                </defs>

                {/* Background Outline Text */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  style={{
                    fontFamily: "var(--font-bodoni-moda), serif",
                    fontSize: "190px",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  YASHAS SHETTY
                </text>

                {/* Foreground Solid Filled Text (Clipped by the Wave) */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  clipPath="url(#fluid-clip)"
                  style={{
                    fontFamily: "var(--font-bodoni-moda), serif",
                    fontSize: "190px",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  YASHAS SHETTY
                </text>
              </svg>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end w-full pointer-events-none">
              {/* Bottom Left Counter */}
              <div className="flex items-baseline leading-none">
                <span
                  className="text-[8vw] sm:text-[4rem] font-medium mr-3 select-none"
                  style={{
                    fontFamily: "var(--font-bodoni-moda), serif",
                    lineHeight: "0.9",
                  }}
                >
                  {formatProgress(progress)}
                </span>
                <span className="text-[10px] tracking-normal opacity-50 select-none">/ 100</span>
              </div>

              {/* Bottom Right Details */}
              <div className="text-right flex flex-col gap-2 opacity-80">
                {!isLoaded ? (
                  <div className="text-[10px] opacity-60 animate-pulse">PLEASE WAIT A MOMENT</div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onClick={handleEnter}
                    className="mt-1 px-5 py-2.5 rounded-full border border-[#f5f5f3]/15 bg-[#f5f5f3]/5 hover:bg-[#f5f5f3]/10 hover:border-[#f5f5f3]/35 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold tracking-widest text-[#f5f5f3]"
                  >
                    <span>PORTFOLIO</span>
                    <span className="text-sm font-light">→</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
