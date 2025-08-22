// "use client"

// import { useEffect, useState } from "react"

// export function VisitorCounter() {
//   const [count, setCount] = useState<number | null>(null)

//   useEffect(() => {
//     fetch("https://counterapi.dev/counter?increment=true&name=yashas2604-portfolio")
//       .then(res => res.json())
//       .then(data => setCount(data.count))
//       .catch(err => console.error("VisitorCounter error:", err))
//   }, [])

//   return (
//     <p className="text-sm text-muted-foreground">
//       👀 {count !== null ? `${count} visitors so far` : "Loading..."}
//     </p>
//   )
// }