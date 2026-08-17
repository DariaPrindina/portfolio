import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from './About';
import { about } from '@/entities/about/model/about';

describe('About', () => {
  it('renders every migration row', () => {
    render(<About />);

    for (const row of about.migration) {
      expect(screen.getByText(row.text)).toBeInTheDocument();
    }
  });

  /**
   * Смысл строк не должен держаться на одном цвете: красное и зелёное плохо
   * различимы при дальтонизме, поэтому рядом есть текстовые подписи.
   */
  it('states "before" and "after" in text, not only in colour', () => {
    render(<About />);

    // Точное совпадение не годится: у подписи есть завершающий пробел,
    // он нужен, чтобы скринридер не слипал её со следующим словом,
    // а Testing Library схлопывает пробелы при поиске.
    expect(screen.getAllByText(/^Было:/)).toHaveLength(
      about.migration.filter((row) => row.kind === 'del').length,
    );
    expect(screen.getAllByText(/^Стало:/)).toHaveLength(
      about.migration.filter((row) => row.kind === 'add').length,
    );
  });

  it('hides the +/- glyphs from screen readers', () => {
    const { container } = render(<About />);

    for (const sign of container.querySelectorAll('.about__sign')) {
      expect(sign).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('lists the key points', () => {
    render(<About />);

    for (const point of about.points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });
});
