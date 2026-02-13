import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daria Prindina | Frontend Developer',
  description:
    'Frontend developer portfolio: React, TypeScript, product migration from legacy JavaScript.',
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
