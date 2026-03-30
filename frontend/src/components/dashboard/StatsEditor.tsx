import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Calendar, FolderCheck, Users, Coffee } from "lucide-react";
import type { Stats } from "@/types/dashboard";

interface StatsEditorProps {
  stats: Stats;
  onChange: (stats: Stats) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const StatsEditor = ({ stats, onChange, onSave, isSaving }: StatsEditorProps) => {
  const updateStat = (field: keyof Stats, value: number) => {
    onChange({ ...stats, [field]: value });
  };

  const statCards = [
    {
      key: "yearsOfExperience" as keyof Stats,
      label: "Years of Experience",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      key: "projectsCompleted" as keyof Stats,
      label: "Projects Completed",
      icon: FolderCheck,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      key: "happyClients" as keyof Stats,
      label: "Happy Clients",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      key: "coffeeConsumed" as keyof Stats,
      label: "Coffee Consumed",
      icon: Coffee,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, bgColor }) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${bgColor}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor={key} className="text-sm text-muted-foreground">
                {label}
              </Label>
              <Input
                id={key}
                type="number"
                min="0"
                value={stats[key]}
                onChange={(e) => updateStat(key, parseInt(e.target.value) || 0)}
                className="mt-2 text-2xl font-bold h-14 text-center"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onSave} disabled={isSaving} className="w-full sm:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Stats"}
      </Button>
    </div>
  );
};

export default StatsEditor;
