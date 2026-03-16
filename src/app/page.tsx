import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">

      <Analytics />
      <Header />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}