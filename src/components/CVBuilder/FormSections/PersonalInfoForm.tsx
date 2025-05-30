
import React from 'react';
import { CVData } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInfoFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ cvData, setCVData }) => {
  const updatePersonalInfo = (field: keyof typeof cvData.personalInfo, value: string) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={cvData.personalInfo.fullName} onChange={(e) => updatePersonalInfo("fullName", e.target.value)} placeholder="Fufufafa" />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" value={cvData.personalInfo.address} onChange={(e) => updatePersonalInfo("address", e.target.value)} placeholder="saya akan pergi ke solo menjadi rakyat biasa" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" value={cvData.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} placeholder="+6281117042207" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={cvData.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} placeholder="fufufafa@gmail.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" type="url" value={cvData.personalInfo.linkedin} onChange={(e) => updatePersonalInfo("linkedin", e.target.value)} placeholder="https://linkedin.com/in/fufufafa" />
          </div>
          <div>
            <Label htmlFor="github">GitHub / Website</Label>
            <Input id="github" type="url" value={cvData.personalInfo.github} onChange={(e) => updatePersonalInfo("github", e.target.value)} placeholder="https://github.com/fufufafa" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
