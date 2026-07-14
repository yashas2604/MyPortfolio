"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ProjectModal } from "@/components/project-modal";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  features: string[];
  challenges: string[];
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const projects: Project[] = [
    {
      title: "Proximity detection and safety gear monitoring system",
      description:
        "Built a YOLOv5-powered system for real-time proximity detection and safety gear monitoring to enhance site safety in industrial zones.",
      longDescription:
        "Designed and implemented a real-time safety monitoring system using YOLOv5 for object detection and OpenCV for proximity analysis. The system identifies whether workers in industrial zones are wearing proper personal protective equipment (PPE) like helmets and vests, and alerts supervisors if anyone enters dangerous high-proximity zones near heavy machinery.",
      image: "/projects/proximity.png",
      technologies: ["YOLOv5", "Computer Vision", "Python", "OpenCV"],
      liveUrl: "",
      githubUrl: "",
      category: "Computer Vision",
      features: [
        "Real-time PPE detection (hard hats, safety vests)",
        "Proximity zone warning system using Euclidean distance calculation",
        "Low-latency inference optimized for edge deployment",
        "Supervisor dashboard for real-time alerts"
      ],
      challenges: [
        "Tuned YOLOv5 anchors to detect small objects (like buckles and straps) under varying lighting conditions",
        "Optimized inference speed from 18 FPS to 45 FPS using TensorRT conversion",
        "Minimized false positives in crowded industrial environments"
      ]
    },
    {
      title: "Breast Cancer Detection Model",
      description:
        "Developed a breast cancer detection model using VGG16 and TensorFlow to classify histopathological images with high accuracy.",
      longDescription:
        "Developed a histopathological image classifier using VGG16 transfer learning and TensorFlow to detect breast cancer cells. Achieved 94%+ classification accuracy by implementing custom data augmentation and fine-tuning dense layers to help automate first-level clinical screening of biopsy samples.",
      image: "/projects/breastcancer.png",
      technologies: ["VGG16", "TensorFlow", "Python", "Keras"],
      liveUrl: "",
      githubUrl: "https://github.com/yashas2604/breast-cancer-detection",
      category: "AI/ML",
      features: [
        "Bi-class histopathological slide classification",
        "Data augmentation (rotations, zoom, flips) to counter data imbalance",
        "Integrated Grad-CAM heatmaps for model explainability",
        "User interface for image uploads and inference results"
      ],
      challenges: [
        "Managed high-resolution histopathological slides without running out of GPU memory by designing an efficient batch loader",
        "Handled severe class imbalance using weighted loss functions and focal loss",
        "Fine-tuned hyper-parameters to prevent overfitting on smaller sample datasets"
      ]
    },
    {
      title: "Rag chatbot",
      description:
        "Developed a Retrieval-Augmented Generation (RAG) chatbot using LangChain and Ollama to provide context-aware responses by integrating document retrieval.",
      longDescription:
        "Built a document-aware Retrieval-Augmented Generation (RAG) chatbot using LangChain, Streamlit, and Ollama. The chatbot indexes PDF/Markdown documents, generates semantic embeddings, and stores them in a local vector database to answer user queries with precise document citations and context-aware responses.",
      image: "/projects/rag.png",
      technologies: ["LangChain", "Ollama", "Streamlit", "Python", "ChromaDB"],
      liveUrl: "",
      githubUrl: "https://github.com/yashas2604/RAG_Chatbot",
      category: "AI/ML",
      features: [
        "Local vector search using ChromaDB and Ollama embeddings",
        "Retrieval of source document citations with line-specific references",
        "Streamlined chat UI using Streamlit and custom CSS",
        "Works completely offline for data privacy"
      ],
      challenges: [
        "Optimized text chunk size and overlap parameters (500 chars chunk / 50 chars overlap) to retain contextual integrity",
        "Reduced query latency by implementing query caching and connection pooling",
        "Managed hallucination rates by strictly prompting the model to only answer based on retrieved documents"
      ]
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects, skills, and resume details.",
      longDescription:
        "Developed a modern, lightning-fast portfolio website showcasing personal projects, professional experience, and technical skills. Built with Next.js 15, Tailwind CSS, TypeScript, and Framer Motion for responsive layouts and animations.",
      image: "/projects/portfolio.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "tsparticles"],
      liveUrl: "https://yashas2604.vercel.app/",
      githubUrl: "https://github.com/yashas2604/MyPortfolio",
      category: "Web Development",
      features: [
        "Fully responsive design matching mobile, tablet, and desktop viewports",
        "Fluid theme switching (Dark/Light mode) using next-themes",
        "High-performance particles background and custom magnetic cursor",
        "SEO optimized layout with metadata definitions"
      ],
      challenges: [
        "Optimized initial page load times and core web vitals by lazy loading heavy visual assets and font files",
        "Designed layout transitions using Framer Motion to be fluid yet performant on lower-end devices",
        "Maintained accessible HTML structure (A11y) throughout custom elements"
      ]
    },
    {
      title: "SongRecogniser",
      description:
        "Implemented an audio fingerprinting system in Python using Librosa and SciPy to recognize songs by matching extracted frequency patterns.",
      longDescription:
        "Designed an audio fingerprinting and recognition system in Python. It extracts acoustic landmarks and frequencies using Librosa and SciPy, indexes them in a local database, and matches microphone recordings against the database to identify songs in seconds—similar to Shazam.",
      image: "/projects/song.png",
      technologies: ["Librosa", "SciPy", "Python", "NumPy"],
      liveUrl: "",
      githubUrl: "https://github.com/yashas2604/song-recognizer",
      category: "AI/ML",
      features: [
        "Acoustic fingerprinting using peak detection in spectrograms",
        "High-accuracy matching robust against microphone noise and hums",
        "Database indexing for sub-second retrieval times",
        "Visualize spectrograms and fingerprint constellations"
      ],
      challenges: [
        "Engineered noise-reduction filters to isolate music frequencies from ambient background chatter",
        "Designed hash matching algorithms to search millions of fingerprints in under a second",
        "Handled pitch and speed variations during recording playback"
      ]
    },
    {
      title: "Desktop Companion",
      description:
        "An ultra-lightweight, retro-pixel cat companion for your desktop screen built with Electron and vanilla JS, featuring global mouse tracking, stretch reminders, and a keyboard kneading gym.",
      longDescription:
        "Bekkku is an interactive retro-pixel cat companion that floats always-on-top on your computer screen. It reacts to your mouse cursor globally, kneads its paws as you type, and helps you work productively with stretch reminders and Pomodoro timers. Double-clicking opens a retro settings drawer with a dynamic fur customizer and local persistence configurations.",
      image: "/projects/bekkku.png",
      technologies: ["Electron", "JavaScript", "HTML5", "CSS3", "SVG"],
      liveUrl: "",
      githubUrl: "https://github.com/yashas2604/bekkku",
      category: "Web Development",
      features: [
        "Screen-Space Mouse Chasing & Real-time Eye-Tracking",
        "Keyboard Kneading Gym (Monkeytype Style) with real-time WPM speed reaction",
        "Overheat Mode triggering glowing aura and fast paws animation when typing >60 WPM",
        "Interactive Mochi Drag & Drop with vertical stretching physics",
        "Floating Pomodoro Timer & Stretch Reminders (scales cat 2.5x to prompt break)",
        "Dynamic Fur Customizer with 6 pixel art patterns (Tabby, Tuxedo, Calico, Siamese, Black, White)"
      ],
      challenges: [
        "Engineered a multi-window transparent and frameless Electron view layout with click-through toggle and global event intercepting",
        "Developed custom Low-level Keyboard input listeners (Swift macOS bridge) to track keystrokes globally without lag or security sandbox triggers",
        "Optimized SVG-based crisp pixel art rendering and anim-frames to maintain a constant 0% idle CPU footprint"
      ]
    },
    {
      title: "SpendWise: Intelligent Expense & Budget Tracker",
      description:
        "An AI-powered personal expense and budget tracker featuring Google Gemini AI insights, automated CSV statement importing, and a Telegram bot interface for real-time transaction tracking.",
      longDescription:
        "SpendWise is a personal finance tracker designed to automate expense monitoring. Built with a responsive vanilla frontend and Node.js backend, it aggregates transactional data, generates category budget alerts, and integrates with the Google Gemini API to analyze spending behavior and deliver custom coaching. It features a Telegram bot webhook interface to add transactions dynamically.",
      image: "/projects/spendwise.png",
      technologies: ["Node.js", "Google Gemini API", "Telegram Bot API", "Chart.js", "JavaScript", "CSS3"],
      liveUrl: "",
      githubUrl: "https://github.com/yashas2604/spendwise",
      category: "Web Development",
      features: [
        "Google Gemini AI financial coach integration for monthly spending analyses",
        "Telegram Bot webhook integration to record expenses instantly via chat command",
        "Interactive analytics dashboard featuring Chart.js line charts and KPI metric grid",
        "Dynamic category-wise budget caps with custom visual warning triggers",
        "Fast CSV statement upload parser and export capabilities"
      ],
      challenges: [
        "Structured a custom NLP prompt template to reliably clean, format, and normalize unstructured transaction text strings",
        "Designed a lightweight, secure API proxy server to proxy requests to Generative Language endpoints without client-side credential exposure",
        "Implemented robust data validation and auto-saving system to handle duplicate inputs and ensure data integrity"
      ]
    }
  ];

  const categories = ["All", "AI/ML", "Computer Vision", "Web Development"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.title}
                className="flex"
              >
                <Card className="overflow-hidden flex flex-col w-full hover:shadow-xl hover:border-border/80 transition-all duration-300 group bg-card/40 backdrop-blur-xs">
                  <div
                    onClick={() => handleOpenModal(project)}
                    className="aspect-video overflow-hidden relative cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-background/90 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        Read Details <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-3 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[10px] font-medium border-primary/30 text-primary">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleOpenModal(project)}>
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm mt-2 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px] px-2 py-0.5 rounded-md">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-md">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0 pb-6 px-6 mt-auto shrink-0 border-t border-border/10 pt-4">
                    <Button
                      size="sm"
                      className="flex-1 rounded-full text-xs font-semibold"
                      onClick={() => handleOpenModal(project)}
                    >
                      Details
                    </Button>

                    {project.githubUrl ? (
                      <Button size="sm" variant="outline" asChild className="rounded-full text-xs font-semibold px-3">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3.5 w-3.5" />
                          <span className="sr-only">Code</span>
                        </Link>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="rounded-full text-xs font-semibold px-3 opacity-40 cursor-not-allowed">
                        <Github className="h-3.5 w-3.5" />
                        <span className="sr-only">Code Private</span>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
