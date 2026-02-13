import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Skill } from '@/entities/skill/model/skills';

type SkillsListProps = {
  skills: Skill[];
  ariaLabel: string;
};

export default function SkillsList({ skills, ariaLabel }: SkillsListProps) {
  return (
    <ul className="chip-list" aria-label={ariaLabel}>
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
  );
}
