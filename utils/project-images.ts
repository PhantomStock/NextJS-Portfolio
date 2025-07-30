// Map of repository names to their corresponding image files
// Add your actual repository names here
export const projectImages: Record<string, string> = {
  // Example mappings - replace with your actual repo names
  "portfolio-website": "/projects/project-1.png",
  "NextJS-Portfolio": "/projects/NextJS-Portfolio.png",
  frmKanban: "/projects/kanban-project.png",
  "MDS-DA-Projeto": "/projects/kanban-project.png",
  // Add more mappings as needed
}

export function getProjectImage(repoName: string, fallbackIndex: number): string {
  // First try to get a specific image for this repo
  if (projectImages[repoName]) {
    return projectImages[repoName]
  }

  // Fall back to numbered images
  const imageNumber = (fallbackIndex % 6) + 1
  return `/projects/project-${imageNumber}.png`
}

export function getProjectImageAlt(repoName: string, description?: string): string {
  return `${repoName} - ${description || "Project screenshot showing the application interface and features"}`
}
