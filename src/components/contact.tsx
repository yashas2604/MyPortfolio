// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Mail, MapPin, Phone } from "lucide-react"

// export function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission here
//     console.log("Form submitted:", formData)
//     // Reset form
//     setFormData({ name: "", email: "", message: "" })
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   return (
//     <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Have a project in mind or want to collaborate? I'd love to hear from you!
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-2xl font-semibold mb-4">Let's work together</h3>
//               <p className="text-muted-foreground mb-6">
//                 I'm always interested in new opportunities and exciting projects. Whether you have a question or just
//                 want to say hi, feel free to reach out!
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-5 w-5 text-primary" />
//                 <span>alex.johnson@example.com</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-5 w-5 text-primary" />
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <MapPin className="h-5 w-5 text-primary" />
//                 <span>San Francisco, CA</span>
//               </div>
//             </div>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Send me a message</CardTitle>
//               <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
//                 </div>
//                 <div>
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="Your Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Textarea
//                     name="message"
//                     placeholder="Your Message"
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Send Message
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   )
// }
