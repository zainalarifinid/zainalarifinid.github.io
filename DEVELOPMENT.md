# 🛠️ Development Guide

This guide covers development setup, best practices, and workflow for the Zainal Arifin Personal Website.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+ or **yarn**: 1.22+
- **Git**: Latest version
- **VS Code**: Recommended editor

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/zainalarifinid/zainalarifinid.github.io.git
cd zainalarifinid.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## 📁 Project Structure Explained

```
├── components/                 # Reusable React components
│   ├── GoogleAnalytics.tsx    # GA4 integration component
│   └── Logo.tsx               # Logo component
├── pages/                     # Next.js file-based routing
│   ├── _app.tsx              # Global app component
│   ├── _document.tsx         # Custom HTML document
│   └── index.tsx             # Home page component
├── public/                   # Static assets (served directly)
│   ├── bg/                   # Background images
│   ├── main/                 # Profile images
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   └── favicon.ico           # Site favicon
├── styles/                   # Global stylesheets
│   └── globals.css           # Global CSS with optimizations
├── test/                     # Test files
│   └── Logo.spec.js          # Component tests
├── assets/                   # Source assets (before optimization)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest testing configuration
├── ecosystem.config.js       # PM2 configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Development Tools & Configuration

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-eslint"
  ]
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### ESLint Configuration
```javascript
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

## 📜 Available Scripts

### Development Scripts
```bash
# Start development server with hot reload
npm run dev

# Start development server on specific port
npm run dev -- -p 3001
```

### Build Scripts
```bash
# Build for production (static export)
npm run build

# Analyze bundle size
ANALYZE=true npm run build

# Start production server (requires build first)
npm run start
```

### Quality Assurance
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Run Jest tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

### Performance Testing
```bash
# Install Lighthouse globally
npm install -g lighthouse

# Test performance (after npm run build && npx serve out)
lighthouse http://localhost:3000 --only-categories=performance

# Test PWA functionality
lighthouse http://localhost:3000 --only-categories=pwa
```

## 🎨 Development Workflow

### 1. Feature Development Process

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test locally
npm run dev

# Run quality checks
npm run lint
npm run test

# Test performance impact
npm run build
npx serve out
lighthouse http://localhost:3000

# Commit and push
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 2. Code Style Guidelines

#### TypeScript Best Practices
```typescript
// Use explicit types for props
interface ProfileImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

// Use const assertions for config objects
const imageConfig = {
  quality: 90,
  priority: true,
  placeholder: 'blur'
} as const;

// Prefer named exports
export const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt, 
  priority = false,
  className 
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={className}
      {...imageConfig}
    />
  );
};
```

#### React Component Patterns
```typescript
// Functional components with TypeScript
import { useState, useCallback } from 'react';

interface ThemeToggleProps {
  initialTheme?: 'light' | 'dark';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  initialTheme = 'light' 
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

#### Performance-Conscious Patterns
```typescript
// Lazy loading for non-critical components
import dynamic from 'next/dynamic';

const NonCriticalComponent = dynamic(
  () => import('../components/NonCritical'),
  { loading: () => <div>Loading...</div> }
);

// Memoization for expensive operations
import { useMemo } from 'react';

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.filter(item => item.active).sort();
  }, [data]);

  return <div>{/* render processedData */}</div>;
};
```

### 3. Image Optimization Workflow

#### Adding New Images
```bash
# 1. Add original image to /assets folder
cp new-image.jpg assets/

# 2. Optimize using sips (macOS) or equivalent
sips -Z 800 -s format jpeg -s formatOptions 85 assets/new-image.jpg --out public/optimized-image.jpg

# 3. For multiple sizes
sips -Z 400 assets/new-image.jpg --out public/optimized-image-mobile.jpg
sips -Z 800 assets/new-image.jpg --out public/optimized-image-desktop.jpg

# 4. Verify compression ratio
ls -la assets/new-image.jpg public/optimized-image*.jpg
```

#### Image Component Usage
```typescript
// For critical images (LCP candidates)
<Image
  src="/optimized-image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority              // For above-the-fold images
  sizes="(max-width: 768px) 400px, 800px"
  quality={95}          // Higher quality for critical images
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// For non-critical images
<Image
  src="/optimized-image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"        // Lazy load non-critical images
  sizes="(max-width: 768px) 400px, 800px"
  quality={75}          // Balanced quality for non-critical
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// test/Component.test.tsx
import { render, screen } from '@testing-library/react';
import { ThemeToggle } from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders with initial light theme', () => {
    render(<ThemeToggle />);
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });
});
```

### Performance Testing
```bash
# Performance regression testing
npm run build
npx serve out -p 3000 &

# Run lighthouse and save results
lighthouse http://localhost:3000 \
  --only-categories=performance \
  --output=json \
  --output-path=lighthouse-report.json

# Verify score is >= 90
node -e "
  const report = require('./lighthouse-report.json');
  const score = report.categories.performance.score * 100;
  if (score < 90) {
    console.error('Performance score too low:', score);
    process.exit(1);
  }
  console.log('Performance score:', score);
"
```

## 🔧 Configuration Management

### Environment Variables
```bash
# .env.local (for local development)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production (for production builds)
NEXT_PUBLIC_GA_ID=G-REAL-GA-ID
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true,  // Required for static export
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
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
    }
    return config;
  },
};
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
};
```

## 🚨 Debugging & Troubleshooting

### Common Development Issues

1. **Hot Reload Not Working**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

2. **TypeScript Errors**
   ```bash
   # Check for type errors
   npx tsc --noEmit
   
   # Restart TypeScript server in VS Code
   # Cmd+Shift+P -> "TypeScript: Restart TS Server"
   ```

3. **Image Optimization Issues**
   ```bash
   # Check image file sizes
   ls -la public/main/ public/bg/
   
   # Re-optimize if needed
   npm run optimize:images
   ```

4. **Performance Regression**
   ```bash
   # Check bundle size
   ANALYZE=true npm run build
   
   # Test with Lighthouse
   npm run build && npx serve out
   lighthouse http://localhost:3000
   ```

### Performance Monitoring
```javascript
// utils/performance.js
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

// Usage in components
useEffect(() => {
  measurePerformance('image-load', () => {
    // Image loading logic
  });
}, []);
```

## 📚 Learning Resources

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Performance Optimization
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)

### Tools & Libraries
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Jest Testing Framework](https://jestjs.io/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

---

## 🎯 Development Checklist

Before committing code:
- [ ] Code follows TypeScript best practices
- [ ] Components are properly typed
- [ ] Images are optimized and properly sized
- [ ] Performance impact tested with Lighthouse
- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Responsive design tested on multiple screen sizes

**Happy coding! 🚀**
