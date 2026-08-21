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
        <Hero locale="en" />
        <About locale="en" />
        <Skills locale="en" />
        <Experience locale="en" />
        <Education locale="en" />
        <Projects locale="en" />
        <ResumeSection locale="en" />
        <Contact locale="en" />
      </div>
    </>
  );
}
