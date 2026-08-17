import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function About({ locale = 'ru' }: { locale?: Locale }) {
  const { about } = getContent(locale);

  return (
    <section id={SECTION_IDS.about} className="section">
      <p className="section__label">{about.label}</p>
      <h2 className="section__title">
        {about.title}
      </h2>

      {/*
        Знаки «−» и «+» несут смысл сами по себе, а подписи для скринридеров
        дублируют его текстом — цвет здесь не единственный носитель информации.
      */}
      <div className="about__diff">
        {about.migration.map((row) => (
          <p key={row.text} className={`about__row about__row--${row.kind}`}>
            <span className="about__sign" aria-hidden="true">
              {row.kind === 'add' ? '+' : '\u2212'}
            </span>
            <span>
              <span className="sr-only">{row.kind === 'add' ? about.after : about.before}</span>
              {row.text}
            </span>
          </p>
        ))}
      </div>

      <ul className="about__points">
        {about.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
