import type { CSSProperties } from 'react';
import Image from 'next/image';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Навыки
      </h2>
      <ul className="chip-list" aria-label="Список навыков">
        {skills.map((skill, index) => (
          <li
            key={skill.name}
            className="chip-list__item"
            data-reveal="up"
            style={{ '--reveal-delay': `${index * 50}ms` } as CSSProperties}
          >
            <Image
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="chip-list__logo"
              width={18}
              height={18}
              sizes="18px"
              unoptimized
            />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
