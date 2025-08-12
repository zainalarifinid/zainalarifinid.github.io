# Zainal Arifin Personal Website

A personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Migration from Nuxt.js to Next.js

This project has been successfully migrated from Nuxt.js (Vue.js) to Next.js (React). The migration includes:

- ✅ **Framework**: Nuxt.js → Next.js 14
- ✅ **UI Library**: Vue.js → React 18
- ✅ **Language**: JavaScript/TypeScript → TypeScript
- ✅ **Styling**: Tailwind CSS (maintained)
- ✅ **Testing**: Vue Test Utils → React Testing Library
- ✅ **Build**: Nuxt generate → Next.js export
- ✅ **Assets**: Static folder → Public folder
- ✅ **Configuration**: nuxt.config.js → next.config.js

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Library**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Linting**: [ESLint](https://eslint.org/)

## 📁 Project Structure

```
├── components/          # React components
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.tsx        # App component
│   ├── _document.tsx   # Document component
│   └── index.tsx       # Home page
├── public/             # Static assets
├── styles/             # Global styles
├── test/              # Test files
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static site
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🌐 Deployment

### GitHub Pages (Static Export)

To deploy to GitHub Pages:

1. Update `next.config.js` for static export:
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     },
   }
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Deploy the `out` folder to GitHub Pages.

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Vercel will automatically deploy on every push to main branch

## 🎨 Features

- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Theme**: Toggle between themes
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation
- **Analytics**: Google Analytics integration (production only)

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
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Zainal Arifin, S.Kom**
- Email: arifin.1602@gmail.com
- Location: Bandung, West Java, Indonesia

---
Built with ❤️ using Next.js and React
