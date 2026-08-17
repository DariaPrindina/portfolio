import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectsGrid from './ProjectsGrid';
import { projects } from '@/entities/project/model/projects';
import { enProjects } from '@/entities/locale/model/en';

const ruLabels = {
  currentProject: 'текущий',
  details: 'Подробнее',
  demo: 'Открыть сайт',
  code: 'Код',
  categories: { commercial: 'Коммерческие', pet: 'Пет-проекты', team: 'Командные' },
};

const enLabels = {
  currentProject: 'current',
  details: 'Case study',
  demo: 'Open site',
  code: 'Code',
  categories: { commercial: 'commercial', pet: 'side projects', team: 'team' },
};

describe('ProjectsGrid', () => {
  it('renders every project passed to it', () => {
    render(<ProjectsGrid projects={projects} labels={ruLabels} />);

    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    }
  });

  /**
   * Регрессия на живой баг: путь к кейсу был записан жёстко, поэтому с
   * английской главной кнопка вела на русскую страницу проекта.
   */
  it('keeps case study links inside the russian version by default', () => {
    render(<ProjectsGrid projects={projects} labels={ruLabels} />);

    for (const link of screen.getAllByRole('link', { name: ruLabels.details })) {
      expect(link.getAttribute('href')).toMatch(/^\/projects\//);
    }
  });

  it('prefixes case study links with the locale base path', () => {
    render(<ProjectsGrid projects={enProjects} labels={enLabels} basePath="/en" />);

    const links = screen.getAllByRole('link', { name: enLabels.details });
    expect(links.length).toBe(enProjects.length);

    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/en\/projects\//);
    }
  });

  it('groups projects into category lanes', () => {
    render(<ProjectsGrid projects={projects} labels={ruLabels} />);

    const commercial = projects.filter((project) => project.category === 'commercial');
    const lane = screen.getByText(ruLabels.categories.commercial).closest('.plane');

    expect(lane).not.toBeNull();
    for (const project of commercial) {
      expect(within(lane as HTMLElement).getByText(project.title)).toBeInTheDocument();
    }
  });

  it('marks only the current project with a badge', () => {
    render(<ProjectsGrid projects={projects} labels={ruLabels} />);

    const badges = screen.getAllByText(ruLabels.currentProject);
    expect(badges).toHaveLength(projects.filter((project) => project.isCurrent).length);
  });

  it('opens external links safely in a new tab', () => {
    render(<ProjectsGrid projects={projects} labels={ruLabels} />);

    for (const link of screen.getAllByRole('link', { name: ruLabels.demo })) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});
