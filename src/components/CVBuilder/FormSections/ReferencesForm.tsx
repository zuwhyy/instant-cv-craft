
import React from 'react';
import { CVData, Reference } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ReferencesFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ cvData, setCVData }) => {
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      contact: ''
    };
    setCVData(prev => ({
      ...prev,
      references: [...prev.references, newReference]
    }));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setCVData(prev => ({
      ...prev,
      references: prev.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setCVData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>References</CardTitle>
        <Button onClick={addReference} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Reference
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.references.map((reference) => (
          <div key={reference.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Reference Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeReference(reference.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={reference.name}
                  onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={reference.position}
                  onChange={(e) => updateReference(reference.id, 'position', e.target.value)}
                  placeholder="Senior Manager at ABC Corp"
                />
              </div>
            </div>
            <div>
              <Label>Contact (Email or Phone)</Label>
              <Input
                value={reference.contact}
                onChange={(e) => updateReference(reference.id, 'contact', e.target.value)}
                placeholder="jane.smith@example.com or +1 (555) 123-4567"
              />
            </div>
          </div>
        ))}
        {cvData.references.length === 0 && (
          <p className="text-gray-500 text-center py-4">No references added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
