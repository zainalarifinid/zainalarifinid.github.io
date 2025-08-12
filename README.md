# ⚡ Zainal Arifin Personal Website

A **high-performance** personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Optimized for **90+ Lighthouse Performance Score** with advanced web performance techniques.

## 🏆 Performance Achievements

- **🎯 Lighthouse Score: 90/100** (Web Performance Optimized)
- **�️ LCP: 3.7s** (Largest Contentful Paint)
- **⏱️ TBT: 40ms** (Total Blocking Time)
- **�🚀 FCP: 0.8s** (First Contentful Paint)
- **📐 CLS: 0** (Cumulative Layout Shift - Perfect!)

## 🚀 Migration from Nuxt.js to Next.js

This project has been successfully migrated from Nuxt.js (Vue.js) to Next.js (React) with performance optimizations:

- ✅ **Framework**: Nuxt.js → Next.js 14
- ✅ **UI Library**: Vue.js → React 18
- ✅ **Language**: JavaScript/TypeScript → TypeScript
- ✅ **Styling**: Tailwind CSS (maintained)
- ✅ **Testing**: Vue Test Utils → React Testing Library
- ✅ **Build**: Nuxt generate → Next.js export
- ✅ **Performance**: Achieved 90+ Lighthouse Score
- ✅ **PWA**: Progressive Web App features
- ✅ **Critical Resource Prioritization**: Optimized loading strategy

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Library**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Performance**: Custom optimizations + Service Worker
- **PWA**: Progressive Web App capabilities
- **Analytics**: Google Analytics 4
- **Linting**: [ESLint](https://eslint.org/)

## 📁 Project Structure

```
├── components/          # React components
│   ├── GoogleAnalytics.tsx  # GA4 integration
│   └── Logo.tsx        # Logo component
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.tsx        # App component with analytics
│   ├── _document.tsx   # Document with critical CSS & PWA
│   └── index.tsx       # Home page (performance optimized)
├── public/             # Static assets
│   ├── bg/            # Background images (optimized)
│   ├── main/          # Profile images (compressed)
│   ├── manifest.json  # PWA manifest
│   └── sw.js          # Service Worker
├── styles/            # Global styles
│   └── globals.css    # Performance-optimized CSS
├── test/              # Test files
├── assets/            # Additional assets
├── next.config.js     # Next.js configuration (optimized)
├── tailwind.config.js # Tailwind CSS configuration
├── ecosystem.config.js # PM2 configuration
└── tsconfig.json      # TypeScript configuration
```

## ⚡ Performance Optimizations

### �️ **Image Optimization**
- **Compressed images**: 74-86% size reduction using macOS `sips`
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
- **SWC Minification**: Faster than Terser
- **Console removal**: Production builds without console logs
- **Webpack optimizations**: Code splitting and chunk optimization
- **Static export**: Pre-generated HTML for faster loading

### 🌐 **Service Worker & PWA**
- **Advanced caching strategies**: Cache-first for images, network-first for HTML
- **Non-blocking registration**: Delayed SW registration to improve TBT
- **Offline support**: Basic offline functionality
- **Web App Manifest**: Installable PWA

### 🎯 **Critical CSS Inlining**
```css
/* Inlined critical CSS for above-the-fold content */
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif}
/* Critical layout classes */
.relative{position:relative}
.flex{display:flex}
/* Image optimization classes */
img[src*="profile"]{content-visibility:auto;contain-intrinsic-size:400px 600px}
```

### 📱 **React Optimizations**
- **Simplified hooks**: Removed unnecessary `useCallback` and `useMemo`
- **Efficient rendering**: Optimized component structure
- **Lazy loading**: Background images loaded after critical content

## �🚀 Getting Started

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

- `npm run dev` - Start development server
- `npm run build` - Build for production (optimized)
- `npm run start` - Start production server
- `npm run export` - Export static site
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Jest
- `npm run pm2:start` - Start with PM2
- `npm run pm2:stop` - Stop PM2 process

## 🌐 Deployment

### GitHub Pages (Static Export) - Recommended

To deploy to GitHub Pages with optimizations:

1. The `next.config.js` is already configured for static export:
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: { unoptimized: true },
     swcMinify: true,
     compiler: { removeConsole: true }
   }
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Deploy the `out` folder to GitHub Pages.

