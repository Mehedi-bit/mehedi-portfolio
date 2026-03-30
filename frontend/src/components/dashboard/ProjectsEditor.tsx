import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, GripVertical, ExternalLink, Github, FolderKanban } from "lucide-react";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
import type { Project } from "@/types/dashboard";

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  isSaving?: boolean;
}

const emptyProject: Project = {
  title: "",
  description: "",
  techs: [],
  github: "",
  liveLink: "",
  image: { url: "", public_id: "" },
  order: 0,
};

const ProjectsEditor = ({ projects, onChange, onSave, onDelete, isSaving }: ProjectsEditorProps) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject({ ...emptyProject, order: projects.length });
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setIsCreating(false);
    setEditingProject({ ...project });
    setIsDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (isCreating) {
      onChange([...projects, { ...editingProject, _id: `temp_${Date.now()}` }]);
    } else {
      onChange(
        projects.map((p) =>
          p._id === editingProject._id ? editingProject : p
        )
      );
    }
    setIsDialogOpen(false);
    setEditingProject(null);
    onSave();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onDelete(id);
    }
  };

  const updateEditingProject = (field: keyof Project, value: Project[keyof Project]) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, [field]: value });
  };

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          <p className="text-muted-foreground">Add, edit, or remove portfolio projects</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects List */}
      {sortedProjects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first project to showcase your work.
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedProjects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Drag Handle */}
                  <div className="flex items-center px-3 bg-muted/50 cursor-grab">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  {/* Image Preview */}
                  <div className="w-32 h-24 bg-muted flex-shrink-0">
                    {project.image.url ? (
                      <img
                        src={project.image.url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderKanban className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{project.title || "Untitled"}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            #{project.order}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {project.description || "No description"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.techs.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techs.length > 4 && (
                            <span className="text-xs text-muted-foreground">
                              +{project.techs.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.liveLink && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button variant="ghost" size="icon" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(project._id!)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create Project" : "Edit Project"}</DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Add a new project to your portfolio"
                : "Update project details"}
            </DialogDescription>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Title *</Label>
                <Input
                  id="project-title"
                  value={editingProject.title}
                  onChange={(e) => updateEditingProject("title", e.target.value)}
                  placeholder="Project name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={editingProject.description}
                  onChange={(e) => updateEditingProject("description", e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <TagInput
                  tags={editingProject.techs}
                  onChange={(tags) => updateEditingProject("techs", tags)}
                  placeholder="Add technology..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-github">GitHub URL</Label>
                  <Input
                    id="project-github"
                    value={editingProject.github}
                    onChange={(e) => updateEditingProject("github", e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-live">Live Link</Label>
                  <Input
                    id="project-live"
                    value={editingProject.liveLink}
                    onChange={(e) => updateEditingProject("liveLink", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-order">Order</Label>
                <Input
                  id="project-order"
                  type="number"
                  min="0"
                  value={editingProject.order}
                  onChange={(e) => updateEditingProject("order", parseInt(e.target.value) || 0)}
                />
              </div>

              <ImageUpload
                label="Project Image"
                value={editingProject.image}
                onChange={(data) => updateEditingProject("image", data)}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProject} disabled={!editingProject.title}>
                  {isCreating ? "Create Project" : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsEditor;
