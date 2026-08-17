import { describe, expect, it } from 'vitest';
import { pickActiveSection, type SectionOffset } from './scrollSpy';

const sections: SectionOffset[] = [
  { id: '#about-me', top: 1000 },
  { id: '#skills', top: 3000 },
  { id: '#experience', top: 4500 },
  { id: '#projects', top: 11000 },
  { id: '#contact', top: 16000 },
];

describe('pickActiveSection', () => {
  it('returns null above the first section', () => {
    expect(pickActiveSection(sections, 0, 76)).toBeNull();
    expect(pickActiveSection(sections, 800, 76)).toBeNull();
  });

  it('activates a section once its top passes under the header', () => {
    expect(pickActiveSection(sections, 924, 76)).toBe('#about-me');
    expect(pickActiveSection(sections, 3000, 76)).toBe('#skills');
  });

  it('keeps the section active while scrolling through it', () => {
    expect(pickActiveSection(sections, 8000, 76)).toBe('#experience');
  });

  it('activates the last section at the bottom of the page', () => {
    expect(pickActiveSection(sections, 12000, 76, true)).toBe('#contact');
  });

  it('handles an empty list', () => {
    expect(pickActiveSection([], 500, 76)).toBeNull();
  });
});
