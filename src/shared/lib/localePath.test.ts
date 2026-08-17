import { describe, expect, it } from 'vitest';
import { mapToTargetPath } from './localePath';

describe('mapToTargetPath', () => {
  it('switches the home page', () => {
    expect(mapToTargetPath('/').href).toBe('/en');
    expect(mapToTargetPath('/en').href).toBe('/');
  });

  it('keeps the project when switching language', () => {
    expect(mapToTargetPath('/projects/vibe-x').href).toBe('/en/projects/vibe-x');
    expect(mapToTargetPath('/en/projects/vibe-x').href).toBe('/projects/vibe-x');
  });

  it('keeps the resume page', () => {
    expect(mapToTargetPath('/resume').href).toBe('/en/resume');
    expect(mapToTargetPath('/en/resume').href).toBe('/resume');
  });

  it('does not treat a path merely starting with en as english', () => {
    expect(mapToTargetPath('/energy').href).toBe('/en/energy');
  });

  it('labels the target language', () => {
    expect(mapToTargetPath('/').label).toBe('EN');
    expect(mapToTargetPath('/en').label).toBe('RU');
  });
});
