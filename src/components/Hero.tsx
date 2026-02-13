import { ArrowRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section id="about" className="hero section" data-reveal="up">
      <div className="hero__avatar-wrap" data-reveal="zoom">
        <span className="hero__avatar-mask">
          <Image
            src={profile.avatar}
            alt={profile.name}
            className="hero__avatar"
            width={180}
            height={180}
            priority
          />
        </span>
        <span className="hero__orbit hero__orbit--a" aria-hidden="true" />
        <span className="hero__orbit hero__orbit--b" aria-hidden="true" />
        <span className="hero__orbit hero__orbit--c" aria-hidden="true" />
      </div>

      <p className="hero__eyebrow" data-reveal="up">
        {profile.role}
      </p>
      <h1 className="hero__title" data-reveal="up">
        {profile.name}
      </h1>
      <p className="hero__description" data-reveal="up">
        {profile.tagline}
      </p>

      <div className="hero__actions" data-reveal="up">
        <Link href="#experience" className="btn btn--ghost">
          Опыт
        </Link>
        <Link href="#projects" className="btn btn--primary">
          Проекты
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="#contact" className="btn btn--ghost">
          Связаться
        </Link>
      </div>

      <ul className="social-list" aria-label="Социальные ссылки" data-reveal="up">
        <li>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <Github size={22} aria-hidden="true" />
          </Link>
        </li>
        {profile.linkedin ? (
          <li>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} aria-hidden="true" />
            </Link>
          </li>
        ) : null}
        <li>
          <Link href={`mailto:${profile.email}`} className="social-link" aria-label="Email">
            <Mail size={22} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Telegram"
          >
            <Send size={22} aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
