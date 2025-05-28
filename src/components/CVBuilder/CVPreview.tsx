
import React from 'react';
import { CVData, CVTemplate } from '@/types/cv';
import { MinimalTemplate } from './Templates/MinimalTemplate';
import { ModernTemplate } from './Templates/ModernTemplate';
import { ClassicTemplate } from './Templates/ClassicTemplate';

interface CVPreviewProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  template: CVTemplate;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData, setCVData, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'minimal':
        return <MinimalTemplate cvData={cvData} setCVData={setCVData} />;
      case 'modern':
        return <ModernTemplate cvData={cvData} setCVData={setCVData} />;
      case 'classic':
        return <ClassicTemplate cvData={cvData} setCVData={setCVData} />;
      default:
        return <MinimalTemplate cvData={cvData} setCVData={setCVData} />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 p-6">
      <div id="cv-preview" className="max-w-4xl mx-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};
