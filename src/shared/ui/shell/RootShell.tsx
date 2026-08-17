import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import StarField from '@/shared/ui/effects/StarField';
import Footer from '@/widgets/footer/Footer';
import Header from '@/widgets/header/Header';
import { SITE_URL } from '@/shared/config/site';

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

// Моноширинный несёт русские подписи разделов, поэтому кириллица обязательна:
// без неё они молча падали бы на системный шрифт.
const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic'],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Дарья Приндина',
      alternateName: 'Daria Prindina',
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

/**
 * Общая оболочка для обоих корневых layout.
 *
 * Корневых layout два, потому что атрибут lang живёт на <html>, а его
 * рендерит только корневой layout — вложенный переопределить его не может.
 * Route groups (ru) и (en) дают по своему <html> и не меняют URL.
 */
export default function RootShell({ lang, children }: { lang: 'ru' | 'en'; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StarField />
          <a className="skip-link" href="#content">
            {lang === 'en' ? 'Skip to content' : 'Перейти к содержимому'}
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer locale={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
