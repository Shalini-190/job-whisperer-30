export interface JobDescription {
  id?: string;
  url?: string;
  title: string;
  company: string;
  location?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  requirements: {
    skills: string[];
    experienceYears?: number;
    education?: string;
  };
  niceToHave: string[];
  rawText: string;
}

export interface JobParseResult {
  success: boolean;
  job?: JobDescription;
  error?: string;
  warnings?: string[];
}
