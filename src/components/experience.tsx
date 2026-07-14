"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

interface ProjectItem {
  title: string;
  description: React.ReactNode;
}

interface ExperienceCard {
  role: string;
  company: string;
  duration: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  skills: string[];
  projects: ProjectItem[];
}

interface ExperienceRowProps {
  card: ExperienceCard;
  index: number;
}

function ExperienceRow({ card, index }: ExperienceRowProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
      {/* Left Column: Sticky Company Metadata */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-4 lg:sticky lg:top-24 h-fit z-20"
      >
        <div className="bg-card/90 backdrop-blur-md border border-border/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Company Logo */}
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-5 border border-border bg-white p-2 flex items-center justify-center shadow-sm">
            <Image
              src={card.src}
              alt={card.company}
              width={160}
              height={160}
              className="object-contain max-w-full max-h-full rounded-lg"
            />
          </div>

          {/* Role & Company */}
          <h3 className="text-xl font-bold text-foreground tracking-tight mb-1">
            {card.role}
          </h3>
          <p className="text-primary font-semibold text-base mb-3">
            {card.company}
          </p>

          {/* Duration Badge */}
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50 mb-6">
            {card.duration}
          </span>

          {/* Technologies */}
          <div className="w-full">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {card.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/40 hover:border-primary/20 hover:bg-secondary/80 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Visit Website Link */}
          {card.ctaLink && card.ctaLink !== "#" && (
            <a
              href={card.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              {card.ctaText} →
            </a>
          )}
        </div>
      </motion.div>

      {/* Right Column: Timeline & Overlapping Project Cards */}
      <div ref={timelineRef} className="lg:col-span-8 relative z-10 pb-16">
        {/* Timeline vertical connector line (background) */}
        <div className="absolute left-4 lg:left-0 top-6 bottom-16 w-[2px] bg-border/40" />

        {/* Timeline active progress line */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-4 lg:left-0 top-6 bottom-16 w-[2px] bg-primary origin-top shadow-[0_0_10px_var(--color-primary)]"
        />

        <div className="space-y-12 pl-10 lg:pl-8">
          {card.projects.map((project, pIdx) => (
            <motion.div
              key={pIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: pIdx * 0.05 }}
              className="relative group sticky z-10"
              style={{
                top: `${96 + pIdx * 24}px`,
                // Adding space at the bottom of the final card to anchor the height
                marginBottom: pIdx === card.projects.length - 1 ? "0px" : "48px"
              }}
            >
              {/* Timeline Node */}
              <div className="absolute -left-[49px] lg:-left-[41px] top-6 w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:scale-125 transition-transform duration-300 shadow-sm shadow-primary/30 group-hover:shadow-md group-hover:shadow-primary/60" />

              {/* Opaque Stacked Project Card */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg shadow-black/5 dark:shadow-black/20">
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h4>
                <div className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                  {project.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light"
          >
            My professional journey and the key projects I&apos;ve built along the way.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
          {cards.map((card, index) => (
            <ExperienceRow key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const cards: ExperienceCard[] = [
  {
    role: "Software Engineering Intern",
    company: "redBus",
    duration: "Oct 2025 - May 2026",
    src: "/redbus.jpeg",
    ctaText: "Visit redBus",
    ctaLink: "https://www.redbus.in",
    skills: ["Java", "Google ADK", "PostgreSQL", "Gemini 2.5", "vLLM", "Ollama", "AI/ML Backend"],
    projects: [
      {
        title: "Key Contributions & Impact",
        description: (
          <ul className="list-disc pl-5 space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
            As a Software Engineering Intern at MakeMyTrip (redBus), I built backend infrastructure for LLM-powered and agentic AI applications using Java, Google Agent Development Kit (ADK), and PostgreSQL. I developed scalable multimodal artifact management and persistence systems, integrated AI agent workflows, and built tools for file analysis and real-time interactions. I contributed to adk-java, mkpro (CLI Agent), and SDK development while improving AI safety through guardrails, prompt injection mitigation, and workflow enhancements. Working in a production environment, I collaborated on software design, testing, code reviews, and documentation to deliver reliable, scalable AI solutions.
          </ul>
        )
      }
    ]
  }
];
