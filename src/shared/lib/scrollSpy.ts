export type SectionOffset = {
  id: string;
  /** Расстояние от верха документа до верха секции. */
  top: number;
};

/**
 * Активна последняя секция, верх которой уже ушёл под шапку.
 *
 * Наблюдатель пересечений здесь не подходит: секции сильно разной высоты,
 * и низкая секция внизу страницы никогда не станет самой верхней видимой.
 */
export function pickActiveSection(
  sections: SectionOffset[],
  scrollY: number,
  headerOffset: number,
  isAtBottom = false,
): string | null {
  if (sections.length === 0) {
    return null;
  }

  // У низа страницы последняя секция может не дотягивать до линии шапки —
  // без этого подсветка застревает на предпоследнем пункте.
  if (isAtBottom) {
    return sections[sections.length - 1]?.id ?? null;
  }

  let active: string | null = null;

  for (const section of sections) {
    if (section.top - headerOffset > scrollY) {
      break;
    }
    active = section.id;
  }

  return active;
}
