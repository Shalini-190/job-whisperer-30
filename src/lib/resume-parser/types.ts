export interface ResumeProfile {
  id?: string;
  basics: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface ParsingResult {
  success: boolean;
  profile?: ResumeProfile;
  error?: string;
  warnings?: string[];
  rawText?: string;
}
