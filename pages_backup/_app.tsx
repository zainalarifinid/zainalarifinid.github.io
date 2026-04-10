import type { AppProps } from 'next/app';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
