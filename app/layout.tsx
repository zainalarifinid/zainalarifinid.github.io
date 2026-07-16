import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import JsonLd from '../components/JsonLd'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { personSchema } from '../lib/schemas/person'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://zainalarifin.id'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zainal Arifin - Engineering Manager & Developer',
    template: '%s | Zainal Arifin',
  },
  description: 'Portfolio of Zainal Arifin, an Engineering Manager & Senior Full-Stack Developer with 10+ years building web and mobile apps from Bandung, Indonesia.',
  keywords: ['Zainal Arifin', 'Engineering Manager', 'Full-Stack Developer', 'Software Engineer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Bandung', 'Indonesia'],
  authors: [{ name: 'Zainal Arifin', url: SITE_URL }],
  creator: 'Zainal Arifin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Zainal Arifin - Engineering Manager & Developer',
    description: 'Engineering Manager & Senior Full-Stack Developer crafting scalable web and mobile applications from Bandung, Indonesia.',
    url: SITE_URL,
    siteName: 'Zainal Arifin',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zainal Arifin - Engineering Manager & Developer',
    description: 'Engineering Manager & Senior Full-Stack Developer from Bandung, Indonesia.',
    creator: '@zainalarifin_id',
  },
}

// Navigation component
function Navigation() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/showcase', label: 'Showcase' },
    { href: '/articles', label: 'Articles' },
    { href: '/mentorship', label: 'Mentorship' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
            ZA
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button (placeholder) */}
          <div className="md:hidden">
            <button className="text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <GoogleAnalytics />
        <JsonLd data={personSchema} />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Zainal Arifin. All rights reserved.</p>
              <p className="mt-2 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
