import { describe, expect, it } from 'vitest';
import { PROFILE } from './profile';

describe('PROFILE', () => {
  it('exposes core identity fields from the CV', () => {
    expect(PROFILE.name).toBe('Youssef Khamis');
    expect(PROFILE.title).toContain('Angular');
    expect(PROFILE.education.school).toContain('Behira');
    expect(PROFILE.technologies.length).toBeGreaterThan(0);
  });
});
