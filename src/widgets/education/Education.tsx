import { Eye } from 'lucide-react';
import Link from 'next/link';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function Education({ locale = 'ru' }: { locale?: Locale }) {
  const { education } = getContent(locale);

  return (
    <section id={SECTION_IDS.education} className="section">
      <p className="section__label">{education.label}</p>
      <h2 className="section__title">
        {education.title}
      </h2>

      <div className="edu">
        {education.items.map((item) => (
          <div className="edu__row" key={`${item.degree}-${item.year}`}>
            <span className="edu__year">{item.year}</span>
            <div>
              <p className="edu__degree">{item.degree}</p>
              <p className="edu__place">
                {item.institution} · {item.details}
              </p>
            </div>
          </div>
        ))}

        {education.certificates.map((item) => (
          <div className="edu__row" key={`${item.title}-${item.year}`}>
            <span className="edu__year">{item.year}</span>
            <div>
              <p className="edu__degree">{item.title}</p>
              <p className="edu__place">{item.issuer}</p>
              {item.file ? (
                <div className="edu__actions">
                  <Link href={item.file} target="_blank" rel="noopener noreferrer" className="btn">
                    <Eye size={14} aria-hidden="true" />
                    {education.view}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
