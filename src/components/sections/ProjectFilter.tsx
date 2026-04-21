"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ProjectFilter({ allTags, currentTag }: { allTags: string[], currentTag?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setTag = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag) {
      if (params.get("tag") === tag) {
        params.delete("tag") // toggle off if clicking the same tag
      } else {
        params.set("tag", tag)
      }
    } else {
      params.delete("tag")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      <Button 
        variant={!currentTag ? "default" : "outline"} 
        onClick={() => setTag(null)}
        className="rounded-full shadow-sm"
      >
        All
      </Button>
      {allTags.map(tag => (
        <Button
          key={tag}
          variant={currentTag === tag ? "default" : "outline"}
          onClick={() => setTag(tag)}
          className="rounded-full shadow-sm"
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}
