import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';
import { projects } from '@/entities/project/model/projects';

const titlesOf = (category: string) =>
  projects.filter((project) => project.category === category).map((project) => project.title);

describe('Projects', () => {
  it('shows every project under the "all" filter', () => {
    render(<Projects />);

    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    }
  });

  it('offers a filter per used category plus "all"', () => {
    render(<Projects />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.textContent)).toEqual([
      'Все',
      'Коммерческие',
      'Пет-проекты',
      'Командные и учебные',
    ]);
  });

  it('narrows the list to the chosen category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'Пет-проекты' }));

    for (const title of titlesOf('pet')) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    for (const title of titlesOf('commercial')) {
      expect(screen.queryByRole('heading', { name: title })).not.toBeInTheDocument();
    }
  });

  it('reports the active filter to assistive technology', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const all = screen.getByRole('button', { name: 'Все' });
    const commercial = screen.getByRole('button', { name: 'Коммерческие' });

    expect(all).toHaveAttribute('aria-pressed', 'true');

    await user.click(commercial);

    expect(commercial).toHaveAttribute('aria-pressed', 'true');
    expect(all).toHaveAttribute('aria-pressed', 'false');
  });

  it('returns to the full list', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'Коммерческие' }));
    await user.click(screen.getByRole('button', { name: 'Все' }));

    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    }
  });
});
