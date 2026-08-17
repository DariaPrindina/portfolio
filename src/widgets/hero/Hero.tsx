import { ArrowRight, Github, Mail, Send } from 'lucide-react';
import Link from 'next/link';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function Hero({ locale = 'ru' }: { locale?: Locale }) {
  const { profile, hero } = getContent(locale);

  return (
    <section id={SECTION_IDS.hero} className="hero" data-reveal="up">
      <p className="hero__role" data-reveal="up">
        <span>const</span> role = <span>&apos;</span>
        {profile.role}
        <span>&apos;</span>
      </p>
      <h1 className="hero__title" data-reveal="up">
        {profile.name}
      </h1>
      <p className="hero__description" data-reveal="up">
        {profile.tagline}
      </p>

      <div className="hero__actions" data-reveal="up">
        <a href="#projects" className="btn btn--primary">
          {hero.actions.projects}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
        <a href="#experience" className="btn">
          {hero.actions.experience}
        </a>
        <a href="#resume" className="btn">
          {hero.actions.resume}
        </a>
        <a href="#contact" className="btn">
          {hero.actions.contact}
        </a>
      </div>

      <ul className="social-list" aria-label={hero.socialAria} data-reveal="up">
        <li>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <Github size={18} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link href={`mailto:${profile.email}`} className="social-link" aria-label="Email">
            <Mail size={18} aria-hidden="true" />
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
            <Send size={18} aria-hidden="true" />
          </Link>
        </li>
      </ul>

      <div className="hero__facts" data-reveal="up">
        {hero.facts.map((fact) => (
          <article key={fact.label} className="hero__fact">
            <p className="hero__fact-label">{fact.label}</p>
            <p className="hero__fact-value">{fact.value}</p>
            <p className="hero__fact-note">{fact.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
