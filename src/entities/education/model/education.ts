export type EducationItem = {
  degree: string;
  institution: string;
  details: string;
  year: string;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
  file?: string;
};

export const education: EducationItem[] = [
  {
    degree: 'Магистр, Прикладная информатика',
    institution: 'Университет ИТМО, Санкт-Петербург',
    details: 'Институт прикладных компьютерных наук',
    year: '2027 (в процессе)',
  },
  {
    degree: 'Бакалавр, Реклама и PR',
    institution: 'СПбГЭУ, Санкт-Петербург',
    details: 'Гуманитарный факультет',
    year: '2022',
  },
];

export const certificates: CertificateItem[] = [
  {
    title: 'Фулстак-разработчик',
    issuer: 'Яндекс Практикум',
    year: '2024',
    file: '/docs/Дарья_Приндина.pdf',
  },
  {
    title: 'Диплом «Веб-разработчик плюс»',
    issuer: 'Программа профпереподготовки',
    year: '2024',
    file: '/docs/Диплом_RU_Приндина_2024-3682-008.pdf',
  },
  {
    title: 'Рекомендательное письмо после стажировки MIRR.ART',
    issuer: 'ИНДЛАБ',
    year: '2025',
    file: '/docs/ООО “ИНДЛАБ” Дарья.pdf',
  },
];
