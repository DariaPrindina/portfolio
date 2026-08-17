import Link from 'next/link';
import { resumeDocs } from '@/entities/document/model/documents';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

export default function ResumeSection({ locale = 'ru' }: { locale?: Locale }) {
  const { resume } = getContent(locale);

  const documents = [
    { type: 'PDF', title: resume.pdfTitle, href: resumeDocs.pdf, action: resume.open },
    { type: 'DOC', title: resume.docTitle, href: resumeDocs.doc, action: resume.download },
  ];

  return (
    <section id={SECTION_IDS.resume} className="section" data-reveal="up">
      <p className="section__label">{resume.label}</p>
      <h2 className="section__title" data-reveal="up">
        {resume.title}
      </h2>

      <div className="docs" data-reveal="up">
        {documents.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="doc"
          >
            <span className="doc__type">{doc.type}</span>
            <span>{doc.title}</span>
            <span className="doc__action">{doc.action}</span>
          </Link>
        ))}
      </div>

      <div className="resume__actions" data-reveal="up">
        <Link href={resume.pageHref} className="btn btn--primary">
          {resume.page}
        </Link>
      </div>
    </section>
  );
}
