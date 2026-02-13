import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import VisualLanguageToggle from '@/shared/ui/toggles/VisualLanguageToggle';
import VisualThemeToggle from '@/shared/ui/toggles/VisualThemeToggle';
import { OG_IMAGE, SITE_URL } from '@/shared/config/site';
import './globals.css';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Дарья Приндина | Frontend-разработчик',
  description:
    'Портфолио frontend-разработчика: React, Next.js, TypeScript, доступные и быстрые интерфейсы.',
  keywords: [
    'frontend developer',
    'react developer',
    'typescript',
    'next.js',
    'portfolio',
    'crm frontend',
  ],
  alternates: {
    canonical: '/',
    languages: {
      ru: '/',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    title: 'Дарья Приндина | Frontend-разработчик',
    description:
      'Портфолио frontend-разработчика: React, Next.js, TypeScript, доступные и быстрые интерфейсы.',
    siteName: 'Daria Prindina Portfolio',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Дарья Приндина — Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дарья Приндина | Frontend-разработчик',
    description:
      'Портфолио frontend-разработчика: React, Next.js, TypeScript, доступные и быстрые интерфейсы.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0b1224',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrapScript = `
    (function () {
      try {
        var key = 'portfolio-visual-theme';
        var stored = localStorage.getItem(key);
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var next = (stored === 'cosmic' || stored === 'classic') ? stored : (prefersDark ? 'cosmic' : 'classic');
        document.body.classList.remove('theme-classic', 'theme-cosmic');
        document.body.classList.add(next === 'cosmic' ? 'theme-cosmic' : 'theme-classic');
      } catch (e) {}
    })();
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Дарья Приндина',
        jobTitle: 'Frontend Developer',
        url: SITE_URL,
        email: 'mailto:00dariaprindina00@gmail.com',
        sameAs: ['https://github.com/DariaPrindina', 'https://t.me/darht_vadr'],
        knowsAbout: ['React', 'TypeScript', 'Next.js', 'Frontend Architecture', 'CRM'],
      },
      {
        '@type': 'WebSite',
        name: 'Daria Prindina Portfolio',
        url: SITE_URL,
        inLanguage: ['ru', 'en'],
      },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="visual-switches" aria-label="Visual controls">
            <VisualLanguageToggle />
            <VisualThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
