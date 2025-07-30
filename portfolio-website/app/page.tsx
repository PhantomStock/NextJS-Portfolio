"use client"

import { useEffect, useState } from "react"
import { Github, ExternalLink, Star, GitFork, Heart, Coffee, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
}

async function getGitHubRepos(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
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

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([])
  const { culturalTheme } = usePreferences()
  const content = useLocalizedContent()

  useEffect(() => {
    getGitHubRepos("PhantomStock").then(setRepos)
  }, [])

  const getThemeColors = () => {
    switch (culturalTheme) {
      case "brazil":
        return {
          primary: "from-green-600 via-yellow-400 to-blue-600",
          secondary: "from-green-500 to-blue-500",
          accent: "text-green-600 dark:text-green-400",
          bg: "bg-gradient-to-br from-green-500/10 via-yellow-400/10 to-blue-500/10",
        }
      case "portugal":
        return {
          primary: "from-green-600 via-red-600 to-green-600",
          secondary: "from-green-500 to-red-500",
          accent: "text-green-600 dark:text-green-400",
          bg: "bg-gradient-to-br from-green-500/10 via-red-500/10 to-green-500/10",
        }
      case "japan":
        return {
          primary: "from-red-600 via-red-500 to-red-600",
          secondary: "from-red-500 to-red-600",
          accent: "text-red-600 dark:text-red-400",
          bg: "bg-gradient-to-br from-red-500/10 via-white/10 to-red-500/10",
        }
      case "england":
        return {
          primary: "from-blue-700 via-red-600 to-blue-700",
          secondary: "from-blue-600 to-red-600",
          accent: "text-blue-700 dark:text-blue-400",
          bg: "bg-gradient-to-br from-blue-500/10 via-red-500/10 to-blue-500/10",
        }
      default:
        return {
          primary: "from-primary to-primary/80",
          secondary: "from-blue-500 to-purple-500",
          accent: "text-primary",
          bg: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5",
        }
    }
  }

  const colors = getThemeColors()

  const getYearsOfStudy = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Anos de Estudo"
      case "portugal":
        return "Anos de Estudo"
      case "japan":
        return "年の学習"
      case "england":
        return "Years of Study"
      default:
        return "Years of Study"
    }
  }

  const getProjectsText = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Projetos"
      case "portugal":
        return "Projectos"
      case "japan":
        return "プロジェクト"
      case "england":
        return "Projects"
      default:
        return "Projects"
    }
  }

  const getStarsText = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Estrelas"
      case "portugal":
        return "Estrelas"
      case "japan":
        return "スター"
      case "england":
        return "GitHub Stars"
      default:
        return "GitHub Stars"
    }
  }

  const getViewAllProjectsText = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Ver Todos os Projetos"
      case "portugal":
        return "Ver Todos os Projectos"
      case "japan":
        return "すべてのプロジェクトを見る"
      case "england":
        return "View All Projects"
      default:
        return "View All Projects"
    }
  }

  return (
    <PageLayout showBackground={false}>
      {/* Hero Section */}
      <Section className="relative py-12 md:py-20 overflow-hidden">
        {/* Cultural Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0" />
          <div className={cn("absolute inset-0", colors.bg)} />
          {culturalTheme === "brazil" && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 text-6xl">🌴</div>
              <div className="absolute top-32 right-20 text-4xl">☀️</div>
              <div className="absolute bottom-20 left-1/4 text-5xl">🏖️</div>
            </div>
          )}
          {culturalTheme === "portugal" && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 text-6xl">🏰</div>
              <div className="absolute top-32 right-20 text-4xl">⚓</div>
              <div className="absolute bottom-20 left-1/4 text-5xl">🍷</div>
            </div>
          )}
          {culturalTheme === "japan" && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 text-6xl">🌸</div>
              <div className="absolute top-32 left-20 text-4xl">🗾</div>
              <div className="absolute bottom-20 right-1/4 text-5xl">🏯</div>
            </div>
          )}
          {culturalTheme === "england" && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 text-6xl">👑</div>
              <div className="absolute top-32 left-20 text-4xl">🏰</div>
              <div className="absolute bottom-20 right-1/4 text-5xl">☂️</div>
            </div>
          )}
          {culturalTheme === "default" && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 text-6xl">🎓</div>
              <div className="absolute top-32 left-20 text-4xl">💻</div>
              <div className="absolute bottom-20 right-1/4 text-5xl">🚀</div>
            </div>
          )}
        </div>

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-lg text-muted-foreground">
              {content.timeGreeting} {content.locationMessage}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", colors.primary)}>
                Wilson Campos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>

            {/* Cultural Tagline */}
            <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
              {culturalTheme === "brazil" && (
                <>
                  <span>Feito com</span>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>no Brasil</span>
                </>
              )}
              {culturalTheme === "portugal" && (
                <>
                  <span>Feito com</span>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>em Portugal</span>
                </>
              )}
              {culturalTheme === "japan" && (
                <>
                  <span>日本の心で作られました</span>
                  <Coffee className="h-4 w-4 text-brown-500" />
                </>
              )}
              {culturalTheme === "england" && (
                <>
                  <span>Crafted with</span>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>and a cuppa</span>
                  <Coffee className="h-4 w-4 text-brown-500" />
                </>
              )}
              {culturalTheme === "default" && (
                <>
                  <span>Built with</span>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>and dedication to learning</span>
                  <Coffee className="h-4 w-4 text-brown-500" />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">{content.buttons.getInTouch}</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                {content.buttons.viewGitHub}
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="text-center">
              <div className={cn("text-2xl font-bold", colors.accent)}>{repos.length}+</div>
              <div>{getProjectsText()}</div>
            </div>
            <div className="text-center">
              <div className={cn("text-2xl font-bold", colors.accent)}>
                {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}+
              </div>
              <div>{getStarsText()}</div>
            </div>
            <div className="text-center">
              <div className={cn("text-2xl font-bold", colors.accent)}>2+</div>
              <div>{getYearsOfStudy()}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Projects Preview */}
      <Section
        title={content.sections.projects}
        subtitle={
          culturalTheme === "brazil"
            ? "Aqui estão alguns dos meus projetos em destaque. Cada projeto representa um desafio único e experiência de aprendizado."
            : culturalTheme === "portugal"
              ? "Aqui estão alguns dos meus projectos em destaque. Cada projecto representa um desafio único e experiência de aprendizagem."
              : culturalTheme === "japan"
                ? "注目のプロジェクトをご紹介します。各プロジェクトはユニークな挑戦と学習体験を表しています。"
                : culturalTheme === "england"
                  ? "Here are some of my featured projects. Each project represents a unique challenge and learning experience."
                  : "Here are some of my featured projects. Each project represents a unique challenge and learning experience as I develop my programming skills."
        }
        id="projects"
      >
        {repos.length > 0 ? (
          <>
            <div className="space-y-24">
              {repos.slice(0, 3).map((repo, index) => (
                <div
                  key={repo.id}
                  className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
                >
                  <ProjectImage
                    repoName={repo.name}
                    description={repo.description}
                    language={repo.language}
                    homepage={repo.homepage}
                    index={index}
                  />

                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">{repo.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                          <GitFork className="h-4 w-4 ml-2" />
                          {repo.forks_count}
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {repo.description ||
                          (culturalTheme === "brazil"
                            ? "Um projeto showcase demonstrando práticas modernas de desenvolvimento web e soluções inovadoras."
                            : culturalTheme === "portugal"
                              ? "Um projecto showcase demonstrando práticas modernas de desenvolvimento web e soluções inovadoras."
                              : culturalTheme === "japan"
                                ? "モダンなWeb開発の実践と革新的なソリューションを実証するショーケースプロジェクト。"
                                : culturalTheme === "england"
                                  ? "A showcase project demonstrating modern web development practices and innovative solutions."
                                  : "A learning project demonstrating modern web development practices and programming concepts.")}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {repo.language && (
                          <Badge variant="default" className="px-3 py-1">
                            {repo.language}
                          </Badge>
                        )}
                        {repo.topics.slice(0, 4).map((topic) => (
                          <Badge key={topic} variant="secondary" className="px-3 py-1">
                            {topic}
                          </Badge>
                        ))}
                        {repo.topics.length > 4 && (
                          <Badge variant="secondary" className="px-3 py-1">
                            +{repo.topics.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button size="lg" asChild>
                        <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          {content.buttons.viewCode}
                        </Link>
                      </Button>
                      {repo.homepage && (
                        <Button variant="outline" size="lg" asChild>
                          <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {content.buttons.liveDemo}
                          </Link>
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
                      <span>
                        {culturalTheme === "brazil"
                          ? "Atualizado"
                          : culturalTheme === "portugal"
                            ? "Actualizado"
                            : culturalTheme === "japan"
                              ? "更新日"
                              : culturalTheme === "england"
                                ? "Updated"
                                : "Updated"}{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{repo.language || "Multiple Languages"}</span>
                      {repo.topics.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{repo.topics.length} topics</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Projects Button */}
            <div className="text-center mt-16">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/projects">
                  {getViewAllProjectsText()}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {culturalTheme === "brazil"
                ? "Nenhum repositório encontrado. Certifique-se de atualizar o nome de usuário do GitHub no código."
                : culturalTheme === "portugal"
                  ? "Nenhum repositório encontrado. Certifique-se de actualizar o nome de utilizador do GitHub no código."
                  : culturalTheme === "japan"
                    ? "リポジトリが見つかりません。コード内のGitHubユーザー名を更新してください。"
                    : culturalTheme === "england"
                      ? "No repositories found. Make sure to update the GitHub username in the code."
                      : "No repositories found. Make sure to update the GitHub username in the code."}
            </p>
          </div>
        )}
      </Section>

      {/* Skills Section */}
      <Section
        variant="accent"
        title={content.sections.skills}
        subtitle={
          culturalTheme === "brazil"
            ? "Tecnologias que estou aprendendo e utilizando em meus projetos acadêmicos e pessoais."
            : culturalTheme === "portugal"
              ? "Tecnologias que estou a aprender e a utilizar nos meus projectos académicos e pessoais."
              : culturalTheme === "japan"
                ? "学術プロジェクトや個人プロジェクトで学習・使用している技術。"
                : culturalTheme === "england"
                  ? "Technologies I'm learning and using in my academic and personal projects."
                  : "Technologies I'm learning and using in my academic and personal projects."
        }
      >
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              {culturalTheme === "brazil"
                ? "Linguagens de Programação"
                : culturalTheme === "portugal"
                  ? "Linguagens de Programação"
                  : culturalTheme === "japan"
                    ? "プログラミング言語"
                    : culturalTheme === "england"
                      ? "Programming Languages"
                      : "Programming Languages"}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["C#", "C", "JavaScript", "Python", "PHP"].map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              {culturalTheme === "brazil"
                ? "Tecnologias Web"
                : culturalTheme === "portugal"
                  ? "Tecnologias Web"
                  : culturalTheme === "japan"
                    ? "ウェブ技術"
                    : culturalTheme === "england"
                      ? "Web Technologies"
                      : "Web Technologies"}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["HTML", "CSS", "React", "Next.js", "Node.js"].map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              {culturalTheme === "brazil"
                ? "Bases de Dados & Ferramentas"
                : culturalTheme === "portugal"
                  ? "Bases de Dados & Ferramentas"
                  : culturalTheme === "japan"
                    ? "データベース・ツール"
                    : culturalTheme === "england"
                      ? "Databases & Tools"
                      : "Databases & Tools"}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["MySQL", "PostgreSQL", "Docker", "Git"].map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}
