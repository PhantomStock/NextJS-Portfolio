"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { usePreferences } from "@/contexts/preferences-context"
import { cn } from "@/lib/utils"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { navigationStyle, culturalTheme } = usePreferences()

  const getThemeStyles = () => {
    switch (culturalTheme) {
      case "brazil":
        return "bg-gradient-to-br from-green-50/30 via-yellow-50/30 to-blue-50/30 dark:from-green-950/30 dark:via-yellow-950/30 dark:to-blue-950/30"
      case "japan":
        return "bg-gradient-to-br from-red-50/30 via-white/30 to-red-50/30 dark:from-red-950/30 dark:via-gray-950/30 dark:to-red-950/30"
      default:
        return ""
    }
  }

  if (navigationStyle === "side") {
    return (
      <div className={cn("min-h-screen", getThemeStyles())}>
        <Sidebar />
        <div className="lg:pl-64">
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen flex flex-col", getThemeStyles())}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
