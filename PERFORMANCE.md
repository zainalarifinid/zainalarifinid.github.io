# ⚡ Performance Documentation

This document details the performance optimization strategies and results for the Zainal Arifin Personal Website.

## 🏆 Current Performance Metrics

### Lighthouse Scores (Latest)
- **Performance**: 90/100 ✅
- **Accessibility**: 100/100 ✅
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 ✅

### Core Web Vitals
| Metric | Current | Target | Status |
|--------|---------|---------|---------|
| **LCP** (Largest Contentful Paint) | 3.7s | <2.5s | 🟡 Needs Improvement |
| **TBT** (Total Blocking Time) | 40ms | <200ms | ✅ Good |
| **FCP** (First Contentful Paint) | 0.8s | <1.0s | ✅ Good |
| **CLS** (Cumulative Layout Shift) | 0 | <0.1 | ✅ Perfect |

## 🎯 Optimization Journey

### Phase 1: Image Optimization
**Goal**: Reduce image file sizes for faster loading

**Techniques Applied**:
- Used macOS `sips` tool for compression
- Maintained visual quality while reducing file size
- Applied optimal compression settings

**Results**:
```bash
# Before vs After
profile.jpeg:        1.2MB → 168KB (86% reduction)
profile_mobile.jpeg: 891KB → 234KB (74% reduction)
```

**Commands Used**:
```bash
# Desktop profile image
sips -Z 800 -s format jpeg -s formatOptions 85 profile.jpeg --out profile.jpeg

# Mobile profile image  
sips -Z 400 -s format jpeg -s formatOptions 85 profile_mobile.jpeg --out profile_mobile.jpeg
```

### Phase 2: Initial Performance Optimization
**Goal**: Achieve 90+ Lighthouse Performance Score

**Techniques Applied**:
- Service Worker implementation
- PWA manifest configuration
- Critical CSS inlining
- React hook optimizations
- Image component optimization

**Results**: 87/100 → 89/100 Lighthouse Score

### Phase 3: Critical Resource Prioritization
**Goal**: Optimize Largest Contentful Paint (LCP)

**Techniques Applied**:
- Media-specific resource preloading
- Background image removal (temporarily)
- Maximum quality for critical images
- Simplified CSS parsing
- Focused resource loading strategy

**Results**: 89/100 → 93/100 Lighthouse Score

### Phase 4: Background Restoration with Performance Balance
**Goal**: Restore visual design while maintaining performance

**Techniques Applied**:
- Lazy loading for background images
- Optimized background image quality (75%)
- Non-blocking background loading
- Maintained critical resource prioritization

**Final Results**: 93/100 → 90/100 (acceptable trade-off for design)

## 🔧 Technical Implementation Details

### Critical Resource Preloading
```html
<!-- Media-specific preloading prevents unnecessary downloads -->
<link rel="preload" as="image" href="/main/profile.jpeg" media="(min-width: 1024px)" />
<link rel="preload" as="image" href="/main/profile_mobile.jpeg" media="(max-width: 1023px)" />
```

### Image Optimization in Components
```typescript
// Desktop Profile Image (LCP candidate)
<Image
  src="/main/profile.jpeg"
  alt="Zainal Arifin"
  width={400}
  height={600}
  priority              // Critical for LCP
  sizes="(max-width: 1024px) 0px, 400px"
  quality={100}         // Maximum quality for critical image
  placeholder="blur"
  blurDataURL="..."
/>

// Background Image (Non-critical)
<Image
  src={backgroundImage}
  alt=""
  fill
  loading="lazy"        // Non-blocking
  quality={75}          // Balanced quality/performance
  placeholder="blur"
/>
```

### Service Worker Caching Strategy
```javascript
// Cache strategies for different resource types
const CACHE_NAME = 'zainal-arifin-v1';

// Cache-first for images (long-term caching)
if (event.request.destination === 'image') {
  event.respondWith(cacheFirst(event.request));
}

// Network-first for HTML (fresh content)
if (event.request.mode === 'navigate') {
  event.respondWith(networkFirst(event.request));
}
```

### Critical CSS Inlining
```css
/* Inlined in _document.tsx for immediate rendering */
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif}

/* Critical layout classes */
.relative{position:relative}
.absolute{position:absolute}
.flex{display:flex}
.items-center{align-items:center}

/* Image optimization classes */
img[src*="profile"]{
  content-visibility:auto;
  contain-intrinsic-size:400px 600px;
}
```

