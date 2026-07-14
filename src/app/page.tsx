import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Code2 as Code2Icon,
  FolderGit2 as FolderGit2Icon,
  Mail as MailIcon,
  FileText as FileTextIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type IconProps = React.HTMLAttributes<SVGElement>

const Icons = {
  github: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  linkedin: (props: IconProps) => (
    // <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    //   <title>LinkedIn</title>
    //   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512" id="linkedin" {...props}>
      <rect width="512" height="512" fill="#0077b5" rx="15%"></rect>
      <circle cx="142" cy="138" r="37"></circle>
      <path stroke="#fff" strokeWidth="66" d="M244 194v198M142 194v198"></path>
      <path d="M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32"></path>
    </svg>
  ),
  instagram: (props: IconProps) => (
    // <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    //   <title>Instagram</title>
    //   <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    //   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    //   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" id="instagram" {...props}>
      <defs>
        <radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse">
          <stop offset=".09" stopColor="#fa8f21"></stop>
          <stop offset=".78" stopColor="#d82d7e"></stop>
        </radialGradient>
        <radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse">
          <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#8c3aaa"></stop>
        </radialGradient>
      </defs>
      <path fill="url(#a)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
      <path fill="url(#b)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
      <path fill="#fff" d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229" transform="translate(-422.637 -426.196)"></path>
    </svg>
  ),
}

const DATA = {
  navbar: [
    { href: "#home", icon: HomeIcon, label: "Home" },
    { href: "#about", icon: UserIcon, label: "About" },
    { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
    { href: "#skills", icon: Code2Icon, label: "Skills" },
    { href: "#projects", icon: FolderGit2Icon, label: "Projects" },
    { href: "#contact", icon: MailIcon, label: "Contact" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/yashas2604",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/yashas2604/",
        icon: Icons.linkedin,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/yashas.m.shetty/",
        icon: Icons.instagram,
      },
      email: {
        name: "Send Email",
        url: "mailto:yashas2604@gmail.com",
        icon: MailIcon,
      },
      Resume: {
        name: "Resume",
        url: "/yashas_resume_1 copy.pdf",
        icon: FileTextIcon,
      }
    },
  },
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Header />
      <ScrollProgress />

      {/* Floating Bottom Navigation Dock (Styled with Tooltips ) */}
      <TooltipProvider>
        <Dock
          iconMagnification={60}
          iconDistance={100}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-2xl border border-border/40 bg-background/60 dark:bg-black/60"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="size-full flex items-center justify-center text-foreground/80 hover:text-primary transition-colors p-1.5 sm:p-3"
                  >
                    <item.icon className="size-full" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-8 my-auto bg-border/60" />

          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    target={name === "email" ? undefined : "_blank"}
                    rel={name === "email" ? undefined : "noopener noreferrer"}
                    className="size-full flex items-center justify-center text-foreground/80 hover:text-primary transition-colors p-1.5 sm:p-3"
                  >
                    <social.icon className="size-full" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}