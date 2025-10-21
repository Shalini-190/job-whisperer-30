import { ResumeProfile, ParsingResult, ExperienceItem, EducationItem } from './types';
import { logger } from '../logger';

// Very basic heuristic extraction. In production, this might be replaced or augmented by an LLM call.
export class ResumeExtractor {
  
  static extractEmail(text: string): string {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const match = emailRegex.exec(text);
    return match ? match[1] : '';
  }

  static extractPhone(text: string): string {
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const match = phoneRegex.exec(text);
    return match ? match[0] : '';
  }

  static extractSkills(text: string): string[] {
    const commonSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'NoSQL', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS'];
    const foundSkills = new Set<string>();
    
    commonSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'gi');
      if (regex.test(text)) {
        foundSkills.add(skill);
      }
    });

    return Array.from(foundSkills);
  }

  static parse(text: string): ParsingResult {
    try {
      logger.info('Starting resume text extraction');
      
      const email = this.extractEmail(text);
      const phone = this.extractPhone(text);
      const skills = this.extractSkills(text);

      // Constructing a structured profile based on heuristics
      const profile: ResumeProfile = {
        basics: {
          name: "Extracted Candidate", // Usually requires complex NER to extract properly without LLM
          email,
          phone,
        },
        experience: [],
        education: [],
        skills,
        projects: []
      };

      return {
        success: true,
        profile,
        rawText: text
      };
    } catch (error: any) {
      logger.error('Failed to parse resume text', error);
      return {
        success: false,
        error: error.message || 'Unknown error occurred during parsing'
      };
    }
  }
}
