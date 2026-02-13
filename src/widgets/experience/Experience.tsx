import { experience } from '@/entities/experience/model/experience';
import ExperienceList from '@/shared/ui/lists/ExperienceList';

export default function Experience() {
  return (
    <section id="experience" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Опыт
      </h2>
      <ExperienceList items={experience} stackLabelPrefix="Стек" />
    </section>
  );
}
