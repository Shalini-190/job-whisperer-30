import { describe, it, expect } from 'vitest';
import { ResumeMatcher } from './matcher';
import { ResumeProfile } from '../resume-parser';
import { JobDescription } from '../job-parser';

describe('ResumeMatcher', () => {
  const sampleResume: ResumeProfile = {
    basics: {
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
    skills: ['JavaScript', 'TypeScript', 'React'],
    experience: [
      { id: '1', company: 'A', position: 'Dev', startDate: '2020', highlights: [] },
      { id: '2', company: 'B', position: 'Dev', startDate: '2019', highlights: [] }
    ],
    education: [],
    projects: []
  };

  const sampleJob: JobDescription = {
    title: 'Frontend Engineer',
    company: 'Tech Corp',
    requirements: {
      skills: ['JavaScript', 'React', 'GraphQL'],
      experienceYears: 2
    },
    niceToHave: [],
    rawText: ''
  };

  it('calculates skill match correctly', () => {
    const { matchedSkills, missingSkills } = ResumeMatcher.analyzeSkills(sampleResume, sampleJob);
    
    expect(matchedSkills).toContain('javascript');
    expect(matchedSkills).toContain('react');
    expect(missingSkills).toContain('graphql');
  });

  it('generates an overall match score', () => {
    const result = ResumeMatcher.match(sampleResume, sampleJob);
    
    expect(result.score.skillsScore).toBeGreaterThan(50);
    expect(result.score.experienceScore).toBe(100); // 2 jobs vs 2 years
    expect(result.score.overall).toBeGreaterThan(60);
    expect(result.explanation.length).toBe(3);
  });
});
