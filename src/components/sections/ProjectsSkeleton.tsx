import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsSkeleton() {
  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-3xl border bg-card/60 overflow-hidden shadow-sm flex flex-col">
              <Skeleton className="h-56 w-full rounded-none" />
              <div className="p-6 flex-1 flex flex-col">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <div className="flex gap-2 mt-auto">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
