"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type NavigationStyle = "top" | "side"
type CulturalTheme = "brazil" | "japan" | "portugal" | "england" | "default"

interface PreferencesContextType {
  navigationStyle: NavigationStyle
  setNavigationStyle: (style: NavigationStyle) => void
  culturalTheme: CulturalTheme
  setCulturalTheme: (theme: CulturalTheme) => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [navigationStyle, setNavigationStyle] = useState<NavigationStyle>("top")
  const [culturalTheme, setCulturalTheme] = useState<CulturalTheme>("default")

  // Load preferences from localStorage
  useEffect(() => {
    const savedNavStyle = localStorage.getItem("navigationStyle") as NavigationStyle
    const savedTheme = localStorage.getItem("culturalTheme") as CulturalTheme

    if (savedNavStyle) setNavigationStyle(savedNavStyle)
    if (savedTheme) setCulturalTheme(savedTheme)

    // Listen for location-based theme changes
    const handleLocationThemeSet = (event: CustomEvent) => {
      setCulturalTheme(event.detail)
    }

    window.addEventListener("locationThemeSet", handleLocationThemeSet as EventListener)

    return () => {
      window.removeEventListener("locationThemeSet", handleLocationThemeSet as EventListener)
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("navigationStyle", navigationStyle)
  }, [navigationStyle])

  useEffect(() => {
    localStorage.setItem("culturalTheme", culturalTheme)
  }, [culturalTheme])

  return (
    <PreferencesContext.Provider
      value={{
        navigationStyle,
        setNavigationStyle,
        culturalTheme,
        setCulturalTheme,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
