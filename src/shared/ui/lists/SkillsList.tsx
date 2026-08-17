import Image from 'next/image';
import { findSkillLogo, type SkillGroup } from '@/entities/skill/model/skills';

type SkillsListProps = {
  groups: SkillGroup[];
};

export default function SkillsList({ groups }: SkillsListProps) {
  return (
    <div className="skills__groups">
      {groups.map((group) => (
        <article key={group.id} className={`skills__group skills__group--${group.id}`} data-reveal="up">
          <h3 className="skills__group-title">{group.title}</h3>
          <ul className="skills__list">
            {group.items.map((item) => {
              const logo = findSkillLogo(item);

              return (
                <li key={item}>
                  {logo ? (
                    <Image
                      src={logo}
                      alt=""
                      className="skills__logo"
                      width={14}
                      height={14}
                      sizes="14px"
                      unoptimized
                    />
                  ) : null}
                  {item}
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
