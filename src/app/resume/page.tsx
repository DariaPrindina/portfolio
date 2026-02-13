import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import MotionEffects from '@/components/MotionEffects';
import { resumeDocs } from '@/data/documents';

export default function ResumePage() {
  return (
    <>
      <MotionEffects />
      <div className="container">
        <section className="section resume-page" data-reveal="up">
          <div className="project-detail__top">
            <Link href="/#resume" className="project-detail__back">
              Назад на главную
            </Link>
          </div>
          <h1 className="project-detail__title" data-reveal="up">
            Резюме
          </h1>
          <p className="project-detail__description" data-reveal="up">
            Здесь можно посмотреть актуальное резюме и скачать документы в нужном формате.
          </p>

          <div className="resume__actions" data-reveal="up">
            <Link
              href={resumeDocs.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link project-action-link--primary"
            >
              <Eye size={15} aria-hidden="true" />
              Открыть PDF
            </Link>
            <Link href={resumeDocs.pdf} download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Скачать PDF
            </Link>
            <Link href={resumeDocs.doc} download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Скачать Word
            </Link>
          </div>

          <div className="resume__viewer" data-reveal="up">
            <iframe src={`${resumeDocs.pdf}#view=FitH`} title="Резюме PDF" loading="lazy" />
          </div>
        </section>
      </div>
    </>
  );
}
