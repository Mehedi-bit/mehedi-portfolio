import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, User, Layout, Info, MessageSquare, BookOpen } from "lucide-react";
import ImageUpload from "./ImageUpload";
import type { Settings } from "@/types/dashboard";

interface SettingsEditorProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const SettingsEditor = ({ settings, onChange, onSave, isSaving }: SettingsEditorProps) => {
  const updateAdminInfo = (field: keyof Settings["adminInfo"], value: string | { url: string; public_id: string }) => {
    onChange({
      ...settings,
      adminInfo: { ...settings.adminInfo, [field]: value },
    });
  };

  const updateHeroSection = (field: keyof Settings["heroSection"], value: string) => {
    onChange({
      ...settings,
      heroSection: { ...settings.heroSection, [field]: value },
    });
  };

  const updateAboutSection = (field: keyof Settings["aboutSection"], value: string | { url: string; public_id: string }) => {
    onChange({
      ...settings,
      aboutSection: { ...settings.aboutSection, [field]: value },
    });
  };

  const updateContactPitch = (field: keyof Settings["contactPitch"], value: string) => {
    onChange({
      ...settings,
      contactPitch: { ...settings.contactPitch, [field]: value },
    });
  };

  const updateFooter = (field: keyof Settings["footer"], value: string) => {
    onChange({
      ...settings,
      footer: { ...settings.footer, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["admin-info"]} className="space-y-4">
        {/* Admin Info */}
        <AccordionItem value="admin-info" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Admin Info</h3>
                <p className="text-sm text-muted-foreground">Profile and contact details</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Name</Label>
                  <Input
                    id="admin-name"
                    value={settings.adminInfo.name}
                    onChange={(e) => updateAdminInfo("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    value={settings.adminInfo.username}
                    onChange={(e) => updateAdminInfo("username", e.target.value)}
                  />
                </div>
              </div>

              <ImageUpload
                label="Profile Image"
                value={settings.adminInfo.image}
                onChange={(data) => updateAdminInfo("image", data)}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-github">GitHub</Label>
                  <Input
                    id="admin-github"
                    value={settings.adminInfo.github}
                    onChange={(e) => updateAdminInfo("github", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-linkedin">LinkedIn</Label>
                  <Input
                    id="admin-linkedin"
                    value={settings.adminInfo.linkedin}
                    onChange={(e) => updateAdminInfo("linkedin", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-facebook">Facebook</Label>
                  <Input
                    id="admin-facebook"
                    value={settings.adminInfo.facebook}
                    onChange={(e) => updateAdminInfo("facebook", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={settings.adminInfo.email}
                    onChange={(e) => updateAdminInfo("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Phone</Label>
                  <Input
                    id="admin-phone"
                    value={settings.adminInfo.phone}
                    onChange={(e) => updateAdminInfo("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-whatsapp">WhatsApp</Label>
                  <Input
                    id="admin-whatsapp"
                    value={settings.adminInfo.whatsapp}
                    onChange={(e) => updateAdminInfo("whatsapp", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hero Section */}
        <AccordionItem value="hero-section" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <Layout className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Hero Section</h3>
                <p className="text-sm text-muted-foreground">Main landing section content</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={settings.heroSection.title}
                  onChange={(e) => updateHeroSection("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={settings.heroSection.description}
                  onChange={(e) => updateHeroSection("description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Section */}
        <AccordionItem value="about-section" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">About Section</h3>
                <p className="text-sm text-muted-foreground">About me content and image</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Title</Label>
                <Input
                  id="about-title"
                  value={settings.aboutSection.title}
                  onChange={(e) => updateAboutSection("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={settings.aboutSection.description}
                  onChange={(e) => updateAboutSection("description", e.target.value)}
                  rows={4}
                />
              </div>
              <ImageUpload
                label="About Image"
                value={settings.aboutSection.image}
                onChange={(data) => updateAboutSection("image", data)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Pitch */}
        <AccordionItem value="contact-pitch" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Contact Pitch</h3>
                <p className="text-sm text-muted-foreground">Contact section content</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Title</Label>
                <Input
                  id="contact-title"
                  value={settings.contactPitch.title}
                  onChange={(e) => updateContactPitch("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-description">Description</Label>
                <Textarea
                  id="contact-description"
                  value={settings.contactPitch.description}
                  onChange={(e) => updateContactPitch("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactPitch.email}
                    onChange={(e) => updateContactPitch("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={settings.contactPitch.phone}
                    onChange={(e) => updateContactPitch("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-location">Location</Label>
                <Input
                  id="contact-location"
                  value={settings.contactPitch.location}
                  onChange={(e) => updateContactPitch("location", e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Footer */}
        <AccordionItem value="footer" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Footer</h3>
                <p className="text-sm text-muted-foreground">Footer links and copyright</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="footer-year">Year</Label>
                <Input
                  id="footer-year"
                  value={settings.footer.year}
                  onChange={(e) => updateFooter("year", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="footer-facebook">Facebook</Label>
                  <Input
                    id="footer-facebook"
                    value={settings.footer.facebook}
                    onChange={(e) => updateFooter("facebook", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-github">GitHub</Label>
                  <Input
                    id="footer-github"
                    value={settings.footer.github}
                    onChange={(e) => updateFooter("github", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="footer-linkedin">LinkedIn</Label>
                  <Input
                    id="footer-linkedin"
                    value={settings.footer.linkedin}
                    onChange={(e) => updateFooter("linkedin", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-email">Email</Label>
                  <Input
                    id="footer-email"
                    type="email"
                    value={settings.footer.email}
                    onChange={(e) => updateFooter("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="footer-phone">Phone</Label>
                  <Input
                    id="footer-phone"
                    value={settings.footer.phone}
                    onChange={(e) => updateFooter("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-whatsapp">WhatsApp</Label>
                  <Input
                    id="footer-whatsapp"
                    value={settings.footer.whatsapp}
                    onChange={(e) => updateFooter("whatsapp", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={onSave} disabled={isSaving} className="w-full sm:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
};

export default SettingsEditor;
