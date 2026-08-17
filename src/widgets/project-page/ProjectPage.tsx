import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import ProjectVisualPreview from '@/shared/ui/project-preview/ProjectVisualPreview';
import type { Project } from '@/entities/project/model/projects';

export type ProjectPageLabels = {
  back: string;
  backHref: string;
  current: string;
  stackAria: string;
  caseStudy: string;
  challenge: string;
  solution: string;
  demo: string;
  code: string;
  codeWindow: string;
  previewWindow: string;
};

type ProjectPageProps = {
  project: Project;
  labels: ProjectPageLabels;
  lang: 'ru' | 'en';
};

export default function ProjectPage({ project, labels, lang }: ProjectPageProps) {
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    inLanguage: lang,
    about: project.stack,
    url: `${lang === 'en' ? '/en' : ''}/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <MotionEffects />
      <div className="container">
        <section className="section project-detail" data-reveal="up">
          <div className="project-detail__top">
            <Link href={labels.backHref} className="project-detail__back">
              <ArrowLeft size={14} aria-hidden="true" />
              {labels.back}
            </Link>
            {project.isCurrent ? <span className="project-badge">{labels.current}</span> : null}
          </div>

          <h1 className="project-detail__title" data-reveal="up">
            {project.title}
          </h1>
          <p className="project-detail__description" data-reveal="up">
            {project.longDescription}
          </p>

          <ul className="stack-list" aria-label={`${labels.stackAria} ${project.title}`} data-reveal="up">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {project.highlights?.length ? (
            <ul className="highlights" data-reveal="up">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          <div className="pblock__actions" data-reveal="up">
            {project.liveUrl ? (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">
                <ExternalLink size={14} aria-hidden="true" />
                {labels.demo}
              </Link>
            ) : null}
            {project.repoUrl ? (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn">
                <Github size={14} aria-hidden="true" />
                {labels.code}
              </Link>
            ) : null}
          </div>
        </section>

        {project.caseStudy ? (
          <section className="section" data-reveal="up">
            <p className="section__label">case study</p>
            <h2 className="section__title" data-reveal="up">
              {labels.caseStudy}
            </h2>
            <p className="case-study__context" data-reveal="up">
              {project.caseStudy.context}
            </p>

            <div className="case-study__grid">
              <article className="case-study__block case-study__block--challenge" data-reveal="up">
                <h3>{labels.challenge}</h3>
                <ul>
                  {project.caseStudy.challenge.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="case-study__block case-study__block--solution" data-reveal="up">
                <h3>{labels.solution}</h3>
                <ul>
                  {project.caseStudy.solution.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="case-study__impact" data-reveal="up">
              {project.caseStudy.impact.map((metric) => (
                <article key={metric.label} className="case-study__metric">
                  <p className="case-study__metric-label">{metric.label}</p>
                  <p className="case-study__metric-value">{metric.value}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section project-showcase" data-reveal="up">
          <div className="project-showcase__grid">
            <article className="showcase-window" data-reveal="up">
              <header className="showcase-window__header">
                <span className="showcase-window__dot" aria-hidden="true" />
                {project.codeTitle}
              </header>
              <pre className="showcase-window__code">
                <code>{project.codeExample}</code>
              </pre>
            </article>

            <article className="showcase-window" data-reveal="up">
              <header className="showcase-window__header">
                <span className="showcase-window__dot" aria-hidden="true" />
                {labels.previewWindow}
              </header>
              <div className="showcase-window__preview">
                <ProjectVisualPreview slug={project.slug} />
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}
