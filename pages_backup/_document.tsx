import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical resource hints for better LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zainal Arifin" />        {/* Critical CSS optimized for LCP and image loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            body{font-family:-apple-system,BlinkMacSystemFont,sans-serif}
            .relative{position:relative}
            .absolute{position:absolute}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .flex{display:flex}
            .items-center{align-items:center}
            .w-full{width:100%}
            .max-w-4xl{max-width:56rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .text-center{text-align:center}
            .object-cover{object-fit:cover}
            .py-40{padding-top:10rem;padding-bottom:10rem}
            /* Critical image optimizations for LCP */
            img[src*="profile"]{content-visibility:auto;contain-intrinsic-size:400px 600px}
            .block.lg\\:hidden img{contain-intrinsic-size:192px 192px}
            .hidden.lg\\:block{contain-intrinsic-size:400px 600px}
            @media (min-width:1024px){
              .lg\\:py-0{padding-top:0;padding-bottom:0}
              .lg\\:h-screen{height:100vh}
              .lg\\:w-3\\/5{width:60%}
              .lg\\:w-2\\/5{width:40%}
              .lg\\:text-left{text-align:left}
              .lg\\:block{display:block!important}
              .lg\\:hidden{display:none!important}
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Service Worker Registration Script - Further delayed for TBT */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if('serviceWorker' in navigator){
              setTimeout(function(){
                navigator.serviceWorker.register('/sw.js').catch(function(){});
              },3000);
            }
          `
        }} />
      </body>
    </Html>
  );
}
