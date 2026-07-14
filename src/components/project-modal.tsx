"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  features?: string[];
  challenges?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-card border border-border/60 rounded-3xl shadow-2xl z-10 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Banner Image */}
            <div className="relative w-full aspect-video md:h-80 overflow-hidden shrink-0">
              <Image
                src={project.image.endsWith('?') ? project.image.slice(0, -1) : project.image}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                  {project.category}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground drop-shadow-md">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <h4 className="text-lg font-semibold mb-2">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Technical Challenges & Learnings</h4>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3 py-1 rounded-full text-xs font-medium">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40 justify-end">
                {project.githubUrl ? (
                  <Button variant="outline" asChild className="rounded-full">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="rounded-full">
                    <Github className="h-4 w-4 mr-2" />
                    Code Protected
                  </Button>
                )}

                {project.liveUrl ? (
                  <Button asChild className="rounded-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="rounded-full bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    No Live Demo
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
