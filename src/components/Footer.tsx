import Link from 'next/link';
import { profile } from '@/data/profile';

const navigation = [
  { href: '#about', label: 'Главная' },
  { href: '#about-me', label: 'Обо мне' },
  { href: '#skills', label: 'Навыки' },
  { href: '#experience', label: 'Опыт' },
  { href: '#education', label: 'Образование' },
  { href: '#projects', label: 'Проекты' },
  { href: '#resume', label: 'Резюме' },
  { href: '#contact', label: 'Контакты' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <nav className="footer__nav" aria-label="Навигация по странице">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/en">English version</Link>
        </nav>
      </div>
    </footer>
  );
}
