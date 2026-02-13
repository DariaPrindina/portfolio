import type { CSSProperties } from 'react';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { certificates, education } from '@/entities/education/model/education';

export default function Education() {
  return (
    <section id="education" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Образование и сертификаты
      </h2>

      <div className="edu-grid">
        <div className="edu-block" data-reveal="up">
          <h3 className="edu-block__title">Образование</h3>
          <ul className="edu-list">
            {education.map((item, index) => (
              <li key={`${item.degree}-${item.year}`} data-reveal="up" style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
                <p className="edu-list__head">{item.degree}</p>
                <p className="edu-list__sub">{item.institution}</p>
                <p className="edu-list__sub">{item.details}</p>
                <p className="edu-list__year">{item.year}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="edu-block" data-reveal="up">
          <h3 className="edu-block__title">Сертификаты</h3>
          <ul className="edu-list">
            {certificates.map((item, index) => (
              <li key={`${item.title}-${item.year}`} data-reveal="up" style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
                <p className="edu-list__head">{item.title}</p>
                <p className="edu-list__sub">{item.issuer}</p>
                <p className="edu-list__year">{item.year}</p>
                {item.file ? (
                  <div className="edu-list__actions">
                    <Link
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link project-action-link--primary"
                    >
                      <Eye size={15} aria-hidden="true" />
                      Смотреть
                    </Link>
                    <Link href={item.file} download className="project-action-link project-action-link--secondary">
                      <Download size={15} aria-hidden="true" />
                      Скачать
                    </Link>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
