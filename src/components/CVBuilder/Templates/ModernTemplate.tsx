
import React from 'react';
import { CVData } from '@/types/cv';

interface ModernTemplateProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ cvData }) => {
  const { personalInfo, profileSummary, education, workExperience, hardSkills, softSkills, certifications, projects, organizations, languages, references } = cvData;

  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto font-sans print:shadow-none">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 -m-8 mb-8 rounded-none">
        <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {personalInfo.address && <p>{personalInfo.address}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p>{personalInfo.github}</p>}
        </div>
      </div>

      {/* Profile Summary */}
      {profileSummary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Profile</h2>
          <p className="text-gray-700 leading-relaxed">{profileSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Experience</h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                <span className="text-blue-600 font-medium">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-lg text-blue-600 font-medium mb-3">{exp.company}</p>
              <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{edu.startYear} - {edu.endYear}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                  <p className="text-blue-600 font-medium mb-2">{project.role}</p>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  <p className="text-gray-700 text-sm">{project.achievements}</p>
                  {project.demoLink && <p className="text-blue-600 text-sm mt-1">Demo: {project.demoLink}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {(hardSkills.length > 0 || softSkills.length > 0) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Skills</h2>
              {hardSkills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{cert.name}</h3>
                    <span className="text-blue-600 text-sm">{cert.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between bg-gray-50 p-2 rounded">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-blue-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizations */}
          {organizations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">Activities</h2>
              {organizations.map((org) => (
                <div key={org.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800">{org.role}</h3>
                    <span className="text-blue-600 text-sm">{org.startDate} - {org.endDate}</span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-1">{org.name}</p>
                  <p className="text-gray-600 text-sm">{org.activities}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* References */}
      {references.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-200 pb-2">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">{ref.name}</p>
                <p className="text-blue-600 text-sm">{ref.position}</p>
                <p className="text-gray-600 text-sm">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