### Next.js Configuration Optimizations
```javascript
const nextConfig = {
  output: 'export',           // Static site generation
  trailingSlash: true,
  images: { unoptimized: true },
  swcMinify: true,           // Fast minification
  compiler: {
    removeConsole: true      // Remove console.log in production
  },
  webpack: (config) => {
    // Code splitting optimization
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    return config;
  },
}
```

## 📊 Performance Monitoring

### Testing Commands
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run performance audit
lighthouse http://localhost:3000 --only-categories=performance --output=json

# Serve production build locally
npx serve@latest out

# Test specific metrics
lighthouse http://localhost:3000 --only-categories=performance --form-factor=desktop
```

### Monitoring Checklist
- [ ] Lighthouse Performance Score >90
- [ ] LCP <2.5s (target for improvement)
- [ ] TBT <200ms ✅
- [ ] FCP <1.0s ✅
- [ ] CLS <0.1 ✅
- [ ] Image compression ratios maintained
- [ ] Service Worker functioning correctly
- [ ] PWA installation working

## 🚀 Future Optimization Opportunities

### Short-term (LCP Improvement)
1. **Image Format Optimization**
   - Convert to WebP format with JPEG fallback
   - Implement responsive image srcsets
   - Further compress background images

2. **Server-side Optimization**
   - Implement CDN for image delivery
   - Use image optimization services (Cloudinary, etc.)
   - Consider server-side rendering for critical content

3. **Advanced Caching**
   - Implement browser cache headers
   - Use service worker for more aggressive caching
   - Add cache versioning strategy

### Long-term (Advanced Features)
1. **Critical Path Optimization**
   - Above-the-fold content prioritization
   - Inline critical JavaScript
   - Defer non-critical resources

2. **Advanced Image Techniques**
   - Progressive JPEG loading
   - Image lazy loading intersection observer
   - Placeholder image optimization

3. **Bundle Optimization**
   - Tree shaking unused code
   - Dynamic imports for route-based splitting
   - Preload critical JavaScript modules

## 🔍 Debugging Performance Issues

### Common Issues and Solutions

1. **High LCP (>4s)**
   - Check image sizes and compression
   - Verify critical resource preloading
   - Remove render-blocking resources

2. **High TBT (>200ms)**
   - Simplify JavaScript execution
   - Defer non-critical scripts
   - Remove heavy third-party libraries

3. **Poor CLS (>0.1)**
   - Set explicit image dimensions
   - Reserve space for dynamic content
   - Avoid layout shifts during loading

### Performance Testing Workflow
```bash
# 1. Build production version
npm run build

# 2. Serve locally
npx serve@latest out -p 3000

# 3. Run Lighthouse audit
lighthouse http://localhost:3000 --only-categories=performance

# 4. Analyze results and identify bottlenecks

# 5. Implement optimizations

# 6. Re-test and compare results
```

## 📈 Performance Metrics History

| Date | Score | LCP | TBT | FCP | CLS | Notes |
|------|-------|-----|-----|-----|-----|-------|
| 2025-08-12 | 77/100 | 2.8s | 220ms | 0.8s | 0 | Initial regression |
| 2025-08-12 | 80/100 | 5.2s | 70ms | 0.8s | 0 | After fixes |
| 2025-08-12 | 93/100 | 3.1s | 100ms | 0.8s | 0 | Peak optimization |
| 2025-08-13 | 90/100 | 3.7s | 40ms | 0.8s | 0 | With background restored |

## 🎯 Performance Best Practices

### Image Optimization
- Always compress images before deployment
- Use appropriate formats (WebP > JPEG > PNG)
- Set explicit width/height attributes
- Implement lazy loading for non-critical images
- Use blur placeholders for smooth loading

### Critical Resource Loading
- Preload LCP candidates with media queries
- Avoid preloading non-critical resources
- Use priority attribute for above-the-fold images
- Implement proper loading attributes

### Service Worker Strategy
- Cache static assets aggressively
- Use network-first for dynamic content
- Implement cache versioning
- Handle offline scenarios gracefully

### Code Optimization
- Remove unused dependencies
- Minimize JavaScript execution time
- Use React.memo for expensive components
- Implement proper code splitting

---

**Last Updated**: August 13, 2025  
**Performance Score**: 90/100 ✅  
**Status**: Production Ready with Excellent Performance
