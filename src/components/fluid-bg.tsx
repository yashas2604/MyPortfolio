"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function FluidBg({ forceDark = false }: { forceDark?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null)
  const { resolvedTheme } = useTheme()
  const isLight = !forceDark && resolvedTheme === "light"

  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance: any = null

    const initFluid = async () => {
      if (!containerRef.current) return
      
      const mod = await import("webgl-fluid-enhanced")
      if (cancelled || !containerRef.current) return
      
      const WebGLFluidEnhanced = mod.default ?? mod
      instance = new WebGLFluidEnhanced(containerRef.current)
      instanceRef.current = instance

      instance.setConfig({
        hover: true,
        simResolution: 128,
        dyeResolution: 1024,
        densityDissipation: 1.2,
        velocityDissipation: 1.6,
        pressure: 0.82,
        curl: 28,
        splatRadius: 0.22,
        splatForce: 6500,
        shading: true,
        colorful: true,
        colorUpdateSpeed: 8,
        colorPalette: isLight
          ? ["#8B3E1F", "#B96A3A", "#E89B6B", "#5C2B14", "#7A3619"]
          : ["#F5C6A5", "#E89B6B", "#B96A3A", "#8B3E1F", "#F1E7DD"],
        backgroundColor: isLight ? "#f5f5f3" : "#08080a",
        transparent: false,
        brightness: 0.6,
        bloom: true,
        bloomIterations: 8,
        bloomResolution: 256,
        bloomIntensity: 0.75,
        bloomThreshold: 0.55,
        bloomSoftKnee: 0.7,
        sunrays: true,
        sunraysResolution: 196,
        sunraysWeight: 1.0,
      })

      instance.start()
      instance.multipleSplats?.(6)
    }

    initFluid()

    return () => {
      cancelled = true
      try {
        instance?.stop()
      } catch (err) {
        console.error("Error stopping webgl fluid:", err)
      }
      instanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dynamically update config on theme change
  useEffect(() => {
    const instance = instanceRef.current
    if (instance) {
      instance.setConfig({
        backgroundColor: isLight ? "#f5f5f3" : "#08080a",
        colorPalette: isLight
          ? ["#8B3E1F", "#B96A3A", "#E89B6B", "#5C2B14", "#7A3619"]
          : ["#F5C6A5", "#E89B6B", "#B96A3A", "#8B3E1F", "#F1E7DD"],
      })
    }
  }, [isLight])

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
    />
  )
}
