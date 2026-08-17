import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/widgets/project-page/ProjectPage';
import { enProjects, getEnProjectBySlug } from '@/entities/locale/model/en';
import { buildPageMetadata } from '@/shared/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return enProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getEnProjectBySlug(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const baseMeta = buildPageMetadata({
    title: `${project.title} | Case study`,
    description: project.description,
    url: `/en/projects/${project.slug}`,
    locale: 'en_US',
    imageAlt: 'Daria Prindina — Frontend Developer',
  });

  return {
    ...baseMeta,
    alternates: {
      canonical: `/en/projects/${project.slug}`,
      languages: {
        ru: `/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
    openGraph: { ...baseMeta.openGraph, type: 'article' },
  };
}

export default async function EnProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getEnProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectPage
      project={project}
      lang="en"
      labels={{
        back: 'Back to projects',
        backHref: '/en#projects',
        current: 'current project',
        stackAria: 'Stack',
        caseStudy: 'How it was built',
        challenge: 'Problem',
        solution: 'Solution',
        demo: 'Open site',
        code: 'Code',
        codeWindow: 'Code',
        previewWindow: 'Component preview',
      }}
    />
  );
}
