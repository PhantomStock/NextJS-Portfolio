"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, Mail, Instagram, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePreferences } from "@/contexts/preferences-context"
import { useLocalizedContent } from "@/utils/content-localization"

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { culturalTheme } = usePreferences()
  const content = useLocalizedContent()

  const navigation = [
    { name: content.navigation.home, href: "/" },
    { name: content.navigation.projects, href: "/projects" },
    { name: culturalTheme === "default" ? content.navigation.about : content.navigation.cv, href: "/cv" },
    { name: content.navigation.contact, href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Left: Logo with hover animations */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
              <BookOpen className="h-5 w-5 text-primary transition-all duration-300 group-hover:rotate-12 group-hover:text-primary/80" />
              <span className="text-xl font-bold transition-all duration-300 group-hover:text-primary">
                {content.navigation.portfolio}
              </span>
            </Link>
          </div>

          {/* Center: Navigation with hover animations */}
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105",
                    "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                    pathname === item.href || (item.href === "/projects" && pathname.startsWith("/projects"))
                      ? "text-primary after:w-full"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Actions with hover animations and more spacing */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
            >
              <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 transition-all duration-300 hover:rotate-12" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
            >
              <Link href="https://www.instagram.com/wiltsuo/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 transition-all duration-300 hover:rotate-12" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
            >
              <Link href="https://x.com/Wiltsuo" target="_blank" rel="noopener noreferrer">
                <XIcon className="h-4 w-4 transition-all duration-300 hover:rotate-12" />
                <span className="sr-only">X</span>
              </Link>
            </Button>
            <div className="transition-all duration-300 hover:scale-110">
              <ThemeToggle />
            </div>
            {/* Added more spacing with ml-6 instead of ml-3 */}
            <Button size="sm" asChild className="ml-6 transition-all duration-300 hover:scale-105 hover:shadow-md">
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2 transition-all duration-300 group-hover:rotate-12" />
                {content.navigation.contact}
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation with hover animation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
              >
                <Menu className="h-5 w-5 transition-all duration-300 hover:rotate-180" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 px-2 py-1 rounded-md hover:bg-primary/10",
                      pathname === item.href || (item.href === "/projects" && pathname.startsWith("/projects"))
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-4">
                  <div className="transition-all duration-300 hover:scale-110">
                    <ThemeToggle />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
                    >
                      <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2 transition-all duration-300 hover:rotate-12" />
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
                    >
                      <Link href="https://www.instagram.com/wiltsuo/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-2 transition-all duration-300 hover:rotate-12" />
                        Instagram
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="transition-all duration-300 hover:scale-105 hover:bg-primary/10"
                    >
                      <Link href="https://x.com/Wiltsuo" target="_blank" rel="noopener noreferrer">
                        <XIcon className="h-4 w-4 mr-2 transition-all duration-300 hover:rotate-12" />X
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <Link href="/contact">
                        <Mail className="h-4 w-4 mr-2 transition-all duration-300 hover:rotate-12" />
                        {content.navigation.contact}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
