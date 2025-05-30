
import React from 'react';
import { CVData, Education } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const EducationForm: React.FC<EducationFormProps> = ({ cvData, setCVData }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      startYear: '',
      endYear: '',
      gpa: ''
    };
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.education.map((education) => (
          <div key={education.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Education Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution Name</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="Institut Teknologi Peternakan Lele"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="fakultas teknologi kayu (FAKYU)"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Start Year</Label>
                <Input
                  value={education.startYear}
                  onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
                  placeholder="2018"
                />
              </div>
              <div>
                <Label>End Year</Label>
                <Input
                  value={education.endYear}
                  onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                  placeholder="2022"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="2.3"
                />
              </div>
            </div>
          </div>
        ))}
        {cvData.education.length === 0 && (
          <p className="text-gray-500 text-center py-4">No education entries added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
