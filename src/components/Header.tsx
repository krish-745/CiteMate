import { Button } from './ui/button'
import { BookOpen, Github, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">CiteMate</h1>
              <p className="text-sm text-muted-foreground">Your Research Companion</p>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Browse
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Trending
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Saved Papers
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Github className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}