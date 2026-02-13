import type { Metadata } from 'next';
import About from '@/widgets/about/About';
import CaseStudyHighlight from '@/widgets/case-study-highlight/CaseStudyHighlight';
import Contact from '@/widgets/contact/Contact';
import Education from '@/widgets/education/Education';
import Experience from '@/widgets/experience/Experience';
import Footer from '@/widgets/footer/Footer';
import GithubStats from '@/widgets/github-stats/GithubStats';
import Hero from '@/widgets/hero/Hero';
import MotionEffects from '@/shared/ui/motion/MotionEffects';
import Projects from '@/widgets/projects/Projects';
import ResumeSection from '@/widgets/resume-section/ResumeSection';
import Skills from '@/widgets/skills/Skills';
import { buildPageMetadata } from '@/shared/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Дарья Приндина | Frontend-разработчик',
    description:
      'Frontend-разработчик: React, Next.js, TypeScript. Кейсы миграции с JavaScript на React и развитие CRM-продуктов.',
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
        <CaseStudyHighlight />
        <GithubStats />
        <ResumeSection />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
