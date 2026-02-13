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
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
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
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-link">
                <ExternalLink size={15} aria-hidden="true" />
                Демо
              </Link>
            ) : null}
            {project.repoUrl ? (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-action-link">
                <Github size={15} aria-hidden="true" />
                Код
              </Link>
            ) : null}
          </div>
        </section>

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
