import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import { resumeDocs } from '@/entities/document/model/documents';

export default function EnResumePage() {
  return (
    <>
      <MotionEffects />
      <div className="container">
        <section className="section resume-page" data-reveal="up">
          <div className="project-detail__top">
            <Link href="/en#resume" className="project-detail__back">
              Back to portfolio
            </Link>
          </div>
          <h1 className="project-detail__title" data-reveal="up">
            Resume
          </h1>
          <p className="project-detail__description" data-reveal="up">
            Open the latest CV in full size and download all documents from one page.
          </p>

          <div className="resume__actions" data-reveal="up">
            <Link
              href={resumeDocs.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link project-action-link--primary"
            >
              <Eye size={15} aria-hidden="true" />
              Open PDF
            </Link>
            <Link href={resumeDocs.pdf} download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Download PDF
            </Link>
            <Link href={resumeDocs.doc} download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Download Word
            </Link>
          </div>

          <div className="resume__viewer" data-reveal="up">
            <iframe src={`${resumeDocs.pdf}#view=FitH`} title="Resume PDF" loading="lazy" />
          </div>
        </section>
      </div>
    </>
  );
}
