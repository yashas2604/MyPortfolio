/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TextAnimate } from "@/components/magicui/text-animate";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <Image
          src="/profile.jpeg"
          alt="Profile"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20"
          />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
          Hi, I&apos;m{" "}         
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
             Yashas Shetty
          </span>
        </h1>

        {/* <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"> */}
          <TextAnimate animation="blurIn" by="character" duration={2}once className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"> 
          I'm an AIML student with a keen interest in Data Science, NLP & practical ML applications.
          </TextAnimate>
        {/* </p> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <Link href="https://github.com/yashas2604" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com/in/yashas2604/" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:yashas2604@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>

        <Link
          href="#about"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown className="h-5 w-5 animate-bounce" />
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  )
}
