import type { Project, ProjectCategory } from '@/entities/project/model/projects';

export type ProjectFilter = ProjectCategory | 'all';

export function filterProjects<T extends Pick<Project, 'category'>>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  return filter === 'all'
    ? [...projects]
    : projects.filter((project) => project.category === filter);
}

/**
 * В меню фильтров попадают только те категории, в которых что-то есть,
 * иначе появлялась бы кнопка, отдающая пустой список.
 */
export function availableFilters<T extends Pick<Project, 'category'>>(
  projects: readonly T[],
  order: readonly ProjectCategory[],
): ProjectFilter[] {
  const used = new Set(projects.map((project) => project.category));
  return ['all', ...order.filter((category) => used.has(category))];
}
