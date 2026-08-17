import type { Metadata } from 'next';
import RootShell from '@/shared/ui/shell/RootShell';
import { OG_IMAGE, SITE_URL } from '@/shared/config/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Daria Prindina | Frontend Developer',
  description:
    'Frontend developer portfolio: React, Next.js, TypeScript, CRM migration case studies.',
  keywords: [
    'frontend developer',
    'react developer',
    'typescript',
    'next.js',
    'portfolio',
    'crm frontend',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Daria Prindina Portfolio',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Daria Prindina — Frontend Developer' }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1117' },
  ],
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
