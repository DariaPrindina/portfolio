import ExperienceTimeline from '@/shared/ui/lists/ExperienceTimeline';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { currentMonth } from '@/shared/lib/timeline';
import { SECTION_IDS } from '@/shared/config/sections';

export default function Experience({ locale = 'ru' }: { locale?: Locale }) {
  const { experience } = getContent(locale);

  return (
    <section id={SECTION_IDS.experience} className="section">
      <p className="section__label">{experience.label}</p>
      <h2 className="section__title">
        {experience.title}
      </h2>
      <ExperienceTimeline
        items={[...experience.items]}
        nowMonth={currentMonth()}
        locale={locale}
        nowLabel={experience.now}
      />
    </section>
  );
}
