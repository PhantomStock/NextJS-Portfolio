"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/contexts/preferences-context"

interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  id?: string
  variant?: "default" | "accent" | "muted"
}

export function Section({ children, title, subtitle, className, id, variant = "default" }: SectionProps) {
  const { culturalTheme } = usePreferences()

  const getVariantStyles = () => {
    const baseColors = {
      brazil: {
        accent: "bg-green-50/50 dark:bg-green-950/50 border-green-200/50 dark:border-green-800/50",
        muted: "bg-green-50/30 dark:bg-green-950/30",
      },
      portugal: {
        accent: "bg-green-50/50 dark:bg-green-950/50 border-green-200/50 dark:border-green-800/50",
        muted: "bg-green-50/30 dark:bg-green-950/30",
      },
      japan: {
        accent: "bg-red-50/50 dark:bg-red-950/50 border-red-200/50 dark:border-red-800/50",
        muted: "bg-red-50/30 dark:bg-red-950/30",
      },
      england: {
        accent: "bg-blue-50/50 dark:bg-blue-950/50 border-blue-200/50 dark:border-blue-800/50",
        muted: "bg-blue-50/30 dark:bg-blue-950/30",
      },
      default: {
        accent: "bg-muted/50 border-border/50",
        muted: "bg-muted/30",
      },
    }

    const themeColors = baseColors[culturalTheme as keyof typeof baseColors] || baseColors.default

    switch (variant) {
      case "accent":
        return cn("rounded-lg border", themeColors.accent)
      case "muted":
        return cn("rounded-lg", themeColors.muted)
      default:
        return ""
    }
  }

  return (
    <section id={id} className={cn("py-12", getVariantStyles(), className)}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
          </div>
        )}

        {/* Section Content */}
        {children}
      </div>
    </section>
  )
}
