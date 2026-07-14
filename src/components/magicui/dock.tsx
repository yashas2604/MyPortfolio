"use client"

import React, { PropsWithChildren, useRef, useContext, createContext, useState, useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import type { MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-11 sm:h-[58px] w-max items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-2xl border p-1.5 sm:p-2 backdrop-blur-md"
)

interface DockContextType {
  mouseX: MotionValue<number>
  iconSize: number
  iconMagnification: number
  iconDistance: number
  disableMagnification: boolean
}

const DockContext = createContext<DockContextType | null>(null)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const mql = window.matchMedia("(max-width: 640px)")
      setIsMobile(mql.matches)
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
      mql.addEventListener("change", handler)
      return () => mql.removeEventListener("change", handler)
    }, [])

    const activeSize = isMobile ? 24 : iconSize
    const activeMagnification = isMobile ? 34 : iconMagnification
    const activeDistance = isMobile ? 50 : iconDistance

    return (
      <DockContext.Provider
        value={{
          mouseX,
          iconSize: activeSize,
          iconMagnification: activeMagnification,
          iconDistance: activeDistance,
          disableMagnification,
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          })}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size,
  magnification,
  disableMagnification,
  distance,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const defaultMouseX = useMotionValue(Infinity)
  const context = useContext(DockContext)

  const activeMouseX = mouseX ?? context?.mouseX ?? defaultMouseX
  const activeSize = size ?? context?.iconSize ?? DEFAULT_SIZE
  const activeMagnification = magnification ?? context?.iconMagnification ?? DEFAULT_MAGNIFICATION
  const activeDistance = distance ?? context?.iconDistance ?? DEFAULT_DISTANCE
  const activeDisableMagnification = disableMagnification ?? context?.disableMagnification ?? DEFAULT_DISABLEMAGNIFICATION

  const distanceCalc = useTransform(activeMouseX, (val: number) => {
    if (val === Infinity) return activeDistance
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    const dist = val - bounds.x - bounds.width / 2
    console.log("Proximity debug:", { val, boundsX: bounds.x, dist, activeDistance })
    return dist
  })

  const targetSize = activeDisableMagnification ? activeSize : activeMagnification

  const sizeTransform = useTransform(
    distanceCalc,
    [-activeDistance, 0, activeDistance],
    [activeSize, targetSize, activeSize],
    { clamp: true }
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        activeDisableMagnification && "hover:bg-muted-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
