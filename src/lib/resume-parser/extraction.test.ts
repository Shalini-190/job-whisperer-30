import { describe, it, expect } from 'vitest';
import { ResumeExtractor } from './extraction';

describe('ResumeExtractor', () => {
  const sampleResumeText = `
    John Doe
    john.doe@example.com | (555) 123-4567
    
    Skills: JavaScript, TypeScript, React, Node.js
    
    Experience
    Software Engineer at Acme Corp (2020 - Present)
    - Developed web applications using React and Node.js
  `;

  it('extracts email address', () => {
    const email = ResumeExtractor.extractEmail(sampleResumeText);
    expect(email).toBe('john.doe@example.com');
  });

  it('extracts phone number', () => {
    const phone = ResumeExtractor.extractPhone(sampleResumeText);
    expect(phone).toBe('(555) 123-4567');
  });

  it('extracts skills', () => {
    const skills = ResumeExtractor.extractSkills(sampleResumeText);
    expect(skills).toContain('JavaScript');
    expect(skills).toContain('TypeScript');
    expect(skills).toContain('React');
    expect(skills).toContain('Node.js');
  });

  it('returns a structured ParsingResult', () => {
    const result = ResumeExtractor.parse(sampleResumeText);
    expect(result.success).toBe(true);
    expect(result.profile?.basics.email).toBe('john.doe@example.com');
    expect(result.profile?.basics.phone).toBe('(555) 123-4567');
    expect(result.profile?.skills.length).toBeGreaterThan(0);
  });
});
