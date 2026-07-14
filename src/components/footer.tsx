import { VisitorCounter } from "@/components/visitorcounter"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Yashas M Shetty. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  )
}
