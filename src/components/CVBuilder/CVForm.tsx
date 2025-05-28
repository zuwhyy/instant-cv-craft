
import React from 'react';
import { CVData } from '@/types/cv';
import { PersonalInfoForm } from './FormSections/PersonalInfoForm';
import { ProfileSummaryForm } from './FormSections/ProfileSummaryForm';
import { EducationForm } from './FormSections/EducationForm';
import { WorkExperienceForm } from './FormSections/WorkExperienceForm';
import { SkillsForm } from './FormSections/SkillsForm';
import { CertificationsForm } from './FormSections/CertificationsForm';
import { ProjectsForm } from './FormSections/ProjectsForm';
import { OrganizationsForm } from './FormSections/OrganizationsForm';
import { LanguagesForm } from './FormSections/LanguagesForm';
import { ReferencesForm } from './FormSections/ReferencesForm';

interface CVFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const CVForm: React.FC<CVFormProps> = ({ cvData, setCVData }) => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <PersonalInfoForm cvData={cvData} setCVData={setCVData} />
      <ProfileSummaryForm cvData={cvData} setCVData={setCVData} />
      <EducationForm cvData={cvData} setCVData={setCVData} />
      <WorkExperienceForm cvData={cvData} setCVData={setCVData} />
      <SkillsForm cvData={cvData} setCVData={setCVData} />
      <CertificationsForm cvData={cvData} setCVData={setCVData} />
      <ProjectsForm cvData={cvData} setCVData={setCVData} />
      <OrganizationsForm cvData={cvData} setCVData={setCVData} />
      <LanguagesForm cvData={cvData} setCVData={setCVData} />
      <ReferencesForm cvData={cvData} setCVData={setCVData} />
    </div>
  );
};
