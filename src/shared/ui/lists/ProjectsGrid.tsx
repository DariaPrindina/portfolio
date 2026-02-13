'use client';

import type { CSSProperties } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/entities/project/model/projects';

type ProjectsGridLabels = {
  currentProject: string;
  details: string;
  demo: string;
  code: string;
};

type ProjectsGridProps = {
  projects: Project[];
  labels: ProjectsGridLabels;
};

export default function ProjectsGrid({ projects, labels }: ProjectsGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className={`project-card ${project.isCurrent ? 'project-card--current' : ''}`}
          data-reveal="up"
          style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
        >
          <div className="project-card__head">
            <h3 className="project-card__title">{project.title}</h3>
            {project.isCurrent ? <span className="project-card__badge">{labels.currentProject}</span> : null}
          </div>
          <p className="project-card__description">{project.description}</p>

          <ul className="project-card__stack" aria-label={`Stack ${project.title}`}>
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
            <Link href={`/projects/${project.slug}`} className="project-action-link project-action-link--primary">
              {labels.details}
            </Link>
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link project-action-link--secondary"
              >
                <ExternalLink size={15} aria-hidden="true" />
                {labels.demo}
              </Link>
            ) : null}
            {project.repoUrl ? (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link project-action-link--secondary"
              >
                <Github size={15} aria-hidden="true" />
                {labels.code}
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
