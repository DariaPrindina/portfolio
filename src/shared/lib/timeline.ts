export type TimelineSource = {
  /** Начало в формате YYYY-MM. */
  start: string;
  /** Окончание в формате YYYY-MM; null — по настоящее время. */
  end: string | null;
};

export type TimelineSpan = {
  /** Отступ слева в процентах ширины дорожки. */
  left: number;
  /** Ширина отрезка в процентах. */
  width: number;
};

/** Переводит YYYY-MM в порядковый номер месяца. */
export function toMonthIndex(value: string): number {
  const [yearPart, monthPart] = value.split('-');
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return Number.NaN;
  }

  return year * 12 + (month - 1);
}

/**
 * Раскладывает отрезки по общей шкале: самый ранний старт — 0%,
 * самое позднее окончание — 100%.
 *
 * `nowMonth` передаётся явно, а не берётся из системных часов, чтобы
 * результат был детерминированным и его можно было проверить тестом.
 */
export function computeTimelineSpans(
  items: TimelineSource[],
  nowMonth: string,
): TimelineSpan[] {
  if (items.length === 0) {
    return [];
  }

  const now = toMonthIndex(nowMonth);
  const starts = items.map((item) => toMonthIndex(item.start));
  const ends = items.map((item) => (item.end === null ? now : toMonthIndex(item.end)));

  const min = Math.min(...starts);
  const max = Math.max(...ends);
  // Один месяц на всю шкалу дал бы деление на ноль.
  const total = Math.max(1, max - min);

  return items.map((item, index) => {
    const start = starts[index] ?? min;
    const end = ends[index] ?? max;
    const left = ((start - min) / total) * 100;
    // Отрезок в один месяц иначе схлопнулся бы в невидимую полоску.
    const width = Math.max(((end - start) / total) * 100, 4);

    return {
      left: Number(left.toFixed(2)),
      width: Number(Math.min(width, 100 - left).toFixed(2)),
    };
  });
}

const MONTH_LABELS = [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
];

const MONTH_LABELS_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Подписи под шкалой: равные интервалы от самого раннего старта до конца. */
export function buildTimelineTicks(
  items: TimelineSource[],
  nowMonth: string,
  count = 5,
  locale: 'ru' | 'en' = 'ru',
): string[] {
  if (items.length === 0 || count < 1) {
    return [];
  }

  const now = toMonthIndex(nowMonth);
  const min = Math.min(...items.map((item) => toMonthIndex(item.start)));
  const max = Math.max(...items.map((item) => (item.end === null ? now : toMonthIndex(item.end))));
  const step = (max - min) / count;
  const labels = locale === 'en' ? MONTH_LABELS_EN : MONTH_LABELS;

  return Array.from({ length: count }, (_, index) => {
    const point = Math.round(min + step * index);
    const year = Math.floor(point / 12);
    const month = point % 12;

    return `${labels[month]} ${String(year).slice(2)}`;
  });
}

/** Текущий месяц в формате YYYY-MM. Вычисляется на сборке страницы. */
export function currentMonth(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
