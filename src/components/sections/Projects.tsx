/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/lib/supabase/server"
import { ProjectFilter } from "./ProjectFilter"
import { Badge } from "@/components/ui/badge"
import { Code2, ExternalLink, Star } from "lucide-react"

// Fallback mock if Supabase connection fails or is unconfigured
const mockProjects = [
  { id: '1', title: 'NextGen E-Commerce', description: 'A high-performance modern e-commerce platform built with Next.js App Router, Stripe integration, and Supabase backend with robust type-safety.', tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Stripe'], github_url: '#', live_url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop', featured: true },
  { id: '2', title: 'AI Content Generator', description: 'An intelligent application leveraging OpenAI API to generate marketing copy, blog posts, and SEO metadata automatically via Prompt Engineering.', tags: ['TypeScript', 'OpenAI', 'Vercel AI SDK', 'shadcn/ui'], github_url: '#', live_url: '#', thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop', featured: true },
  { id: '3', title: 'Real-time Chat Application', description: 'A real-time messaging app featuring channels, direct messages, and presence indicators using Supabase Realtime subscriptions.', tags: ['React', 'Supabase Realtime', 'Zustand', 'Framer Motion'], github_url: '#', live_url: null, thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop', featured: false }
]

export async function Projects({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const tagFilter = typeof params.tag === 'string' ? params.tag : undefined

  // Attempt to fetch from DB
  const supabase = await createClient()
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
  
  if (tagFilter) {
    query = query.contains('tags', [tagFilter])
  }
  
  const { data, error } = await query
  
  // Use DB data if successful and not empty, else fall back to mock gracefully
  const isMock = !data || data.length === 0 || error
  let projects = isMock ? mockProjects : data
  
  // Apply manual filter if falling back to mock dataset
  if (isMock && tagFilter) {
    projects = projects.filter(p => p.tags.includes(tagFilter))
  }
  
  // Generate filter tags from the active dataset
  const baseData = isMock ? mockProjects : data
  const allUniqueTags = Array.from(new Set(baseData.flatMap((p: { tags: string[] }) => p.tags)))

  return (
    <section id="projects" className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
        {/* Subtle mesh light for depth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Selected Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent projects featuring real-time systems, AI integration, and full-stack architecture.
          </p>
        </div>
        
        <ProjectFilter allTags={allUniqueTags} currentTag={tagFilter} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {projects.map((project: any) => (
            <div key={project.id} className="group relative rounded-3xl border bg-card/60 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge variant="default" className="gap-1 shadow-lg bg-primary/90 backdrop-blur text-primary-foreground border-none">
                    <Star className="w-3.5 h-3.5 fill-current" /> Featured
                  </Badge>
                </div>
              )}
              
              <div className="relative h-56 overflow-hidden bg-secondary/50">
                {project.thumbnail_url ? (
                  <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Preview</div>
                )}
                
                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-10">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-md hover:scale-110">
                      <Code2 className="w-5 h-5" />
                      <span className="sr-only">Source Code</span>
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-all shadow-md">
                      <ExternalLink className="w-5 h-5" />
                      <span className="sr-only">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm line-clamp-3 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-2.5 py-0.5 text-xs font-medium bg-secondary/60">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-medium">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects found matching the selected tag.
          </div>
        )}
      </div>
    </section>
  )
}
