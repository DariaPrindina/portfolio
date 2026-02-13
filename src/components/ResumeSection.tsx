import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { resumeDocs } from '@/data/documents';

export default function ResumeSection() {
  return (
    <section id="resume" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Резюме
      </h2>
      <p className="resume__text" data-reveal="up">
        Просмотр и скачивание резюме доступны на отдельной странице.
      </p>

      <div className="resume__actions" data-reveal="up">
        <Link href="/resume" className="project-action-link project-action-link--detail">
          Страница резюме
        </Link>
        <Link
          href={resumeDocs.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action-link"
        >
          <Eye size={15} aria-hidden="true" />
          Смотреть PDF
        </Link>
        <Link href={resumeDocs.pdf} download className="project-action-link">
          <Download size={15} aria-hidden="true" />
          Скачать PDF
        </Link>
        <Link href={resumeDocs.doc} download className="project-action-link">
          <Download size={15} aria-hidden="true" />
          Скачать Word
        </Link>
      </div>
    </section>
  );
}
