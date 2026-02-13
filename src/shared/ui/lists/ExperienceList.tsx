import type { CSSProperties } from 'react';
import type { ExperienceItem } from '@/entities/experience/model/experience';

type ExperienceListProps = {
  items: ExperienceItem[];
  stackLabelPrefix: string;
};

export default function ExperienceList({ items, stackLabelPrefix }: ExperienceListProps) {
  return (
    <div className="experience-list">
      {items.map((item, index) => (
        <article
          key={`${item.company}-${item.period}`}
          className="experience-card"
          data-reveal="up"
          style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
        >
          <header className="experience-card__header">
            <div>
              <h3 className="experience-card__company">{item.company}</h3>
              <p className="experience-card__role">{item.role}</p>
            </div>
            <p className="experience-card__period">{item.period}</p>
          </header>

          <p className="experience-card__summary">{item.summary}</p>
          <ul className="experience-card__bullets">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <ul className="experience-card__stack" aria-label={`${stackLabelPrefix} ${item.company}`}>
            {item.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
