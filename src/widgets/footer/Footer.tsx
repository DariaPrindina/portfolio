import Link from 'next/link';
import { getContent, type Locale } from '@/entities/locale/model/content';

export default function Footer({ locale = 'ru' }: { locale?: Locale }) {
  const { profile, footer } = getContent(locale);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav className="footer__nav" aria-label={footer.ariaLabel}>
          {footer.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <Link href={footer.otherLocale.href}>{footer.otherLocale.label}</Link>
        </nav>
      </div>
    </footer>
  );
}
