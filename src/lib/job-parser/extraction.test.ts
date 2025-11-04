import { describe, it, expect } from 'vitest';
import { JobExtractor } from './extraction';

describe('JobExtractor', () => {
  const sampleJD = `
    Title: Senior React Developer
    Company: TechNova Solutions
    
    We are looking for a Senior React Developer with 5 years of experience.
    Skills needed: JavaScript, TypeScript, React, GraphQL.
  `;

  it('extracts title', () => {
    const title = JobExtractor.extractTitle(sampleJD);
    expect(title).toBe('Senior React Developer');
  });

  it('extracts company', () => {
    const company = JobExtractor.extractCompany(sampleJD);
    expect(company).toBe('TechNova Solutions');
  });
  
  it('extracts years of experience', () => {
    const exp = JobExtractor.extractExperienceYears(sampleJD);
    expect(exp).toBe(5);
  });

  it('extracts skills', () => {
    const skills = JobExtractor.extractSkills(sampleJD);
    expect(skills).toContain('React');
    expect(skills).toContain('TypeScript');
    expect(skills).toContain('GraphQL');
  });

  it('returns a structured JobParseResult', () => {
    const result = JobExtractor.parse(sampleJD);
    expect(result.success).toBe(true);
    expect(result.job?.title).toBe('Senior React Developer');
    expect(result.job?.requirements.experienceYears).toBe(5);
  });
});
