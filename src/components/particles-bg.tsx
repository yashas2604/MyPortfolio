"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PARTICLES_OPTIONS = {
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
      value: "#888888",
    },
    links: {
      color: "#888888",
      distance: 150,
      enable: true,
      opacity: 0.15,
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
      value: 200,
    },
    opacity: {
      value: { min: 0.1, max: 0.3 },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

export function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 pointer-events-none"
      options={PARTICLES_OPTIONS}
    />
  );
}
