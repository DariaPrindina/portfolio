import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import {
  projectCategoryOrder,
  type Project,
  type ProjectCategory,
} from '@/entities/project/model/projects';

type ProjectsGridLabels = {
  currentProject: string;
  details: string;
  demo: string;
  code: string;
  categories: Record<ProjectCategory, string>;
};

type ProjectsGridProps = {
  projects: Project[];
  labels: ProjectsGridLabels;
  /** Префикс языка: '' для русской версии, '/en' для английской. */
  basePath?: string;
};

/**
 * Проекты идут дорожками по категориям. Шкалы времени здесь нет намеренно:
 * дат начала и окончания проектов в данных нет, а рисовать их наугад
 * значило бы выдумывать факты.
 */
export default function ProjectsGrid({ projects, labels, basePath = '' }: ProjectsGridProps) {
  const lanes = projectCategoryOrder
    .map((category) => ({
      category,
      items: projects.filter((project) => project.category === category),
    }))
    .filter((lane) => lane.items.length > 0);

  return (
    <div className="project-lanes">
      {lanes.map((lane) => (
        <div className="plane" key={lane.category} data-reveal="up">
          <p className="plane__label">{labels.categories[lane.category]}</p>
          <div className="plane__track">
            {lane.items.map((project) => (
              <article key={project.slug} className={`pblock pblock--${lane.category}`}>
                <div className="pblock__head">
                  <h3 className="pblock__title">{project.title}</h3>
                  {project.isCurrent ? (
                    <span className="pblock__badge">{labels.currentProject}</span>
                  ) : null}
                </div>
                <p className="pblock__desc">{project.description}</p>

                {project.caseStudy ? (
                  <div className="pblock__figures">
                    {project.caseStudy.impact.slice(0, 4).map((metric) => (
                      <div key={metric.label}>
                        {metric.label}
                        <b className="pblock__figure-value">{metric.value}</b>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="pblock__actions">
                  <Link href={`${basePath}/projects/${project.slug}`} className="btn btn--primary">
                    {labels.details}
                  </Link>
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      {labels.demo}
                    </Link>
                  ) : null}
                  {project.repoUrl ? (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      <Github size={14} aria-hidden="true" />
                      {labels.code}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
