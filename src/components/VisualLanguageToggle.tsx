'use client';

import { Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function mapToTargetPath(pathname: string) {
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');

  if (isEnglish) {
    const ruPath = pathname.replace(/^\/en/, '') || '/';
    return {
      href: ruPath,
      label: 'RU',
      title: 'Переключить на русский',
    };
  }

  const enPath = pathname === '/' ? '/en' : `/en${pathname}`;
  return {
    href: enPath,
    label: 'EN',
    title: 'Switch to English',
  };
}

export default function VisualLanguageToggle() {
  const pathname = usePathname();
  const { href, label, title } = mapToTargetPath(pathname);

  return (
    <Link href={href} className="visual-language-toggle" aria-label={title} title={title}>
      <Languages size={17} aria-hidden="true" />
      <span className="visual-language-toggle__label">{label}</span>
    </Link>
  );
}
