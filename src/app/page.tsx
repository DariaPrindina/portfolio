'use client';

import { easeOut, motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero секция */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-primary/30 shadow-xl">
            <Image
              src="/images/avatar.jpg"
              alt="Daria Prindina"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
        >
          Привет, я Дарья
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-10 max-w-2xl text-xl text-muted-foreground md:text-2xl"
        >
          Frontend-разработчик
          <br />
          <span className="font-medium text-foreground">
            React • Next.js • TypeScript • анимации • доступность
          </span>
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <button>
            <Link href="#projects">
              Посмотреть проекты
              <ArrowRight className="h-5 w-5" />
            </Link>
          </button>

          <button>
            <Link href="#contact">Связаться со мной</Link>
          </button>
        </motion.div>

        {/* Социальные иконки */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-16 flex gap-8"
        >
          <Link
            href="https://github.com/DariaPrindina"
            target="_blank"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-8 w-8" />
          </Link>

          <Link
            href="https://linkedin.com/in/твой_профиль"
            target="_blank"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-8 w-8" />
          </Link>

          <Link
            href="mailto:daria@prindina.ru"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-8 w-8" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
