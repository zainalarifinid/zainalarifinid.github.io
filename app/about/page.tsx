import type { Metadata } from 'next'
import Image from 'next/image'
import { Briefcase, Code, GraduationCap, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineering Manager & Senior Full-Stack Developer with 10+ years of experience. Learn about my background, skills, and professional journey.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Zainal Arifin',
    description: 'Engineering Manager & Senior Full-Stack Developer with 10+ years of experience building web and mobile applications.',
    url: '/about',
    type: 'profile',
    images: [{ url: '/main/profile.jpeg', width: 800, height: 800, alt: 'Zainal Arifin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zainal Arifin',
    description: 'Engineering Manager & Senior Full-Stack Developer with 10+ years of experience.',
    images: ['/main/profile.jpeg'],
  },
}

export default function AboutPage() {
  const skills = [
    {
      category: 'Languages',
      technologies: ['JavaScript (ES6+)', 'TypeScript', 'PHP', 'C#', 'Dart', 'Node.js'],
    },
    {
      category: 'Frameworks & Libraries',
      technologies: ['React.js', 'NestJS', 'Vue.js', 'Laravel', 'CodeIgniter', 'Flutter', 'React Native'],
    },
    {
      category: 'Infrastructure & Tools',
      technologies: ['Docker', 'AWS', 'Kafka', 'Git', 'Firebase', 'n8n', 'CI/CD'],
    },
    {
      category: 'Databases',
      technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Firestore'],
    },
    {
      category: 'Leadership',
      technologies: ['Engineering Management', 'Mentoring', 'Sprint Planning', 'Stakeholder Management', 'TRD/PRD Authoring'],
    },
  ]

  const experience = [
    {
      role: 'Engineering Manager',
      company: 'Moladin',
      period: '2023 – 2024, 2025 – Present',
      highlights: [
        'Rehired in 2025 to resume leadership of the engineering team, demonstrating a high level of organizational trust.',
        'Lead engineering teams in developing and maintaining strategic features to support core business growth.',
        'Manage task breakdown and technical roadmaps, ensuring a 100% on-time project delivery rate.',
        'Author comprehensive Technical Requirement Documents (TRD) to bridge complex business needs with scalable technical implementations.',
        'Cultivate a continuous learning culture and mentor team members to elevate their technical proficiency.',
      ],
    },
    {
      role: 'Senior Software Engineer – Frontend',
      company: 'Moladin',
      period: '2022 – 2023',
      highlights: [
        'Spearheaded the Micro-frontend architecture refactoring project, significantly improving code readability and cross-squad collaboration.',
        'Optimized frontend components resulting in improved application performance and enhanced user experience (UX).',
        'Served as a technical mentor, guiding junior developers in adopting modern frontend best practices and state management.',
      ],
    },
    {
      role: 'Programmer',
      company: 'Mitrais',
      period: '2021 – 2022',
      highlights: [
        'Consulted for an Australian client, maintaining and enhancing UI for communication platforms (Zoom, MS Teams, Webex).',
        'Adhered to SWEBOK standards in developing Node.js and React-based applications.',
        'Tech Stack: Node.js, React, TypeScript, MongoDB, AWS.',
      ],
    },
  ]

  const otherExperience = [
    { company: 'OnlinePajak', role: 'Senior Software Developer', stack: 'VueJS, NestJS, RabbitMQ', period: '2019 – 2020' },
    { company: 'Oddbit (Remote – EU)', role: 'Programmer', stack: 'NodeJS, Flutter, Firebase', period: '2020' },
    { company: 'Oracle (Remote)', role: 'Freelance Frontend Developer', stack: 'HTML, JavaScript, Oracle CECS Framework, Oracle JET', period: '2017 – 2019' },
    { company: 'Infinitec.co.jp (Remote – Japan)', role: 'Software Developer', stack: 'C#, ASP.NET, PHP', period: '2017 – 2018' },
    { company: 'Bima Data Pratama', role: 'Software Developer', stack: 'Government Projects – Ministry of Marine Affairs', period: '2015 – 2017' },
    { company: 'Early Career (Linethink, CreoAMPM)', role: 'Various Roles', stack: 'Game & Web Development', period: '2012 – 2015' },
  ]

  const projects = [
    {
      name: 'Eazypass',
      description: 'Architected and developed a real-time ticket management and validation system, streamlining entry processes and ensuring secure event access through robust backend logic.',
      period: '2023 – 2024',
    },
    {
      name: 'Container Wise (Australia)',
      description: 'Developed cross-platform mobile apps (Android/iOS) using React Native.',
      period: '',
    },
    {
      name: 'Aero Tickets V.3',
      description: 'Engineered PPOB and airline ticketing systems using CodeIgniter and AngularJS.',
      period: '',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Engineering Manager &amp; Senior Full-Stack Developer with 10+ years of experience
            architecting and scaling high-performance web and mobile applications.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Avatar */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-gray-800">
              <Image
                src="/main/profile.jpeg"
                alt="Zainal Arifin"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">Hi, I&apos;m Zainal</h2>

            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Engineering Manager &amp; Senior Full-Stack Developer with a proven track record
                in leading engineering teams at Moladin, managing cross-functional stakeholders,
                and delivering complex features for international clients across Australia, EU,
                and Singapore.
              </p>
              <p>
                Expert in Technical Requirement Documentation (TRD), Micro-frontend architecture,
                and team workflow optimization using Agile methodologies. Highly proficient in
                Node.js, React, Kafka, and Flutter.
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
                <span className="text-gray-300">Full-Stack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-blue-400" size={20} />
                <span className="text-gray-300">Engineering Manager</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-400" size={20} />
                <span className="text-gray-300">10+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Experience</h2>
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
                <ul className="space-y-2">
                  {exp.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2 text-gray-300 leading-relaxed">
                      <span className="text-blue-400 mt-1 shrink-0">–</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Other Experience Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Other Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherExperience.map((exp, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white font-semibold">{exp.company}</p>
                  <span className="text-gray-500 text-xs shrink-0 ml-2">{exp.period}</span>
                </div>
                <p className="text-blue-400 text-sm mb-1">{exp.role}</p>
                <p className="text-gray-400 text-sm">{exp.stack}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex gap-4 items-start">
            <GraduationCap className="text-blue-400 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-semibold text-white">Bachelor of Computer Science (S.Kom)</h3>
              <p className="text-blue-400 font-medium">Universitas Pendidikan Indonesia (UPI)</p>
              <p className="text-gray-400 text-sm mt-1">2009 – 2016</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Notable Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  {project.period && <span className="text-gray-400 text-sm">{project.period}</span>}
                </div>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
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
