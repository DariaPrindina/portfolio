export type DocItem = {
  title: string;
  file: string;
};

export const resumeDocs = {
  pdf: '/docs/resume.pdf',
  doc: '/docs/resume.doc',
} as const;

export const certificateDocs: DocItem[] = [
  {
    title: 'Сертификат: Дарья Приндина',
    file: '/docs/Дарья_Приндина.pdf',
  },
  {
    title: 'Диплом 2024',
    file: '/docs/Диплом_RU_Приндина_2024-3682-008.pdf',
  },
  {
    title: 'Рекомендательное письмо ИНДЛАБ',
    file: '/docs/ООО “ИНДЛАБ” Дарья.pdf',
  },
];
