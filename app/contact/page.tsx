import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'zainal.arifin@example.com',
      href: 'mailto:zainal.arifin@example.com',
      description: 'Send me a direct message'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/zainalarifin',
      href: 'https://linkedin.com/in/zainalarifin',
      description: 'Connect with me professionally'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@zainalarifin',
      href: 'https://github.com/zainalarifin',
      description: 'Check out my open source work'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@zainalarifin',
      href: 'https://twitter.com/zainalarifin',
      description: 'Follow me for tech updates'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I&apos;m always open to discussing new opportunities, interesting projects,
            or just having a chat about technology and development.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-500 transition-colors duration-300">
                    <IconComponent size={24} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {method.label}
                    </h3>
                    <p className="text-blue-400 font-medium mb-2">
                      {method.value}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Location */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <MapPin size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Location</h3>
              <p className="text-gray-400">Based in Bandung, Indonesia</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            I&apos;m currently based in Bandung, Indonesia, but I work with clients and teams
            from around the world. I&apos;m comfortable working across different time zones
            and am open to both remote and on-site opportunities.
          </p>
        </div>

        {/* Availability */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Current Availability</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Available for new projects</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Open to collaborations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Accepting consulting opportunities</span>
            </div>
          </div>

          <p className="text-gray-400 mt-6 leading-relaxed">
            I&apos;m particularly interested in projects involving modern web technologies,
            especially React, Next.js, and Node.js. Whether you&apos;re a startup looking to
            build your MVP or an established company needing to modernize your tech stack,
            I&apos;d love to hear about your project.
          </p>
        </div>

        {/* Response Time */}
        <div className="text-center bg-blue-600/10 rounded-xl p-8 border border-blue-600/20">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Response</h3>
          <p className="text-gray-300 mb-4">
            I typically respond to messages within 24 hours during business days.
          </p>
          <p className="text-blue-400 font-medium">
            Looking forward to hearing from you!
          </p>
        </div>
      </div>
    </div>
  )
}
