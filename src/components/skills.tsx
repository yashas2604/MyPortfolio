// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export function Skills() {
//   const skillCategories = [
//     {
//       title: "Frontend",
//       skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5", "CSS3", "JavaScript"],
//     },
//     {
//       title: "Backend",
//       skills: ["Node.js", "Python", "Express.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
//     },
//     {
//       title: "Tools & Others",
//       skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest", "Cypress", "Linux"],
//     },
//   ]

//   return (
//     <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Here are the technologies and tools I work with to bring ideas to life.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {skillCategories.map((category, index) => (
//             <Card key={index}>
//               <CardHeader>
//                 <CardTitle className="text-center">{category.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-wrap gap-2 justify-center">
//                   {category.skills.map((skill, skillIndex) => (
//                     <Badge key={skillIndex} variant="secondary">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
