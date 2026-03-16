"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function Experience() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the experiences that have shaped my skills.
          </p>
        </div>

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-[100]"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[101] p-4 sm:p-0">
              <motion.button
                key={`button-${active.role}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.company}-${id}`}
                ref={ref}
                className="w-full max-w-[700px] h-full md:h-fit md:max-h-[85%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                <motion.div layoutId={`image-${active.company}-${id}`}>
                  <Image
                    width={800}
                    height={400}
                    src={active.src}
                    alt={active.company}
                    className="w-full h-48 lg:h-64 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                  />
                </motion.div>

                <div className="overflow-hidden flex flex-col min-h-0 relative">
                  <div className="flex justify-between items-start p-4 sm:p-6 shrink-0">
                    <div className="">
                      <motion.h3
                        layoutId={`title-${active.role}-${id}`}
                        className="font-bold text-xl sm:text-2xl text-neutral-700 dark:text-neutral-200"
                      >
                        {active.role}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.company}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg font-medium mt-1"
                      >
                        {active.company} • {active.duration}
                      </motion.p>
                    </div>

                    <motion.a
                      layoutId={`button-${active.company}-${id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-primary text-primary-foreground hidden sm:block"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  <div className="pt-2 relative px-4 sm:px-6 flex-1 min-h-0 overflow-y-auto">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-sm md:text-base pb-10 flex flex-col items-start gap-4 dark:text-neutral-400"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <ul className="max-w-3xl mx-auto w-full gap-6 flex flex-col">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.company}-${id}`}
              key={`card-${card.company}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center hover:bg-muted/50 dark:hover:bg-neutral-800/50 rounded-2xl cursor-pointer bg-card border shadow-sm transition-colors border-l-4 border-l-primary"
            >
              <div className="flex gap-4 sm:gap-6 flex-col md:flex-row w-full md:w-auto items-center md:items-start">
                <motion.div layoutId={`image-${card.company}-${id}`} className="shrink-0">
                  <Image
                    width={200}
                    height={200}
                    src={card.src}
                    alt={card.company}
                    className="h-48 w-full md:h-20 md:w-20 rounded-xl object-cover object-center shadow-sm"
                  />
                </motion.div>
                <div className="flex flex-col text-center md:text-left justify-center">
                  <motion.h3
                    layoutId={`title-${card.role}-${id}`}
                    className="font-bold text-neutral-800 dark:text-neutral-200 text-lg sm:text-xl"
                  >
                    {card.role}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.company}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 font-medium"
                  >
                    {card.company}
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-1 block md:hidden">
                    {card.duration}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-sm font-medium text-muted-foreground hidden md:block whitespace-nowrap bg-muted/50 px-3 py-1 rounded-full">
                  {card.duration}
                </p>
                <motion.button
                  layoutId={`button-${card.company}-${id}`}
                  className="px-5 py-2 text-sm rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors w-full md:w-auto"
                >
                  {card.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// You can swap the src with a nicer image or redbus logo in the public folder.
const cards = [
  {
    role: "Software Engineering Intern",
    company: "redBus",
    duration: "Oct 2025 - Present",
    src: "/redbus.jpeg",
    ctaText: "Read More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="flex flex-col gap-4 text-base leading-relaxed">
          <p>
            During my internship at <strong>redBus</strong>, I worked extensively on building and improving AI-powered backend systems using Java and Google’s Agent Development Kit (ADK). In the initial phase, I focused on understanding ADK’s architecture, particularly how artifacts are generated, stored, and retrieved within agent workflows. I experimented with in-memory artifacts and later implemented persistent storage using PostgreSQL by studying and extending the PostgresArtifactService and PostgresArtifactStore implementations. This allowed artifacts generated by agents to be reliably stored and accessed across sessions, improving the robustness of agent-based workflows.
          </p>
          <p>
            One of my key contributions involved building backend infrastructure for the RedBus AI Assistant (Ray). I implemented services to store audio inputs coming from different platforms such as MobWeb and iOS into a PostgreSQL database as artifacts. This required handling binary payloads, ensuring reliable persistence, and designing APIs for storing and retrieving audio data. To support internal debugging and analysis, I also developed an internal Artifact Browser web application that allowed developers to view stored artifacts, inspect metadata, and download files generated by various agent workflows.
          </p>
          <p>
            I also worked on developing an internal Bus Amenity Detection application using Java ADK and the Gemini 2.5 Flash model. The system analyzed bus images and detected amenities by generating structured outputs that included amenity labels and bounding box coordinates. Uploaded images were stored as artifacts in PostgreSQL, while detection results were structured as JSON for easier analysis. The application also supported exporting results in multiple formats such as JSON, TXT, and Excel, making it easier for internal teams to analyze detection outputs and perform testing.
          </p>
          <p>
            Throughout the internship, I continuously improved internal tooling by fixing bugs, optimizing workflows, and improving system reliability. This included refining prompt structures for consistent model responses, improving artifact retrieval performance, and stabilizing the artifact browser and amenity detection systems. I also built a backend agent capable of analyzing files uploaded in requests, enabling frontend developers to test their SDK integrations by attaching files and receiving structured analysis results.
          </p>
          <p>
            Towards the later phase of my internship, I explored advanced LLM infrastructure topics such as high-throughput inference using vLLM. I researched how GPU-accelerated inference and continuous batching could improve throughput for locally served models, particularly when integrating with model-serving frameworks like Ollama. Alongside this research, I continued enhancing existing AI tools and internal developer utilities, gaining hands-on experience in AI systems engineering, backend development, and scalable LLM infrastructure.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Java", "ADK", "PostgreSQL", "Gemini 2.5", "vLLM", "Ollama", "AI/ML Backend"].map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      );
    },
  }
];
