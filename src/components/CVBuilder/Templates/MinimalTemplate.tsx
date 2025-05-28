
import React from 'react';
import { CVData } from '@/types/cv';

interface MinimalTemplateProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ cvData }) => {
  const { personalInfo, profileSummary, education, workExperience, hardSkills, softSkills, certifications, projects, organizations, languages, references } = cvData;

  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-mono print:shadow-none">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm space-y-1">
          {personalInfo.address && <p>{personalInfo.address}</p>}
          <div className="flex justify-center gap-4 flex-wrap">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">PROFILE</h2>
          <p className="text-sm leading-relaxed">{profileSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">EXPERIENCE</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="font-medium mb-2">{exp.company}</p>
              <div className="text-sm whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm">{edu.institution}</p>
                </div>
                <div className="text-right text-sm">
                  <p>{edu.startYear} - {edu.endYear}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(hardSkills.length > 0 || softSkills.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">SKILLS</h2>
          {hardSkills.length > 0 && (
            <div className="mb-2">
              <span className="font-bold">Technical: </span>
              <span className="text-sm">{hardSkills.join(', ')}</span>
            </div>
          )}
          {softSkills.length > 0 && (
            <div>
              <span className="font-bold">Soft Skills: </span>
              <span className="text-sm">{softSkills.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">PROJECTS</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm italic mb-1">{project.role}</p>
              <p className="text-sm mb-1">{project.description}</p>
              <p className="text-sm">{project.achievements}</p>
              {project.demoLink && <p className="text-sm">Demo: {project.demoLink}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">CERTIFICATIONS</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{cert.name}</span>
                <span className="text-sm">{cert.date}</span>
              </div>
              <p className="text-sm">{cert.issuer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">LANGUAGES</h2>
          <div className="text-sm">
            {languages.map((lang) => (
              <span key={lang.id} className="mr-4">
                {lang.name} ({lang.proficiency})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Organizations */}
      {organizations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">ACTIVITIES</h2>
          {organizations.map((org) => (
            <div key={org.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{org.role} - {org.name}</h3>
                <span className="text-sm">{org.startDate} - {org.endDate}</span>
              </div>
              <p className="text-sm">{org.activities}</p>
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-black pb-1">REFERENCES</h2>
          {references.map((ref) => (
            <div key={ref.id} className="mb-2">
              <p className="font-bold">{ref.name}</p>
              <p className="text-sm">{ref.position}</p>
              <p className="text-sm">{ref.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
