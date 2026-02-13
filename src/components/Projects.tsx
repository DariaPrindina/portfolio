'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function Projects() {
  const [activeStack, setActiveStack] = useState<string>('all');

  const stackFilters = useMemo(() => {
    const stackSet = new Set<string>();
    projects.forEach((project) => {
      project.stack.forEach((item) => stackSet.add(item));
    });
    return ['all', ...Array.from(stackSet)];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeStack === 'all') {
      return projects;
    }
    return projects.filter((project) => project.stack.includes(activeStack));
  }, [activeStack]);

  return (
    <section id="projects" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Проекты
      </h2>

      <div className="project-filters" data-reveal="up">
        {stackFilters.map((stack) => (
          <button
            key={stack}
            type="button"
            className={`project-filter ${activeStack === stack ? 'project-filter--active' : ''}`}
            onClick={() => setActiveStack(stack)}
          >
            {stack === 'all' ? 'Все' : stack}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <article
            key={project.title}
            className={`project-card ${project.isCurrent ? 'project-card--current' : ''}`}
            data-reveal="up"
            style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
          >
            <div className="project-card__head">
              <h3 className="project-card__title">{project.title}</h3>
              {project.isCurrent ? <span className="project-card__badge">Текущий проект</span> : null}
            </div>
            <p className="project-card__description">{project.description}</p>

            <ul className="project-card__stack" aria-label={`Стек ${project.title}`}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {project.highlights?.length ? (
              <ul className="project-card__highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            <div className="project-card__actions">
              <Link href={`/projects/${project.slug}`} className="project-action-link project-action-link--detail">
                Подробнее
              </Link>
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-link"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Демо
                </Link>
              ) : null}
              {project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-link"
                >
                  <Github size={15} aria-hidden="true" />
                  Код
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
