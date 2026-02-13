import Link from 'next/link';
import { profile } from '@/entities/profile/model/profile';

export default function Contact() {
  return (
    <section id="contact" className="section section--highlight" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Контакты
      </h2>
      <p className="contact__text" data-reveal="up">
        Открыта к предложениям по frontend-разработке. Быстрее всего отвечаю в Telegram и по
        почте.
      </p>

      <div className="contact__actions" data-reveal="up">
        <Link href={`mailto:${profile.email}`} className="btn btn--primary">
          {profile.email}
        </Link>
        <Link href={profile.telegram} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          Telegram
        </Link>
        <span className="contact__meta">{profile.location}</span>
      </div>
    </section>
  );
}
