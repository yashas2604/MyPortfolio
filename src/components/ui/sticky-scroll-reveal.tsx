"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = isDark 
    ? ["#0c0c0e", "#121214", "#080809"] 
    : ["#f8fafc", "#f1f5f9", "#ffffff"];

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
    "linear-gradient(to bottom right, #8b5cf6, #d946ef)", // purple-500 to fuchsia-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex flex-col lg:flex-row justify-center lg:space-x-10 p-6 sm:p-10 rounded-2xl w-full transition-all duration-300 border border-border/40"
      ref={ref}
    >
      <div className="relative flex items-start w-full lg:w-[60%]">
        <div className="w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-16 first:mt-8 last:mb-8">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.25,
                }}
                className="text-xl sm:text-2xl font-bold text-foreground transition-opacity duration-200"
              >
                {item.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.25,
                }}
                className="mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed font-light transition-opacity duration-200"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sticky Right Panel */}
      <div className="lg:w-[40%] flex items-start justify-center relative">
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "sticky top-24 h-64 sm:h-80 w-full max-w-sm overflow-hidden rounded-2xl lg:block flex items-center justify-center shadow-lg border border-white/10 mt-8 lg:mt-0",
            contentClassName,
          )}
        >
          {content[activeCard]?.content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
