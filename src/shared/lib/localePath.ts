export type LocaleTarget = {
  href: string;
  label: string;
  title: string;
};

/**
 * Куда ведёт переключатель языка с текущего пути.
 * Со страницы проекта он должен вести на тот же проект на другом языке,
 * а не сбрасывать пользователя на главную.
 */
export function mapToTargetPath(pathname: string): LocaleTarget {
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');

  if (isEnglish) {
    return {
      href: pathname.replace(/^\/en/, '') || '/',
      label: 'RU',
      title: 'Переключить на русский',
    };
  }

  return {
    href: pathname === '/' ? '/en' : `/en${pathname}`,
    label: 'EN',
    title: 'Switch to English',
  };
}
