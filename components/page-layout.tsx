"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/contexts/preferences-context"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  showBackground?: boolean
}

export function PageLayout({ children, title, subtitle, className, showBackground = true }: PageLayoutProps) {
  const { culturalTheme } = usePreferences()

  const getThemeColors = () => {
    switch (culturalTheme) {
      case "brazil":
        return {
          primary: "from-green-600 via-yellow-400 to-blue-600",
          bg: "bg-gradient-to-br from-green-500/10 via-yellow-400/10 to-blue-500/10",
        }
      case "portugal":
        return {
          primary: "from-green-600 via-red-600 to-green-600",
          bg: "bg-gradient-to-br from-green-500/10 via-red-500/10 to-green-500/10",
        }
      case "japan":
        return {
          primary: "from-red-600 via-red-500 to-red-600",
          bg: "bg-gradient-to-br from-red-500/10 via-white/10 to-red-500/10",
        }
      case "england":
        return {
          primary: "from-blue-700 via-red-600 to-blue-700",
          bg: "bg-gradient-to-br from-blue-500/10 via-red-500/10 to-blue-500/10",
        }
      default:
        return {
          primary: "from-primary to-primary/80",
          bg: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5",
        }
    }
  }

  const colors = getThemeColors()

  return (
    <div className={cn("min-h-screen", showBackground && colors.bg, className)}>
      {/* Page Header */}
      {(title || subtitle) && (
        <div className="container mx-auto px-4 pt-8 pb-4">
          <div className="text-center space-y-4">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", colors.primary)}>{title}</span>
              </h1>
            )}
            {subtitle && <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
