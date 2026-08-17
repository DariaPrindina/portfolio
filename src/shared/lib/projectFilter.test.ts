import { describe, expect, it } from 'vitest';
import { availableFilters, filterProjects } from './projectFilter';
import { projectCategoryOrder, projects } from '@/entities/project/model/projects';
import { enProjects } from '@/entities/locale/model/en';

const sample = [
  { category: 'commercial' as const },
  { category: 'pet' as const },
  { category: 'team' as const },
  { category: 'team' as const },
];

describe('filterProjects', () => {
  it('returns everything for "all"', () => {
    expect(filterProjects(sample, 'all')).toHaveLength(4);
  });

  it('keeps only the chosen category', () => {
    expect(filterProjects(sample, 'team')).toHaveLength(2);
    expect(filterProjects(sample, 'pet')).toHaveLength(1);
  });

  it('does not mutate the source list', () => {
    const copy = [...sample];
    filterProjects(sample, 'all').push({ category: 'pet' });
    expect(sample).toEqual(copy);
  });
});

describe('availableFilters', () => {
  it('offers only categories that have projects', () => {
    const partial = [{ category: 'commercial' as const }];
    expect(availableFilters(partial, projectCategoryOrder)).toEqual(['all', 'commercial']);
  });

  it('keeps the declared order', () => {
    expect(availableFilters(sample, projectCategoryOrder)).toEqual([
      'all',
      'commercial',
      'pet',
      'team',
    ]);
  });

  it('never produces a filter that returns nothing', () => {
    for (const locale of [projects, enProjects]) {
      for (const filter of availableFilters(locale, projectCategoryOrder)) {
        expect(filterProjects(locale, filter).length).toBeGreaterThan(0);
      }
    }
  });
});
