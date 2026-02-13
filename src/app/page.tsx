import type { Metadata } from 'next';
import About from '@/components/About';
import CaseStudyHighlight from '@/components/CaseStudyHighlight';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import GithubStats from '@/components/GithubStats';
import Hero from '@/components/Hero';
import MotionEffects from '@/components/MotionEffects';
import Projects from '@/components/Projects';
import ResumeSection from '@/components/ResumeSection';
import Skills from '@/components/Skills';

export const metadata: Metadata = {
  title: 'Дарья Приндина | Frontend-разработчик',
  description:
    'Frontend-разработчик: React, Next.js, TypeScript. Кейсы миграции с JavaScript на React и развитие CRM-продуктов.',
  alternates: {
    canonical: '/',
    languages: {
      ru: '/',
      en: '/en',
    },
  },
  openGraph: {
    title: 'Дарья Приндина | Frontend-разработчик',
    description:
      'Frontend-разработчик: React, Next.js, TypeScript. Кейсы миграции с JavaScript на React и развитие CRM-продуктов.',
    url: '/',
    images: [
      {
        url: '/images/link-preview-frontend.svg',
        width: 1200,
        height: 630,
        alt: 'Frontend Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дарья Приндина | Frontend-разработчик',
    description:
      'Frontend-разработчик: React, Next.js, TypeScript. Кейсы миграции с JavaScript на React и развитие CRM-продуктов.',
    images: ['/images/link-preview-frontend.svg'],
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
