import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { ArrowRight, Download, Eye, Github, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import ExperienceList from '@/shared/ui/lists/ExperienceList';
import ProjectsGrid from '@/shared/ui/lists/ProjectsGrid';
import SkillsList from '@/shared/ui/lists/SkillsList';
import { certificateDocs } from '@/entities/document/model/documents';
import {
  enAbout,
  enCertificates,
  enEducation,
  enExperience,
  enProfile,
  enProjects,
  enSkills,
} from '@/entities/locale/model/en';
import { buildPageMetadata } from '@/shared/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Daria Prindina | Frontend Developer',
    description:
      'Frontend Developer portfolio: React, Next.js, TypeScript, CRM migration case studies and product development.',
    url: '/en',
    locale: 'en_US',
    imageAlt: 'Daria Prindina — Frontend Developer',
  }),
  alternates: {
    canonical: '/en',
    languages: {
      ru: '/',
      en: '/en',
    },
  },
};

export default function EnPage() {
  return (
    <>
      <MotionEffects />
      <div className="container">
        <section id="about" className="hero section" data-reveal="up">
          <div className="hero__avatar-wrap" data-reveal="zoom">
            <Image
              src={enProfile.avatar}
              alt={enProfile.name}
              className="hero__avatar"
              width={180}
              height={180}
              sizes="180px"
              priority
            />
          </div>

          <p className="hero__eyebrow" data-reveal="up">
            {enProfile.role}
          </p>
          <h1 className="hero__title" data-reveal="up">
            {enProfile.name}
          </h1>
          <p className="hero__description" data-reveal="up">
            {enProfile.tagline}
          </p>

          <div className="hero__actions" data-reveal="up">
            <Link href="#experience" className="btn btn--ghost">
              Experience
            </Link>
            <Link href="#projects" className="btn btn--primary">
              Projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="#contact" className="btn btn--ghost">
              Contact
            </Link>
            <Link href="#resume" className="btn btn--ghost">
              Resume
            </Link>
            <Link href="/en/resume" className="btn btn--ghost">
              Full Resume
            </Link>
            <Link href="/" className="btn btn--ghost">
              RU version
            </Link>
          </div>

          <ul className="social-list" aria-label="Social links" data-reveal="up">
            <li>
              <Link
                href={enProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={22} aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href={`mailto:${enProfile.email}`} className="social-link" aria-label="Email">
                <Mail size={22} aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={enProfile.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Telegram"
              >
                <Send size={22} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>

        <section id="about-me" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            About Me
          </h2>
          <p className="about__intro" data-reveal="up">
            {enAbout.intro}
          </p>
          <ul className="about__list">
            {enAbout.points.map((point, index) => (
              <li
                key={point}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Skills
          </h2>
          <SkillsList skills={enSkills} ariaLabel="Skills list" />
        </section>

        <section id="experience" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Experience
          </h2>
          <ExperienceList items={enExperience} stackLabelPrefix="Stack" />
        </section>

        <section id="education" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Education & Certificates
          </h2>

          <div className="edu-grid">
            <div className="edu-block" data-reveal="up">
              <h3 className="edu-block__title">Education</h3>
              <ul className="edu-list">
                {enEducation.map((item, index) => (
                  <li
                    key={`${item.degree}-${item.year}`}
                    data-reveal="up"
                    style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
                  >
                    <p className="edu-list__head">{item.degree}</p>
                    <p className="edu-list__sub">{item.institution}</p>
                    <p className="edu-list__sub">{item.details}</p>
                    <p className="edu-list__year">{item.year}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="edu-block" data-reveal="up">
              <h3 className="edu-block__title">Certificates</h3>
              <ul className="edu-list">
                {enCertificates.map((item, index) => (
                  <li
                    key={`${item.title}-${item.year}`}
                    data-reveal="up"
                    style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
                  >
                    <p className="edu-list__head">{item.title}</p>
                    <p className="edu-list__sub">{item.issuer}</p>
                    <p className="edu-list__year">{item.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Projects
          </h2>
          <ProjectsGrid
            projects={enProjects}
            labels={{
              currentProject: 'Current project',
              details: 'Case study',
              demo: 'Demo',
              code: 'Code',
            }}
          />
        </section>

        <section id="resume" className="section" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Resume
          </h2>
          <p className="resume__text" data-reveal="up">
            Open the latest CV online or download it in PDF/Word format.
          </p>
          <div className="resume__actions" data-reveal="up">
            <Link href="/en/resume" className="project-action-link project-action-link--primary">
              Open full page
            </Link>
            <Link
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link project-action-link--primary"
            >
              <Eye size={15} aria-hidden="true" />
              View PDF
            </Link>
            <Link href="/docs/resume.pdf" download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Download PDF
            </Link>
            <Link href="/docs/resume.doc" download className="project-action-link project-action-link--secondary">
              <Download size={15} aria-hidden="true" />
              Download Word
            </Link>
          </div>
          <div className="resume__certs" data-reveal="up">
            {certificateDocs.map((cert) => (
              <Link
                key={cert.file}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="resume__cert-link"
              >
                {cert.title}
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="section section--highlight" data-reveal="up">
          <h2 className="section__title" data-reveal="up">
            Contact
          </h2>
          <p className="contact__text" data-reveal="up">
            Open to frontend opportunities. The fastest way to reach me is Telegram or email.
          </p>
          <div className="contact__actions" data-reveal="up">
            <Link href={`mailto:${enProfile.email}`} className="btn btn--primary">
              {enProfile.email}
            </Link>
            <Link href={enProfile.telegram} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Telegram
            </Link>
            <span className="contact__meta">{enProfile.location}</span>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <p>© {new Date().getFullYear()} {enProfile.name}</p>
          <nav className="footer__nav" aria-label="Page navigation">
            <Link href="#about">Home</Link>
            <Link href="#about-me">About</Link>
            <Link href="#skills">Skills</Link>
            <Link href="#experience">Experience</Link>
            <Link href="#education">Education</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#resume">Resume</Link>
            <Link href="#contact">Contact</Link>
            <Link href="/">Русская версия</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
