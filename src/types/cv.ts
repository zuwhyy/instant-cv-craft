
export interface PersonalInfo {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  achievements: string;
  demoLink?: string;
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  activities: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  contact: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  education: Education[];
  workExperience: WorkExperience[];
  hardSkills: string[];
  softSkills: string[];
  certifications: Certification[];
  projects: Project[];
  organizations: Organization[];
  languages: Language[];
  references: Reference[];
}

export type CVTemplate = 'minimal' | 'modern' | 'classic';
