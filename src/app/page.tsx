import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
// import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import Countdown from "@/components/countdown" 
import { Analytics } from "@vercel/analytics/next"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
    <Analytics />
      <Header />
      <main>
        <Hero />
       <main>
        <Countdown targetDate="2026-01-01T00:00:00" title="Countdown to New Year 2026 " />
      </main> 
        <About />
        {/* <Skills /> */}
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}