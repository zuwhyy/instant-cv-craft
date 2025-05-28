
import React from 'react';
import { CVData, Certification } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ cvData, setCVData }) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    setCVData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCVData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setCVData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certifications</CardTitle>
        <Button onClick={addCertification} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.certifications.map((certification) => (
          <div key={certification.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Certification Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeCertification(certification.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Certificate Name</Label>
                <Input
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label>Issuer</Label>
                <Input
                  value={certification.issuer}
                  onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>
            <div>
              <Label>Date Obtained</Label>
              <Input
                value={certification.date}
                onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                placeholder="March 2023"
              />
            </div>
          </div>
        ))}
        {cvData.certifications.length === 0 && (
          <p className="text-gray-500 text-center py-4">No certifications added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
