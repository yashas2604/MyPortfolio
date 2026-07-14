"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export function ParticlesBg() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const isDark = resolvedTheme === "dark";
  const particleColor = isDark ? "#ffffff" : "#0f172a";
  const linkColor = isDark ? "#ffffff" : "#0f172a";

  const options = useMemo(() => ({
    fpsLimit: 120,
    fullScreen: { enable: false },
    interactivity: {
      detectsOn: "window" as const,
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.25,
          },
        },
        push: {
          quantity: 3,
        },
      },
    },
    particles: {
      color: {
        value: particleColor,
      },
      links: {
        color: linkColor,
        distance: 150,
        enable: true,
        opacity: 0.08,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 250,
      },
      opacity: {
        value: { min: 0.05, max: 0.2 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), [particleColor, linkColor]);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 pointer-events-none"
      options={options}
    />
  );
}
