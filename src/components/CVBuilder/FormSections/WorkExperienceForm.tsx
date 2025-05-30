
import React from 'react';
import { CVData, WorkExperience } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface WorkExperienceFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ cvData, setCVData }) => {
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setCVData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    setCVData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button onClick={addWorkExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.workExperience.map((experience) => (
          <div key={experience.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Work Experience Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeWorkExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                  placeholder="PT. Kumogakure"
                />
              </div>
              <div>
                <Label>Position Title</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateWorkExperience(experience.id, 'position', e.target.value)}
                  placeholder="Koruptor"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  value={experience.startDate}
                  onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                  placeholder="January 2020"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  value={experience.endDate}
                  onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => updateWorkExperience(experience.id, 'description', e.target.value)}
                placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 30%"
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}
        {cvData.workExperience.length === 0 && (
          <p className="text-gray-500 text-center py-4">No work experience entries added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
