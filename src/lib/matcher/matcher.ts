import { ResumeProfile } from '../resume-parser';
import { JobDescription } from '../job-parser';
import { MatchResult } from './types';

export class ResumeMatcher {
  static analyzeSkills(resume: ResumeProfile, job: JobDescription) {
    const resumeSkills = new Set(resume.skills.map(s => s.toLowerCase()));
    const jobSkills = new Set(job.requirements.skills.map(s => s.toLowerCase()));

    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    jobSkills.forEach(skill => {
      if (resumeSkills.has(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    return { matchedSkills, missingSkills };
  }

  static calculateExperienceScore(resume: ResumeProfile, job: JobDescription): number {
    const requiredExp = job.requirements.experienceYears || 0;
    if (requiredExp === 0) return 100;

    // Simple heuristic: count all experience item years (assuming 1 year per item for this naive heuristic)
    // In reality, this requires parsing start/end dates.
    const candidateExp = resume.experience.length; 
    
    if (candidateExp >= requiredExp) return 100;
    
    return Math.round((candidateExp / requiredExp) * 100);
  }

  static match(resume: ResumeProfile, job: JobDescription): MatchResult {
    const { matchedSkills, missingSkills } = this.analyzeSkills(resume, job);
    
    const totalJobSkills = matchedSkills.length + missingSkills.length;
    let skillsScore = 100;
    
    if (totalJobSkills > 0) {
      skillsScore = Math.round((matchedSkills.length / totalJobSkills) * 100);
    }

    const experienceScore = this.calculateExperienceScore(resume, job);

    const overall = Math.round((skillsScore * 0.7) + (experienceScore * 0.3));

    const explanation = [
      \`Matched \${matchedSkills.length} out of \${totalJobSkills} required skills.\`,
      missingSkills.length > 0 ? \`Missing critical skills: \${missingSkills.join(', ')}.\` : 'All required skills are present.',
      \`Experience matches \${experienceScore}% of the requirements.\`
    ];

    return {
      score: {
        overall,
        skillsScore,
        experienceScore
      },
      matchedSkills,
      missingSkills,
      explanation
    };
  }
}
