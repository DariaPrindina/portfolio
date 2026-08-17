import type { CSSProperties } from 'react';
import type { ExperienceItem } from '@/entities/experience/model/experience';
import { buildTimelineTicks, computeTimelineSpans } from '@/shared/lib/timeline';

type ExperienceTimelineProps = {
  items: ExperienceItem[];
  nowMonth: string;
  locale?: 'ru' | 'en';
  nowLabel: string;
};

const BAR_MODIFIER: Record<ExperienceItem['kind'], string> = {
  current: '',
  past: ' lane__bar--past',
  internship: ' lane__bar--intern',
};

/**
 * Полоса и содержимое разделены намеренно.
 * Ширина полосы пропорциональна длительности, поэтому у двухмесячной работы
 * она всего несколько десятков пикселей — текст туда не помещается.
 * Полоса показывает место на шкале, карточка под ней читается при любой ширине.
 */
export default function ExperienceTimeline({
  items,
  nowMonth,
  locale = 'ru',
  nowLabel,
}: ExperienceTimelineProps) {
  const spans = computeTimelineSpans(items, nowMonth);
  const ticks = buildTimelineTicks(items, nowMonth, 5, locale);

  return (
    <div className="timeline">
      <div className="timeline__axis" aria-hidden="true">
        <span />
        <div
          className="timeline__ticks"
          style={{ gridTemplateColumns: `repeat(${ticks.length}, 1fr)` }}
        >
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      </div>

      {items.map((item, index) => {
        const span = spans[index];
        const period =
          item.end === null ? `${item.period.split('—')[0]?.trim()} — ${nowLabel}` : item.period;

        return (
          <div className="lane" key={`${item.company}-${item.start}`} data-reveal="up">
            <div className="lane__label">
              <p className="lane__company">{item.company}</p>
              <p className="lane__role">{item.role}</p>
            </div>

            <div className="lane__track">
              <div
                className={`lane__bar${BAR_MODIFIER[item.kind]}`}
                title={period}
                aria-hidden="true"
                style={
                  {
                    left: `${span?.left ?? 0}%`,
                    width: `${span?.width ?? 100}%`,
                  } as CSSProperties
                }
              />

              <article className="lane__card">
                <p className="lane__period">
                  {item.end === null ? (
                    <>
                      {item.period.split('—')[0]?.trim()} — <span className="lane__now">{nowLabel}</span>
                    </>
                  ) : (
                    item.period
                  )}
                </p>
                <p className="lane__summary">{item.summary}</p>
                <ul className="lane__bullets">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
