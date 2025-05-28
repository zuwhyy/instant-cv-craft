
import React from 'react';
import { CVData, Organization } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface OrganizationsFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const OrganizationsForm: React.FC<OrganizationsFormProps> = ({ cvData, setCVData }) => {
  const addOrganization = () => {
    const newOrganization: Organization = {
      id: Date.now().toString(),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      activities: ''
    };
    setCVData(prev => ({
      ...prev,
      organizations: [...prev.organizations, newOrganization]
    }));
  };

  const updateOrganization = (id: string, field: keyof Organization, value: string) => {
    setCVData(prev => ({
      ...prev,
      organizations: prev.organizations.map(org =>
        org.id === id ? { ...org, [field]: value } : org
      )
    }));
  };

  const removeOrganization = (id: string) => {
    setCVData(prev => ({
      ...prev,
      organizations: prev.organizations.filter(org => org.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organizations / Extracurriculars</CardTitle>
        <Button onClick={addOrganization} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Organization
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.organizations.map((organization) => (
          <div key={organization.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Organization Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeOrganization(organization.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Organization Name</Label>
                <Input
                  value={organization.name}
                  onChange={(e) => updateOrganization(organization.id, 'name', e.target.value)}
                  placeholder="Tech Community Group"
                />
              </div>
              <div>
                <Label>Role/Position</Label>
                <Input
                  value={organization.role}
                  onChange={(e) => updateOrganization(organization.id, 'role', e.target.value)}
                  placeholder="Vice President"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  value={organization.startDate}
                  onChange={(e) => updateOrganization(organization.id, 'startDate', e.target.value)}
                  placeholder="January 2020"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  value={organization.endDate}
                  onChange={(e) => updateOrganization(organization.id, 'endDate', e.target.value)}
                  placeholder="December 2022"
                />
              </div>
            </div>
            <div>
              <Label>Activities/Achievements</Label>
              <Textarea
                value={organization.activities}
                onChange={(e) => updateOrganization(organization.id, 'activities', e.target.value)}
                placeholder="Describe your activities and achievements in this organization..."
              />
            </div>
          </div>
        ))}
        {cvData.organizations.length === 0 && (
          <p className="text-gray-500 text-center py-4">No organizations added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
