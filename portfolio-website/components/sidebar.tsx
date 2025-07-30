"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, Mail, Home, User, Briefcase, MessageCircle, Instagram, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/contexts/preferences-context"
import { useLocalizedContent } from "@/utils/content-localization"
import { ThemeToggle } from "@/components/theme-toggle"

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { culturalTheme } = usePreferences()
  const content = useLocalizedContent()

  const navigation = [
    { name: content.navigation.home, href: "/", icon: Home },
    { name: content.sections.about, href: "/#about", icon: User },
    { name: content.navigation.projects, href: "/projects", icon: Briefcase },
    {
      name: culturalTheme === "default" ? content.navigation.about : content.navigation.cv,
      href: "/cv",
      icon: FileText,
    },
    { name: content.navigation.contact, href: "/contact", icon: MessageCircle },
  ]

  const getBrandingStyles = () => {
    switch (culturalTheme) {
      case "brazil":
        return "bg-gradient-to-b from-green-600 via-yellow-400 to-blue-600 text-white"
      case "portugal":
        return "bg-gradient-to-b from-green-600 via-red-600 to-green-600 text-white"
      case "japan":
        return "bg-gradient-to-b from-red-600 via-white to-red-600 text-gray-900"
      case "england":
        return "bg-gradient-to-b from-blue-700 via-white to-red-600 text-gray-900"
      default:
        return "bg-gradient-to-b from-primary to-primary/80 text-primary-foreground"
    }
  }

  const getNavStyles = () => {
    switch (culturalTheme) {
      case "brazil":
        return "bg-green-50 dark:bg-green-950 border-r-green-200 dark:border-r-green-800"
      case "portugal":
        return "bg-green-50 dark:bg-green-950 border-r-green-200 dark:border-r-green-800"
      case "japan":
        return "bg-red-50 dark:bg-red-950 border-r-red-200 dark:border-r-red-800"
      case "england":
        return "bg-blue-50 dark:bg-blue-950 border-r-blue-200 dark:border-r-blue-800"
      default:
        return "bg-background border-r"
    }
  }

  const getSubtitle = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Desenvolvedor Iniciante"
      case "portugal":
        return "Programador Iniciante"
      case "japan":
        return "初心者開発者"
      case "england":
        return "Aspiring Developer"
      default:
        return "Computer Science Student"
    }
  }

  const getCulturalTag = () => {
    switch (culturalTheme) {
      case "brazil":
        return "🇧🇷 Estudante Brasileiro"
      case "portugal":
        return "🇵🇹 Estudante Português"
      case "japan":
        return "🇯🇵 ブラジル人学生"
      case "england":
        return "🇬🇧 Brazilian Student"
      default:
        return "🎓 Instituto Politécnico de Leiria"
    }
  }

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0", getNavStyles())}>
        <SidebarContent />
      </div>
    </>
  )

  function SidebarContent() {
    return (
      <div className="flex flex-col h-full">
        {/* Brand Section */}
        <div className={cn("p-6 text-center", getBrandingStyles())}>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Wilson Campos</h1>
            <p className="text-sm opacity-90">{getSubtitle()}</p>
            <div className="text-xs opacity-75">{getCulturalTag()}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)) ||
              (item.href === "/projects" && pathname.startsWith("/projects"))

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? culturalTheme === "brazil"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : culturalTheme === "portugal"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : culturalTheme === "japan"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          : culturalTheme === "england"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                            : "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Social Links */}
        <div className="px-4 py-4 border-t space-y-4">
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://www.instagram.com/wiltsuo/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://x.com/Wiltsuo" target="_blank" rel="noopener noreferrer">
                <XIcon className="h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>

          <Button size="sm" className="w-full" asChild>
            <Link href="/contact">
              <Mail className="h-4 w-4 mr-2" />
              {content.buttons.contactMe}
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}
