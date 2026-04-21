import { Hero } from "@/components/sections/Hero"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { ProjectsSkeleton } from "@/components/sections/ProjectsSkeleton"
import { Contact } from "@/components/sections/Contact"
import { Header } from "@/components/sections/Header"
import { Footer } from "@/components/sections/Footer"
import { Suspense } from "react"

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header />
      <main className="flex-grow flex flex-col">
        <Hero />
        <Skills />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects searchParams={searchParams} />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
