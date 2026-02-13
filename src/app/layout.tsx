import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import VisualLanguageToggle from '@/components/VisualLanguageToggle';
import VisualThemeToggle from '@/components/VisualThemeToggle';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dariaprindina.dev';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
        url: '/images/avatar.jpg',
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
    images: ['/images/avatar.jpg'],
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Дарья Приндина',
        jobTitle: 'Frontend Developer',
        url: siteUrl,
        email: 'mailto:00dariaprindina00@gmail.com',
        sameAs: ['https://github.com/DariaPrindina', 'https://t.me/darht_vadr'],
        knowsAbout: ['React', 'TypeScript', 'Next.js', 'Frontend Architecture', 'CRM'],
      },
      {
        '@type': 'WebSite',
        name: 'Daria Prindina Portfolio',
        url: siteUrl,
        inLanguage: ['ru', 'en'],
      },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} theme-classic`}>
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
