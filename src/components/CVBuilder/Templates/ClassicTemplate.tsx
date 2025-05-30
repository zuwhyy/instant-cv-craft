import React from "react";
import { CVData } from "@/types/cv";

interface ClassicTemplateProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ cvData, setCVData }) => {
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
      [type]: value.split("•").map((skill) => skill.trim()),
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
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto font-serif print:shadow-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("fullName", e.currentTarget.textContent || "")} className="text-4xl font-bold mb-4 outline-none hover:bg-gray-100">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-gray-600 space-y-1">
          <p contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("address", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
            {personalInfo.address || "Your Address"}
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("phone", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
              {personalInfo.phone || "Your Phone"}
            </span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("email", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
              {personalInfo.email || "Your Email"}
            </span>
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            <span contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("linkedin", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
              {personalInfo.linkedin || "Your LinkedIn"}
            </span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => handlePersonalInfoChange("github", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
              {personalInfo.github || "Your GitHub"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="mb-8">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleSectionHeadingChange("profile", e.currentTarget.textContent || "")}
          className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
        >
          {cvData.sectionHeadings?.profile || "Profile"}
        </h2>
        <p contentEditable suppressContentEditableWarning onBlur={(e) => handleProfileSummaryChange(e.currentTarget.textContent || "")} className="text-gray-700 leading-relaxed text-center italic outline-none hover:bg-gray-100">
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
            className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
          >
            {cvData.sectionHeadings?.experience || "Professional Experience"}
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} className="mb-6 border-l-2 border-gray-300 pl-6">
              <div className="flex justify-between items-start mb-2">
                <h3 contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "position", e.currentTarget.textContent || "")} className="text-xl font-bold outline-none hover:bg-gray-100">
                  {exp.position}
                </h3>
                <div className="flex gap-2">
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "startDate", e.currentTarget.textContent || "")} className="text-gray-600 italic outline-none hover:bg-gray-100">
                    {exp.startDate}
                  </span>
                  <span> - </span>
                  <span contentEditable suppressContentEditableWarning onBlur={(e) => handleWorkExperienceChange(exp.id, "endDate", e.currentTarget.textContent || "")} className="text-gray-600 italic outline-none hover:bg-gray-100">
                    {exp.endDate}
                  </span>
                </div>
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleWorkExperienceChange(exp.id, "company", e.currentTarget.textContent || "")}
                className="text-lg text-gray-700 font-medium mb-3 outline-none hover:bg-gray-100"
              >
                {exp.company}
              </p>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleWorkExperienceChange(exp.id, "description", e.currentTarget.textContent || "")}
                className="text-gray-600 whitespace-pre-line leading-relaxed outline-none hover:bg-gray-100"
              >
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleSectionHeadingChange("education", e.currentTarget.textContent || "")}
            className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
          >
            {cvData.sectionHeadings?.education || "Education"}
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 border-l-2 border-gray-300 pl-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "degree", e.currentTarget.textContent || "")} className="text-xl font-bold outline-none hover:bg-gray-100">
                    {edu.degree}
                  </h3>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "institution", e.currentTarget.textContent || "")} className="text-gray-700 font-medium outline-none hover:bg-gray-100">
                    {edu.institution}
                  </p>
                </div>
                <div className="text-right text-gray-600">
                  <div className="flex gap-2">
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "startYear", e.currentTarget.textContent || "")} className="italic outline-none hover:bg-gray-100">
                      {edu.startYear}
                    </span>
                    <span> - </span>
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "endYear", e.currentTarget.textContent || "")} className="italic outline-none hover:bg-gray-100">
                      {edu.endYear}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p contentEditable suppressContentEditableWarning onBlur={(e) => handleEducationChange(edu.id, "gpa", e.currentTarget.textContent || "")} className="outline-none hover:bg-gray-100">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="mb-8">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleSectionHeadingChange("skills", e.currentTarget.textContent || "")}
          className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
        >
          {cvData.sectionHeadings?.skills || "Skills & Competencies"}
        </h2>
        {hardSkills.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Technical Skills</h3>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => handleSkillsChange("hardSkills", e.currentTarget.textContent || "")} className="text-gray-700 outline-none hover:bg-gray-100">
              {hardSkills.join(" • ")}
            </p>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2">Core Competencies</h3>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => handleSkillsChange("softSkills", e.currentTarget.textContent || "")} className="text-gray-700 outline-none hover:bg-gray-100">
              {softSkills.join(" • ")}
            </p>
          </div>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleSectionHeadingChange("projects", e.currentTarget.textContent || "")}
            className="text-2xl font-bold mb-4 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
          >
            {cvData.sectionHeadings?.projects || "Notable Projects"}
          </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("certifications", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.certifications || "Certifications"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("languages", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.languages || "Languages"}
              </h2>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("organizations", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.organizations || "Professional Activities"}
              </h2>
              {organizations.map((org) => (
                <div key={org.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{org.role}</h3>
                    <span className="text-gray-600 text-sm italic">
                      {org.startDate} - {org.endDate}
                    </span>
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
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleSectionHeadingChange("references", e.currentTarget.textContent || "")}
                className="text-xl font-bold mb-3 text-center border-b border-gray-200 pb-2 outline-none hover:bg-gray-100"
              >
                {cvData.sectionHeadings?.references || "References"}
              </h2>
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