### Vercel (Alternative)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Vercel will automatically deploy on every push to main branch

## 🎨 Features

### 🖥️ **Core Features**
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Theme**: Smooth theme switching with system preference detection
- **SEO Optimized**: Meta tags, structured data, and social media cards
- **Progressive Web App**: Installable with offline capabilities
- **Performance Monitoring**: Google Analytics 4 integration

### ⚡ **Performance Features**
- **Critical Resource Prioritization**: Optimized loading sequence
- **Image Optimization**: Compressed and properly sized images
- **Service Worker Caching**: Advanced caching strategies
- **Code Splitting**: Optimized JavaScript bundles
- **Critical CSS**: Inlined above-the-fold styles

### 🎯 **User Experience**
- **Smooth Animations**: Optimized CSS transitions
- **Accessibility**: ARIA labels and keyboard navigation
- **Fast Loading**: Sub-second First Contentful Paint
- **Blur Placeholders**: Smooth image loading experience

## 📊 Performance Metrics

### 🏆 **Lighthouse Scores**
| Metric | Score | Target | Status |
|--------|-------|---------|---------|
| Performance | 90/100 | >90 | ✅ Achieved |
| Accessibility | 100/100 | >90 | ✅ Perfect |
| Best Practices | 100/100 | >90 | ✅ Perfect |
| SEO | 100/100 | >90 | ✅ Perfect |

### ⚡ **Core Web Vitals**
| Metric | Value | Good | Status |
|--------|-------|------|---------|
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

### 🖼️ **Image Guidelines**
- **Compression**: Use `sips` for macOS or equivalent tools
- **Formats**: Prefer WebP when possible, fallback to JPEG
- **Sizing**: Provide exact dimensions for better CLS
- **Loading**: Use `priority` for above-the-fold, `lazy` for others

### ⚡ **Performance Best Practices**
- **Critical Resources**: Prioritize LCP elements
- **Service Worker**: Cache static assets effectively
- **Bundle Size**: Monitor and optimize JavaScript bundles
- **CSS**: Inline critical styles, defer non-critical

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
- [ ] Theme switching works properly
- [ ] Images load with blur placeholders
- [ ] Responsive design on all screen sizes
- [ ] PWA installation works
- [ ] Service Worker caches resources
- [ ] Social links open correctly

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

### Performance Contribution Guidelines
- Maintain 90+ Lighthouse Performance Score
- Test image optimizations before committing
- Consider Core Web Vitals impact
- Document performance changes

## 📞 Contact

**Zainal Arifin, S.Kom**
- Email: arifin.1602@gmail.com
- Location: Bandung, West Java, Indonesia

---

## 🔄 Performance Optimization Journey

### Phase 1: Image Optimization
- **Goal**: Reduce image file sizes
- **Result**: 74-86% size reduction
- **Impact**: Improved loading times

### Phase 2: Lighthouse Optimization
- **Goal**: Achieve 90+ Lighthouse score
- **Result**: 87/100 → 89/100 → 93/100
- **Impact**: Excellent web performance

### Phase 3: Critical Resource Prioritization
- **Goal**: Optimize LCP (Largest Contentful Paint)
- **Result**: LCP improved from 5.2s to 3.7s
- **Impact**: Better user experience

### Final Result: 90/100 with Background Restored
- **Performance Score**: 90/100 ✅
- **User Experience**: Full visual design preserved
- **Technical Achievement**: Performance + Aesthetics balanced

---
**Built with ❤️ and ⚡ performance optimization using Next.js, React, and modern web technologies**
