
import React from 'react';
import { CVData, Project } from '@/types/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ cvData, setCVData }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      role: '',
      achievements: '',
      demoLink: ''
    };
    setCVData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setCVData(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setCVData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.projects.map((project) => (
          <div key={project.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Project Entry</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  placeholder="E-commerce Web Application"
                />
              </div>
              <div>
                <Label>Your Role</Label>
                <Input
                  value={project.role}
                  onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                  placeholder="Full Stack Developer"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Brief description of the project and technologies used..."
              />
            </div>
            <div>
              <Label>Achievements</Label>
              <Textarea
                value={project.achievements}
                onChange={(e) => updateProject(project.id, 'achievements', e.target.value)}
                placeholder="Key achievements and outcomes..."
              />
            </div>
            <div>
              <Label>Demo Link (Optional)</Label>
              <Input
                value={project.demoLink}
                onChange={(e) => updateProject(project.id, 'demoLink', e.target.value)}
                placeholder="https://project-demo.com"
              />
            </div>
          </div>
        ))}
        {cvData.projects.length === 0 && (
          <p className="text-gray-500 text-center py-4">No projects added yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
