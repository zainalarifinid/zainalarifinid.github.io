# 🚀 Deployment Guide

This guide covers deployment options and configurations for the Zainal Arifin Personal Website.

## 📋 Pre-deployment Checklist

### Performance Verification
- [ ] Run `npm run build` successfully
- [ ] Lighthouse score >90 (run `lighthouse http://localhost:3000`)
- [ ] All images optimized and compressed
- [ ] Service Worker functioning correctly
- [ ] PWA manifest configured properly

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without errors (`npm run lint`)
- [ ] Tests passing (`npm run test`)
- [ ] No console.log statements in production code

### Configuration Check
- [ ] `next.config.js` properly configured for target platform
- [ ] Environment variables set correctly
- [ ] Social media links updated
- [ ] Google Analytics configured (if applicable)

## 🌐 Deployment Options

### 1. GitHub Pages (Recommended) 

GitHub Pages is the recommended deployment method for this static site.

#### Setup Process

1. **Repository Configuration**
   ```bash
   # Ensure your repository is named correctly
   # For user site: username.github.io
   # For project site: any-name
   ```

2. **Build Configuration**
   The `next.config.js` is already optimized for GitHub Pages:
   ```javascript
   const nextConfig = {
     output: 'export',        // Static site generation
     trailingSlash: true,     // GitHub Pages compatibility
     images: {
       unoptimized: true,     // Required for static export
     },
     swcMinify: true,
     compiler: {
       removeConsole: true,   // Clean production build
     }
   }
   ```

3. **Manual Deployment**
   ```bash
   # Build the project
   npm run build
   
   # The 'out' folder contains your static site
   # Upload contents to gh-pages branch or configure source
   ```

4. **Automated Deployment with GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
         
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
           
       - name: Install dependencies
         run: npm ci
         
       - name: Build project
         run: npm run build
         
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

5. **GitHub Pages Settings**
   - Go to repository Settings → Pages
   - Source: GitHub Actions (recommended) or Deploy from branch
   - If using branch: select `gh-pages` branch, `/ (root)` folder

#### Custom Domain (Optional)
```bash
# Add CNAME file to public folder
echo "yourdomain.com" > public/CNAME
```

### 2. Vercel

Vercel provides automatic deployments with excellent Next.js integration.

#### Setup Process

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

2. **Environment Variables** (if needed)
   ```bash
   # In Vercel dashboard, add environment variables:
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   ```

3. **Custom Domain**
   - Add custom domain in Vercel dashboard
   - Vercel provides SSL certificates automatically

4. **Build Configuration**
   Vercel uses your `next.config.js` automatically. For Vercel deployment, you might want a separate config:
   ```javascript
   // vercel.json (optional)
   {
     "functions": {
       "app/api/**/*.js": {
         "runtime": "@vercel/node"
       }
     }
   }
   ```

### 3. Netlify

Netlify offers excellent static site hosting with additional features.

#### Setup Process

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   out
   ```

3. **netlify.toml Configuration**
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
   
   [[headers]]
     for = "/sw.js"
     [headers.values]
       Cache-Control = "no-cache"
   ```

4. **Custom Domain and SSL**
   - Add custom domain in Netlify dashboard
   - SSL certificates provided automatically

### 4. Firebase Hosting

Firebase Hosting offers fast CDN delivery and easy integration.

#### Setup Process

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   # Select your Firebase project
   # Public directory: out
   # Single-page app: No
   # Overwrite index.html: No
   ```

3. **firebase.json Configuration**
   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "headers": [
         {
           "source": "/sw.js",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "no-cache"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## ⚙️ Environment Configuration

### Production Environment Variables

```bash
# .env.production (if needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Development vs Production

```javascript
// pages/_app.tsx
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </>
  )
}
```

## 🔧 Performance Optimization for Production

### Build Optimizations

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Caching Headers Configuration

For optimal performance, configure these headers on your hosting platform:

```bash
# Static assets (1 year)
Cache-Control: public, max-age=31536000, immutable

# HTML files (1 hour)
Cache-Control: public, max-age=3600

# Service Worker (no cache)
Cache-Control: no-cache
```

### CDN Configuration

If using a CDN:
```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://your-cdn.com' 
    : '',
  // ... other config
}
```

## 📊 Post-Deployment Verification

### Performance Testing
```bash
# Test production deployment
lighthouse https://yourdomain.com --only-categories=performance

# Verify PWA functionality
lighthouse https://yourdomain.com --only-categories=pwa
```

### Functionality Checklist
- [ ] Site loads correctly on all devices
- [ ] Theme switching works
- [ ] Images load with proper optimization
- [ ] Service Worker installs correctly
- [ ] PWA can be installed
- [ ] Social links work correctly
- [ ] Google Analytics tracking (if enabled)
- [ ] Contact form functionality (if applicable)

### SEO Verification
- [ ] Meta tags appear correctly
- [ ] Social media preview cards work
- [ ] Sitemap accessible (if generated)
- [ ] robots.txt configured properly

## 🚨 Troubleshooting Common Issues

### Build Failures

1. **TypeScript Errors**
   ```bash
   # Check for type errors
   npx tsc --noEmit
   ```

2. **Dependency Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Image Optimization Errors**
   ```bash
   # Ensure images are in correct format and size
   # Check next.config.js image settings
   ```

### Deployment Issues

1. **GitHub Pages 404 Errors**
   - Ensure `trailingSlash: true` in next.config.js
   - Check that all routes are statically exported

2. **Service Worker Not Updating**
   ```bash
   # Clear browser cache and service worker
   # Check Cache-Control headers for sw.js
   ```

3. **Performance Degradation**
   ```bash
   # Run Lighthouse audit
   # Check for unoptimized images
   # Verify service worker caching strategy
   ```

## 🔄 Continuous Deployment

### GitHub Actions for Multiple Platforms

```yaml
name: Multi-platform Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-github-pages:
    runs-on: ubuntu-latest
    steps:
      # ... build steps ...
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        
  deploy-netlify:
    runs-on: ubuntu-latest
    steps:
      # ... build steps ...
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=out
```

### Rollback Strategy

```bash
# GitHub Pages rollback
git revert HEAD
git push origin main

# Vercel rollback
vercel --rollback

# Netlify rollback
netlify rollback
```

---

**Best Practice**: Always test deployments on staging/preview URLs before promoting to production.

**Performance Target**: Maintain 90+ Lighthouse Performance Score across all deployment platforms.

**Monitoring**: Set up uptime monitoring and performance tracking for production deployments.
