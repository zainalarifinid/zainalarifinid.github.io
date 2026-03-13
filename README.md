   # ⚡ Zainal Arifin Personal Website

   A **high-performance** personal portfolio website built with Next.js 16, React 18, TypeScript, and Tailwind CSS. Optimized for **90+ Lighthouse Performance Score** with advanced web performance techniques.

   ## 🏆 Performance Achievements

   - **🎯 Lighthouse Score: 90/100** (Web Performance Optimized)
   - **🖼️ LCP: 3.7s** (Largest Contentful Paint)
   - **⏱️ TBT: 40ms** (Total Blocking Time)
   - **🚀 FCP: 0.8s** (First Contentful Paint)
   - **📐 CLS: 0** (Cumulative Layout Shift - Perfect!)

   ## 🚀 Migration from Nuxt.js to Next.js

   This project has been successfully migrated from Nuxt.js (Vue.js) to Next.js (React) with performance optimizations:

   - ✅ **Framework**: Nuxt.js → Next.js 16 (App Router)
   - ✅ **UI Library**: Vue.js → React 18
   - ✅ **Language**: JavaScript/TypeScript → TypeScript
   - ✅ **Styling**: Tailwind CSS (maintained)
   - ✅ **Testing**: Vue Test Utils → React Testing Library
   - ✅ **Build**: Nuxt generate → Next.js static export
   - ✅ **Performance**: Achieved 90+ Lighthouse Score
   - ✅ **PWA**: Progressive Web App features
   - ✅ **Critical Resource Prioritization**: Optimized loading strategy
   - ✅ **Content System**: Markdown-based articles and projects
   - ✅ **Article Detail Pages**: Dynamic routing with SSG

   ## 🛠️ Tech Stack

   - **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
   - **UI Library**: [React 18](https://reactjs.org/)
   - **Language**: [TypeScript](https://www.typescriptlang.org/)
   - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
   - **Animations**: [Framer Motion](https://www.framer.com/motion/)
   - **Icons**: [Lucide React](https://lucide.dev/)
   - **Content**: [gray-matter](https://github.com/jonschlinkert/gray-matter) + [React Markdown](https://github.com/remarkjs/react-markdown)
   - **Markdown**: [remark-gfm](https://github.com/remarkjs/remark-gfm) + [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
   - **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
   - **Performance**: Custom optimizations + Service Worker
   - **PWA**: Progressive Web App capabilities
   - **Analytics**: Google Analytics 4
   - **Linting**: [ESLint](https://eslint.org/)

   ## 📁 Project Structure

   ```
   ├── app/                    # Next.js App Router
   │   ├── layout.tsx          # Root layout with navigation
   │   ├── page.tsx            # Home page
   │   ├── about/
   │   │   └── page.tsx        # About page
   │   ├── articles/
   │   │   ├── page.tsx        # Articles listing page
   │   │   └── [slug]/
   │   │       ├── page.tsx    # Dynamic article detail page (SSG)
   │   │       └── not-found.tsx # Custom 404 for missing articles
   │   ├── contact/
   │   │   └── page.tsx        # Contact page
   │   └── showcase/
   │       └── page.tsx        # Project showcase page
   ├── components/             # React components
   │   ├── GoogleAnalytics.tsx # GA4 integration
   │   ├── Logo.tsx            # Logo component
   │   ├── OptimizedImage.tsx  # Optimized image component
   │   └── ui/
   │       └── ProjectCard.tsx # Project card component
   ├── content/                # Markdown content (CMS)
   │   ├── articles/           # Blog articles (.md)
   │   │   ├── nextjs-14-modern-web-apps.md
   │   │   └── typescript-react-best-practices.md
   │   └── projects/           # Project entries (.md)
   │       ├── ecommerce-platform.md
   │       ├── my-app.md
   │       └── task-management-dashboard.md
   ├── utils/
   │   ├── content.ts          # Content fetching utilities (SSG helpers)
   │   └── performance.ts      # Performance utilities
   ├── public/                 # Static assets
   │   ├── bg/                 # Background images (optimized)
   │   ├── images/projects/    # Project images
   │   ├── main/               # Profile images (compressed)
   │   ├── manifest.json       # PWA manifest
   │   └── sw.js               # Service Worker
   ├── styles/
   │   └── globals.css         # Performance-optimized CSS
   ├── test/                   # Test files
   ├── assets/                 # Additional assets
   ├── next.config.js          # Next.js configuration
   ├── tailwind.config.js      # Tailwind CSS configuration
   ├── ecosystem.config.js     # PM2 configuration
   └── tsconfig.json           # TypeScript configuration
   ```

   ## 📰 Article Detail Pages

   Individual article pages are dynamically routed and statically generated at build time.

   ### Route Structure
   ```
   app/articles/[slug]/
   ├── page.tsx           # Dynamic article page (SSG)
   └── not-found.tsx      # Custom 404 for missing articles
   ```

   ### Static Site Generation
   ```typescript
   // Generate static params for all articles at build time
   export async function generateStaticParams() {
   const slugs = await getAllArticleSlugs()
   return slugs.map((slug) => ({ slug }))
   }

   // Per-article SEO metadata
   export async function generateMetadata({ params }: ArticlePageProps) {
   const article = await getArticleBySlug(params.slug)
   return {
      title: `${article.frontMatter.title} | Zainal Arifin`,
      description: article.frontMatter.description,
      keywords: article.frontMatter.tags?.join(', '),
   }
   }
   ```

   ### Content Utilities (`utils/content.ts`)
   - `getAllArticles()` — fetch all published articles sorted by date
   - `getArticleBySlug(slug)` — fetch a single article by its slug
   - `getAllArticleSlugs()` — get all slugs for static param generation
   - `getAllProjects()` — fetch all projects from `content/projects/`

   ### Article Page Features
   - **Rich Markdown Rendering**: GitHub Flavored Markdown with syntax-highlighted code blocks
   - **Reading Time**: Auto-calculated from word count
   - **SEO Metadata**: Dynamic `<title>` and `<meta>` tags per article
   - **404 Handling**: Custom not-found page for missing slugs
   - **Navigation**: Back to articles list, author footer with CTAs
   - **Responsive Design**: Mobile-optimized typography and layout

   ### Working Article URLs
   - ✅ `/articles/nextjs-14-modern-web-apps`
   - ✅ `/articles/typescript-react-best-practices`
   - ✅ `/articles/non-existent` → custom 404

   ### Build Output
   ```
   Route (app)                                      Size     First Load JS
   ├ ● /articles/[slug]                             174 B          95.2 kB
   ├   ├ /articles/nextjs-14-modern-web-apps
   ├   └ /articles/typescript-react-best-practices
   ```

   ## ⚡ Performance Optimizations

   ### 🖼️ **Image Optimization**
   - **Compressed images**: 74-86% size reduction
   - **Critical resource prioritization**: Media-specific preloading
   - **Next.js Image component**: Automatic optimization and lazy loading
   - **WebP format**: Modern image format support
   - **Blur placeholders**: Smooth loading experience

   ### 🎨 **Critical Resource Prioritization**
   ```html
   <!-- Media-specific preloading for optimal LCP -->
   <link rel="preload" as="image" href="/main/profile.jpeg" media="(min-width: 1024px)" />
   <link rel="preload" as="image" href="/main/profile_mobile.jpeg" media="(max-width: 1023px)" />
   ```

   ### 🔧 **Build Optimizations**
   - **Turbopack**: Enabled via `turbopack: {}` in `next.config.js`
   - **Console removal**: Production builds without console logs
   - **Webpack optimizations**: Code splitting and chunk optimization
   - **Static export**: Pre-generated HTML for faster loading

   ```javascript
   // next.config.js
   const nextConfig = {
   output: 'export',
   trailingSlash: true,
   images: { unoptimized: true },
   compiler: { removeConsole: process.env.NODE_ENV === 'production' },
   compress: true,
   turbopack: {},
   }
   ```

   ### 🌐 **Service Worker & PWA**
   - **Advanced caching strategies**: Cache-first for images, network-first for HTML
   - **Non-blocking registration**: Delayed SW registration to improve TBT
   - **Offline support**: Basic offline functionality
   - **Web App Manifest**: Installable PWA

   ### 📱 **React Optimizations**
   - **Framer Motion**: Smooth, performant animations
   - **Efficient rendering**: Optimized component structure
   - **Lazy loading**: Background images loaded after critical content

   ## 🚀 Getting Started

   ### Prerequisites

   - Node.js 18+
   - npm or yarn

   ### Installation

   1. Clone the repository:
      ```bash
      git clone https://github.com/zainalarifinid/zainalarifinid.github.io.git
      cd zainalarifinid.github.io
      ```

   2. Install dependencies:
      ```bash
      npm install
      ```

   3. Run the development server:
      ```bash
      npm run dev
      ```

   4. Open [http://localhost:3000](http://localhost:3000) in your browser.

   ## 📜 Available Scripts

   - `npm run dev` - Start development server (with Turbopack)
   - `npm run build` - Build for production (static export to `out/`)
   - `npm run start` - Start production server
   - `npm run lint` - Run ESLint
   - `npm run test` - Run tests with Jest

   ## 🌐 Deployment

   ### GitHub Pages (Static Export) - Recommended

   1. `next.config.js` is pre-configured for static export (`output: 'export'`).

   2. Build:
      ```bash
      npm run build
      ```

   3. Deploy the generated `out/` folder to GitHub Pages.

   ### Vercel (Alternative)

   1. Connect your GitHub repository to [Vercel](https://vercel.com)
   2. Vercel will automatically deploy on every push to main branch

   ## 🎨 Features

   ### 🖥️ **Core Features**
   - **Responsive Design**: Mobile-first layout
   - **Dark Theme**: Consistent dark UI design
   - **SEO Optimized**: Per-page metadata, Open Graph tags
   - **Progressive Web App**: Installable with offline capabilities
   - **Performance Monitoring**: Google Analytics 4 integration
   - **Multi-page App Router**: Home, Showcase, Articles, About, Contact

   ### 📰 **Content Features**
   - **Markdown CMS**: File-based content in `content/`
   - **Article Detail Pages**: Individual article routes with full markdown rendering
   - **Project Showcase**: Markdown-driven project cards
   - **Syntax Highlighting**: Code blocks with rehype-highlight
   - **GitHub Flavored Markdown**: Tables, task lists, strikethrough

   ### ⚡ **Performance Features**
   - **Static Site Generation**: All pages and articles pre-rendered at build time
   - **Critical Resource Prioritization**: Optimized loading sequence
   - **Image Optimization**: Compressed and properly sized images
   - **Service Worker Caching**: Advanced caching strategies
   - **Code Splitting**: Optimized JavaScript bundles

   ### 🎯 **User Experience**
   - **Smooth Animations**: Framer Motion transitions
   - **Accessibility**: ARIA labels and keyboard navigation
   - **Fast Loading**: Sub-second First Contentful Paint
   - **Article Reading Time**: Auto-calculated per article

   ## 📊 Performance Metrics

   ### 🏆 **Lighthouse Scores**
   | Metric | Score | Target | Status |
   |--------|-------|---------|--------|
   | Performance | 90/100 | >90 | ✅ Achieved |
   | Accessibility | 100/100 | >90 | ✅ Perfect |
   | Best Practices | 100/100 | >90 | ✅ Perfect |
   | SEO | 100/100 | >90 | ✅ Perfect |

   ### ⚡ **Core Web Vitals**
   | Metric | Value | Good | Status |
   |--------|-------|------|--------|
   | LCP (Largest Contentful Paint) | 3.7s | <2.5s | 🟡 Needs Improvement |
   | FID/TBT (Interactivity) | 40ms | <100ms | ✅ Good |
   | CLS (Cumulative Layout Shift) | 0 | <0.1 | ✅ Perfect |

   ### 🖼️ **Image Optimization Results**
   - **profile.jpeg**: 1.2MB → 168KB (86% reduction)
   - **profile_mobile.jpeg**: 891KB → 234KB (74% reduction)
   - **Background images**: Optimized quality (75%) with lazy loading

   ## 🔧 Development Guidelines

   ### 📝 **Code Quality**
   - **TypeScript**: Strict type checking enabled
   - **ESLint**: Code linting and formatting
   - **Testing**: Jest + React Testing Library
   - **Performance**: Always consider Lighthouse impact

   ### 📰 **Adding Content**

   **New Article** — create `content/articles/<slug>.md`:
   ```markdown
   ---
   title: "Your Article Title"
   date: "2026-03-14"
   description: "A short description"
   tags: ["tag1", "tag2"]
   published: true
   ---

   Your markdown content here...
   ```

   **New Project** — create `content/projects/<slug>.md`:
   ```markdown
   ---
   title: "Project Name"
   date: "2026-03-14"
   description: "Short description"
   imageUrl: "/images/projects/project.png"
   tags: ["Next.js", "TypeScript"]
   liveUrl: "https://example.com"
   sourceUrl: "https://github.com/..."
   ---
   ```

   ### 🖼️ **Image Guidelines**
   - **Formats**: Prefer WebP when possible, fallback to JPEG
   - **Sizing**: Provide exact dimensions for better CLS
   - **Loading**: Use `priority` for above-the-fold, `lazy` for others

   ### ⚡ **Performance Best Practices**
   - **Critical Resources**: Prioritize LCP elements
   - **Service Worker**: Cache static assets effectively
   - **Bundle Size**: Monitor and optimize JavaScript bundles

   ## 🧪 Testing

   ### Unit Tests
   ```bash
   npm run test
   ```

   ### Performance Testing
   ```bash
   # Install Lighthouse CLI
   npm install -g lighthouse

   # Run performance audit
   lighthouse http://localhost:3000 --only-categories=performance
   ```

   ### Manual Testing Checklist
   - [ ] All navigation links work correctly
   - [ ] Article detail pages render at `/articles/[slug]`
   - [ ] Custom 404 shown for missing article slugs
   - [ ] Images load with placeholder
   - [ ] Responsive design on all screen sizes
   - [ ] PWA installation works
   - [ ] Service Worker caches resources

   ## 📱 Social Links

   - **Twitter**: [@zainalarifin_id](https://twitter.com/zainalarifin_id)
   - **GitHub**: [@zainalarifinid](https://github.com/zainalarifinid)
   - **Instagram**: [@zainalarifin.id](https://instagram.com/zainalarifin.id)
   - **YouTube**: [Zainal Arifin](https://www.youtube.com/channel/UCXiJ1SE_VtMy8daTEexMmVQ)

   ## 📄 License

   This project is open source and available under the [MIT License](LICENSE).

   ## 🤝 Contributing

   1. Fork the repository
   2. Create your feature branch (`git checkout -b feature/amazing-feature`)
   3. Commit your changes (`git commit -m 'Add some amazing feature'`)
   4. **Test performance impact** with Lighthouse
   5. Push to the branch (`git push origin feature/amazing-feature`)
   6. Open a Pull Request

   ### Contribution Guidelines
   - Maintain 90+ Lighthouse Performance Score
   - For new articles/projects, add Markdown files to `content/`
   - Test image optimizations before committing
   - Consider Core Web Vitals impact

   ## 📞 Contact

   **Zainal Arifin, S.Kom**
   - Email: arifin.1602@gmail.com
   - Location: Bandung, West Java, Indonesia

   ---

   ## 🔄 Development Journey

   ### Phase 1: Nuxt.js → Next.js Migration
   - **Goal**: Migrate from Vue/Nuxt to React/Next.js
   - **Result**: Full rewrite with TypeScript, App Router, Tailwind CSS
   - **Impact**: Modern stack with better performance primitives

   ### Phase 2: Performance Optimization
   - **Goal**: Achieve 90+ Lighthouse score
   - **Result**: 87/100 → 89/100 → 93/100, LCP from 5.2s to 3.7s
   - **Impact**: Excellent web performance, CLS = 0

   ### Phase 3: Content System & Article Pages
   - **Goal**: Markdown-based CMS with full article detail pages
   - **Result**: File-based content in `content/`, dynamic `[slug]` routing with SSG
   - **Impact**: Easy content management, SEO-optimized article pages

   ---
   **Built with ❤️ and ⚡ performance optimization using Next.js 16, React 18, and modern web technologies**
