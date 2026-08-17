import type { Metadata } from 'next';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import { resumeDocs } from '@/entities/document/model/documents';
import { buildPageMetadata } from '@/shared/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Резюме | Дарья Приндина',
    description: 'Страница резюме: просмотр и скачивание PDF/Word.',
    url: '/resume',
    imageAlt: 'Резюме Дарьи Приндиной',
  }),
  alternates: {
    canonical: '/resume',
    languages: {
      ru: '/resume',
      en: '/en/resume',
    },
  },
};

export default function ResumePage() {
  return (
    <>
      <MotionEffects />
      <div className="container">
        <section className="section resume-page">
          <div className="project-detail__top">
            <Link href="/#resume" className="project-detail__back">
              Назад на главную
            </Link>
          </div>
          <h1 className="project-detail__title">
            Резюме
          </h1>
          <p className="project-detail__description">
            Здесь можно посмотреть актуальное резюме и скачать документы в нужном формате.
          </p>

          <div className="resume__actions">
            <Link
              href={resumeDocs.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <Eye size={15} aria-hidden="true" />
              Открыть PDF
            </Link>
            <Link href={resumeDocs.pdf} download className="btn">
              <Download size={15} aria-hidden="true" />
              Скачать PDF
            </Link>
            <Link href={resumeDocs.doc} download className="btn">
              <Download size={15} aria-hidden="true" />
              Скачать Word
            </Link>
          </div>

          <div className="resume__viewer">
            <iframe src={`${resumeDocs.pdf}#view=FitH`} title="Резюме PDF" loading="lazy" />
          </div>
        </section>
      </div>
    </>
  );
}
