
import React, { useState, useEffect } from 'react';
import { CVData, CVTemplate } from '@/types/cv';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Download, Eye, FileText } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    github: ''
  },
  profileSummary: '',
  education: [],
  workExperience: [],
  hardSkills: [],
  softSkills: [],
  certifications: [],
  projects: [],
  organizations: [],
  languages: [],
  references: []
};

export const CVBuilder: React.FC = () => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [template, setTemplate] = useState<CVTemplate>('minimal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      setCVData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const downloadPDF = () => {
    const element = document.getElementById('cv-preview');
    if (element) {
      const opt = {
        margin: 0.5,
        filename: `${cvData.personalInfo.fullName || 'CV'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const MobileHeader = () => (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-b p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">CV Builder</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button onClick={downloadPDF} size="sm">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'form' ? 'default' : 'outline'}
          onClick={() => setActiveTab('form')}
          className="flex-1"
        >
          <FileText className="h-4 w-4 mr-2" />
          Form
        </Button>
        <Button
          variant={activeTab === 'preview' ? 'default' : 'outline'}
          onClick={() => setActiveTab('preview')}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );

  const DesktopHeader = () => (
    <div className="hidden lg:flex bg-white dark:bg-gray-900 border-b p-4 items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold">CV Builder</h1>
      <div className="flex items-center gap-4">
        <Select value={template} onValueChange={(value: CVTemplate) => setTemplate(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minimal">Minimal Professional</SelectItem>
            <SelectItem value="modern">Modern Highlight</SelectItem>
            <SelectItem value="classic">Classic Academic</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button onClick={downloadPDF}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <MobileHeader />
      <DesktopHeader />
      
      <div className="lg:flex lg:h-[calc(100vh-73px)]">
        {/* Form Section */}
        <div className={`lg:w-2/5 lg:border-r ${isMobile && activeTab !== 'form' ? 'hidden' : ''}`}>
          <CVForm cvData={cvData} setCVData={setCVData} />
        </div>

        {/* Preview Section */}
        <div className={`lg:w-3/5 ${isMobile && activeTab !== 'preview' ? 'hidden' : ''}`}>
          <CVPreview cvData={cvData} setCVData={setCVData} template={template} />
        </div>
      </div>
    </div>
  );
};
