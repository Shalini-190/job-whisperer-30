import { ResumeProfile } from '../resume-parser';
import { JobDescription } from '../job-parser';

export interface MatchScore {
  overall: number; // 0-100
  skillsScore: number;
  experienceScore: number;
}

export interface MatchResult {
  score: MatchScore;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string[];
}
