import About from '@/components/About';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MotionEffects from '@/components/MotionEffects';
import Projects from '@/components/Projects';
import ResumeSection from '@/components/ResumeSection';
import Skills from '@/components/Skills';

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
      <Footer />
    </>
  );
}
