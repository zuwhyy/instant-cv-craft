import React from "react";
import { CVData } from "@/types/cv";

interface ModernTemplateProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ cvData, setCVData }) => {
  const { personalInfo, profileSummary, education, workExperience, hardSkills, softSkills, certifications, projects, organizations, languages, references } = cvData;

  const handlePersonalInfoChange = (field: keyof typeof personalInfo, value: string) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleProfileSummaryChange = (value: string) => {
    setCVData((prev) => ({
      ...prev,
      profileSummary: value,
    }));
  };

  const handleWorkExperienceChange = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const handleSkillsChange = (type: "hardSkills" | "softSkills", value: string) => {
    setCVData((prev) => ({
      ...prev,
      [type]: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const handleSectionHeadingChange = (section: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      sectionHeadings: {
        ...prev.sectionHeadings,
        [section]: value,
      },
    }));
  };

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto font-sans print:shadow-none">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 -m-8 mb-8 rounded-none">
        <h1 contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("fullName", e.currentTarget.textContent || "")} className="text-4xl font-bold mb-3 outline-none hover:bg-blue-500">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("address", e.currentTarget.textContent || "")} className="outline-none hover:bg-blue-500">
            {personalInfo.address || "Your Address"}
          </p>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("phone", e.currentTarget.textContent || "")} className="outline-none hover:bg-blue-500">
            {personalInfo.phone || "Your Phone"}
          </p>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("email", e.currentTarget.textContent || "")} className="outline-none hover:bg-blue-500">
            {personalInfo.email || "Your Email"}
          </p>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("linkedin", e.currentTarget.textContent || "")} className="outline-none hover:bg-blue-500">
            {personalInfo.linkedin || "Your LinkedIn"}
          </p>
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("github", e.currentTarget.textContent || "")} className="outline-none hover:bg-blue-500">
            {personalInfo.github || "Your GitHub"}
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="mb-8">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleSectionHeadingChange("profile", e.currentTarget.textContent || "")}
          className="text-2xl font-bold mb-4 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
        >
          {cvData.sectionHeadings?.profile || "Profile"}
        </h2>
        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleProfileSummaryChange(e.currentTarget.textContent || "")} className="text-gray-700 leading-relaxed text-center outline-none hover:bg-gray-100">
          {profileSummary || "Your profile summary"}
        </p>
      </div>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleSectionHeadingChange("experience", e.currentTarget.textContent || "")}
            className="text-2xl font-bold mb-4 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
          >
            {cvData.sectionHeadings?.experience || "Professional Experience"}
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "position", e.currentTarget.textContent || "")} className="text-xl font-bold text-gray-800 outline-none hover:bg-gray-200">
                  {exp.position}
                </h3>
                <div className="flex gap-2">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "startDate", e.currentTarget.textContent || "")} className="text-blue-600 font-medium outline-none hover:bg-gray-200">
                    {exp.startDate}
                  </span>
                  <span> - </span>
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "endDate", e.currentTarget.textContent || "")} className="text-blue-600 font-medium outline-none hover:bg-gray-200">
                    {exp.endDate}
                  </span>
                </div>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleWorkExperienceChange(exp.id, "company", e.currentTarget.textContent || "")}
                className="text-lg text-blue-600 font-medium mb-3 outline-none hover:bg-gray-200"
              >
                {exp.company}
              </p>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleWorkExperienceChange(exp.id, "description", e.currentTarget.textContent || "")}
                className="text-gray-700 whitespace-pre-line outline-none hover:bg-gray-200"
              >
                {exp.description}
              </div>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("education", e.currentTarget.textContent || "")}
                className="text-2xl font-bold mb-4 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.education || "Education"}
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h3 contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "degree", e.currentTarget.textContent || "")} className="text-lg font-bold text-gray-800 outline-none hover:bg-gray-200">
                    {edu.degree}
                  </h3>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "institution", e.currentTarget.textContent || "")} className="text-blue-600 font-medium outline-none hover:bg-gray-200">
                    {edu.institution}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <div className="flex gap-2">
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "startYear", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-200">
                        {edu.startYear}
                      </span>
                      <span> - </span>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "endYear", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-200">
                        {edu.endYear}
                      </span>
                    </div>
                    {edu.gpa && (
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "gpa", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-200">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("projects", e.currentTarget.textContent || "")}
                className="text-2xl font-bold mb-4 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.projects || "Notable Projects"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("skills", e.currentTarget.textContent || "")}
                className="text-2xl font-bold mb-4 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.skills || "Skills & Competencies"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("certifications", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.certifications || "Certifications"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("languages", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.languages || "Languages"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("organizations", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.organizations || "Professional Activities"}
              </h2>
              {organizations.map((org) => (
                <div key={org.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800">{org.role}</h3>
                    <span className="text-blue-600 text-sm">
                      {org.startDate} - {org.endDate}
                    </span>
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
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleSectionHeadingChange("references", e.currentTarget.textContent || "")}
            className="text-xl font-bold mb-3 text-center border-b-2 border-blue-500 pb-2 outline-none hover:bg-gray-100"
          >
            {cvData.sectionHeadings?.references || "References"}
          </h2>
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
