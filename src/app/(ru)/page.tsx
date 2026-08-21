import type { Metadata } from 'next';
import About from '@/widgets/about/About';
import Contact from '@/widgets/contact/Contact';
import Education from '@/widgets/education/Education';
import Experience from '@/widgets/experience/Experience';
import Hero from '@/widgets/hero/Hero';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import Projects from '@/widgets/projects/Projects';
import ResumeSection from '@/widgets/resume-section/ResumeSection';
import Skills from '@/widgets/skills/Skills';
import { buildPageMetadata } from '@/shared/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Дарья Приндина | React Developer',
    description:
      'React, Next.js, TypeScript. Миграция legacy JavaScript на современный продуктовый frontend.',
    url: '/',
    imageAlt: 'Дарья Приндина — Frontend Developer',
  }),
  alternates: {
    canonical: '/',
    languages: {
      ru: '/',
      en: '/en',
    },
  },
};

export default function Home() {
  return (
    <>
      <MotionEffects />
      <div className="container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <ResumeSection />
        <Contact />
      </div>
    </>
  );
}
