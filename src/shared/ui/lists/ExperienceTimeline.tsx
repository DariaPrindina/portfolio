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
  past: ' lane__block--past',
  internship: ' lane__block--intern',
};

/**
 * Блоки стоят на общей шкале времени, их ширина пропорциональна длительности.
 * Свёрнутый блок показывает только период; текст раскрывается по наведению
 * или фокусу, и блок расширяется до читаемой ширины — иначе двухмесячная
 * работа занимала бы несколько десятков пикселей и текст обрезался бы.
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
        const isCurrent = item.end === null;
        const period = isCurrent ? `${item.period.split('—')[0]?.trim()} — ${nowLabel}` : item.period;

        return (
          <div className="lane" key={`${item.company}-${item.start}`}>
            <div className="lane__label">
              <p className="lane__company">{item.company}</p>
              <p className="lane__role">{item.role}</p>
            </div>

            <div className="lane__track">
              {/*
                Блок стоит на шкале по своим долям, поэтому у короткой работы
                он всего несколько десятков пикселей. Текст лежит внутри, но
                скрыт: раскрывается по наведению и по фокусу с клавиатуры,
                а блок при этом расширяется до читаемой ширины.

                tabIndex делает блок достижимым с клавиатуры; сам текст
                остаётся в DOM, поэтому скринридер читает его всегда.
              */}
              <article
                className={`lane__block${BAR_MODIFIER[item.kind]}`}
                tabIndex={0}
                style={
                  {
                    left: `${span?.left ?? 0}%`,
                    width: `${span?.width ?? 100}%`,
                  } as CSSProperties
                }
              >
                <p className="lane__period">
                  {isCurrent ? (
                    <>
                      {item.period.split('—')[0]?.trim()} — <span className="lane__now">{nowLabel}</span>
                    </>
                  ) : (
                    period
                  )}
                </p>

                <div className="lane__body">
                  <div className="lane__body-inner">
                    <p className="lane__summary">{item.summary}</p>
                    <ul className="lane__bullets">
                      {item.bullets.slice(0, 3).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
