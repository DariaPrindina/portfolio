'use client';

import { Languages } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mapToTargetPath } from '@/shared/lib/localePath';

export default function VisualLanguageToggle() {
  const pathname = usePathname();
  const { href, label, title } = mapToTargetPath(pathname);

  return (
    <Link href={href} className="visual-language-toggle" aria-label={title} title={title}>
      <Languages size={16} aria-hidden="true" />
      <span className="visual-language-toggle__label">{label}</span>
    </Link>
  );
}
