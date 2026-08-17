import Link from 'next/link';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function Contact({ locale = 'ru' }: { locale?: Locale }) {
  const { profile, contact } = getContent(locale);

  return (
    <section id={SECTION_IDS.contact} className="section" data-reveal="up">
      <p className="section__label">{contact.label}</p>
      <h2 className="section__title" data-reveal="up">
        {contact.title}
      </h2>
      <p className="prose contact__text" data-reveal="up">
        {contact.text}
      </p>

      <div className="contact__actions" data-reveal="up">
        <Link href={`mailto:${profile.email}`} className="btn btn--primary">
          {profile.email}
        </Link>
        <Link href={profile.telegram} target="_blank" rel="noopener noreferrer" className="btn">
          Telegram
        </Link>
        <Link href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </Link>
        <span className="contact__meta">{profile.location}</span>
      </div>
    </section>
  );
}
