"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

const ROLES = ["Full Stack Developer", "Next.js Engineer", "Open to Work"]

export function Hero() {
  const [currentRole, setCurrentRole] = React.useState("")
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const delay = isDeleting ? 0 : 2000

    const timeout = setTimeout(() => {
      const fullText = ROLES[roleIndex]
      if (!isDeleting) {
        setCurrentRole(fullText.substring(0, currentRole.length + 1))
        if (currentRole.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        setCurrentRole(fullText.substring(0, currentRole.length - 1))
        if (currentRole.length === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
    }, currentRole.length === ROLES[roleIndex].length ? delay : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentRole, isDeleting, roleIndex])

  const name = "Pranjal Kautkar"
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 200 } }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="gradient-mesh">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-lg font-medium text-muted-foreground uppercase tracking-wider"
        >
          Hello, I&apos;m
        </motion.p>
        
        <motion.h1
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        >
          {name.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mb-10 h-10">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent border-r-4 border-primary pr-2 animate-pulse">
            {currentRole}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className={`${buttonVariants({ size: "lg" })} group rounded-full gap-2 px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20`}>
            View My Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Button size="lg" variant="outline" className="group rounded-full gap-2 px-8 transition-all duration-300 hover:scale-105 hover:bg-accent dark:hover:bg-accent/50 dark:hover:text-accent-foreground">
            Download CV <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
