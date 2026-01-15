import { describe, it, expect } from 'vitest';
import { ApplicationAssistant } from './generator';
import { AssistantRequest } from './types';

describe('ApplicationAssistant', () => {
  const req: AssistantRequest = {
    resume: {
      basics: { name: 'Test', email: 'test@test.com' },
      skills: ['React', 'Node.js'],
      experience: [],
      education: [],
      projects: []
    },
    job: {
      title: 'Fullstack Dev',
      company: 'Test Co',
      requirements: { skills: ['React', 'Python'] },
      niceToHave: [],
      rawText: ''
    },
    promptType: 'summary'
  };

  it('generates a tailored summary', () => {
    const res = ApplicationAssistant.processRequest({ ...req, promptType: 'summary' });
    expect(res.success).toBe(true);
    expect(res.content).toContain('React');
    expect(res.content).toContain('Fullstack Dev');
  });

  it('generates resume suggestions', () => {
    const res = ApplicationAssistant.processRequest({ ...req, promptType: 'suggestion' });
    expect(res.success).toBe(true);
    expect(res.content).toContain('Python'); // Missing skill
  });
});
