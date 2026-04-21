const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3.1-.3 6.4-1.5 6.4-6.9 0-1.5-.5-2.8-1.4-3.8.1-.3.6-1.8-.1-3.8 0 0-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8c-.7 2-.2 3.5-.1 3.8-.9 1-1.4 2.3-1.4 3.8 0 5.4 3.3 6.6 6.4 6.9A4.8 4.8 0 0 0 9 21.2V22"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
)

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground text-center font-medium">
          &copy; 2026 Developed by Pranjal Kautkar.
        </p>
        <div className="flex items-center gap-8 text-sm text-muted-foreground mt-2">
          <a href="https://github.com/Pranjal-Kautkar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-all group">
            <GithubIcon className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
            <span>GitHub</span>
          </a>
          <a href="www.linkedin.com/in/pranjal-kautkar-0b54123a9" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-all group">
            <LinkedinIcon className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-all group">
            <TwitterIcon className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
