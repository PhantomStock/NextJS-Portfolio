"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getProjectImage, getProjectImageAlt } from "@/utils/project-images"

interface ProjectImageProps {
  repoName: string
  description?: string
  language?: string
  homepage?: string
  index: number
}

export function ProjectImage({ repoName, description, language, homepage, index }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const imageSrc = imageError
    ? `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(repoName)}`
    : getProjectImage(repoName, index)

  return (
    <div className="flex-1 w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        )}

        {/* Project Image */}
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={getProjectImageAlt(repoName, description)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* Project Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm">
            {language || "Project"}
          </Badge>
        </div>

        {/* Live Demo Indicator */}
        {homepage && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 shadow-sm">
              ✨ Live
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}
