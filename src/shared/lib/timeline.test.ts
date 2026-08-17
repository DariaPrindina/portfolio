import { describe, expect, it } from 'vitest';
import {
  buildTimelineTicks,
  computeTimelineSpans,
  toMonthIndex,
  type TimelineSource,
} from './timeline';

const items: TimelineSource[] = [
  { start: '2025-05', end: null },
  { start: '2024-12', end: '2025-05' },
  { start: '2024-11', end: '2024-12' },
  { start: '2024-10', end: '2024-12' },
];

describe('toMonthIndex', () => {
  it('increments by one per month', () => {
    expect(toMonthIndex('2025-02') - toMonthIndex('2025-01')).toBe(1);
  });

  it('crosses the year boundary', () => {
    expect(toMonthIndex('2025-01') - toMonthIndex('2024-12')).toBe(1);
  });
});

describe('computeTimelineSpans', () => {
  const spans = computeTimelineSpans(items, '2026-08');

  it('anchors the earliest start at zero', () => {
    expect(spans[3]?.left).toBe(0);
  });

  it('runs the ongoing item to the end of the scale', () => {
    const current = spans[0];
    expect(current).toBeDefined();
    expect(current!.left + current!.width).toBeCloseTo(100, 1);
  });

  it('places consecutive jobs without overlap', () => {
    const toveco = spans[1]!;
    const arbat = spans[0]!;
    expect(toveco.left + toveco.width).toBeCloseTo(arbat.left, 1);
  });

  it('keeps short spans visible', () => {
    expect(spans[2]!.width).toBeGreaterThanOrEqual(4);
  });

  it('never overflows the track', () => {
    spans.forEach((span) => {
      expect(span.left + span.width).toBeLessThanOrEqual(100.01);
    });
  });

  it('returns nothing for an empty list', () => {
    expect(computeTimelineSpans([], '2026-08')).toEqual([]);
  });
});

describe('buildTimelineTicks', () => {
  it('starts at the earliest month and returns the requested count', () => {
    const ticks = buildTimelineTicks(items, '2026-08', 5);
    expect(ticks).toHaveLength(5);
    expect(ticks[0]).toBe('окт 24');
  });

  it('advances left to right', () => {
    const ticks = buildTimelineTicks(items, '2026-08', 5);
    // Диапазон окт 2024 — авг 2026 = 22 месяца, шаг 4.4 → пятая метка на апреле 2026.
    expect(ticks[4]).toBe('апр 26');
  });

  it('supports english labels', () => {
    expect(buildTimelineTicks(items, '2026-08', 5, 'en')[0]).toBe('Oct 24');
  });

  it('returns nothing for an empty list', () => {
    expect(buildTimelineTicks([], '2026-08')).toEqual([]);
  });
});
