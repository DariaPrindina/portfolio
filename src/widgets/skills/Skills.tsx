import SkillsList from '@/shared/ui/lists/SkillsList';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function Skills({ locale = 'ru' }: { locale?: Locale }) {
  const { skills } = getContent(locale);

  return (
    <section id={SECTION_IDS.skills} className="section" data-reveal="up">
      <p className="section__label">{skills.label}</p>
      <h2 className="section__title" data-reveal="up">
        {skills.title}
      </h2>
      <SkillsList groups={[...skills.groups]} />
    </section>
  );
}
