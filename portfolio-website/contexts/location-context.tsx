"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LocationData {
  country: string
  countryCode: string
  city: string
  timezone: string
  latitude?: number
  longitude?: number
}

interface LocationContextType {
  location: LocationData | null
  isLoading: boolean
  error: string | null
  detectLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const detectLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Try IP-based location detection first (more reliable)
      const response = await fetch("https://ipapi.co/json/")
      if (response.ok) {
        const data = await response.json()
        const locationData = {
          country: data.country_name || "Unknown",
          countryCode: data.country_code || "XX",
          city: data.city || "Unknown",
          timezone: data.timezone || "UTC",
          latitude: data.latitude,
          longitude: data.longitude,
        }
        setLocation(locationData)

        // Auto-set cultural theme based on location
        const { usePreferences } = await import("@/contexts/preferences-context")
        const savedTheme = localStorage.getItem("culturalTheme")

        // Only auto-set if no theme is manually saved
        if (!savedTheme || savedTheme === "default") {
          let autoTheme = "default"

          switch (data.country_code) {
            case "BR":
              autoTheme = "brazil"
              break
            case "PT":
              autoTheme = "portugal"
              break
            case "JP":
              autoTheme = "japan"
              break
            case "GB":
            case "UK":
              autoTheme = "england"
              break
            default:
              autoTheme = "default"
          }

          localStorage.setItem("culturalTheme", autoTheme)
          // Trigger a custom event to notify preferences context
          window.dispatchEvent(new CustomEvent("locationThemeSet", { detail: autoTheme }))
        }
      } else {
        throw new Error("IP location failed")
      }
    } catch (ipError) {
      console.log("IP location failed, trying geolocation...", ipError)

      // Fallback to browser geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Reverse geocoding with a free service
              const { latitude, longitude } = position.coords
              const geoResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
              )

              if (geoResponse.ok) {
                const geoData = await geoResponse.json()
                setLocation({
                  country: geoData.countryName || "Unknown",
                  countryCode: geoData.countryCode || "XX",
                  city: geoData.city || geoData.locality || "Unknown",
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  latitude,
                  longitude,
                })
              } else {
                throw new Error("Reverse geocoding failed")
              }
            } catch (geoError) {
              console.error("Reverse geocoding error:", geoError)
              setError("Could not determine location")
            }
          },
          (geoError) => {
            console.error("Geolocation error:", geoError)
            setError("Location access denied")
          },
        )
      } else {
        setError("Geolocation not supported")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    detectLocation()
  }, [])

  return (
    <LocationContext.Provider value={{ location, isLoading, error, detectLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
