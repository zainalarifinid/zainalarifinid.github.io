# 🚀 Quick Reference Guide

Essential commands and information for the Zainal Arifin Personal Website project.

## ⚡ Quick Commands

### Development
```bash
npm run dev                # Start development server
npm run build             # Build for production
npm run test              # Run tests
npm run lint              # Check code quality
```

### Performance Testing
```bash
npm run build && npx serve out    # Serve production build
lighthouse http://localhost:3000  # Test performance
```

## 📊 Current Performance Metrics

| Metric | Score | Target | Status |
|--------|-------|---------|---------|
| **Lighthouse Performance** | 90/100 | >90 | ✅ |
| **LCP** | 3.7s | <2.5s | 🟡 |
| **TBT** | 40ms | <200ms | ✅ |
| **FCP** | 0.8s | <1.0s | ✅ |
| **CLS** | 0 | <0.1 | ✅ |

## 🖼️ Image Optimization Commands

```bash
# Compress desktop image
sips -Z 800 -s format jpeg -s formatOptions 85 input.jpg --out output.jpg

# Compress mobile image
sips -Z 400 -s format jpeg -s formatOptions 85 input.jpg --out mobile.jpg

# Check file sizes
ls -la public/main/ public/bg/
```

## 🔧 Key Configuration Files

- **next.config.js** - Next.js configuration (static export, optimizations)
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - Dependencies and scripts
- **public/manifest.json** - PWA configuration
- **public/sw.js** - Service Worker

## 📱 Critical Features

- ✅ **90+ Lighthouse Score** - High performance
- ✅ **Progressive Web App** - Installable
- ✅ **Service Worker** - Offline support
- ✅ **Image Optimization** - 74-86% compression
- ✅ **Theme Switching** - Light/dark modes
- ✅ **Responsive Design** - Mobile-first

## 🚀 Deployment Quick Steps

### GitHub Pages
```bash
npm run build
# Upload 'out' folder to gh-pages branch
```

### Vercel
```bash
# Connect repository to Vercel
# Automatic deployment on push
```

## 🧪 Testing Checklist

- [ ] `npm run build` succeeds
- [ ] Lighthouse score >90
- [ ] Theme switching works
- [ ] Images load properly
- [ ] Responsive on all devices
- [ ] PWA installs correctly

## 📞 Support

- **Repository**: [zainalarifinid.github.io](https://github.com/zainalarifinid/zainalarifinid.github.io)
- **Documentation**: See README.md, PERFORMANCE.md, DEVELOPMENT.md
- **Issues**: GitHub Issues tracker
- **Contact**: arifin.1602@gmail.com

---
**Version**: 2.0.0 | **Last Updated**: August 13, 2025
