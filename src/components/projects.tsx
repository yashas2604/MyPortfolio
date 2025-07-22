import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
export function Projects() {
  const projects = [
    {
      title: "Proximity detection and safety gear monitoring system",
      description:
        "Built a YOLOv5-powered system for real-time proximity detection and safety gear monitoring to enhance site safety in industrial zones.",
      image: "/projects/proximity.png",
      technologies: ["YoloV5", "Computer Vision", "Python"],
      liveUrl: "",
      githubUrl: "https://github.com",
    },
    {
      title: "Breast Cancer Detection Model",
      description:
        "Developed a breast cancer detection model using VGG16 and TensorFlow to classify histopathological images with high accuracy.",
      image: "/projects/breastcancer.png",
      technologies: ["VGG16", "TensorFlow", "Python"],
      liveUrl: "",
      githubUrl: "https://github.com",
    },
    // {
    //   title: "Weather Dashboard",
    //   description:
    //     "A responsive weather application with location-based forecasts, interactive maps, and weather alerts.",
    //   image: "/placeholder.svg?height=300&width=400",
    //   technologies: ["Vue.js", "Express.js", "OpenWeather API", "Chart.js"],
    //   liveUrl: "https://example.com",
    //   githubUrl: "https://github.com",
    // },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills.",
      image: "/projects/portfolio.png?",
      technologies: ["Next.js", "Tailwind CSS",],
      liveUrl: "https://yashas2604.vercel.app/",
      githubUrl: "https://github.com/yashas2604/MyPortfolio",
    },
    {
      title: "Feedback form web app for College",
      description: "Building a dynamic feedback form web app to collect, store, and analyze user feedback using React and Supabase.",
      image: "/projects/feedback.png?",
      technologies: ["React", "Supabase"],
      liveUrl: "",
      githubUrl: "https://github.com",
    },
    {
      title: "SongRecogniser",
      description:
        "Implemented an audio fingerprinting system in Python using Librosa and SciPy to recognize songs by matching extracted frequency patterns.",
      image: "/projects/song.png?",
      technologies: ["Librosa", "SciPy", "Python"],
      liveUrl: "",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <Image
                src={project.image}
                alt={project.title}
                width={400} 
                height={300} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                unoptimized={project.image ? false : true} // Optional: skip optimization for external or fallback
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
