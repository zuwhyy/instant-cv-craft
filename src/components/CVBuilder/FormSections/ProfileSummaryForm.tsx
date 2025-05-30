
import React from 'react';
import { CVData } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProfileSummaryFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ProfileSummaryForm: React.FC<ProfileSummaryFormProps> = ({ cvData, setCVData }) => {
  const updateProfileSummary = (value: string) => {
    setCVData(prev => ({
      ...prev,
      profileSummary: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="profileSummary">Summary</Label>
        <Textarea
          id="profileSummary"
          value={cvData.profileSummary}
          onChange={(e) => updateProfileSummary(e.target.value)}
          placeholder="Insya Allah akan terbuka 19 juta lapangan pekerjaan untuk generasi muda dan perempuan, 5 juta di anatranya adalah green jobs..."
          className="min-h-[100px]"
        />
      </CardContent>
    </Card>
  );
};
