import { ResumeProfile } from '../resume-parser';
import { JobDescription } from '../job-parser';

export interface AssistantRequest {
  resume: ResumeProfile;
  job: JobDescription;
  promptType: 'summary' | 'suggestion' | 'qa';
  question?: string;
}

export interface AssistantResponse {
  success: boolean;
  content: string;
  confidenceScore: number;
  sources: string[];
  error?: string;
}
