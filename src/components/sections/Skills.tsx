"use client"

import { motion } from "framer-motion"
import { Monitor, Server, GitBranch, BrainCircuit, Wrench } from "lucide-react"

const skillGroups = [
  {
    title: "Frontend",
    icon: <Monitor className="w-6 h-6 text-primary" />,
    skills: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6 text-primary" />,
    skills: ["Supabase", "PostgreSQL", "tRPC", "Edge Functions", "Prisma"],
  },
  {
    title: "DevOps",
    icon: <GitBranch className="w-6 h-6 text-primary" />,
    skills: ["Git", "GitHub Actions", "Vercel", "Docker", "pnpm"],
  },
  {
    title: "AI/ML",
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
    skills: ["Vercel AI SDK", "OpenAI API", "LangChain", "Prompt Engineering"],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6 text-primary" />,
    skills: ["Zod", "React Hook Form", "Zustand", "shadcn/ui", "REST APIs"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
}

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Technical Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life. Constantly learning and adapting to the best modern stacks.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all ${
                index === 3 ? "md:col-span-2 lg:col-span-1" : ""
              } ${
                index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {group.icon}
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border/50 transition-colors hover:bg-primary/20 hover:border-primary/30 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
