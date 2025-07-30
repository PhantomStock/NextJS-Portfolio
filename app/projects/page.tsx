"use client"

import { useEffect, useState } from "react"
import { Github, ExternalLink, Star, GitFork, Calendar, Code, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ProjectImage } from "@/components/project-image"
import { usePreferences } from "@/contexts/preferences-context"
import { useLocalizedContent } from "@/utils/content-localization"
import { PageLayout } from "@/components/page-layout"
import { Section } from "@/components/section"
import { cn } from "@/lib/utils"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  created_at: string
  size: number
}

async function getGitHubRepos(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch repositories")
    }

    const repos = await response.json()
    return repos.filter((repo: Repository) => !repo.name.includes(".github.io") && repo.name !== username)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")
  const { culturalTheme } = usePreferences()
  const content = useLocalizedContent()

  useEffect(() => {
    getGitHubRepos("PhantomStock").then((data) => {
      setRepos(data)
      setFilteredRepos(data)
    })
  }, [])

  useEffect(() => {
    let filtered = repos

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by language
    if (languageFilter !== "all") {
      filtered = filtered.filter((repo) => repo.language === languageFilter)
    }

    // Sort repositories
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count
        case "forks":
          return b.forks_count - a.forks_count
        case "name":
          return a.name.localeCompare(b.name)
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default: // updated
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

    setFilteredRepos(filtered)
  }, [repos, searchTerm, languageFilter, sortBy])

  const getThemeColors = () => {
    switch (culturalTheme) {
      case "brazil":
        return {
          primary: "from-green-600 via-yellow-400 to-blue-600",
          accent: "text-green-600 dark:text-green-400",
          cardBg: "bg-green-50/50 dark:bg-green-950/50",
        }
      case "portugal":
        return {
          primary: "from-green-600 via-red-600 to-green-600",
          accent: "text-green-600 dark:text-green-400",
          cardBg: "bg-green-50/50 dark:bg-green-950/50",
        }
      case "japan":
        return {
          primary: "from-red-600 via-red-500 to-red-600",
          accent: "text-red-600 dark:text-red-400",
          cardBg: "bg-red-50/50 dark:bg-red-950/50",
        }
      case "england":
        return {
          primary: "from-blue-700 via-red-600 to-blue-700",
          accent: "text-blue-700 dark:text-blue-400",
          cardBg: "bg-blue-50/50 dark:bg-blue-950/50",
        }
      default:
        return {
          primary: "from-primary to-primary/80",
          accent: "text-primary",
          cardBg: "bg-muted/50",
        }
    }
  }

  const colors = getThemeColors()
  const languages = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))

  const getLocalizedText = () => {
    switch (culturalTheme) {
      case "brazil":
        return {
          title: "Meus Projetos",
          subtitle:
            "Uma coleção completa dos meus projetos de desenvolvimento, desde aplicações web até ferramentas de linha de comando.",
          search: "Buscar projetos...",
          language: "Linguagem",
          allLanguages: "Todas as linguagens",
          sortBy: "Ordenar por",
          updated: "Atualizado",
          created: "Criado",
          stars: "Estrelas",
          forks: "Forks",
          name: "Nome",
          noResults: "Nenhum projeto encontrado com os filtros atuais.",
          clearFilters: "Limpar Filtros",
          viewCode: "Ver Código",
          liveDemo: "Demo Ao Vivo",
          lastUpdated: "Última atualização",
          filtersTitle: "Filtros e Busca",
        }
      case "portugal":
        return {
          title: "Os Meus Projectos",
          subtitle:
            "Uma colecção completa dos meus projectos de desenvolvimento, desde aplicações web até ferramentas de linha de comando.",
          search: "Procurar projectos...",
          language: "Linguagem",
          allLanguages: "Todas as linguagens",
          sortBy: "Ordenar por",
          updated: "Actualizado",
          created: "Criado",
          stars: "Estrelas",
          forks: "Forks",
          name: "Nome",
          noResults: "Nenhum projecto encontrado com os filtros actuais.",
          clearFilters: "Limpar Filtros",
          viewCode: "Ver Código",
          liveDemo: "Demo Ao Vivo",
          lastUpdated: "Última actualização",
          filtersTitle: "Filtros e Pesquisa",
        }
      case "japan":
        return {
          title: "私のプロジェクト",
          subtitle: "Webアプリケーションからコマンドラインツールまで、私の開発プロジェクトの完全なコレクション。",
          search: "プロジェクトを検索...",
          language: "言語",
          allLanguages: "すべての言語",
          sortBy: "並び替え",
          updated: "更新日",
          created: "作成日",
          stars: "スター",
          forks: "フォーク",
          name: "名前",
          noResults: "現在のフィルターでプロジェクトが見つかりません。",
          clearFilters: "フィルターをクリア",
          viewCode: "コードを見る",
          liveDemo: "ライブデモ",
          lastUpdated: "最終更新",
          filtersTitle: "フィルターと検索",
        }
      case "england":
        return {
          title: "My Projects",
          subtitle:
            "A comprehensive collection of my development projects, from web applications to command-line tools.",
          search: "Search projects...",
          language: "Language",
          allLanguages: "All languages",
          sortBy: "Sort by",
          updated: "Updated",
          created: "Created",
          stars: "Stars",
          forks: "Forks",
          name: "Name",
          noResults: "No projects found with current filters.",
          clearFilters: "Clear Filters",
          viewCode: "View Code",
          liveDemo: "Live Demo",
          lastUpdated: "Last updated",
          filtersTitle: "Filters & Search",
        }
      default:
        return {
          title: "My Projects",
          subtitle:
            "A comprehensive collection of my development projects, showcasing my learning journey and technical skills.",
          search: "Search projects...",
          language: "Language",
          allLanguages: "All languages",
          sortBy: "Sort by",
          updated: "Updated",
          created: "Created",
          stars: "Stars",
          forks: "Forks",
          name: "Name",
          noResults: "No projects found with current filters.",
          clearFilters: "Clear Filters",
          viewCode: "View Code",
          liveDemo: "Live Demo",
          lastUpdated: "Last updated",
          filtersTitle: "Filters & Search",
        }
    }
  }

  const localizedText = getLocalizedText()

  return (
    <PageLayout title={localizedText.title} subtitle={localizedText.subtitle}>
      {/* Filters Section */}
      <Section variant="accent">
        <Card className={cn("border-0 shadow-none", colors.cardBg)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {localizedText.filtersTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={localizedText.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={localizedText.language} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{localizedText.allLanguages}</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={localizedText.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">{localizedText.updated}</SelectItem>
                  <SelectItem value="created">{localizedText.created}</SelectItem>
                  <SelectItem value="stars">{localizedText.stars}</SelectItem>
                  <SelectItem value="forks">{localizedText.forks}</SelectItem>
                  <SelectItem value="name">{localizedText.name}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setLanguageFilter("all")
                  setSortBy("updated")
                }}
                className="w-full"
              >
                {localizedText.clearFilters}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Projects Grid */}
      <Section>
        {filteredRepos.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo, index) => (
              <Card key={repo.id} className={cn("group hover:shadow-lg transition-all duration-300", colors.cardBg)}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ProjectImage
                    repoName={repo.name}
                    description={repo.description}
                    language={repo.language}
                    homepage={repo.homepage}
                    index={index}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{repo.name}</CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {repo.description ||
                      (culturalTheme === "brazil"
                        ? "Um projeto showcase demonstrando práticas modernas de desenvolvimento."
                        : culturalTheme === "portugal"
                          ? "Um projecto showcase demonstrando práticas modernas de desenvolvimento."
                          : culturalTheme === "japan"
                            ? "モダンな開発手法を実証するショーケースプロジェクト。"
                            : culturalTheme === "england"
                              ? "A showcase project demonstrating modern development practices."
                              : "A learning project demonstrating programming concepts and best practices.")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <Badge variant="default" className="text-xs">
                        <Code className="h-3 w-3 mr-1" />
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {localizedText.lastUpdated} {new Date(repo.updated_at).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" asChild className="flex-1">
                      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        {localizedText.viewCode}
                      </Link>
                    </Button>
                    {repo.homepage && (
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                        <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {localizedText.liveDemo}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className={colors.cardBg}>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{localizedText.noResults}</p>
              </div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setLanguageFilter("all")
                  setSortBy("updated")
                }}
              >
                {localizedText.clearFilters}
              </Button>
            </CardContent>
          </Card>
        )}
      </Section>

      {/* Stats Section */}
      <Section variant="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className={cn("text-3xl font-bold", colors.accent)}>{repos.length}</div>
            <div className="text-sm text-muted-foreground">
              {culturalTheme === "brazil"
                ? "Projetos Totais"
                : culturalTheme === "portugal"
                  ? "Projectos Totais"
                  : culturalTheme === "japan"
                    ? "総プロジェクト数"
                    : culturalTheme === "england"
                      ? "Total Projects"
                      : "Total Projects"}
            </div>
          </div>
          <div className="space-y-2">
            <div className={cn("text-3xl font-bold", colors.accent)}>
              {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              {culturalTheme === "brazil"
                ? "Estrelas Totais"
                : culturalTheme === "portugal"
                  ? "Estrelas Totais"
                  : culturalTheme === "japan"
                    ? "総スター数"
                    : culturalTheme === "england"
                      ? "Total Stars"
                      : "Total Stars"}
            </div>
          </div>
          <div className="space-y-2">
            <div className={cn("text-3xl font-bold", colors.accent)}>
              {repos.reduce((acc, repo) => acc + repo.forks_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              {culturalTheme === "brazil"
                ? "Forks Totais"
                : culturalTheme === "portugal"
                  ? "Forks Totais"
                  : culturalTheme === "japan"
                    ? "総フォーク数"
                    : culturalTheme === "england"
                      ? "Total Forks"
                      : "Total Forks"}
            </div>
          </div>
          <div className="space-y-2">
            <div className={cn("text-3xl font-bold", colors.accent)}>{languages.length}</div>
            <div className="text-sm text-muted-foreground">
              {culturalTheme === "brazil"
                ? "Linguagens"
                : culturalTheme === "portugal"
                  ? "Linguagens"
                  : culturalTheme === "japan"
                    ? "使用言語数"
                    : culturalTheme === "england"
                      ? "Languages"
                      : "Languages"}
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}
