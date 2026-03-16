"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        // Using an internal API route to bypass adblockers causing "Failed to fetch"
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => {
                if (data.count !== undefined && data.count !== null) setCount(data.count)
            })
            .catch(err => console.error("VisitorCounter error:", err))
    }, [])

    return (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm transition-colors hover:bg-muted/80 ml-4">
            <Eye className="w-4 h-4 text-primary" />
            <span className="font-medium font-mono">
                {count !== null ? count.toLocaleString() : "..."}
            </span>
            <span className="hidden sm:inline">visitors</span>
        </div>
    )
}