import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  LogOut, 
  Settings,
  Code,
  BarChart3,
  FolderKanban,
  CalendarClock,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types
import type { 
  Settings as SettingsType, 
  Skillset, 
  Stats, 
  Project, 
  ProjectSlotRequest, 
  ContactMessage 
} from "@/types/dashboard";

// Dashboard Components
import SettingsEditor from "@/components/dashboard/SettingsEditor";
import SkillsetEditor from "@/components/dashboard/SkillsetEditor";
import StatsEditor from "@/components/dashboard/StatsEditor";
import ProjectsEditor from "@/components/dashboard/ProjectsEditor";
import SlotRequestsTable from "@/components/dashboard/SlotRequestsTable";
import ContactMessagesTable from "@/components/dashboard/ContactMessagesTable";

// Default initial states matching backend models
const defaultSettings: SettingsType = {
  adminInfo: {
    name: "",
    username: "",
    image: { url: "", public_id: "" },
    github: "",
    linkedin: "",
    facebook: "",
    email: "",
    phone: "",
    whatsapp: "",
  },
  heroSection: {
    title: "",
    description: "",
  },
  aboutSection: {
    title: "",
    description: "",
    image: { url: "", public_id: "" },
  },
  contactPitch: {
    title: "",
    description: "",
    email: "",
    phone: "",
    location: "",
  },
  footer: {
    year: new Date().getFullYear().toString(),
    facebook: "",
    github: "",
    linkedin: "",
    email: "",
    phone: "",
    whatsapp: "",
  },
};

const defaultSkillset: Skillset = {
  frontend: [],
  backend: [],
  tools: [],
};

const defaultStats: Stats = {
  yearsOfExperience: 0,
  projectsCompleted: 0,
  happyClients: 0,
  coffeeConsumed: 0,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for all sections
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [skillset, setSkillset] = useState<Skillset>(defaultSkillset);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [projects, setProjects] = useState<Project[]>([]);
  const [slotRequests, setSlotRequests] = useState<ProjectSlotRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Loading states
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingSkillset, setIsSavingSkillset] = useState(false);
  const [isSavingStats, setIsSavingStats] = useState(false);
  const [isSavingProjects, setIsSavingProjects] = useState(false);

  const handleLogout = () => {
    // TODO: Replace with actual logout API call
    console.log("Logout triggered");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // Settings handlers
  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      // TODO: Replace with actual API call
      console.log("Saving settings:", { settings });
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Skillset handlers
  const handleSaveSkillset = async () => {
    setIsSavingSkillset(true);
    try {
      // TODO: Replace with actual API call
      console.log("Saving skillset:", { skillset });
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Skillset Saved",
        description: "Your skills have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skillset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingSkillset(false);
    }
  };

  // Stats handlers
  const handleSaveStats = async () => {
    setIsSavingStats(true);
    try {
      // TODO: Replace with actual API call
      console.log("Saving stats:", { stats });
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Stats Saved",
        description: "Your stats have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save stats. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingStats(false);
    }
  };

  // Projects handlers
  const handleSaveProjects = async () => {
    setIsSavingProjects(true);
    try {
      // TODO: Replace with actual API call
      console.log("Saving projects:", { projects });
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast({
        title: "Projects Saved",
        description: "Your projects have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingProjects(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      console.log("Deleting project:", id);
      setProjects(projects.filter((p) => p._id !== id));
      toast({
        title: "Project Deleted",
        description: "Project has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage your portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 lg:w-auto">
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4 hidden sm:block" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="skillset" className="gap-2">
              <Code className="w-4 h-4 hidden sm:block" />
              Skillset
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <BarChart3 className="w-4 h-4 hidden sm:block" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderKanban className="w-4 h-4 hidden sm:block" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="slot-requests" className="gap-2">
              <CalendarClock className="w-4 h-4 hidden sm:block" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4 hidden sm:block" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsEditor
              settings={settings}
              onChange={setSettings}
              onSave={handleSaveSettings}
              isSaving={isSavingSettings}
            />
          </TabsContent>

          {/* Skillset Tab */}
          <TabsContent value="skillset">
            <SkillsetEditor
              skillset={skillset}
              onChange={setSkillset}
              onSave={handleSaveSkillset}
              isSaving={isSavingSkillset}
            />
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <StatsEditor
              stats={stats}
              onChange={setStats}
              onSave={handleSaveStats}
              isSaving={isSavingStats}
            />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <ProjectsEditor
              projects={projects}
              onChange={setProjects}
              onSave={handleSaveProjects}
              onDelete={handleDeleteProject}
              isSaving={isSavingProjects}
            />
          </TabsContent>

          {/* Slot Requests Tab */}
          <TabsContent value="slot-requests">
            <SlotRequestsTable requests={slotRequests} />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <ContactMessagesTable messages={contactMessages} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
