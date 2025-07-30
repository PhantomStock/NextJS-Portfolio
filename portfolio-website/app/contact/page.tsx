"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Clock,
  Globe,
  Heart,
  Coffee,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { usePreferences } from "@/contexts/preferences-context"
import { useLocation } from "@/contexts/location-context"
import { useLocalizedContent } from "@/utils/content-localization"
import { PageLayout } from "@/components/page-layout"
import { Section } from "@/components/section"
import { submitContactForm } from "./actions"
import { cn } from "@/lib/utils"

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const { culturalTheme } = usePreferences()
  const { location, isLoading: locationLoading } = useLocation()
  const content = useLocalizedContent()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setResult(null)

    startTransition(async () => {
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("email", formData.email)
      formDataObj.append("subject", formData.subject)
      formDataObj.append("message", formData.message)

      const response = await submitContactForm(formDataObj)
      setResult(response)

      if (response.success) {
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: location?.timezone,
  })

  const getAvailabilityStatus = () => {
    const hour = new Date().getHours()
    const isWorkingHours = hour >= 9 && hour <= 18
    return isWorkingHours ? content.availability.available : content.availability.unavailable
  }

  const getPageTitle = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Entre em Contato"
      case "portugal":
        return "Entre em Contacto"
      case "japan":
        return "お問い合わせ"
      case "england":
        return "Get In Touch"
      default:
        return "Contact Me"
    }
  }

  const getPageSubtitle = () => {
    switch (culturalTheme) {
      case "brazil":
        return "Tem um projeto em mente ou quer colaborar? Adoraria ouvir de você. Mande uma mensagem e responderei o mais rápido possível."
      case "portugal":
        return "Tem algum projecto em mente ou quer colaborar? Gostaria muito de ouvir de si. Envie uma mensagem e responderei o mais rapidamente possível."
      case "japan":
        return "プロジェクトのアイデアがあるか、コラボレーションをお考えですか？ぜひお聞かせください。メッセージをお送りいただければ、できるだけ早くお返事いたします。"
      case "england":
        return "Got a brilliant project in mind or fancy a collaboration? I'd be delighted to hear from you. Drop me a message and I'll get back to you promptly."
      default:
        return "Have a project in mind or interested in collaboration? I would love to hear from you. Send me a message and I will respond as soon as possible."
    }
  }

  return (
    <PageLayout title={getPageTitle()} subtitle={getPageSubtitle()} className="min-h-screen">
      {/* Location and Time Greeting */}
      <Section variant="muted" className="py-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            {locationLoading ? <span>Detecting location...</span> : <span>{content.locationMessage}</span>}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className={colors.accent}>
              {content.timeGreeting}! {location && `Local time: ${currentTime}`}
            </span>
          </div>

          {/* Cultural Elements */}
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-4">
            {culturalTheme === "brazil" && (
              <>
                <span>Resposta em</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>português ou inglês</span>
              </>
            )}
            {culturalTheme === "portugal" && (
              <>
                <span>Resposta em</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>português ou inglês</span>
              </>
            )}
            {culturalTheme === "japan" && (
              <>
                <span>日本語または英語でお返事します</span>
                <Coffee className="h-4 w-4 text-brown-500" />
              </>
            )}
            {culturalTheme === "england" && (
              <>
                <span>Response in proper English</span>
                <Coffee className="h-4 w-4 text-brown-500" />
              </>
            )}
            {culturalTheme === "default" && (
              <>
                <span>Professional response in English</span>
                <Coffee className="h-4 w-4 text-brown-500" />
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Main Contact Section */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className={colors.cardBg}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {content.formLabels.send}
              </CardTitle>
              <CardDescription>
                {culturalTheme === "brazil"
                  ? "Preencha o formulário abaixo e entrarei em contato em até 24 horas. Sua mensagem será enviada para meu email acadêmico do IPL."
                  : culturalTheme === "portugal"
                    ? "Preencha o formulário abaixo e entrarei em contacto em até 24 horas. A sua mensagem será enviada para o meu email académico do IPL."
                    : culturalTheme === "japan"
                      ? "以下のフォームにご記入いただければ、24時間以内にご連絡いたします。メッセージはIPLの学術メールに送信されます。"
                      : culturalTheme === "england"
                        ? "Fill out the form below and I'll get back to you within 24 hours. Your message will be sent to my IPL academic email."
                        : "Please fill out the form below and I will respond within 24 hours. Your message will be sent to my IPL academic email."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form Result Alert */}
              {result && (
                <Alert className={cn("mb-4", result.success ? "border-green-500" : "border-red-500")}>
                  {result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <AlertDescription
                    className={result.success ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}
                  >
                    {result.message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{content.formLabels.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{content.formLabels.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isPending}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{content.formLabels.subject}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{content.formLabels.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isPending}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {culturalTheme === "brazil"
                        ? "Enviando..."
                        : culturalTheme === "portugal"
                          ? "A enviar..."
                          : culturalTheme === "japan"
                            ? "送信中..."
                            : culturalTheme === "england"
                              ? "Sending..."
                              : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {content.formLabels.send}
                    </>
                  )}
                </Button>
              </form>

              {/* Email Info */}
              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>
                    {culturalTheme === "brazil"
                      ? "Mensagens são enviadas para: "
                      : culturalTheme === "portugal"
                        ? "As mensagens são enviadas para: "
                        : culturalTheme === "japan"
                          ? "メッセージの送信先: "
                          : culturalTheme === "england"
                            ? "Messages are sent to: "
                            : "Messages are sent to: "}
                    <code className="font-mono">2240115@my.ipleiria.pt</code>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className={colors.cardBg}>
              <CardHeader>
                <CardTitle>
                  {culturalTheme === "brazil"
                    ? "Informações de Contato"
                    : culturalTheme === "portugal"
                      ? "Informações de Contacto"
                      : culturalTheme === "japan"
                        ? "連絡先情報"
                        : culturalTheme === "england"
                          ? "Contact Information"
                          : "Contact Information"}
                </CardTitle>
                <CardDescription>
                  {culturalTheme === "brazil"
                    ? "Sinta-se à vontade para entrar em contato através de qualquer um desses canais."
                    : culturalTheme === "portugal"
                      ? "Sinta-se à vontade para entrar em contacto através de qualquer um destes canais."
                      : culturalTheme === "japan"
                        ? "これらのチャンネルのいずれかからお気軽にお問い合わせください。"
                        : culturalTheme === "england"
                          ? "Feel free to reach out through any of these channels."
                          : "Please feel free to contact me through any of these channels."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Email Académico"
                        : culturalTheme === "japan"
                          ? "学術メール"
                          : "Academic Email"}
                    </p>
                    <Link href="mailto:2240115@my.ipleiria.pt" className="text-sm text-primary hover:underline">
                      2240115@my.ipleiria.pt
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Email Pessoal"
                        : culturalTheme === "japan"
                          ? "個人メール"
                          : "Personal Email"}
                    </p>
                    <Link href="mailto:wilcampos2003@gmail.com" className="text-sm text-primary hover:underline">
                      wilcampos2003@gmail.com
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Telefone"
                        : culturalTheme === "japan"
                          ? "電話"
                          : "Phone Number"}
                    </p>
                    <Link href="tel:+351914552418" className="text-sm text-primary hover:underline">
                      +351 914 552 418
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Localização"
                        : culturalTheme === "japan"
                          ? "所在地"
                          : "Location"}
                    </p>
                    <p className="text-sm text-muted-foreground">Leiria, Portugal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={colors.cardBg}>
              <CardHeader>
                <CardTitle>
                  {culturalTheme === "brazil"
                    ? "Me Siga"
                    : culturalTheme === "portugal"
                      ? "Siga-me"
                      : culturalTheme === "japan"
                        ? "フォローしてください"
                        : culturalTheme === "england"
                          ? "Follow Me"
                          : "Connect With Me"}
                </CardTitle>
                <CardDescription>
                  {culturalTheme === "brazil"
                    ? "Conecte-se comigo nas redes sociais e redes profissionais."
                    : culturalTheme === "portugal"
                      ? "Conecte-se comigo nas redes sociais e redes profissionais."
                      : culturalTheme === "japan"
                        ? "ソーシャルメディアやプロフェッショナルネットワークで私とつながりましょう。"
                        : culturalTheme === "england"
                          ? "Connect with me on social media and professional networks."
                          : "Connect with me on social media and professional platforms."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="justify-start bg-transparent">
                    <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start bg-transparent">
                    <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start bg-transparent">
                    <Link href="https://www.instagram.com/wiltsuo/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start bg-transparent">
                    <Link href="https://x.com/Wiltsuo" target="_blank" rel="noopener noreferrer">
                      <XIcon className="h-4 w-4 mr-2" />X (Twitter)
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={colors.cardBg}>
              <CardHeader>
                <CardTitle>
                  {culturalTheme === "brazil"
                    ? "Disponibilidade"
                    : culturalTheme === "portugal"
                      ? "Disponibilidade"
                      : culturalTheme === "japan"
                        ? "対応状況"
                        : culturalTheme === "england"
                          ? "Availability"
                          : "Availability"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{content.availability.responseTime}</span>
                    <span className="text-sm text-muted-foreground">{content.availability.withinHours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{content.availability.status}</span>
                    <Badge
                      variant={new Date().getHours() >= 9 && new Date().getHours() <= 18 ? "default" : "secondary"}
                    >
                      {getAvailabilityStatus()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{content.availability.timezone}</span>
                    <span className="text-sm text-muted-foreground">{location?.timezone || "Europe/Lisbon"}</span>
                  </div>
                  {location && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{content.availability.localTime}</span>
                      <span className="text-sm text-muted-foreground">{currentTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location-specific message */}
            {location && (
              <Card
                className={cn(
                  "border-2",
                  culturalTheme === "brazil"
                    ? "border-green-200 dark:border-green-800"
                    : culturalTheme === "portugal"
                      ? "border-green-200 dark:border-green-800"
                      : culturalTheme === "japan"
                        ? "border-red-200 dark:border-red-800"
                        : culturalTheme === "england"
                          ? "border-blue-200 dark:border-blue-800"
                          : "border-primary/20",
                )}
              >
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl">
                      {location.countryCode === "BR"
                        ? "🇧🇷"
                        : location.countryCode === "PT"
                          ? "🇵🇹"
                          : location.countryCode === "JP"
                            ? "🇯🇵"
                            : location.countryCode === "GB"
                              ? "🇬🇧"
                              : location.countryCode === "US"
                                ? "🇺🇸"
                                : "🌍"}
                    </div>
                    <p className="text-sm font-medium">
                      {culturalTheme === "brazil"
                        ? `Olá, visitante de ${location.city}!`
                        : culturalTheme === "portugal"
                          ? `Olá, visitante de ${location.city}!`
                          : culturalTheme === "japan"
                            ? `${location.city}からの訪問者の皆様、こんにちは！`
                            : culturalTheme === "england"
                              ? `Greetings, visitor from ${location.city}!`
                              : `Hello, visitor from ${location.city}!`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {culturalTheme === "brazil"
                        ? "Fico feliz em ter você aqui. Vamos trabalhar juntos!"
                        : culturalTheme === "portugal"
                          ? "Fico feliz em tê-lo aqui. Vamos trabalhar juntos!"
                          : culturalTheme === "japan"
                            ? "お越しいただきありがとうございます。一緒に働きましょう！"
                            : culturalTheme === "england"
                              ? "Delighted to have you here. Let's collaborate!"
                              : "Great to have you here. Let's work together!"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </PageLayout>
  )
}
