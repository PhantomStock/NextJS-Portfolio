import { usePreferences } from "@/contexts/preferences-context"
import { useLocation } from "@/contexts/location-context"

interface LocalizedContent {
  greeting: string
  subtitle: string
  contactTitle: string
  contactSubtitle: string
  formLabels: {
    name: string
    email: string
    subject: string
    message: string
    send: string
  }
  sections: {
    projects: string
    skills: string
    contact: string
    about: string
    home: string
  }
  navigation: {
    home: string
    projects: string
    about: string
    cv: string
    contact: string
    portfolio: string
  }
  buttons: {
    viewCode: string
    liveDemo: string
    getInTouch: string
    viewGitHub: string
    downloadCV: string
    sendMessage: string
    contactMe: string
  }
  timeGreeting: string
  locationMessage: string
  footer: {
    description: string
    navigationTitle: string
    connectTitle: string
    followTitle: string
    rightsReserved: string
  }
  availability: {
    responseTime: string
    status: string
    timezone: string
    localTime: string
    available: string
    unavailable: string
    withinHours: string
  }
}

export function useLocalizedContent(): LocalizedContent {
  const { culturalTheme } = usePreferences()
  const { location } = useLocation()

  const currentHour = new Date().getHours()

  const getTimeGreeting = () => {
    if (culturalTheme === "brazil") {
      if (currentHour < 12) return "Bom dia"
      if (currentHour < 18) return "Boa tarde"
      return "Boa noite"
    } else if (culturalTheme === "portugal") {
      if (currentHour < 12) return "Bom dia"
      if (currentHour < 18) return "Boa tarde"
      return "Boa noite"
    } else if (culturalTheme === "japan") {
      if (currentHour < 10) return "おはようございます"
      if (currentHour < 18) return "こんにちは"
      return "こんばんは"
    } else if (culturalTheme === "england") {
      if (currentHour < 12) return "Good morning"
      if (currentHour < 18) return "Good afternoon"
      return "Good evening"
    } else {
      if (currentHour < 12) return "Good morning"
      if (currentHour < 18) return "Good afternoon"
      return "Good evening"
    }
  }

  const getLocationMessage = () => {
    if (!location) return ""

    if (culturalTheme === "brazil") {
      return `Olá de ${location.city}, ${location.country}! 🌎`
    } else if (culturalTheme === "portugal") {
      return `Olá de ${location.city}, ${location.country}! 🌍`
    } else if (culturalTheme === "japan") {
      return `${location.city}、${location.country}からこんにちは！🌏`
    } else if (culturalTheme === "england") {
      return `Greetings from ${location.city}, ${location.country}! 🇬🇧`
    } else {
      return `Hello from ${location.city}, ${location.country}! 🌍`
    }
  }

  switch (culturalTheme) {
    case "brazil":
      return {
        greeting: "Olá! Eu sou",
        subtitle: "Desenvolvedor iniciante apaixonado por aprender e criar soluções inovadoras",
        contactTitle: "Vamos Conversar",
        contactSubtitle:
          "Tem um projeto em mente ou quer colaborar? Adoraria ouvir de você. Mande uma mensagem e responderei o mais rápido possível.",
        formLabels: {
          name: "Nome",
          email: "E-mail",
          subject: "Assunto",
          message: "Mensagem",
          send: "Enviar Mensagem",
        },
        sections: {
          projects: "Projetos em Destaque",
          skills: "Habilidades & Tecnologias",
          contact: "Contato",
          about: "Sobre",
          home: "Início",
        },
        navigation: {
          home: "Início",
          projects: "Projetos",
          about: "Sobre",
          cv: "Currículo",
          contact: "Contato",
          portfolio: "Portfólio",
        },
        buttons: {
          viewCode: "Ver Código",
          liveDemo: "Demo Ao Vivo",
          getInTouch: "Vamos Conversar",
          viewGitHub: "Ver GitHub",
          downloadCV: "Baixar Currículo",
          sendMessage: "Enviar Mensagem",
          contactMe: "Entre em Contato",
        },
        timeGreeting: getTimeGreeting(),
        locationMessage: getLocationMessage(),
        footer: {
          description:
            "Estudante de Ciência da Computação e desenvolvedor iniciante apaixonado por aprender e criar soluções inovadoras.",
          navigationTitle: "Navegação",
          connectTitle: "Conectar",
          followTitle: "Me Siga",
          rightsReserved: "Todos os direitos reservados.",
        },
        availability: {
          responseTime: "Tempo de Resposta",
          status: "Status",
          timezone: "Fuso Horário",
          localTime: "Hora Local",
          available: "Disponível para projetos",
          unavailable: "Fora do horário comercial",
          withinHours: "Em até 24 horas",
        },
      }

    case "portugal":
      return {
        greeting: "Olá! Eu sou",
        subtitle: "Programador iniciante apaixonado por aprender e criar soluções inovadoras",
        contactTitle: "Vamos Falar",
        contactSubtitle:
          "Tem algum projecto em mente ou quer colaborar? Gostaria muito de ouvir de si. Envie uma mensagem e responderei o mais rapidamente possível.",
        formLabels: {
          name: "Nome",
          email: "E-mail",
          subject: "Assunto",
          message: "Mensagem",
          send: "Enviar Mensagem",
        },
        sections: {
          projects: "Projectos em Destaque",
          skills: "Competências & Tecnologias",
          contact: "Contacto",
          about: "Sobre Mim",
          home: "Início",
        },
        navigation: {
          home: "Início",
          projects: "Projectos",
          about: "Sobre Mim",
          cv: "Currículo",
          contact: "Contacto",
          portfolio: "Portfólio",
        },
        buttons: {
          viewCode: "Ver Código",
          liveDemo: "Demo Ao Vivo",
          getInTouch: "Vamos Falar",
          viewGitHub: "Ver GitHub",
          downloadCV: "Descarregar Currículo",
          sendMessage: "Enviar Mensagem",
          contactMe: "Entre em Contacto",
        },
        timeGreeting: getTimeGreeting(),
        locationMessage: getLocationMessage(),
        footer: {
          description:
            "Estudante de Ciência da Computação e programador iniciante apaixonado por aprender e criar soluções inovadoras.",
          navigationTitle: "Navegação",
          connectTitle: "Conectar",
          followTitle: "Siga-me",
          rightsReserved: "Todos os direitos reservados.",
        },
        availability: {
          responseTime: "Tempo de Resposta",
          status: "Status",
          timezone: "Fuso Horário",
          localTime: "Hora Local",
          available: "Disponível para projectos",
          unavailable: "Fora do horário comercial",
          withinHours: "Em até 24 horas",
        },
      }

    case "japan":
      return {
        greeting: "こんにちは！私は",
        subtitle: "革新的なソリューションを学び、作ることに情熱を注ぐ初心者開発者",
        contactTitle: "お話しましょう",
        contactSubtitle:
          "プロジェクトのアイデアがあるか、コラボレーションをお考えですか？ぜひお聞かせください。メッセージをお送りいただければ、できるだけ早くお返事いたします。",
        formLabels: {
          name: "名前",
          email: "メールアドレス",
          subject: "件名",
          message: "メッセージ",
          send: "メッセージを送信",
        },
        sections: {
          projects: "注目のプロジェクト",
          skills: "スキルと技術",
          contact: "お問い合わせ",
          about: "私について",
          home: "ホーム",
        },
        navigation: {
          home: "ホーム",
          projects: "プロジェクト",
          about: "私について",
          cv: "履歴書",
          contact: "お問い合わせ",
          portfolio: "ポートフォリオ",
        },
        buttons: {
          viewCode: "コードを見る",
          liveDemo: "ライブデモ",
          getInTouch: "お話しましょう",
          viewGitHub: "GitHubを見る",
          downloadCV: "履歴書をダウンロード",
          sendMessage: "メッセージを送信",
          contactMe: "お問い合わせ",
        },
        timeGreeting: getTimeGreeting(),
        locationMessage: getLocationMessage(),
        footer: {
          description: "革新的なソリューションを学び、作ることに情熱を注ぐコンピュータサイエンス学生兼初心者開発者。",
          navigationTitle: "ナビゲーション",
          connectTitle: "接続",
          followTitle: "フォロー",
          rightsReserved: "全著作権所有。",
        },
        availability: {
          responseTime: "返信時間",
          status: "ステータス",
          timezone: "タイムゾーン",
          localTime: "現地時間",
          available: "プロジェクト対応可能",
          unavailable: "営業時間外",
          withinHours: "24時間以内",
        },
      }

    case "england":
      return {
        greeting: "Hello! I'm",
        subtitle: "Aspiring developer passionate about learning and crafting innovative solutions",
        contactTitle: "Let's Have a Chat",
        contactSubtitle:
          "Got a brilliant project in mind or fancy a collaboration? I'd be delighted to hear from you. Drop me a message and I'll get back to you promptly.",
        formLabels: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message",
          send: "Send Message",
        },
        sections: {
          projects: "Featured Projects",
          skills: "Skills & Technologies",
          contact: "Contact",
          about: "About Me",
          home: "Home",
        },
        navigation: {
          home: "Home",
          projects: "Projects",
          about: "About Me",
          cv: "CV",
          contact: "Contact",
          portfolio: "Portfolio",
        },
        buttons: {
          viewCode: "View Code",
          liveDemo: "Live Demo",
          getInTouch: "Let's Have a Chat",
          viewGitHub: "View GitHub",
          downloadCV: "Download CV",
          sendMessage: "Send Message",
          contactMe: "Contact Me",
        },
        timeGreeting: getTimeGreeting(),
        locationMessage: getLocationMessage(),
        footer: {
          description:
            "Computer Science student and aspiring developer passionate about learning and creating innovative solutions.",
          navigationTitle: "Navigation",
          connectTitle: "Connect",
          followTitle: "Follow Me",
          rightsReserved: "All rights reserved.",
        },
        availability: {
          responseTime: "Response Time",
          status: "Status",
          timezone: "Timezone",
          localTime: "Local Time",
          available: "Available for projects",
          unavailable: "Outside office hours",
          withinHours: "Within 24 hours",
        },
      }

    default:
      return {
        greeting: "Hello, I'm",
        subtitle:
          "Computer Science student and aspiring developer passionate about learning and creating innovative solutions",
        contactTitle: "Get In Touch",
        contactSubtitle:
          "Have a project in mind or interested in collaboration? I would love to hear from you. Send me a message and I will respond as soon as possible.",
        formLabels: {
          name: "Name",
          email: "Email Address",
          subject: "Subject",
          message: "Message",
          send: "Send Message",
        },
        sections: {
          projects: "Featured Projects",
          skills: "Technical Skills",
          contact: "Contact Information",
          about: "About Me",
          home: "Home",
        },
        navigation: {
          home: "Home",
          projects: "Projects",
          about: "About",
          cv: "About",
          contact: "Contact",
          portfolio: "Portfolio",
        },
        buttons: {
          viewCode: "View Code",
          liveDemo: "Live Demo",
          getInTouch: "Get In Touch",
          viewGitHub: "View GitHub",
          downloadCV: "Download Resume",
          sendMessage: "Send Message",
          contactMe: "Contact Me",
        },
        timeGreeting: getTimeGreeting(),
        locationMessage: getLocationMessage(),
        footer: {
          description:
            "Computer Science student and aspiring developer passionate about learning and creating innovative solutions.",
          navigationTitle: "Navigation",
          connectTitle: "Connect",
          followTitle: "Follow Me",
          rightsReserved: "All rights reserved.",
        },
        availability: {
          responseTime: "Response Time",
          status: "Status",
          timezone: "Time Zone",
          localTime: "Local Time",
          available: "Available for collaboration",
          unavailable: "Outside study hours",
          withinHours: "Within 24 hours",
        },
      }
  }
}
