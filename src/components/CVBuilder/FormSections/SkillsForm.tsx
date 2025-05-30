
import React, { useState } from 'react';
import { CVData } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface SkillsFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ cvData, setCVData }) => {
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addHardSkill = () => {
    if (newHardSkill.trim() && !cvData.hardSkills.includes(newHardSkill.trim())) {
      setCVData(prev => ({
        ...prev,
        hardSkills: [...prev.hardSkills, newHardSkill.trim()]
      }));
      setNewHardSkill('');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !cvData.softSkills.includes(newSoftSkill.trim())) {
      setCVData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills, newSoftSkill.trim()]
      }));
      setNewSoftSkill('');
    }
  };

  const removeHardSkill = (skill: string) => {
    setCVData(prev => ({
      ...prev,
      hardSkills: prev.hardSkills.filter(s => s !== skill)
    }));
  };

  const removeSoftSkill = (skill: string) => {
    setCVData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter(s => s !== skill)
    }));
  };

  const handleHardSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHardSkill();
    }
  };

  const handleSoftSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSoftSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Hard Skills</Label>
          <div className="flex gap-2 mt-2 mb-3">
            <Input
              value={newHardSkill}
              onChange={(e) => setNewHardSkill(e.target.value)}
              onKeyPress={handleHardSkillKeyPress}
              placeholder="e.g., Mancing, Main Game, Main Tiktok"
              className="flex-1"
            />
            <Button onClick={addHardSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.hardSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeHardSkill(skill)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Soft Skills</Label>
          <div className="flex gap-2 mt-2 mb-3">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={handleSoftSkillKeyPress}
              placeholder="e.g., Soft Spoken, Soft Listening, Communication Less"
              className="flex-1"
            />
            <Button onClick={addSoftSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.softSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSoftSkill(skill)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
