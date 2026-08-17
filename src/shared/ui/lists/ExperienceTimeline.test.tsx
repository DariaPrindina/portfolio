import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExperienceTimeline from './ExperienceTimeline';
import { experience } from '@/entities/experience/model/experience';

const renderTimeline = () =>
  render(<ExperienceTimeline items={experience} nowMonth="2026-08" nowLabel="сейчас" />);

describe('ExperienceTimeline', () => {
  it('renders a lane per job', () => {
    const { container } = renderTimeline();
    expect(container.querySelectorAll('.lane')).toHaveLength(experience.length);
  });

  /**
   * Текст скрыт визуально, но остаётся в разметке: иначе он был бы доступен
   * только тем, кто может навести мышь.
   */
  it('keeps the description readable by assistive technology while collapsed', () => {
    renderTimeline();

    for (const item of experience) {
      expect(screen.getByText(item.summary)).toBeInTheDocument();
    }
  });

  it('makes every block reachable from the keyboard', () => {
    const { container } = renderTimeline();

    for (const block of container.querySelectorAll('.lane__block')) {
      expect(block).toHaveAttribute('tabindex', '0');
    }
  });

  it('places blocks on the shared scale without overlap', () => {
    const { container } = renderTimeline();
    const blocks = Array.from(container.querySelectorAll<HTMLElement>('.lane__block'));

    const spans = blocks.map((block) => ({
      left: Number.parseFloat(block.style.left),
      width: Number.parseFloat(block.style.width),
    }));

    for (const span of spans) {
      expect(span.left).toBeGreaterThanOrEqual(0);
      expect(span.left + span.width).toBeLessThanOrEqual(100.01);
    }

    // Работы идут подряд: конец предыдущей совпадает с началом следующей.
    const ordered = [...spans].sort((a, b) => a.left - b.left);
    for (let i = 1; i < ordered.length; i += 1) {
      const previous = ordered[i - 1]!;
      expect(ordered[i]!.left).toBeGreaterThanOrEqual(previous.left);
    }
  });

  it('marks the ongoing job with the "now" label', () => {
    renderTimeline();
    expect(screen.getAllByText('сейчас').length).toBeGreaterThan(0);
  });

  it('labels the axis with month ticks', () => {
    const { container } = renderTimeline();
    expect(container.querySelectorAll('.timeline__ticks span')).toHaveLength(5);
  });
});
