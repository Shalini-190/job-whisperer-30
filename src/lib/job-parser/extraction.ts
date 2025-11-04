import { JobDescription, JobParseResult } from './types';
import { logger } from '../logger';

export class JobExtractor {
  
  static extractTitle(text: string): string {
    const titleRegex = /(?:Title|Role|Position):\s*([^\n]+)/i;
    const match = titleRegex.exec(text);
    return match ? match[1].trim() : 'Unknown Position';
  }

  static extractCompany(text: string): string {
    const companyRegex = /(?:Company|Employer):\s*([^\n]+)/i;
    const match = companyRegex.exec(text);
    return match ? match[1].trim() : 'Unknown Company';
  }

  static extractSkills(text: string): string[] {
    const commonSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'NoSQL', 'AWS', 'Docker', 'Kubernetes', 'HTML', 'CSS', 'GraphQL', 'REST', 'Go', 'Rust'];
    const foundSkills = new Set<string>();
    
    commonSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'gi');
      if (regex.test(text)) {
        foundSkills.add(skill);
      }
    });

    return Array.from(foundSkills);
  }
  
  static extractExperienceYears(text: string): number | undefined {
    const expRegex = /(\d+)\+?\s*(?:years?|yrs?)\s+(?:of\s+)?(?:experience|exp)/i;
    const match = expRegex.exec(text);
    return match ? parseInt(match[1], 10) : undefined;
  }

  static parse(text: string, url?: string): JobParseResult {
    try {
      logger.info('Starting job text extraction');
      
      const title = this.extractTitle(text);
      const company = this.extractCompany(text);
      const skills = this.extractSkills(text);
      const exp = this.extractExperienceYears(text);

      const job: JobDescription = {
        url,
        title,
        company,
        requirements: {
          skills,
          experienceYears: exp
        },
        niceToHave: [],
        rawText: text
      };

      return {
        success: true,
        job
      };
    } catch (error: any) {
      logger.error('Failed to parse job description text', error);
      return {
        success: false,
        error: error.message || 'Unknown error occurred during parsing'
      };
    }
  }
}
