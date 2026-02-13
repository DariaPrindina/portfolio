import { skills } from '@/entities/skill/model/skills';
import SkillsList from '@/shared/ui/lists/SkillsList';

export default function Skills() {
  return (
    <section id="skills" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Навыки
      </h2>
      <SkillsList skills={skills} ariaLabel="Список навыков" />
    </section>
  );
}
