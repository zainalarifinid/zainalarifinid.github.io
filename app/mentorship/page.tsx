import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, GraduationCap, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentorship',
  description:
    '1-on-1 mentoring programs from an Engineering Manager with 10+ years of hiring and mentoring experience. Build a strong programming foundation, choose the right tech stack, and craft a portfolio that gets noticed.',
  alternates: { canonical: '/mentorship' },
  openGraph: {
    title: 'Mentorship | Zainal Arifin',
    description:
      '1-on-1 mentoring programs from an Engineering Manager with 10+ years of hiring and mentoring experience.',
    url: '/mentorship',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentorship | Zainal Arifin',
    description:
      '1-on-1 mentoring programs from an Engineering Manager with 10+ years of hiring and mentoring experience.',
  },
}

type ServiceCard = {
  id: string
  icon: typeof GraduationCap
  title: string
  description: string
  sellingPoints: string[]
  bookingUrl: string
}

const MAYAR_CODING_FOUNDATION_URL =
  process.env.NEXT_PUBLIC_MAYAR_CODING_FOUNDATION_URL ??
  'https://zainalarifin-88056.myr.id/coaching/coding-foundation-start-your-tech-career-with-an-engineering-manager'

const services: ServiceCard[] = [
  {
    id: 'coding-foundation',
    icon: GraduationCap,
    title: 'Coding Foundation (Zero to Hero)',
    description:
      'Mentoring program designed for beginners and career switchers. Focused on building a strong programming foundation, choosing the right tech stack, and preparing a portfolio that actually gets noticed by recruiters.',
    sellingPoints: [
      'Learn directly from an Engineering Manager with over 10 years of hands-on experience hiring and mentoring developers.',
    ],
    bookingUrl: MAYAR_CODING_FOUNDATION_URL,
  },
]

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-sm font-medium">
            <Rocket size={14} />
            1-on-1 Mentorship
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Level up your career with structured mentorship
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Practical guidance from an Engineering Manager who has spent over a decade
            hiring, mentoring, and shipping software with high-performing teams.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.id}
                  className="group flex flex-col bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h2>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.sellingPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-blue-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book ${service.title} via Mayar`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    Book Now
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Secure checkout via Mayar — you&apos;ll be redirected to Calendly
                    after payment to pick your slot.
                  </p>
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
              Not sure which program fits you?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tell me about your goals and current level — I&apos;ll point you to the
              right path, even if it isn&apos;t one of mine.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Get in touch
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
