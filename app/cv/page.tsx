"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mail, Phone, Download, Calendar, Globe, User, Briefcase, GraduationCap, Languages } from "lucide-react"
import Link from "next/link"
import { usePreferences } from "@/contexts/preferences-context"
import { useLocalizedContent } from "@/utils/content-localization"
import { PageLayout } from "@/components/page-layout"
import { Section } from "@/components/section"

export default function CV() {
  const { culturalTheme } = usePreferences()
  const content = useLocalizedContent()

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

  const getLocalizedCV = () => {
    switch (culturalTheme) {
      case "brazil":
        return {
          title: "Currículo",
          subtitle: "Estudante de Ciência da Computação & Desenvolvedor Iniciante",
          about: "SOBRE MIM",
          aboutText:
            "Estudante de Ciência da Computação no Instituto Politécnico de Leiria com cerca de três anos de experiência na indústria e atendimento ao público. Desenvolvedor iniciante apaixonado por aprender novas tecnologias e criar soluções inovadoras. Tenho facilidade para atuar sob pressão, trabalhar em equipe multicultural e oferecer atendimento de excelência.",
          experience: "EXPERIÊNCIA PROFISSIONAL",
          education: "EDUCAÇÃO E FORMAÇÃO",
          languages: "COMPETÊNCIAS LINGUÍSTICAS",
          skills: "COMPETÊNCIAS TÉCNICAS",
          contact: "CONTACTO",
          download: "Baixar CV",
        }
      case "portugal":
        return {
          title: "Currículo Vitae",
          subtitle: "Estudante de Ciência da Computação & Programador Iniciante",
          about: "SOBRE MIM",
          aboutText:
            "Estudante de Ciência da Computação no Instituto Politécnico de Leiria com cerca de três anos de experiência na indústria e atendimento ao público. Programador iniciante apaixonado por aprender novas tecnologias e criar soluções inovadoras. Tenho facilidade para atuar sob pressão, trabalhar em equipe multicultural e oferecer atendimento de excelência.",
          experience: "EXPERIÊNCIA PROFISSIONAL",
          education: "EDUCAÇÃO E FORMAÇÃO",
          languages: "COMPETÊNCIAS LINGUÍSTICAS",
          skills: "COMPETÊNCIAS TÉCNICAS",
          contact: "CONTACTO",
          download: "Descarregar CV",
        }
      case "japan":
        return {
          title: "履歴書",
          subtitle: "コンピュータサイエンス学生・初心者開発者",
          about: "自己紹介",
          aboutText:
            "Instituto Politécnico de Leiriaでコンピュータサイエンスを学ぶ学生で、業界および接客業で約3年の経験を持っています。新しい技術を学び、革新的なソリューションを作ることに情熱を注ぐ初心者開発者です。プレッシャーの下での作業、多文化チームでの協働、優れた顧客サービスの提供が得意です。",
          experience: "職歴",
          education: "学歴",
          languages: "語学力",
          skills: "技術スキル",
          contact: "連絡先",
          download: "履歴書をダウンロード",
        }
      case "england":
        return {
          title: "Curriculum Vitae",
          subtitle: "Computer Science Student & Aspiring Developer",
          about: "ABOUT ME",
          aboutText:
            "Computer Science student at Instituto Politécnico de Leiria with approximately three years of experience in industry and customer service. Aspiring developer passionate about learning new technologies and creating innovative solutions. I have the ability to work under pressure, collaborate in multicultural teams, and provide excellent customer service.",
          experience: "PROFESSIONAL EXPERIENCE",
          education: "EDUCATION & TRAINING",
          languages: "LANGUAGE SKILLS",
          skills: "TECHNICAL COMPETENCIES",
          contact: "CONTACT INFORMATION",
          download: "Download CV",
        }
      default:
        return {
          title: "Resume",
          subtitle: "Computer Science Student & Aspiring Developer",
          about: "ABOUT ME",
          aboutText:
            "Computer Science student at Instituto Politécnico de Leiria with approximately three years of professional experience in industry and customer service. Aspiring developer passionate about learning new technologies and creating innovative solutions. I possess strong abilities to work under pressure, collaborate effectively in multicultural teams, and deliver excellent customer service.",
          experience: "PROFESSIONAL EXPERIENCE",
          education: "EDUCATION & TRAINING",
          languages: "LANGUAGE PROFICIENCY",
          skills: "TECHNICAL SKILLS",
          contact: "CONTACT INFORMATION",
          download: "Download Resume",
        }
    }
  }

  const cvContent = getLocalizedCV()

  return (
    <PageLayout title={cvContent.title} subtitle={cvContent.subtitle}>
      {/* Download Button Section */}
      <Section variant="muted" className="py-6">
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6">
            <Download className="mr-2 h-5 w-5" />
            {cvContent.download}
          </Button>
        </div>
      </Section>

      {/* Personal Information */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="text-2xl">Wilson Tsuyoshi Oliveira Campos</CardTitle>
            <CardDescription>
              <div className="grid gap-2 md:grid-cols-2 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {culturalTheme === "default"
                      ? "Date of Birth: October 6, 2003"
                      : culturalTheme === "england"
                        ? "Date of Birth: 6th October 2003"
                        : "06/10/2003"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {culturalTheme === "default"
                      ? "Place of Birth: São José dos Campos, Brazil"
                      : culturalTheme === "england"
                        ? "Place of Birth: São José dos Campos, Brazil"
                        : "São José Dos Campos, Brasil"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>
                    {culturalTheme === "default"
                      ? "Nationality: Brazilian"
                      : culturalTheme === "england"
                        ? "Nationality: Brazilian"
                        : culturalTheme === "brazil" || culturalTheme === "portugal"
                          ? "Nacionalidade: Brasileira"
                          : culturalTheme === "japan"
                            ? "国籍: ブラジル"
                            : "Nacionalidade: Brasileira"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>
                    {culturalTheme === "default"
                      ? "Work Authorization: Portuguese"
                      : culturalTheme === "england"
                        ? "Work Authorization: Portuguese"
                        : culturalTheme === "brazil" || culturalTheme === "portugal"
                          ? "Autorização de trabalho: Portuguesa"
                          : culturalTheme === "japan"
                            ? "労働許可: ポルトガル"
                            : "Autorização de trabalho: Portuguesa"}
                  </span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </Section>

      {/* Contact Information */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {cvContent.contact}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">
                    {culturalTheme === "default" || culturalTheme === "england" ? "Address" : "Endereço"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Rua Paulo VI, URB DA ENCOSTA LT5 A 5ºDT
                    <br />
                    2410-149 Leiria, Portugal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">
                    {culturalTheme === "default" || culturalTheme === "england" ? "Academic Email" : "Email Académico"}
                  </p>
                  <Link href="mailto:2240115@my.ipleiria.pt" className="text-sm text-primary hover:underline">
                    2240115@my.ipleiria.pt
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">
                    {culturalTheme === "default" || culturalTheme === "england" ? "Personal Email" : "Email Pessoal"}
                  </p>
                  <Link href="mailto:wilcampos2003@gmail.com" className="text-sm text-primary hover:underline">
                    wilcampos2003@gmail.com
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
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
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* About Me */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {cvContent.about}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{cvContent.aboutText}</p>
          </CardContent>
        </Card>
      </Section>

      {/* Education */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {cvContent.education}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Education */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {culturalTheme === "default"
                      ? "Computer Science Degree"
                      : culturalTheme === "england"
                        ? "Computer Science Degree"
                        : culturalTheme === "brazil" || culturalTheme === "portugal"
                          ? "Licenciatura em Ciência da Computação"
                          : culturalTheme === "japan"
                            ? "コンピュータサイエンス学位"
                            : "Licenciatura em Ciência da Computação"}
                  </h3>
                  <Link
                    href="https://www.ipleiria.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline transition-colors"
                  >
                    Instituto Politécnico de Leiria
                  </Link>
                  <p className="text-sm text-muted-foreground">Leiria, Portugal</p>
                </div>
                <Badge variant="default">
                  {culturalTheme === "default" || culturalTheme === "england" ? "Current" : "Atual"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {culturalTheme === "default"
                  ? "Currently pursuing a degree in Computer Science with focus on software development, algorithms, and modern programming technologies."
                  : culturalTheme === "england"
                    ? "Currently pursuing a degree in Computer Science with focus on software development, algorithms, and modern programming technologies."
                    : culturalTheme === "brazil" || culturalTheme === "portugal"
                      ? "Atualmente cursando licenciatura em Ciência da Computação com foco em desenvolvimento de software, algoritmos e tecnologias de programação modernas."
                      : culturalTheme === "japan"
                        ? "ソフトウェア開発、アルゴリズム、現代のプログラミング技術に焦点を当てたコンピュータサイエンスの学位を現在取得中。"
                        : "Atualmente cursando licenciatura em Ciência da Computação com foco em desenvolvimento de software, algoritmos e tecnologias de programação modernas."}
              </p>
            </div>

            <Separator />

            {/* Previous Education */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {culturalTheme === "default"
                      ? "High School Diploma"
                      : culturalTheme === "england"
                        ? "Secondary Education"
                        : "Conclusão do ensino médio"}
                  </h3>
                  <p className="text-primary font-medium">Escola Mundo de Alegria</p>
                  <p className="text-sm text-muted-foreground">Maisaka, Japan</p>
                </div>
                <Badge variant="outline">2018 – 2020</Badge>
              </div>
              <Link href="https://www.mundodealegria.org/brasil/" className="text-xs text-primary hover:underline">
                https://www.mundodealegria.org/brasil/
              </Link>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Professional Experience */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {cvContent.experience}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Yamaha Experience */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {culturalTheme === "default"
                      ? "Raw Material Supply Specialist"
                      : culturalTheme === "england"
                        ? "Raw Material Supply Specialist"
                        : "Abastecimento de matéria prima"}
                  </h3>
                  <p className="text-primary font-medium">Yamaha Motors Co. Ltd., Hamakita Factory</p>
                  <p className="text-sm text-muted-foreground">Hamamatsu, Japan</p>
                </div>
                <Badge variant="outline">September 2021 – June 2024</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Managed raw material supply (iron) for manufacturing gears and mechanical components"
                    : culturalTheme === "england"
                      ? "Managed raw material supply (iron) for manufacturing gears and mechanical components"
                      : "Abastecimento de matéria-prima (ferro) para fabricação de engrenagens e componentes mecânicos"}
                </li>
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Trained new employees with support in Japanese and English for multicultural teams"
                    : culturalTheme === "england"
                      ? "Trained new employees with support in Japanese and English for multicultural teams"
                      : "Treinamento de novos colaboradores, com suporte em japonês e inglês para equipes multiculturais"}
                </li>
              </ul>
              <Link href="https://global.yamaha-motor.com" className="text-xs text-primary hover:underline">
                https://global.yamaha-motor.com
              </Link>
            </div>

            <Separator />

            {/* Electronics Assembly */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {culturalTheme === "default"
                      ? "Electronics Assembly Technician"
                      : culturalTheme === "england"
                        ? "Electronics Assembly Technician"
                        : "Montagem de placas eletrónicas"}
                  </h3>
                  <p className="text-primary font-medium">Asti Corporation</p>
                  <p className="text-sm text-muted-foreground">Iwata, Japan</p>
                </div>
                <Badge variant="outline">March 2021 – August 2021</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Assembled and soldered electronic components on circuit boards for manufacturers including Yamaha and Suzuki"
                    : culturalTheme === "england"
                      ? "Assembled and soldered electronic components on circuit boards for manufacturers including Yamaha and Suzuki"
                      : "Montagem e soldagem de componentes em placas eletrônicas para fábricas e montadoras como Yamaha e Suzuki"}
                </li>
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Conducted quality inspection of assembled boards and applied protective coating for enhanced circuit durability"
                    : culturalTheme === "england"
                      ? "Conducted quality inspection of assembled boards and applied protective coating for enhanced circuit durability"
                      : "Inspeção de qualidade das placas montadas e aplicação de revestimento protetor para maior durabilidade dos circuitos"}
                </li>
              </ul>
            </div>

            <Separator />

            {/* 7-Eleven Experience */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {culturalTheme === "default"
                      ? "Customer Service Representative"
                      : culturalTheme === "england"
                        ? "Customer Service Representative"
                        : "Atendimento e Operações em loja 24 horas"}
                  </h3>
                  <p className="text-primary font-medium">7-Eleven</p>
                  <p className="text-sm text-muted-foreground">Hamamatsu, Japan</p>
                </div>
                <Badge variant="outline">June 2019 – March 2021</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Provided customer service in Japanese, Portuguese, and English with focus on clear and efficient communication"
                    : culturalTheme === "england"
                      ? "Provided customer service in Japanese, Portuguese, and English with focus on clear and efficient communication"
                      : "Atendimento ao cliente em japonês, português e inglês, com foco em comunicação clara e eficiente"}
                </li>
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Managed inventory control using 7-Eleven systems, ensuring product replenishment and organization"
                    : culturalTheme === "england"
                      ? "Managed inventory control using 7-Eleven systems, ensuring product replenishment and organisation"
                      : "Controle de estoque pelo sistema da 7-Eleven, garantindo reposição e organização dos produtos"}
                </li>
                <li>
                  •{" "}
                  {culturalTheme === "default"
                    ? "Maintained store cleanliness and environment according to company standards"
                    : culturalTheme === "england"
                      ? "Maintained store cleanliness and environment according to company standards"
                      : "Limpeza e conservação do ambiente conforme os padrões da loja"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Language Skills */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              {cvContent.languages}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  {culturalTheme === "default"
                    ? "NATIVE LANGUAGE:"
                    : culturalTheme === "england"
                      ? "NATIVE LANGUAGE:"
                      : "LÍNGUA(S) MATERNA(S):"}
                </h4>
                <Badge variant="default" className="mr-2">
                  {culturalTheme === "default" || culturalTheme === "england"
                    ? "Portuguese - Native"
                    : "Português - Nativo"}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  {culturalTheme === "default"
                    ? "OTHER LANGUAGES:"
                    : culturalTheme === "england"
                      ? "OTHER LANGUAGES:"
                      : "OUTRA(S) LÍNGUA(S):"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Japanese - Advanced (C2)"
                      : "Japonês - Avançado (C2)"}
                  </Badge>
                  <Badge variant="secondary">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "English - Advanced (C2)"
                      : "Inglês - Avançado (C2)"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Technical Skills */}
      <Section>
        <Card className={colors.cardBg}>
          <CardHeader>
            <CardTitle>{cvContent.skills}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">
                  {culturalTheme === "default"
                    ? "Programming Languages:"
                    : culturalTheme === "england"
                      ? "Programming Languages:"
                      : culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Linguagens de Programação:"
                        : culturalTheme === "japan"
                          ? "プログラミング言語:"
                          : "Linguagens de Programação:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">C#</Badge>
                  <Badge variant="outline">C</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">PHP</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">
                  {culturalTheme === "default"
                    ? "Web Technologies:"
                    : culturalTheme === "england"
                      ? "Web Technologies:"
                      : culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Tecnologias Web:"
                        : culturalTheme === "japan"
                          ? "ウェブ技術:"
                          : "Tecnologias Web:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">HTML</Badge>
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Node.js</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">
                  {culturalTheme === "default"
                    ? "Databases & Tools:"
                    : culturalTheme === "england"
                      ? "Databases & Tools:"
                      : culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Bases de Dados & Ferramentas:"
                        : culturalTheme === "japan"
                          ? "データベース・ツール:"
                          : "Bases de Dados & Ferramentas:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">MySQL</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">Git</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">
                  {culturalTheme === "default"
                    ? "Professional Skills:"
                    : culturalTheme === "england"
                      ? "Professional Skills:"
                      : culturalTheme === "brazil" || culturalTheme === "portugal"
                        ? "Competências Profissionais:"
                        : culturalTheme === "japan"
                          ? "専門スキル:"
                          : "Competências Profissionais:"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Team Collaboration"
                      : "Trabalho em equipa"}
                  </Badge>
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Pressure Management"
                      : "Trabalho sob pressão"}
                  </Badge>
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Customer Service"
                      : "Atendimento ao público"}
                  </Badge>
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Multilingual Support"
                      : "Atendimento multilíngue"}
                  </Badge>
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Cultural Adaptation"
                      : "Adaptação cultural"}
                  </Badge>
                  <Badge variant="outline">
                    {culturalTheme === "default" || culturalTheme === "england"
                      ? "Inventory Management"
                      : "Controle de estoque"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  )
}
