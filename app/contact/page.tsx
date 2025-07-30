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
  Zap,
  Shield,
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

  // Check if form is complete
  const isFormComplete = formData.name && formData.email && formData.subject && formData.message

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
                  ? "Preencha o formulário abaixo e entrarei em contato em até 24 horas. Sua mensagem será enviada de forma segura para meu email principal."
                  : culturalTheme === "portugal"
                    ? "Preencha o formulário abaixo e entrarei em contacto em até 24 horas. A sua mensagem será enviada de forma segura para o meu email principal."
                    : culturalTheme === "japan"
                      ? "以下のフォームにご記入いただければ、24時間以内にご連絡いたします。メッセージは安全にメインメールに送信されます。"
                      : culturalTheme === "england"
                        ? "Fill out the form below and I'll get back to you within 24 hours. Your message will be sent securely to my primary email address."
                        : "Please fill out the form below and I will respond within 24 hours. Your message will be sent securely to my primary email address."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form Result Alert */}
              {result && (
                <Alert className={cn("mb-6", result.success ? "border-green-500" : "border-red-500")}>
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
                      className="transition-all duration-200 focus:ring-2"
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
                      className="transition-all duration-200 focus:ring-2"
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
                    className="transition-all duration-200 focus:ring-2"
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
                    className="transition-all duration-200 focus:ring-2 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className={cn(
                    "w-full relative overflow-hidden transition-all duration-200",
                    isFormComplete && !isPending
                      ? "shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      : "opacity-75",
                  )}
                  disabled={isPending || !isFormComplete}
                >
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
                      {isFormComplete && <Zap className="ml-2 h-4 w-4" />}
                    </>
                  )}
                </Button>
              </form>

              {/* Email Info */}
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-dashed border-muted-foreground/20">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">
                    {culturalTheme === "brazil"
                      ? "Entrega segura via Resend para: "
                      : culturalTheme === "portugal"
                        ? "Entrega segura via Resend para: "
                        : culturalTheme === "japan"
                          ? "Resend経由で安全に配信: "
                          : culturalTheme === "england"
                            ? "Secure delivery via Resend to: "
                            : "Secure delivery via Resend to: "}
                  </span>
                </div>
                <div className="mt-1 pl-6">
                  <code className="text-sm font-mono bg-background px-2 py-1 rounded border">
                    wilcampos2003@gmail.com
                  </code>
                </div>
                <div className="mt-2 pl-6 text-xs text-muted-foreground">
                  {culturalTheme === "brazil"
                    ? "✓ Email verificado e monitorado regularmente"
                    : culturalTheme === "portugal"
                      ? "✓ Email verificado e monitorado regularmente"
                      : culturalTheme === "japan"
                        ? "✓ 認証済みメール、定期的に監視"
                        : culturalTheme === "england"
                          ? "✓ Verified email address, monitored regularly"
                          : "✓ Verified email address, monitored regularly"}
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
                    ? "Múltiplas formas de entrar em contato comigo."
                    : culturalTheme === "portugal"
                      ? "Múltiplas formas de entrar em contacto comigo."
                      : culturalTheme === "japan"
                        ? "私に連絡を取る複数の方法。"
                        : culturalTheme === "england"
                          ? "Multiple ways to get in touch with me."
                          : "Multiple ways to get in touch with me."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Email Principal"
                        : culturalTheme === "japan"
                          ? "メインメール"
                          : "Primary Email"}
                    </p>
                    <Link href="mailto:wilcampos2003@gmail.com" className="text-sm text-primary hover:underline">
                      wilcampos2003@gmail.com
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {culturalTheme === "brazil"
                        ? "Para contato direto (não via formulário)"
                        : culturalTheme === "portugal"
                          ? "Para contacto directo (não via formulário)"
                          : culturalTheme === "japan"
                            ? "直接連絡用（フォーム経由ではありません）"
                            : culturalTheme === "england"
                              ? "For direct contact (not via form)"
                              : "For direct contact (not via form)"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
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
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
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
                    ? "Redes Sociais"
                    : culturalTheme === "portugal"
                      ? "Redes Sociais"
                      : culturalTheme === "japan"
                        ? "ソーシャルメディア"
                        : culturalTheme === "england"
                          ? "Social Networks"
                          : "Social Networks"}
                </CardTitle>
                <CardDescription>
                  {culturalTheme === "brazil"
                    ? "Conecte-se comigo nas redes sociais e plataformas profissionais."
                    : culturalTheme === "portugal"
                      ? "Conecte-se comigo nas redes sociais e plataformas profissionais."
                      : culturalTheme === "japan"
                        ? "ソーシャルメディアやプロフェッショナルプラットフォームで私とつながりましょう。"
                        : culturalTheme === "england"
                          ? "Connect with me on social media and professional platforms."
                          : "Connect with me on social media and professional platforms."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    asChild
                    className="justify-start bg-transparent hover:scale-105 transition-transform"
                  >
                    <Link href="https://github.com/PhantomStock" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="justify-start bg-transparent hover:scale-105 transition-transform"
                  >
                    <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="justify-start bg-transparent hover:scale-105 transition-transform"
                  >
                    <Link href="https://www.instagram.com/wiltsuo/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="justify-start bg-transparent hover:scale-105 transition-transform"
                  >
                    <Link href="https://x.com/Wiltsuo" target="_blank" rel="noopener noreferrer">
                      <XIcon className="h-4 w-4 mr-2" />X (Twitter)
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={colors.cardBg}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
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
                    <span className="text-sm font-medium">{content.availability.responseTime}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {content.availability.withinHours}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{content.availability.status}</span>
                    <Badge
                      variant={new Date().getHours() >= 9 && new Date().getHours() <= 18 ? "default" : "secondary"}
                      className="transition-colors"
                    >
                      {getAvailabilityStatus()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{content.availability.timezone}</span>
                    <span className="text-sm text-muted-foreground font-mono">
                      {location?.timezone || "Europe/Lisbon"}
                    </span>
                  </div>
                  {location && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{content.availability.localTime}</span>
                      <span className="text-sm text-muted-foreground font-mono">{currentTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location-specific message */}
            {location && (
              <Card
                className={cn(
                  "border-2 transition-all duration-300 hover:shadow-md",
                  culturalTheme === "brazil"
                    ? "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/30"
                    : culturalTheme === "portugal"
                      ? "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/30"
                      : culturalTheme === "japan"
                        ? "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/30"
                        : culturalTheme === "england"
                          ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/30"
                          : "border-primary/20 bg-primary/5",
                )}
              >
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="text-3xl animate-bounce">
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
                        ? `Olá, visitante de ${location.city}! 👋`
                        : culturalTheme === "portugal"
                          ? `Olá, visitante de ${location.city}! 👋`
                          : culturalTheme === "japan"
                            ? `${location.city}からの訪問者の皆様、こんにちは！👋`
                            : culturalTheme === "england"
                              ? `Greetings, visitor from ${location.city}! 👋`
                              : `Hello, visitor from ${location.city}! 👋`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {culturalTheme === "brazil"
                        ? "Fico feliz em ter você aqui. Vamos trabalhar juntos! 🚀"
                        : culturalTheme === "portugal"
                          ? "Fico feliz em tê-lo aqui. Vamos trabalhar juntos! 🚀"
                          : culturalTheme === "japan"
                            ? "お越しいただきありがとうございます。一緒に働きましょう！🚀"
                            : culturalTheme === "england"
                              ? "Delighted to have you here. Let's collaborate! 🚀"
                              : "Great to have you here. Let's work together! 🚀"}
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
