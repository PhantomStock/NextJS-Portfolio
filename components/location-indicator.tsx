"use client"

import { MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLocation } from "@/contexts/location-context"
import { usePreferences } from "@/contexts/preferences-context"

export function LocationIndicator() {
  const { location, isLoading } = useLocation()
  const { culturalTheme } = usePreferences()

  if (isLoading || !location) return null

  const getLocationText = () => {
    switch (culturalTheme) {
      case "brazil":
        return `Visitando de ${location.city}, ${location.country}`
      case "japan":
        return `${location.city}、${location.country}からアクセス中`
      default:
        return `Viewing from ${location.city}, ${location.country}`
    }
  }

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: location.timezone,
  })

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2">
      <Badge variant="outline" className="bg-background/95 backdrop-blur-sm shadow-sm">
        <MapPin className="h-3 w-3 mr-1" />
        {getLocationText()}
      </Badge>
      <Badge variant="outline" className="bg-background/95 backdrop-blur-sm shadow-sm">
        <Clock className="h-3 w-3 mr-1" />
        {currentTime}
      </Badge>
    </div>
  )
}
