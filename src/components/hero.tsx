/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { ParticlesBg } from "@/components/particles-bg"

const asciiLogo = [
  "  ██╗   ██╗ █████╗ ███████╗██╗  ██╗ █████╗ ███████╗    ███████╗██╗  ██╗███████╗████████╗████████╗██╗   ██╗",
  "  ╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║██╔══██╗██╔════╝    ██╔════╝██║  ██║██╔════╝╚══██╔══╝╚══██╔══╝╚██╗ ██╔╝",
  "   ╚████╔╝ ███████║███████╗███████║███████║███████╗    ███████╗███████║█████╗     ██║      ██║    ╚████╔╝ ",
  "    ╚██╔╝  ██╔══██║╚════██║██╔══██║██╔══██║╚════██║    ╚════██║██╔══██║██╔══╝     ██║      ██║     ╚██╔╝  ",
  "     ██║   ██║  ██║     ██║██║  ██║██║  ██║     ██║         ██║██║  ██║██║        ██║      ██║      ██║   ",
  "     ██║   ██║  ██║███████║██║  ██║██║  ██║███████║    ███████║██║  ██║███████╗   ██║      ██║      ██║   ",
  "     ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝      ╚═╝   "
];

const maxLength = asciiLogo[0].length;

export function Hero() {
  const [colCount, setColCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll Transforms for Scroll-driven animations
  // Avatar moves from center (y: 90px) to top (y: -15px)
  const avatarY = useTransform(scrollYProgress, [0, 0.55], [90, -15]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.55], [1.35, 0.95]);



  // Name fades in, slides up and scales up from 0.25 to 0.65 scroll
  const nameOpacity = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.25, 0.65], [40, -10]);
  const nameScale = useTransform(scrollYProgress, [0.25, 0.65], [0.92, 1]);

  // Tagline/Description fades in and slides up from 0.45 to 0.8 scroll
  const descOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.45, 0.8], [25, 0]);

  // Action Buttons and Socials fade in and slide up from 0.65 to 0.95 scroll
  const actionsOpacity = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const actionsY = useTransform(scrollYProgress, [0.65, 0.95], [15, 0]);

  // Scroll Down Indicator fades out immediately when scroll starts
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Dissolving background glow behind starting position of photo
  const bgOpacity = useTransform(scrollYProgress, [0, 0.45], [0.8, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.45], [1.2, 0.6]);

  // Bind ASCII character reveal directly to scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setColCount(0);
    } else if (latest > 0.65) {
      setColCount(maxLength);
    } else {
      const progress = (latest - 0.25) / (0.65 - 0.25);
      setColCount(Math.floor(progress * maxLength));
    }
  });

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[180vh] w-full bg-background"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16">
        <ParticlesBg />

        {/* Visual Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Dissolving Photo Background Glow */}
        <motion.div
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-primary/30 via-violet-500/15 to-blue-500/20 rounded-full blur-3xl -z-20 pointer-events-none"
        />

        {/* Center Content Area */}
        <div className="text-center max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center">



          {/* Glowing Avatar */}
          <motion.div
            style={{ y: avatarY, scale: avatarScale }}
            className="relative z-20 pointer-events-none select-none animate-fade-in"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-primary/40 rounded-full blur-md opacity-25" />
            <Image
              src="/pixelyashas.png"
              alt="Profile"
              width={140}
              height={140}
              className="w-36 h-36 rounded-full border-4 border-background shadow-2xl object-cover relative z-10"
              priority
            />
          </motion.div>

          {/* ASCII Name Typography */}
          <motion.div
            style={{ opacity: nameOpacity, y: nameY, scale: nameScale }}
            className="w-full flex flex-col items-center justify-center min-h-[120px] mb-6 relative z-10"
          >
            <pre className="font-mono text-[4px] xs:text-[5px] sm:text-[7.5px] md:text-[9px] lg:text-[10px] leading-[1.1] text-primary select-none overflow-x-hidden whitespace-pre text-left max-w-full drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]">
              {asciiLogo.map((line, idx) => {
                const visibleText = line.slice(0, colCount);
                const showCursor = colCount > 0 && colCount < maxLength && idx === 3;
                return (
                  <span key={idx} className="block">
                    {visibleText}
                    {showCursor && <span className="animate-pulse">█</span>}
                  </span>
                );
              })}
            </pre>
          </motion.div>

          {/* Description */}
          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="max-w-2xl mx-auto mb-8 relative z-10"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              I'm an AIML student with a keen interest in GEN AI and building AI agents.
            </p>
          </motion.div>

          {/* Actions & Social Links */}
          <motion.div
            style={{ opacity: actionsOpacity, y: actionsY }}
            className="flex flex-col items-center justify-center gap-6 relative z-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full hover:bg-muted/50 transition-all duration-300">
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <Link href="https://github.com/yashas2604" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/yashas2604/" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:yashas2604@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>

          {/* Mouse Scroll Indicator */}
          {/* <motion.div
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
          >
            <span className="text-[10px] tracking-[0.2em] font-semibold text-muted-foreground uppercase animate-pulse">
              Scroll down
            </span>
            <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
          </motion.div> */}

        </div>
      </div>
    </section>
  )
}
