"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code2 } from "lucide-react"

export function Header() {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contacts", href: "#contact" },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">Pranjal.</span>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center pl-4 border-l border-border/40">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
