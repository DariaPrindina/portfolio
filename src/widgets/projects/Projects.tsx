'use client';

import { useMemo, useState } from 'react';
import ProjectsGrid from '@/shared/ui/lists/ProjectsGrid';
import { projects } from '@/entities/project/model/projects';

export default function Projects() {
  const [activeStack, setActiveStack] = useState<string>('all');

  const stackFilters = useMemo(() => {
    const stackSet = new Set<string>();
    projects.forEach((project) => {
      project.stack.forEach((item) => stackSet.add(item));
    });
    return ['all', ...Array.from(stackSet)];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeStack === 'all') {
      return projects;
    }
    return projects.filter((project) => project.stack.includes(activeStack));
  }, [activeStack]);

  return (
    <section id="projects" className="section" data-reveal="up">
      <h2 className="section__title" data-reveal="up">
        Проекты
      </h2>

      <div className="project-filters" data-reveal="up">
        {stackFilters.map((stack) => (
          <button
            key={stack}
            type="button"
            className={`project-filter ${activeStack === stack ? 'project-filter--active' : ''}`}
            onClick={() => setActiveStack(stack)}
          >
            {stack === 'all' ? 'Все' : stack}
          </button>
        ))}
      </div>

      <ProjectsGrid
        projects={visibleProjects}
        labels={{
          currentProject: 'Текущий проект',
          details: 'Подробнее',
          demo: 'Демо',
          code: 'Код',
        }}
      />
    </section>
  );
}
