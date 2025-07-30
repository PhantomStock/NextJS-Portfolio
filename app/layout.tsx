import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PreferencesPanel } from "@/components/preferences-panel"
import { ThemeProvider } from "@/components/theme-provider"
import { PreferencesProvider } from "@/contexts/preferences-context"
import { LocationProvider } from "@/contexts/location-context"
import { LayoutWrapper } from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Full-stack developer passionate about creating innovative solutions and beautiful user experiences.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocationProvider>
            <PreferencesProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <PreferencesPanel />
            </PreferencesProvider>
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
