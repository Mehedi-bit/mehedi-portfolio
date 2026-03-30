import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Monitor, Server, Wrench } from "lucide-react";
import TagInput from "./TagInput";
import type { Skillset } from "@/types/dashboard";

interface SkillsetEditorProps {
  skillset: Skillset;
  onChange: (skillset: Skillset) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const SkillsetEditor = ({ skillset, onChange, onSave, isSaving }: SkillsetEditorProps) => {
  const updateCategory = (category: keyof Skillset, skills: string[]) => {
    onChange({ ...skillset, [category]: skills });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Frontend */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-500/10">
                <Monitor className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Frontend</CardTitle>
                <CardDescription>UI frameworks & libraries</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TagInput
              tags={skillset.frontend}
              onChange={(tags) => updateCategory("frontend", tags)}
              placeholder="Add frontend skill..."
            />
          </CardContent>
        </Card>

        {/* Backend */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-500/10">
                <Server className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Backend</CardTitle>
                <CardDescription>Server & database</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TagInput
              tags={skillset.backend}
              onChange={(tags) => updateCategory("backend", tags)}
              placeholder="Add backend skill..."
            />
          </CardContent>
        </Card>

        {/* Tools */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-orange-500/10">
                <Wrench className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Tools</CardTitle>
                <CardDescription>DevOps & utilities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TagInput
              tags={skillset.tools}
              onChange={(tags) => updateCategory("tools", tags)}
              placeholder="Add tool..."
            />
          </CardContent>
        </Card>
      </div>

      <Button onClick={onSave} disabled={isSaving} className="w-full sm:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Skillset"}
      </Button>
    </div>
  );
};

export default SkillsetEditor;
