import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/widgets/project-page/ProjectPage';
import { getProjectBySlug, projects } from '@/entities/project/model/projects';
import { buildPageMetadata } from '@/shared/lib/seo';

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
    return { title: 'Проект не найден' };
  }

  const baseMeta = buildPageMetadata({
    title: `${project.title} | Проект`,
    description: project.description,
    url: `/projects/${project.slug}`,
    imageAlt: 'Дарья Приндина — Frontend Developer',
  });

  return {
    ...baseMeta,
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        ru: `/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
    openGraph: { ...baseMeta.openGraph, type: 'article' },
  };
}

export default async function RuProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectPage
      project={project}
      lang="ru"
      labels={{
        back: 'Назад к проектам',
        backHref: '/#projects',
        current: 'текущий проект',
        stackAria: 'Стек',
        caseStudy: 'Как это было устроено',
        challenge: 'Задача',
        solution: 'Решение',
        demo: 'Открыть сайт',
        code: 'Код',
        codeWindow: 'Код',
        previewWindow: 'Визуал компонента',
      }}
    />
  );
}
