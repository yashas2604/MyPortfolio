import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"
import Image from "next/image"
import { PixelImage } from "@/components/magicui/pixel-image";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I&apos;m an enthusiastic AI/ML engineer with a strong drive to build impactful solutions by combining
            real-world problem solving with intelligent systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-1 md:gap-x-2 md:gap-y-2 mb-16 items-start ">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/myself.jpeg"
              alt="Workspace"
              width={385}
              height={385}
              className="rounded-lg shadow-lg"
            />

          </div>
          <div className="space-y-8 md:space-y-6">
            <p className="text-lg text-muted-foreground">
              My journey into AI/ML started with a deep curiosity about how intelligent systems work. I’ve worked on
              projects like safety gear detection using YOLOv5 and a placement tracking dashboard to simplify college workflows.
            </p>
            <p className="text-lg text-muted-foreground">
              I enjoy exploring deep learning, computer vision, and building intuitive full-stack applications with
              modern frameworks. I aim to create solutions that are not only technically sound but also meaningful and
              helpful to users.
            </p>
            <p className="text-lg text-muted-foreground">
              When I&apos;m not coding, you’ll find me planning new ideas, helping peers, or pushing my limits — on the road
              with my bike or with lines of code.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Code</h3>
              <p className="text-muted-foreground">
                Writing clean, scalable code with Python and frameworks like PyTorch and TensorFlow to power intelligent systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Palette className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Human-Centric Design</h3>
              <p className="text-muted-foreground">
                Building seamless and intuitive UIs using React and ShadCN to bridge AI insights with real-world usability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Performance & Impact</h3>
              <p className="text-muted-foreground">
                Optimizing ML models and web apps for performance and reliability — because impact matters more than just output.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}