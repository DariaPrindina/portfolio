import Link from 'next/link';
import { projects } from '@/entities/project/model/projects';

const currentProject = projects.find((project) => project.isCurrent && project.caseStudy);

export default function CaseStudyHighlight() {
  if (!currentProject?.caseStudy) {
    return null;
  }

  return (
    <section className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Case Study: {currentProject.title}
      </h2>
      <p className="case-study__context" data-reveal="up">
        {currentProject.caseStudy.context}
      </p>

      <div className="case-study__impact" data-reveal="up">
        {currentProject.caseStudy.impact.map((metric) => (
          <article key={metric.label} className="case-study__metric">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="project-card__actions" data-reveal="up">
        <Link
          href={`/projects/${currentProject.slug}`}
          className="project-action-link project-action-link--primary"
        >
          Смотреть полный case study
        </Link>
      </div>
    </section>
  );
}
