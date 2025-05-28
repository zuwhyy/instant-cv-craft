
import React from 'react';
import { CVData } from '@/types/cv';

interface ClassicTemplateProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ cvData }) => {
  const { personalInfo, profileSummary, education, workExperience, hardSkills, softSkills, certifications, projects, organizations, languages, references } = cvData;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto font-serif print:shadow-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-gray-600 space-y-1">
          {personalInfo.address && <p>{personalInfo.address}</p>}
          <div className="flex justify-center gap-6 flex-wrap">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2">Profile</h2>
          <p className="text-gray-700 leading-relaxed text-center italic">{profileSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2">Professional Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-6 border-l-2 border-gray-300 pl-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <span className="text-gray-600 italic">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-lg text-gray-700 font-medium mb-3">{exp.company}</p>
              <div className="text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 border-l-2 border-gray-300 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-700 font-medium">{edu.institution}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="italic">{edu.startYear} - {edu.endYear}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(hardSkills.length > 0 || softSkills.length > 0) && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2">Skills & Competencies</h2>
          {hardSkills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Technical Skills</h3>
              <p className="text-gray-700">{hardSkills.join(' • ')}</p>
            </div>
          )}
          {softSkills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-2">Core Competencies</h3>
              <p className="text-gray-700">{softSkills.join(' • ')}</p>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2">Notable Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4 border-l-2 border-gray-300 pl-6">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-700 font-medium italic mb-2">{project.role}</p>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-gray-600">{project.achievements}</p>
              {project.demoLink && <p className="text-gray-600 mt-1">Available at: {project.demoLink}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{cert.name}</h3>
                    <span className="text-gray-600 text-sm italic">{cert.date}</span>
                  </div>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-600 italic">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Organizations */}
          {organizations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2">Professional Activities</h2>
              {organizations.map((org) => (
                <div key={org.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{org.role}</h3>
                    <span className="text-gray-600 text-sm italic">{org.startDate} - {org.endDate}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">{org.name}</p>
                  <p className="text-gray-600 text-sm">{org.activities}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2">References</h2>
              {references.map((ref) => (
                <div key={ref.id} className="mb-3">
                  <p className="font-bold">{ref.name}</p>
                  <p className="text-gray-700 italic">{ref.position}</p>
                  <p className="text-gray-600 text-sm">{ref.contact}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
