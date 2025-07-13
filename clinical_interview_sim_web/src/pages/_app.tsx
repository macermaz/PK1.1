import '../styles/globals.css';   // 👈 esto importa Tailwind
import type { AppProps } from 'next/app';
import { AppProvider } from '@/context/AppProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
