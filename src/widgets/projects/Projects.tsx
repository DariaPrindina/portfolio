'use client';

import { useMemo, useState } from 'react';
import ProjectsGrid from '@/shared/ui/lists/ProjectsGrid';
import { projectCategoryOrder, type ProjectCategory } from '@/entities/project/model/projects';
import { getContent, type Locale } from '@/entities/locale/model/content';
import { SECTION_IDS } from '@/shared/config/sections';

type Filter = ProjectCategory | 'all';

export default function Projects({ locale = 'ru' }: { locale?: Locale }) {
  const { projects: dict, basePath } = getContent(locale);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filters = useMemo<Filter[]>(() => {
    const used = new Set(dict.items.map((project) => project.category));
    return ['all', ...projectCategoryOrder.filter((category) => used.has(category))];
  }, [dict.items]);

  const visibleProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? [...dict.items]
        : dict.items.filter((project) => project.category === activeFilter),
    [activeFilter, dict.items],
  );

  return (
    <section id={SECTION_IDS.projects} className="section">
      <p className="section__label">{dict.label}</p>
      <h2 className="section__title">
        {dict.title}
      </h2>

      <div className="project-filters" role="group" aria-label={dict.filterAria}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          const label = filter === 'all' ? dict.filterAll : dict.categories[filter];

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              className={`project-filter ${isActive ? 'project-filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <ProjectsGrid
        projects={visibleProjects}
        basePath={basePath}
        labels={{ ...dict.grid, categories: dict.categories }}
      />
    </section>
  );
}
