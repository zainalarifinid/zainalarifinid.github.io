import { Code, Coffee, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', technologies: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools & Others', technologies: ['Git', 'Docker', 'AWS', 'Vercel', 'Jest'] },
  ]

  const experience = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Leading development of modern web applications using React, Next.js, and Node.js.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Startup Inc.',
      period: '2021 - 2023',
      description: 'Built scalable web applications and APIs, collaborated with cross-functional teams.',
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2020 - 2021',
      description: 'Developed responsive user interfaces and optimized web performance.',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate software developer who loves creating efficient and elegant solutions
            to complex problems.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-gray-800">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-8xl text-white font-bold">ZA</div>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Hi, I&apos;m Zainal</h2>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                I&apos;m a software developer based in Bandung, Indonesia, with a passion for creating
                robust web applications that solve real-world problems. My journey in technology
                started several years ago, and I&apos;ve been constantly learning and evolving ever since.
              </p>

              <p>
                I specialize in full-stack development with a focus on modern JavaScript frameworks,
                particularly React and Next.js. I enjoy working on both the frontend and backend,
                creating seamless user experiences backed by solid, scalable architecture.
              </p>

              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing my knowledge through writing and mentoring.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-400" size={20} />
                <span className="text-gray-300">Bandung, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="text-blue-400" size={20} />
                <span className="text-gray-300">Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="text-blue-400" size={20} />
                <span className="text-gray-300">Coffee Enthusiast</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={20} />
                <span className="text-gray-300">Team Player</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-900 rounded-xl p-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects.
            Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}
