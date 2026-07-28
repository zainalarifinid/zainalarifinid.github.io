import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Mail,
  Rocket,
  ShieldAlert,
} from 'lucide-react'
import TechIcon from '../../components/TechIcon'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Practical solutions and guidance from an Engineering Manager with 10+ years of experience — full-stack development, technical consulting & architecture, code review & debugging, and 1-on-1 mentorship.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Work With Me | Zainal Arifin',
    description:
      'Full-stack development, technical consulting & architecture, code review & debugging, and 1-on-1 mentorship from an Engineering Manager with 10+ years of experience.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work With Me | Zainal Arifin',
    description:
      'Full-stack development, technical consulting & architecture, code review & debugging, and 1-on-1 mentorship from an Engineering Manager with 10+ years of experience.',
  },
}

const CALENDLY_URL = 'https://calendly.com/zainalarifin/talk-with-zainal'
const CONTACT_EMAIL = 'arifin.1602@gmail.com'

const MAYAR_CODING_FOUNDATION_URL =
  process.env.NEXT_PUBLIC_MAYAR_CODING_FOUNDATION_URL ??
  'https://zainalarifin-88056.myr.id/coaching/coding-foundation-start-your-tech-career-with-an-engineering-manager'

type Pillar = {
  id: string
  icon: typeof Code2
  title: string
  description: string
  bulletPoints: string[]
  techBadges?: string[]
  cta: {
    label: string
    href: string
    external?: boolean
  }
  footnote?: string
}

const pillars: Pillar[] = [
  {
    id: 'full-stack-development',
    icon: Code2,
    title: 'End-to-End Full-Stack Development',
    description:
      'Need a reliable engineer to bring your product idea to life? I build fast, secure, and scalable web applications from scratch, handling both frontend and backend seamlessly.',
    bulletPoints: [
      'Custom Web Apps & MVPs: built using modern ecosystems (TypeScript, Node.js, NestJS, React).',
      'API Design & Integration: clean, well-documented RESTful APIs.',
      'Performance & Scale: optimized applications ready to handle user growth.',
    ],
    techBadges: ['TypeScript', 'Node.js', 'NestJS', 'React', 'Docker'],
    cta: { label: "Let's Talk", href: '/contact' },
  },
  {
    id: 'architecture-consulting',
    icon: Compass,
    title: 'Architecture Design & Strategy',
    description:
      "Have a project in mind but unsure about the infrastructure or database model? Let's design a technical foundation that prevents costly refactoring later.",
    bulletPoints: [
      'Tech Stack Selection: choosing the right tools tailored to your business needs and budget.',
      'System & Database Modeling: designing scalable relational architectures.',
      'Cloud & Infrastructure: planning efficient deployment workflows (Docker, CI/CD).',
    ],
    cta: { label: "Let's Talk", href: '/contact' },
  },
  {
    id: 'code-review-debugging',
    icon: ShieldAlert,
    title: 'Code Review & Emergency Debugging',
    description:
      "Stuck on a critical production bug, facing mysterious bottlenecks, or need an expert eye to review your codebase before a major release? Let's hop on a call to unblock your team.",
    bulletPoints: [
      'Pair Debugging: live troubleshooting sessions to squash complex bugs quickly.',
      'Code Optimization: refactoring messy code for better maintainability.',
      'Security & Best Practices: ensuring your code meets industry standards.',
    ],
    cta: { label: "Let's Talk", href: '/contact' },
  },
  {
    id: 'mentorship',
    icon: GraduationCap,
    title: '1-on-1 Structured Mentorship',
    description:
      'Practical, real-world guidance designed for developers looking to accelerate their growth, transition into tech leadership, or build a standout portfolio.',
    bulletPoints: [
      'Career Blueprint: clear guidance on moving from junior to senior',
      'Engineering Best Practices: learning how real-world engineering teams collaborate and ship software.'
    ],
    cta: { label: 'Book Now', href: MAYAR_CODING_FOUNDATION_URL, external: true },
    footnote:
      "Secure checkout via Mayar — you'll be redirected to Calendly after payment to pick your slot.",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-sm font-medium">
            <Rocket size={14} />
            Available for Freelance, Consulting &amp; Collaboration
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Build, Scale, and Solve Together
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Practical solutions and guidance from an Engineering Manager with over a decade
            of hands-on experience building, scaling, and shipping software with
            high-performing teams.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article
                  key={pillar.id}
                  className="group flex flex-col bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {pillar.title}
                  </h2>

                  <p className="text-gray-400 leading-relaxed mb-6">{pillar.description}</p>

                  <ul className="space-y-3 mb-6">
                    {pillar.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                      >
                        <CheckCircle2 size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {pillar.techBadges && pillar.techBadges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {pillar.techBadges.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                        >
                          <TechIcon tag={tech} size={13} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={pillar.cta.href}
                    {...(pillar.cta.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={`${pillar.cta.label} — ${pillar.title}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    {pillar.cta.label}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                  {pillar.footnote && (
                    <p className="text-xs text-gray-500 text-center mt-3">{pillar.footnote}</p>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-blue-600/10 rounded-2xl p-10 border border-blue-600/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to collaborate?
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Whether you want to build a new app, optimize your database, or level up your
              coding career — let&apos;s chat about how I can help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto"
              >
                <CalendarClock size={18} />
                Book a Discovery Call
              </Link>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-900 w-full sm:w-auto"
              >
                <Mail size={18} />
                Drop Me an Email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
