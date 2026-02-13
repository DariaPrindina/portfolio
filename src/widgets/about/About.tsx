import type { CSSProperties } from 'react';
import { about } from '@/entities/about/model/about';

export default function About() {
  return (
    <section id="about-me" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Обо мне
      </h2>
      <p className="about__intro" data-reveal="up">
        {about.intro}
      </p>
      <ul className="about__list">
        {about.points.map((point, index) => (
          <li key={point} data-reveal="up" style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
