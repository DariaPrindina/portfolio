import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MotionEffects from '@/components/MotionEffects';
import ProjectVisualPreview from '@/components/ProjectVisualPreview';
import { getProjectBySlug, projects } from '@/data/projects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Проект не найден',
    };
  }

  return {
    title: `${project.title} | Проект`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Проект`,
      description: project.description,
      type: 'article',
      images: [
        {
          url: '/images/link-preview-frontend.svg',
          width: 1200,
          height: 630,
          alt: 'Frontend Portfolio Preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Проект`,
      description: project.description,
      images: ['/images/link-preview-frontend.svg'],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    inLanguage: 'ru',
    about: project.stack,
    url: `/projects/${project.slug}`,
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
            <Link href="/#projects" className="project-detail__back">
              <ArrowLeft size={16} aria-hidden="true" />
              Назад к проектам
            </Link>
            {project.isCurrent ? <span className="project-card__badge">Текущий проект</span> : null}
          </div>

          <h1 className="project-detail__title" data-reveal="up">
            {project.title}
          </h1>
          <p className="project-detail__description" data-reveal="up">
            {project.longDescription}
          </p>

          <ul className="project-card__stack" aria-label={`Стек ${project.title}`} data-reveal="up">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {project.highlights?.length ? (
            <ul className="project-card__highlights" data-reveal="up">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          <div className="project-card__actions" data-reveal="up">
            {project.liveUrl ? (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-link project-action-link--secondary"
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
                className="project-action-link project-action-link--secondary"
              >
                <Github size={15} aria-hidden="true" />
                Код
              </Link>
            ) : null}
          </div>
        </section>

        {project.caseStudy ? (
          <section className="section" data-reveal="up">
            <h2 className="section__title" data-reveal="up">
              Case Study
            </h2>
            <p className="case-study__context" data-reveal="up">
              {project.caseStudy.context}
            </p>

            <div className="case-study__grid">
              <article className="case-study__block" data-reveal="up">
                <h3>Задача</h3>
                <ul>
                  {project.caseStudy.challenge.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="case-study__block" data-reveal="up">
                <h3>Решение</h3>
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
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section project-showcase" data-reveal="up">
          <div className="project-showcase__grid">
            <article className="showcase-window" data-reveal="up">
              <header className="showcase-window__header">{project.codeTitle}</header>
              <pre className="showcase-window__code">
                <code>{project.codeExample}</code>
              </pre>
            </article>

            <article className="showcase-window" data-reveal="up">
              <header className="showcase-window__header">Визуал компонента</header>
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
