"use client"
import { Badge } from "@/components/ui/badge"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MagicCard } from "@/components/magicui/magic-card"

import { useTheme } from "next-themes"

export function Skills() {
  const { theme } = useTheme();
  const skillCategories = [
    {
      title: "Machine Learning",
      skills: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "Keras"],
    },
    {
      title: "Computer Vision",
      skills: ["OpenCV", "YOLOv5", "Image Processing", "Object Detection"],
    },
    {
      title: "Deep Learning",
      skills: ["Neural Networks", "CNNs", "RNNs", "Transformers"],
    },
    {
      title: "NLP & Generative AI",
      skills: ["LLMs", "GPT-3", "BERT", "Text Generation", "RAG", "Langchain"],
    },
    {
      title: "Web Development",
      skills: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "Vercel", "Figma"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A snapshot of the technologies, frameworks, and tools I work with across AI/ML and web development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <MagicCard
              key={index}
              className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-background p-0"  
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-center text-primary">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}