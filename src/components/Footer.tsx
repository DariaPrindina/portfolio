// src/components/Footer.tsx
import Link from 'next/link';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-linear-to-t from-background/80 to-background/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Колонка 1 — О себе / копирайт */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Daria Prindina</h3>
            <p className="text-sm text-muted-foreground">
              Frontend Developer crafting beautiful, fast and accessible web
              experiences
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              © {currentYear} — Made with{' '}
              <Heart className="inline h-4 w-4 text-red-500 fill-red-500 mx-1" />{' '}
              in Amsterdam
            </p>
          </div>

          {/* Колонка 2 — Навигация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Колонка 3 — Социальные сети */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="https://github.com/твой_ник"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/твой_профиль"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Link>
              <Link
                href="mailto:hello@dariaprindina.ru"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
