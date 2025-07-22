/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: string // ISO date string like "2026-01-01T00:00:00"
  title?: string
}

interface TimeLeft {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({
  targetDate,
  title = "Countdown to Something Cool 🎯",
}: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date()
    const target = new Date(targetDate)

    const delta = Math.max(0, target.getTime() - now.getTime())

    const seconds = Math.floor(delta / 1000) % 60
    const minutes = Math.floor(delta / (1000 * 60)) % 60
    const hours = Math.floor(delta / (1000 * 60 * 60)) % 24
    const daysTotal = Math.floor(delta / (1000 * 60 * 60 * 24))

    // Rough estimates for months and years
    const years = Math.floor(daysTotal / 365)
    const months = Math.floor((daysTotal % 365) / 30)
    const days = (daysTotal % 365) % 30

    return { years, months, days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex flex-wrap justify-center gap-4 text-primary text-xl sm:text-2xl font-semibold">
          <span>{timeLeft.years}y</span>
          <span>{timeLeft.months}mo</span>
          <span>{timeLeft.days}d</span>
          <span>{timeLeft.hours}h</span>
          <span>{timeLeft.minutes}m</span>
          <span>{timeLeft.seconds}s</span>
        </div>
      </div>
    </section>
  )
}